import { NextFunction, Request, Response } from "express";

class Middleware {
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
}

export default Middleware;