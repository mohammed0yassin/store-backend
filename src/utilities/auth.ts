import { request, Request, Response } from 'express'
import { User } from '../models/users'
import jwt from 'jsonwebtoken'


interface JwtUserPayload {
    user: User
}



const token_secret = process.env.TOKEN_SECRET as string

export const verifyAuthToken  = (req: Request, res: Response, next: Function): void => {
    
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, token_secret) as JwtUserPayload
        next()
    } catch (error) {
        res.status(401)
        res.json("Error: Invalid token")
    }
};

export const verifyUserAllowed  = (req: Request, res: Response, next: Function): void => {

    const user: User = {
        id: parseInt(req.params.userId),
        username: req.body.username,
        password_digest: req.body.password_digest,
    }
    
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, token_secret) as JwtUserPayload
        if(decoded.user.id !== user.id) {
            console.log("Users don't match")
            res.status(401)
            res.json("Invalid User")
            throw new Error('User id does not match!')
        }
        next()
    } catch (error) {
        res.status(401)
        res.json("Error: Invalid token")
    }
};

export const verifyAuth = (req: Request, res: Response, next: Function): void => {

    verifyAuthToken(req, res, next);
    verifyUserAllowed(req, res, next);
    next();
};