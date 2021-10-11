import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Users from "../entities/userModel";

class UsersController {
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const users = await getRepository(Users).save(req.body);
            res.send(users);
        } catch (error) {
            res.send('already exist')
        }
    }

    async getUserInfo(req: Request, res: Response): Promise<void> {
        try {
            const { idOrUsername } = req.params
            const user = await getRepository(Users).findOne({
                select: ["username", "last_name", "first_name"],
                where: [{username : idOrUsername}]
            });
            res.send(user);
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default UsersController