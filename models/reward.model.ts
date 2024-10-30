import mongoose, { Schema } from 'mongoose';
import { RewardDocument } from '../types/reward.d';

const rewardSchema = new Schema<RewardDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true, default: 'https://img.freepik.com/premium-psd/circles-medal-award-with-ribbon_1019762-3806.jpg?w=826' },
    content: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<RewardDocument>('Reward', rewardSchema);
