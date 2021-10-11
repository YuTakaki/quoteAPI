import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import Users from "../entities/userModel";

class UsersController {
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            const users = await getRepository(Users).save(req.body);
            res.send(users);
        } catch (error: any) {
            if(error.constraint === 'userLength'){
                res.status(403).send('short username')
            }else if(error.constraint === 'passwordLengthCheck'){
                res.status(403).send('short password')
            }else{
                res.status(403).send('User already exist')
            }
        }
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
            res.status(404).send('user does not exist')
        } catch (error) {
            console.log(error);
            
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const where = res.locals.where;
            const deleteReq = await getRepository(Users).delete(where);
            if(deleteReq.affected){
                res.send('succesfully deleted');
                return
                
            }
            res.status(404).send('does not exist');

            
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
            const result = await getRepository(Users).save({...id, ...req.body})
            res.send(result);
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default UsersController