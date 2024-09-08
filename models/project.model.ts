import { Schema, model, Document } from 'mongoose';
import { ProjectDocument } from '../types/project';
//import { Event } from './event.model';

const projectSchema = new Schema<ProjectDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  demo: { type: String, required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
}, {
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }  
});

const Project = model<ProjectDocument>('Project', projectSchema);
export default Project;
