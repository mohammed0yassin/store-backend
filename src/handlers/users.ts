import express, { Request, Response } from 'express'
import { User, UserList } from '../models/users'
import jwt from 'jsonwebtoken'
import verifyAuthToken  from '../utilities/auth'

const token_secret = process.env.TOKEN_SECRET as string
const userList = new UserList()

const index = async (_req: Request, res: Response) => {
    try {
        const users = await userList.index()
        res.json(users)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await userList.show(req.params.userId)
        res.json(user)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
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
        if (!u) {
            res.status(403)
            res.json("Wrong username or password")
        }
        var token = jwt.sign({ user: u }, token_secret);
        res.json(token)
    } catch(err) {
        res.status(401)
        res.json({ err })
    }
  }

const deleteEntry = async (req: Request, res: Response) => {
    try {
        const deleted = await userList.delete(req.params.userId)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const user_routes = (app: express.Application) => {
    
    app.post('/login', authenticate)

    const routes = express.Router();
    routes.get('/', index)
    routes.get('/:userId', verifyAuthToken, show)
    routes.post('/', create)
    routes.delete('/:userId', verifyAuthToken, deleteEntry)
    return routes
}

export default user_routes