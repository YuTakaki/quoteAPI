import { Response, Request } from 'express'
import { getRepository } from 'typeorm';
import Quotes from '../entities/quotesModel';
import Users from '../entities/userModel';
class QuoteController {
    async getRandomQuote(req: Request, res: Response): Promise<void> {

        

    }
    async getQuote(req: Request, res: Response): Promise<void> {
        try {
            const quotes = await getRepository(Quotes).findOne({
                select: ["quote", "date", "id", "user"],
                where : {id : req.params.id}
            });
            res.send(quotes)
            
        } catch (error) {
            console.log(error);
            
        }

    }

    async getQuoteByUser(req: Request, res: Response): Promise<void> {
        try {
            const { idOrUsername } = req.params
            const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
            let key = "username";
            let id: string;
            if(regexExp.test(idOrUsername)){
                key = "id"
                id = idOrUsername
            }

            const user = await getRepository(Users).findOne({
                select: ["id", "username"],
                where : {[key] : idOrUsername}
            });
            if(user){
                id = user.id
                const quotes = await getRepository(Quotes).find({
                    select: ["quote", "date", "id"],
                    where : {user_id : idOrUsername}
                });

                res.send({
                    username : user.username,
                    quotes
                });
                return 
            }
            res.send("user doesn't exist");
            return
        } catch (error) {
            console.log(error);
        }
    }

    async createQuote(req: Request, res: Response): Promise<void> {
        try {
            const { idOrUsername } = req.params
            const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
            let key = "username"
            if(regexExp.test(idOrUsername)){
                key = "id"
            }
            const user = await getRepository(Users).findOne({
                select: ["username", "last_name", "first_name", "date", "id"],
                where : {[key] : idOrUsername}
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
            res.send('user does not exist')
            
            
        } catch (error) {
            console.log(error);  
        }
    }

    async deleteQuote(req: Request, res: Response): Promise<void> {
        

    }

    async updateQuote(req: Request, res: Response): Promise<void> {
        

    }
}

export default QuoteController;