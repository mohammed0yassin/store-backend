import supertest from 'supertest';
import app from '../../server';
import { Product } from '../../models/products';

const request = supertest(app);

const test_product: Product = {
  name: 'test product',
  price: 200
}

describe('Test Products endpoint responses', () => {

  it('creates a product', async () => {
    const response = await request.post(
      '/products'
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
    );
    expect(response.status).toBe(200);
  });

});
