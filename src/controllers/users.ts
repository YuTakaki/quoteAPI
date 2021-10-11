import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import Users from "../entities/userModel";

class UsersController {
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const users = await getRepository(Users).save(req.body);
            res.send(users);
        } catch (error) {
            res.send('User Already Exist')
        }
    }

    checkParams(req: Request, res: Response, next: NextFunction): void {
        const { idOrUsername } = req.params
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        let key = "username"
        if(regexExp.test(idOrUsername)){
            key = "id"
        }
        res.locals.where = {[key] : idOrUsername}
        next();
    }

    async getUserInfo(req: Request, res: Response): Promise<void> {
        try {
            const where = res.locals.where;
            const user = await getRepository(Users).findOne({
                select: ["username", "last_name", "first_name", "date"],
                where
            });
            if(user){
                res.send(user);
                return;
            }
            res.send('user does not exist')
        } catch (error) {
            console.log(error);
            
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const where = res.locals.where;
            const deleteReq = await getRepository(Users).delete(where)!;
            if(deleteReq.affected){
                res.send('succesfully deleted');
                return
                
            }
            res.send('does not exist');

            
        } catch (error) {
            console.log(error);
            
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const where = res.locals.where;
            const id = await getRepository(Users).findOne({
                select: ["id"],
                where
            });
            const rest = await getRepository(Users).save({...id, ...req.body})
            res.send(rest);
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default UsersController