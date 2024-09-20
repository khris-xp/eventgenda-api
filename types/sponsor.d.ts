import { Document, Types } from 'mongoose';
import { UserType } from './user';
import { EventType } from './event';

export type SponsorType = {
  _id: mongoose.Schema.Types.ObjectId;
  user: UserType;
  event: EventType;
  amount: number;
  type: 'funding' | 'donation';
  createdAt: Date;
  updatedAt: Date;
};

export type SponsorDocument = SponsorType & Document;