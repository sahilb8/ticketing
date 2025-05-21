import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-rquest-error';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').trim().notEmpty().withMessage('Please enter a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }
    const comparePassword = Password.compare(existingUser.password, password);
    if (!comparePassword) {
      throw new BadRequestError('Invalid credentials');
    }
    // generate the json web token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    );

    // save the jwt in the cookie

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(existingUser);
  },
);

export { router as signInRouter };
