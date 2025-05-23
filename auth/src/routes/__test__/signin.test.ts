import request from 'supertest';
import {app} from '../../app';

it('returns a invalid credential error on non existing emailid', async () => {
  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'gverioio@email.com',
    password: 'bhnjvnfhjni'
  })
  .expect(400)
})