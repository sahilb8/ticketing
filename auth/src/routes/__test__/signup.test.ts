import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successfull signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'unui@email.com',
      password: 'f3eferf',
    })
    .expect(201);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'unui@email.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'f',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'unui@email.com',
      password: 'password'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'unui@email.com',
      password: 'password'
    })
    .expect(400);
});

it('sets a cookie after succesfull signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'unui@email.com',
      password: 'f3eferf',
    })
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});

