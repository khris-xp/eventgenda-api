import mongoose from 'mongoose';
import { UserType } from '../types/user';

const { Schema } = mongoose;

const userSchema = new Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  age: { type: Number, required: true },
  coin: { type: Number, default: 0 },
  reward: { type: Number, default: 0 },
  role: {
    type: [String],
    default: ['User'],
    enum: ['User', 'Admin'],
  },
  profileImage: { type: String, default: '' },
  history: [{ type: Schema.Types.ObjectId, ref: 'History' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
