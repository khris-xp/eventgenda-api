import { Document, Types } from 'mongoose';
import { HistoryType } from './history';
import { OrganizationType } from './organization';
import { RewardType } from './reward';

export type UserType = {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  fullName: string;
  userName: string;
  age: number;
  coin: number;
  reward: number;
  role: string;
  profileImage: string;
  organization: OrganizationType;
  history: HistoryType[];
  createdAt: Date;
  updatedAt: Date;
};

export type UserDocument = UserType & Document;
