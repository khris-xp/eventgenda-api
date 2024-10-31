import { Router } from 'express';
import paymentController from '../controllers/payment.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const paymentRouter = Router();

// Get all payments (admin only)
paymentRouter.get('/', verifyToken, authorizeRoles("admin"), paymentController.findAll);

// Get a specific payment
paymentRouter.get('/:id', verifyToken, authorizeRoles("user", "organizer", "admin"), paymentController.findOne);

// Create a new payment
paymentRouter.post('/', verifyToken, authorizeRoles("user", "organizer"), paymentController.create);

// Update a payment (admin only)
paymentRouter.put('/:id', verifyToken, authorizeRoles("admin"), paymentController.update);

// Delete a payment (admin only)
paymentRouter.delete('/:id', verifyToken, authorizeRoles("admin"), paymentController.delete);

export default paymentRouter;