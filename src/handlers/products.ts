import express, { Request, Response } from 'express'
import { Product, ProductList } from '../models/products'

const productList = new ProductList()

const index = async (_req: Request, res: Response) => {
    const products = await productList.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const product = await productList.show(req.params.id)
    res.json(product)
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
    const deleted = await productList.delete(req.params.id)
    res.json(deleted)
}

const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.delete('/products', deleteEntry)
}

export default product_routes