import { Order, OrderList } from '../orders';
import { User, UserList } from '../users';
import { Product, ProductList } from '../products';

const orderList = new OrderList()
const userList = new UserList()
const productList = new ProductList()

const active = true
const completed = false
const addProduct = async (id: string) => {
  const result1 = await productList.show(id)
  // if (result1.id) {
  //   return null
  // }
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
  const result1 = await userList.show("1")
  if (result1.username === 'testusernameorder') {
    userList.delete("1");
  }
  const result2 = await userList.show("2")
  if (result2.username === 'testusernameorder') {
    userList.delete("2");
  }
}

describe("Order Model", () => {
  beforeAll(async () => {
    addProduct("1");
    addProduct("2");
    createUser();
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
    const result1 = await userList.show("1")
    const result = await orderList.create({
      //@ts-ignore
      user_id: 1,
      status: active,
      product_ids: [1, 2]
    });

    expect(result).toEqual({
      id: 1,
      //@ts-ignore
      user_id:"1",
      status: active,
      product_ids: [1, 2],
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await orderList.index();
    expect(result).toEqual([{
      id: 1,
      //@ts-ignore
      user_id: "1",
      status: active,
    }]);
  });

  it('show method should return the correct order', async () => {
    const result = await orderList.show("1");
    expect(result).toEqual({
      id: 1,
      //@ts-ignore
      user_id: "1",
      status: active,
      product_ids: [1, 2],
    });
  });

  it('delete method should remove the order', async () => {
    orderList.delete("1");
    const result = await orderList.index()
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    removeProduct("1");
    removeProduct("2");
    deleteUser();
  });
});