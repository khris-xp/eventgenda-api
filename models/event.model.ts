import { Schema, model, Document } from 'mongoose';


export interface EventDocument extends Document {
  _id: string;
}


const eventSchema = new Schema<EventDocument>({
  id: { type: Schema.Types.ObjectId, required: true }
});

const Event = model<EventDocument>('Event', eventSchema);
export default Event;
