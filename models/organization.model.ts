import mongoose from 'mongoose';
import { OrganizationType } from '../types/organization';

const { Schema } = mongoose;

const organizationSchema = new Schema<OrganizationType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    profileImage: { type: String, default: 'https://shorturl.at/CQtT2' },
    funding: { type: Number, default: 0 },
    coin: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    createdEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Organization', organizationSchema);
