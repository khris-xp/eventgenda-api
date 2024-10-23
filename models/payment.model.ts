import mongoose, { Schema, Document } from 'mongoose';
import { PaymentType } from '../types/payment.d';

interface IPaymentDocument extends Omit<PaymentType, '_id'>, Document {}

const paymentSchema = new Schema<IPaymentDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Payment = mongoose.model<IPaymentDocument>('Payment', paymentSchema);

export default Payment;