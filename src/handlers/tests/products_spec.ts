import supertest from 'supertest';
import app from '../../server';
import { Product } from '../../models/products';
import { User } from '../../models/users';

const request = supertest(app);

const test_user: User = {
  username: 'testuser',
  //@ts-ignore
  password: 'testpassword'
}

const loginUser = async () => { 
  const response = await request.post('/login'
  ).send(test_user);
  return response.body
}

let token: string

const test_product: Product = {
  name: 'test product',
  price: 200
}

const deleteUser = async (id: string) => {
  const response = await request.delete(
      `/users/${id}`
    ).set('Authorization', 'Bearer ' + token);
}

describe('Test Products endpoint responses', () => {
  
  beforeAll(async () => {
    token = await loginUser();
  });

  it('creates a product', async () => {
    const response = await request.post(
      '/products'
    ).set('Authorization', 'Bearer ' + token
    ).send(test_product);
    expect(response.status).toBe(200);
  });

  it('gets all products', async () => {
    const response = await request.get(
      '/products'
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{
      //@ts-ignore
      id: 3,
      name: test_product.name,
      price: test_product.price
    }])
  });

  it('gets a single product', async () => {
    const response = await request.get(
      '/products/3'
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      //@ts-ignore
      id: 3,
      name: test_product.name,
      price: test_product.price
    })
  });

  it('deletes a products', async () => {
    const response = await request.delete(
      '/products/3'
    ).set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await deleteUser("1");
  });
});
