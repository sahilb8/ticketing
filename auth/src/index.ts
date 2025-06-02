import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY has to be defined in secrets');
    }
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI has to be defined in environment variables');
    }
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log('Server is running on port 3000!!!!!!!!!!');
    });
    console.log('Connected to auth mongodb');
  } catch (err) {
    console.log(err);
  }
};

start();
