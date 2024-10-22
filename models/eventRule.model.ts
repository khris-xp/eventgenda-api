import mongoose from 'mongoose';
import { EventRuleType } from '../types/eventRule';
const { Schema } = mongoose;

const eventRuleSchema = new Schema<EventRuleType>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<EventRuleType>('EventRule', eventRuleSchema);
