import { Response, Request } from 'express'
import { getConnection, getRepository } from 'typeorm';
import Quotes from '../entities/quotesModel';
import Users from '../entities/userModel';
class QuoteController {
    async getRandomQuote(req: Request, res: Response): Promise<void> {
        try {
            const num = await getRepository(Quotes)
            .createQueryBuilder()
            .select(['MIN(id) as min', 'MAX(id)'])
            .getRawOne()

            let random = Math.round(Math.random() * (num.max - num.min) + num.min);
            let quote;
            const author = `
            (SELECT first_name || ' ' || last_name 
            FROM users 
            WHERE users.id = quotes.user_id) as author
            `
            while(!quote){
                const req = await getConnection()
                .createQueryBuilder()
                .select(["quote", "date", "id", author])
                .from(Quotes, 'quotes')
                .where('id= :id', {id : random})
                .getRawOne()

                random = Math.round(Math.random() * (num.max - num.min) + num.min);
                quote = req;
            }
            
            res.send(quote);
            
        } catch (error) {
            console.log(error);
        }
    }
    async getAllQuote(req: Request, res: Response): Promise<void> {
        try {
            const author = `
            (SELECT first_name || ' ' || last_name 
            FROM users 
            WHERE users.id = quotes.user_id) as author
            `
            const allQuotes = await getConnection()
                .createQueryBuilder()
                .select(["quote", "date", "id", author])
                .from(Quotes, 'quotes')
                .getRawMany();
            res.send(allQuotes)
        } catch (error) {
            console.log(error); 
        }

    }
    async getQuote(req: Request, res: Response): Promise<void> {
        try {
            const author =`
            (SELECT first_name || ' ' || last_name 
            FROM users 
            WHERE users.id = quotes.user_id) as author
            `
            const quotes = await getConnection()
                .createQueryBuilder()
                .select(["quote", "date", "id", author])
                .from(Quotes, 'quotes')
                .where('id= :id', {id : req.params.id})
                .getRawOne()
            if(quotes){
                res.send(quotes)
                return
            }
            res.status(404).send('Quote does not exist');
            
        } catch (error) {
            res.status(404).send('Cannot found quote')
            
        }

    }

    async getQuoteByUser(req: Request, res: Response): Promise<void> {
        try {
            const { idOrUsername } = req.params
            const where = res.locals.where;

            const user = await getRepository(Users).findOne({
                select: ["id", "first_name", "last_name"],
                where
            });
            if(user){
                const quotes = await getRepository(Quotes).find({
                    select: ["quote", "date", "id"],
                    where : {user_id : idOrUsername}
                });

                res.send({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    quotes
                });
                return 
            }
            res.status(404).send("user doesn't exist");
            return
        } catch (error) {
            console.log(error);
        }
    }

    async createQuote(req: Request, res: Response): Promise<void> {
        try {
            const where = res.locals.where;
            const user = await getRepository(Users).findOne({
                select: ["username", "last_name", "first_name", "date", "id"],
                where
            });
            if(user){
                const quote = await getRepository(Quotes).save({...req.body, user_id: user});
                delete quote.user_id;
                res.send({
                    ...quote,
                    author: `${user.first_name} ${user.last_name}`,
                });
                return;
            }
            res.status(404).send('user does not exist')   
        } catch (error) {
            console.log(error);  
        }
    }

    async deleteQuote(req: Request, res: Response): Promise<void> {
        try {
            const deleteReq = await getRepository(Quotes).delete({id: Number(req.params.id)});
            if(deleteReq.affected){
                res.send('succesfully deleted');
                return
            }
            res.status(404).send('does not exist');
        } catch (error) {
            console.log(error);
        }
    }

    async updateQuote(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await getRepository(Quotes).update(id, req.body)
            const quote = await getRepository(Quotes).findOne(id)
            res.send(quote); 
        } catch (error) {
            console.log(error);
        }
    }
}

export default QuoteController;