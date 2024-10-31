import mongoose from 'mongoose';
import { CategoryType } from '../types/category';

const { Schema } = mongoose;

const CategorySchema = new Schema<CategoryType>(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Category', CategorySchema);
