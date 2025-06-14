import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@sb7184ticketing/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater then 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price} = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id
    });

    await ticket.save();
  },
);

export { router as createTicketRouter };
