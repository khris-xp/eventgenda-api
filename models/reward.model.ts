import mongoose from 'mongoose';
import { RewardType } from '../types/reward';
const { Schema } = mongoose;

const rewardSchema = new Schema<RewardType>(
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

export default mongoose.model<RewardType>('Reward', rewardSchema);