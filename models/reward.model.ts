import mongoose, { Schema } from 'mongoose';
import { RewardDocument } from '../types/reward.d';

const rewardSchema = new Schema<RewardDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<RewardDocument>('Reward', rewardSchema);
