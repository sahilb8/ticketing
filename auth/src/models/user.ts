import mongoose from 'mongoose';
import { Password } from '../services/password';

// interface that describes the properties required
// to build a user object
interface UserAttr {
  email: string,
  password: string,
}

// interface that describes the properties a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttr): UserDoc,
}

// interface that describes the properties of a user document
interface UserDoc extends mongoose.Document {
  email: string,
  password: string,
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function(done){
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
