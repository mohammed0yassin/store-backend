import supertest from 'supertest';
import app from '../../server';
import { Order } from '../../models/orders';
import { Product } from '../../models/products';
import { User } from '../../models/users';

const active = true
const request = supertest(app);

let token: string
const test_order: Order = {
  user_id: 1,
  status: active,
  product_ids: [1, 2]
}

const test_product: Product = {
    name: 'test product',
    price: 200
}

const test_user: User = {
    username: 'testuser',
    firstname: 'testuser',
    lastname: 'user',
    //@ts-ignore
    password: 'testpassword'
}

const addProduct = async () => {
    const response = await request.post(
        '/products'
    ).set('Authorization', 'Bearer ' + token
    ).send(test_product);
}

const removeProduct = async (id: string) => {
    const response = await request.delete(
        `/products/${id}`
      ).set('Authorization', 'Bearer ' + token
      );
}

const createUser = async () => {
    const response = await request.post(
        '/users'
    ).send(test_user);
    token = response.body
}

describe('Test Orders endpoint responses', () => {

    beforeAll(async () => {
        await createUser();
        await addProduct();
        await addProduct();
      });

  it('creates an order', async () => {
    const response = await request.post(
      '/users/1/orders'
    ).set('Authorization', 'Bearer ' + token
    ).send(test_order);
    expect(response.status).toBe(200);
  });

  it('gets all orders', async () => {
    const response = await request.get(
      '/users/1/orders'
    ).set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('gets a single order', async () => {
    const response = await request.get(
      '/users/1/orders/1'
    ).set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('deletes a orders', async () => {
    const response = await request.delete(
      '/users/1/orders/1'
    ).set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
  
  afterAll(async () => {
    await removeProduct("1");
    await removeProduct("2");
  });
});
