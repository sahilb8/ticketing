import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// commenting for now
// app.use(errorHandler);

const start = async ()=> {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    app.listen(3000, () => {
      console.log('Server is running on port 3000!!!!!!!!!!');
    });
    console.log('Connected to auth mongodb');
  } catch(err) {
    console.log(err);
  }  
}

start();