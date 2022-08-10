import express, { Request, Response } from 'express'
import { Order, OrderList } from '../models/orders'
import verifyAuthToken  from '../utilities/auth'

const orderList = new OrderList()
const active = true
const completed = false

const index = async (_req: Request, res: Response) => {
    const orders = await orderList.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order = await orderList.show(req.params.orderId)
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: active,
            product_ids: req.body.product_ids
        }

        const newOrder = await orderList.create(order)
        res.json(newOrder)
    } catch(err) {
        console.log(err)
        res.status(400)
        res.json(err)
    }
}

const deleteEntry = async (req: Request, res: Response) => {
    const deleted = await orderList.delete(req.params.orderId)
    res.json(deleted)
}


const order_routes = (app: express.Application) => {
    const routes = express.Router({mergeParams: true});

    routes.get('/orders', verifyAuthToken, index)
    routes.get('/orders/:orderId', verifyAuthToken, show)
    routes.post('/orders', verifyAuthToken, create)
    routes.delete('/orders/:orderId', verifyAuthToken, deleteEntry)
    // app.use('/', routes)
    return routes
}

export default order_routes