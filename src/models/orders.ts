// @ts-ignore
import Client from '../database'

const active = true
const completed = false

export type Order = {
    id: number;
    user_id: number;
    status: boolean;
}

export class OrderList {
  async index(): Promise<Order[]> {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM orders'

        const result = await conn.query(sql)

        conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(b: Order): Promise<Order> {
      try {
        const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn
            .query(sql, [b.user_id, b.status])

        const order = result.rows[0]

        conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not add new order. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Order> {
      try {
        const sql = 'DELETE FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        const order = result.rows[0]

        conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }
}