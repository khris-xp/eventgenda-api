import mongoose, { Schema } from 'mongoose';
import { RewardDocument } from '../types/reward.d';

const rewardSchema = new Schema<RewardDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
  }
);

rewardSchema.pre('save', function(next) {
  this.updatedDate = new Date();
  next();
});

const RewardModel = mongoose.model<RewardDocument>('Reward', rewardSchema);

export default RewardModel;