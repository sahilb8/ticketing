import { Request, Response, NextFunction } from 'express';
import { NotAuthorisedError } from '../errors/not-authorised-error';

// the below function gets the current user that is logged in.
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NotAuthorisedError();
  }

  next();
};
