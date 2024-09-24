import { Document } from 'mongoose';
import { EventDocument } from './event';

export interface ProjectDocument extends Document {
  name: string;
  description: string;
  link: string;
  demo: string;
  event: EventDocument;
  createdDate: Date;
  updatedDate: Date;
}
