import { Product, ProductList } from '../products';

const productList = new ProductList()

describe("Product Model", () => {

  it('should have a show method', () => {
    expect(productList.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productList.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(productList.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await productList.create({
      name: 'Some Perfume',
      price: 250,
    });

    expect(result).toEqual({
      id: 6,
      name: 'Some Perfume',
      price: 250,
    });
  });

  it('index method should return a list of products', async () => {
    const result = await productList.index();
    expect(result).toEqual([{
        id: 6,
        name: 'Some Perfume',
        price: 250,
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await productList.show("6");
    expect(result).toEqual({
        id: 6,
        name: 'Some Perfume',
        price: 250,
    });
  });

  it('delete method should remove the product', async () => {
    await productList.delete("6");
    const result = await productList.index()

    expect(result).toEqual([]);
  });
});