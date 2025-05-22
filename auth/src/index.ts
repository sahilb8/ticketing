import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY has to be defined in secrets');
    }
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    app.listen(3000, () => {
      console.log('Server is running on port 3000!!!!!!!!!!');
    });
    console.log('Connected to auth mongodb');
  } catch (err) {
    console.log(err);
  }
};

start();
