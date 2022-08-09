// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'

const pepper = process.env.BCRYPT_PASSWORD
const saltRounds = process.env.SALT_ROUNDS

export type User = {
     id?: number;
     username: string;
     firstname?: string;
     lastname?: string;
     password_digest: string;
}

export class UserList {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
      try {
        // @ts-ignore
        const sql = 'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *'

        const hash = bcrypt.hashSync(
            u.password_digest + pepper, 
            parseInt(saltRounds as string)
        );

        const conn = await Client.connect()

        const result = await conn
            .query(sql, [u.username, u.firstname, u.lastname, hash])

        const user = result.rows[0]

        conn.release()
        console.log("Created user ", user)
        return user
      } catch (err) {
          throw new Error(`Could not add new user ${u.firstname} ${u.lastname}. Error: ${err}`)
      }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    // console.log(password+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log("Logged in user ", user)

      if (bcrypt.compareSync(password+pepper, user.password_digest)) {
        return user
      }
    }

    return null
  }

  async delete(id: string): Promise<User> {
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }
}