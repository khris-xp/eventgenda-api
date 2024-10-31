import { Request, Response } from 'express';
import PaymentRepository from '../repositories/payment.repository';
import userRepository from '../repositories/user.repository';
import { handleError } from '../utils/error.utils';
import {
  errorResponseStatus,
  successResponseStatus,
} from '../utils/response.utils';

const paymentController = {
  async findAll(req: Request, res: Response) {
    try {
      const payments = await PaymentRepository.findAll();
      return successResponseStatus(
        res,
        'Get all payments successfully.',
        payments
      );
    } catch (error) {
      return handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const { total, status } = req.body;
      const userId = req.user?._id;

      const paymentData = {
        user: userId,
        total,
        status,
      };

      const lineItems = [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: 'Add Coin',
            },
            unit_amount: total * 100,
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['promptpay'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:3000/payment/success`,
        cancel_url: `http://localhost:3000/payment/failed`,
      });

      const payment = await PaymentRepository.create(paymentData);

      const paymentResponse = payment.toObject();

      const user = await userRepository.findById(userId);

      const updatedUser = await userRepository.updateOne(userId, {
        coin: user?.coin + Math.round(total / 1.1),
      });

      return successResponseStatus(res, 'Create new payment successfully.', {
        paymentResponse,
        session,
      });
    } catch (error) {
      return handleError(res, error);
    }
  },

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await PaymentRepository.findById(id);
      if (!payment) {
        return errorResponseStatus(404, res, 'Payment not found.', null);
      }
      return successResponseStatus(res, 'Get payment successfully.', payment);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate the status
      const validStatuses = ['pending', 'completed', 'failed', 'refunded'];
      if (!validStatuses.includes(status)) {
        return errorResponseStatus(400, res, 'Invalid status provided.', null);
      }

      const updatedPayment = await PaymentRepository.update(id, { status });
      if (!updatedPayment) {
        return errorResponseStatus(404, res, 'Payment not found.', null);
      }

      return successResponseStatus(
        res,
        'Payment status updated successfully.',
        updatedPayment
      );
    } catch (error) {
      return handleError(res, error);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedPayment = await PaymentRepository.delete(id);
      if (!deletedPayment) {
        return errorResponseStatus(404, res, 'Payment not found.', null);
      }
      return successResponseStatus(
        res,
        'Delete payment successfully.',
        deletedPayment
      );
    } catch (error) {
      return handleError(res, error);
    }
  },
};

export default paymentController;
