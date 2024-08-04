import mongoose from 'mongoose';
import { BlogType } from '../types/blog';
const { Schema } = mongoose;

const blogSchema = new Schema<BlogType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);
