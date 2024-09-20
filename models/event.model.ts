import mongoose from 'mongoose';
import { EventType } from '../types/event';
const { Schema } = mongoose;

const eventSchema = new Schema<EventType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    limit: { type: Number, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    eventStartDate: { type: Date, required: true },
    eventEndDate: { type: Date, required: true },
    registrationStartDate: { type: Date, required: true },
    registrationEndDate: { type: Date, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sponsors: [{ type: Schema.Types.ObjectId, ref: 'Sponsor' }],
    rules: [{ type: Schema.Types.ObjectId, ref: 'EventRule' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    prizes: [{ type: Number }],
    thumbnail: { type: String, default: 'https://shorturl.at/nzKic' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    amountRaised: { type: Number, default: 0 },
    amountRequired: { type: Number, required: true },
    status: { 
      type: String, 
      default: 'pending', 
      enum: ['pending', 'open', 'closed'] 
    }
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
