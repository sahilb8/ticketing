import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayLoad {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayLoad;
    }
  }
}

// the below function gets the current user that is logged in.
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    next();
  } else {
    try {
      const payLoad = jwt.verify(
        req.session.jwt,
        process.env.JWT_KEY!,
      ) as UserPayLoad;
      req.currentUser = payLoad;
    } catch (err) {}
    next();
  }
};
