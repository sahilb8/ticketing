import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import {
  NotFoundError,
  NotAuthorisedError,
  requireAuth,
  validateRequest,
} from '@sb7184ticketing/common';
import { body } from 'express-validator';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater then 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorisedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    res.send(ticket);
  },
);

export { router as updateTicketRouter };
