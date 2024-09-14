import mongoose from 'mongoose';
import { EventType } from '../types/event';
const { Schema } = mongoose;

const eventSchema = new Schema<EventType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    limit: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    eventStartDate: { type: Date, required: true },
    eventEndDate: { type: Date, required: true },
    registrationStartDate: { type: Date, required: true },
    registrationEndDate: { type: Date, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sponsor: { type: Schema.Types.ObjectId, ref: 'Sponsor' },
    eventRule: { type: Schema.Types.ObjectId, ref: 'EventRule' },
    donate: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    prizes: [{ type: Number }],
    thumbnail: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
