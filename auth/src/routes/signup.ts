import express from 'express';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    console.log('Creating an user!!!!!!!');
    res.send({});
  },
);

export { router as signUpRouter };
