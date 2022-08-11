import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/users';

const request = supertest(app);

let token: string
const test_user: User = {
  username: 'testuser',
  firstname: 'testuser',
  lastname: 'user',
  password_digest: "testpassword"
}

describe('Test Users endpoint responses', () => {

  it('creates a user', async () => {
    const response = await request.post(
      '/users'
    ).send(test_user);
    expect(response.status).toBe(200);
    token = response.body
  });

  it('gets all users', async () => {
    const response = await request.get(
      '/users'
    );
    expect(response.status).toBe(200);
  });

  it('gets a single user', async () => {
    const response = await request.get(
      '/users/2'
    ).set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('deletes a users', async () => {
    const response = await request.delete(
      '/users/2'
    ).set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

});
