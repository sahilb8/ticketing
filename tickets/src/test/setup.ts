import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'fwefw';
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = 'test@email.com';
  const password = 'testpassword';

  const signUpResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: email,
      password: password,
    })
    .expect(201);

  const cookie = signUpResponse.get('Set-Cookie');
  if (!cookie) {
    throw new Error('Failed to get cookie from response');
  }
  return cookie;
};
