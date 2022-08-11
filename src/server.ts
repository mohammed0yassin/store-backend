import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import product_routes from './handlers/products'
import user_routes from './handlers/users'
import order_routes from './handlers/orders'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

// Standalone endpoint
product_routes(app)

// Users nested routes
const userRoutes = user_routes(app)
const orderRoutes = order_routes(app)
userRoutes.use('/:userId', orderRoutes)
app.use('/users', userRoutes)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


export default app