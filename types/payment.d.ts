import mongoose, { Document } from 'mongoose';

export type PaymentType = {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  total: number;
  status: string;
} & Document;

export type PaymentDocument = PaymentType & Document;
