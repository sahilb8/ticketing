import express from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { Request, Response } from 'express';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@sb7184ticketing/common';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('The password should be minimum 4 letters and maximum 20'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new BadRequestError('The user already exists');
    }

    const user = User.build({ email: email, password: password });
    await user.save();

    // generate the json web token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    // save the jwt in the cookie

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  },
);

export { router as signUpRouter };
