import mongoose from 'mongoose';
import { HistoryType } from '../types/history';

const { Schema } = mongoose;

const HistorySchema = new Schema<HistoryType>({
    event: {type: String, required:true},
    user: {type: String, required:true},
    createdAt: {type:Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

export default mongoose.model('History', HistorySchema);