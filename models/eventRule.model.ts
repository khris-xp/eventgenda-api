// Create Mongoose schema and model based on the structure in dto

import mongoose from 'mongoose';
import { EventRuleType } from '../types/eventRule';
const { Schema } = mongoose;

const eventRuleSchema = new Schema<EventRuleType>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field on save
eventRuleSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<EventRuleType>('EventRule', eventRuleSchema);