import { Router } from 'express';
import paymentController from '../controllers/payment.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const paymentRouter = Router();

// Get all payments (admin only)
paymentRouter.get('/', authUser, authAdmin, paymentController.findAll);

// Get a specific payment
paymentRouter.get('/:id', authUser, paymentController.findOne);

// Create a new payment
paymentRouter.post('/', authUser, paymentController.create);

// Update a payment (admin only)
paymentRouter.put('/:id', authUser, authAdmin, paymentController.update);

// Delete a payment (admin only)
paymentRouter.delete('/:id', authUser, authAdmin, paymentController.delete);

export default paymentRouter;