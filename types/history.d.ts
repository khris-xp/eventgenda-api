import { Document, Types } from 'mongoose';
import { EventDocument } from './event';
import { HistoryDocument } from './history';
import { UserDocument } from './user';

export type HistoryType = {
  _id: mongoose.Schema.ObjectId;
  event: EventDocument;
  user: UserDocument;
  createdAt: Date;
  updatedAt: Date;
} & Document;

export type HistoryDocument = HistoryType & Document;
