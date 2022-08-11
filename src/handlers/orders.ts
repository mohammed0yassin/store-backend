import express, { Request, Response } from 'express'
import { Order, OrderList } from '../models/orders'
import verifyAuthToken  from '../utilities/auth'

const orderList = new OrderList()
const active = true
const completed = false

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await orderList.index()
        res.json(orders)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await orderList.show(req.params.orderId)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
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
    try {
        const deleted = await orderList.delete(req.params.orderId)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

// ... other methods
const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.orderId
    const productId: string = _req.body.productId
  
    try {
      const addedProduct = await orderList.addProduct(orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 

const order_routes = (app: express.Application) => {
    const routes = express.Router({mergeParams: true});

    routes.get('/orders', verifyAuthToken, index)
    routes.get('/orders/:orderId', verifyAuthToken, show)
    routes.post('/orders', verifyAuthToken, create)
    routes.delete('/orders/:orderId', verifyAuthToken, deleteEntry)
    routes.post('/orders/:orderId/products', verifyAuthToken, addProduct)
    // app.use('/', routes)
    return routes
}

export default order_routes