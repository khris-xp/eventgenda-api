import { Document, Types } from 'mongoose';

export type UserType = {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  fullName: string;
  userName: string;
  age: number;
  coin: number;
  reward: number;
  role: string[];
  profileImage: string;
  history: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};