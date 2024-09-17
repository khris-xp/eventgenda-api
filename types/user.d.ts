import { Document, Types } from 'mongoose';
import { OrganizationType } from './organization';
import { HistoryType } from './history';

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
  history: HistoryType[];
  createdAt: Date;
  updatedAt: Date;
};