import mongoose from 'mongoose';
import { CategoryType } from '../types/category';

const { Schema } = mongoose;

// const locationSchema = new Schema<LocationType>({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   prices: { type: Number, default: 0 },
//   thumbnail: { type: String, default: '' },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Location', locationSchema);

const CategorySchema = new Schema<CategoryType>({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
});
export default mongoose.model('Category', CategorySchema);

