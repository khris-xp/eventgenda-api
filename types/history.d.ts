import { Document, Types } from 'mongoose';
import { EventType } from './event';
import { HistoryDocument } from './history';
import { UserType } from './user';

export type HistoryType = {
  _id: mongoose.Schema.ObjectId;
  event: EventType;
  user: UserType;
  action: string
  createdAt: Date;
  updatedAt: Date;
} & Document;

export type HistoryDocument = HistoryType & Document;
