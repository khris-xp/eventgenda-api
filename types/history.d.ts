import { Document, Types } from 'mongoose';
import { HistoryDocument } from './history';

export type HistoryType = {
    _id: mongoose.Schema.ObjectId;
    //fix later
    event: string,
    user: string,
    createdAt: Date;
    updatedAt: Date;
} & Document;

export type HistoryDocument = HistoryType & Document;