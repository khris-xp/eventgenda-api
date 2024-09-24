import mongoose from 'mongoose';

export type PaymentType = {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  amount: number;
  paymentType: string;
  status: string;
  transactionId: string;
};