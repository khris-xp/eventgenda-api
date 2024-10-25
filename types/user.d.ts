import { Document, Types } from 'mongoose';
import { HistoryType } from './history';
import { OrganizationType } from './organization';

export type UserType = {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  fullName: string;
  userName: string;
  age: number;
  coin: number;
  reward: number;
  role: 'user' | 'admin' | 'organizer';
  profileImage: string;
  organization: OrganizationType;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDocument = UserType & Document;
