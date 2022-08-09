import express, { Request, Response } from 'express'
import { User, UserList } from '../models/users'
import jwt from 'jsonwebtoken'
import verifyAuthToken  from '../utilities/auth'

const token_secret = process.env.TOKEN_SECRET as string
const userList = new UserList()

const index = async (_req: Request, res: Response) => {
    const users = await userList.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user = await userList.show(req.params.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password_digest: req.body.password,
    }
    try {
        const newUser = await userList.create(user)
        var token = jwt.sign({ user: newUser }, token_secret);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err as string + user)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username,
      password_digest: req.body.password,
    }
    try {
        const u = await userList.authenticate(user.username, user.password_digest)
        var token = jwt.sign({ user: u }, token_secret);
        res.json(token)
    } catch(err) {
        res.status(401)
        res.json({ err })
    }
  }

const deleteEntry = async (req: Request, res: Response) => {
    const deleted = await userList.delete(req.params.id)
    res.json(deleted)
}

const user_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
    app.post('/login', authenticate)
    app.delete('/users', verifyAuthToken, deleteEntry)
}

export default user_routes