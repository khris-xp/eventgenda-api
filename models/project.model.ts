import { Schema, model } from 'mongoose';
import { ProjectDocument } from '../types/project';
const projectSchema = new Schema<ProjectDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    demo: { type: String, required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export default model<ProjectDocument>('Project', projectSchema);
