import { Document, Types } from 'mongoose';
import { EventType } from './event';
import { UserType } from './user';

export type SponsorType = {
  _id: mongoose.Schema.Types.ObjectId;
  user: UserType;
  event: EventType;
  amount: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
} & Document;

export type SponsorDocument = SponsorType & Document;
