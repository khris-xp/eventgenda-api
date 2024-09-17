import { Document, Types } from 'mongoose';

export type SponsorType = {
  _id: mongoose.Schema.Types.ObjectId;
  user: Types.ObjectId;
  event: Types.ObjectId;
  amount: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SponsorDocument = SponsorType & Document;