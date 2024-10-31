import mongoose from 'mongoose';
import { PaymentType } from '../types/payment';
const { Schema } = mongoose;

const paymentSchema = new Schema<PaymentType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model<PaymentType>('Payment', paymentSchema);

export default Payment;
