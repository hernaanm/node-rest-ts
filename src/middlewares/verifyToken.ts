import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload{
    _id: string,
    userId: number,
    name: string,
    email: string,
    iat: number,
    exp: number
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.header('Authorization');
        if(!token) return res.status(401).json('Access denied')
        const payload = jwt.verify(token, process.env.TOKEN_SECRET) as IPayload
        if( <number><unknown>req.params.userId != payload.userId){return res.status(403).send('Token is not related to the user');}
        next();
    }catch{
        res.status(400).send('Invalid Token');
    }
}