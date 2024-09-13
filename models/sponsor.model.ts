import mongoose from 'mongoose';
import { SponsorType } from '../types/sponsor';
const { Schema } = mongoose;

const sponsorSchema = new Schema<SponsorType>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  funding: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Sponsor', sponsorSchema);
