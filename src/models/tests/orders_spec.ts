import { Order, OrderList } from '../orders';
import { User, UserList } from '../users';
import { Product, ProductList } from '../products';
import { convertCompilerOptionsFromJson } from 'typescript';

const orderList = new OrderList()
const userList = new UserList()
const productList = new ProductList()

const active = true
const completed = false
const addProduct = async () => {
  const result2 = await productList.create({
    name: 'Test Perfume',
    price: 2500,
  });
}

const removeProduct = async (id :string) => {
  const result1 = await productList.show(id)
  if (result1.price == 2500) {
    productList.delete(id);
  }
}

const createUser = async () => {
  // const result1 = await userList.show("1")
  // if (result1.id) {
  //   return null
  // }
  await userList.create({
    username: 'testusernameorder',
    firstname: 'test',
    lastname: 'username',
    password_digest: 'password'
  });
}

const deleteUser = async () => {
  userList.delete("3");
}

describe("Order Model", () => {
  beforeAll(async () => {
    await addProduct();
    await addProduct();
    await createUser();
  });

  it('should have an index method', () => {
    expect(orderList.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderList.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderList.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(orderList.delete).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await orderList.create({
      //@ts-ignore
      user_id: 3,
      status: active,
      product_ids: [4, 5]
    });

    expect(result).toEqual({
      id: 2,
      //@ts-ignore
      user_id:"3",
      status: active,
      product_ids: [4, 5],
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await orderList.index();
    expect(result).toEqual([{
      id: 2,
      //@ts-ignore
      user_id: "3",
      status: active,
    }]);
  });

  it('show method should return the correct order', async () => {
    const result = await orderList.show("2");
    expect(result).toEqual({
      id: 2,
      //@ts-ignore
      user_id: "3",
      status: active,
      product_ids: [4, 5],
    });
  });

  it('delete method should remove the order', async () => {
    await orderList.delete("2");
    const result = await orderList.index();
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    await removeProduct("4");
    await removeProduct("5");
    await deleteUser();
  });
});