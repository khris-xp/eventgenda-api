import mongoose from 'mongoose';
import { HistoryType } from '../types/history';

const { Schema } = mongoose;

const HistorySchema = new Schema<HistoryType>(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('History', HistorySchema);
