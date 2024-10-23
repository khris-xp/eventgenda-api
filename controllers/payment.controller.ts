import { Request, Response } from 'express';
import PaymentRepository from '../repositories/payment.repository';
import { handleError } from '../utils/error.utils';
import { errorResponseStatus, successResponseStatus } from '../utils/response.utils';

const paymentController = {
  async findAll(req: Request, res: Response) {
    try {
      const payments = await PaymentRepository.findAll();
      return successResponseStatus(res, 'Get all payments successfully.', payments);
    } catch (error) {
      return handleError(res, error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { event, amount, paymentType } = req.body;
      const userId = (req as any).user._id;

      const paymentData = {
        user: userId,
        event,
        amount,
        paymentType,
        status: 'pending',
        transactionId: `TRX${Date.now()}` //a simple transaction ID
      };

      const payment = await PaymentRepository.create(paymentData);
      return successResponseStatus(res, 'Create new payment successfully.', payment);
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

      return successResponseStatus(res, 'Payment status updated successfully.', updatedPayment);
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
      return successResponseStatus(res, 'Delete payment successfully.', deletedPayment);
    } catch (error) {
      return handleError(res, error);
    }
  }
};

export default paymentController;