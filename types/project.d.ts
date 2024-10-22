import { Document } from 'mongoose';
import { EventDocument } from './event';
import { UserDocument } from './user';

export interface ProjectDocument extends Document {
  name: string;
  description: string;
  link: string;
  demo: string;
  event: EventDocument;
  createdBy: UserDocument;
  createdDate: Date;
  updatedDate: Date;
}
