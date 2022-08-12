import express, { Request, Response } from 'express'
import { Product, ProductList } from '../models/products'
import { verifyAuthToken }  from '../utilities/auth'

const productList = new ProductList()

const index = async (_req: Request, res: Response) => {
    try {
        const products = await productList.index()
        res.json(products)
    } catch (err) {
        res.status(400)
        res.json(err)
    }        
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await productList.show(req.params.id)
        res.json(product)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        }

        const newProduct = await productList.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const deleteEntry = async (req: Request, res: Response) => {
    try {
        const deleted = await productList.delete(req.params.productId)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.delete('/products/:productId', verifyAuthToken, deleteEntry)
}

export default product_routes