import { User, UserList } from '../users';

const userList = new UserList()
const testpassword = 'testpassword'

describe("User Model", () => {
  it('should have an index method', () => {
    expect(userList.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(userList.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userList.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(userList.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await userList.create({
      username: 'testusername',
      firstname: 'test',
      lastname: 'username',
      password_digest: testpassword
    });

    expect(result).toBeTruthy;
  });

  it('index method should return a list of users', async () => {
    const result = await userList.index();
    expect(result).toBeTruthy;
  });

  it('show method should return the correct user', async () => {
    const result = await userList.show("1");
    expect(result).toBeTruthy;
  });

  it('delete method should remove the user', async () => {
    await userList.delete("1");
    await userList.delete("2");
    const result = await userList.index()

    expect(result).toEqual([]);
  });
});