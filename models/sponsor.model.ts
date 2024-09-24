import mongoose from 'mongoose';
import { SponsorType } from '../types/sponsor.d';
const { Schema } = mongoose;

const sponsorSchema = new Schema<SponsorType>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  amount: { type: Number, required: true , default: 0 },
  type: { 
    type: String, 
    default: 'funding',
    enum: ['funding', 'donation'],
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Sponsor', sponsorSchema);