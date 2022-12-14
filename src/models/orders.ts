// @ts-ignore
import Client from '../database'

const active = true
const completed = false

export type Order = {
    id?: number;
    user_id: number;
    status: boolean;
    product_ids: number[];
}

export type OrderProducts = {
    id?: number;
    order_id: number;
    product_id: string;
}

export class OrderList {

  async index(): Promise<Order[]> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const orderSQL = 'SELECT * FROM orders'
        const result = await conn.query(orderSQL)
        conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
        const orderSQL = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
        const result = await conn.query(orderSQL, [id])
        const productsSQL = 'SELECT * FROM order_products where order_id=($1)'
        const productsResult = await conn.query(productsSQL, [id])
        conn.release()
        let product_ids = productsResult.rows.map((order: OrderProducts) => {
          return parseInt(order.product_id)
        })
        const orderDetails = result.rows[0]
        const order: Order = { 
          id: orderDetails.id,
          user_id: orderDetails.user_id,
          status: orderDetails.status,
          product_ids: product_ids,
        }
        return order
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(o: Order): Promise<Order> {
      try {
        const orderSQL = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
        // @ts-ignore
        const conn = await Client.connect()
        const orderResult = await conn
              .query(orderSQL, [o.user_id, o.status])
        const order_id = orderResult.rows[0].id
        const orderProductsSQL = 'INSERT INTO order_products (order_id, product_id) VALUES($1, $2) RETURNING *'
        o.product_ids.forEach( async (product_id) => {
          const secondResult = await conn
          .query(orderProductsSQL, [order_id, product_id])
        })
        conn.release()

        const orderDetails = orderResult.rows[0]
        const order: Order = {
          id: orderDetails.id,
          user_id: orderDetails.user_id,
          status: orderDetails.status,
          product_ids: o.product_ids,
        }

        return order
      } catch (err) {
          throw new Error(`Could not add new order. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Order> {
      try {
        const orderSQL = 'DELETE FROM orders WHERE id=($1)'
        const orderProductsSQL = 'DELETE FROM order_products WHERE order_id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
        const OrderProductsResult = await conn.query(orderProductsSQL, [id])
        const orderResult = await conn.query(orderSQL, [id])

        const order = orderResult.rows[0]

        conn.release()

    return order
      } catch (err) {
          console.error(err)
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }

  async addProduct( orderId: string, productId: string): Promise<Order> {
    try {
      const sql = 'INSERT INTO order_products (order_id, product_id) VALUES($1, $2) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }

}

