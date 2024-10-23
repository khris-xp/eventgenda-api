import { Document } from 'mongoose';

export interface RewardType {
  name: string;
  description: string;
  price: number;
  image: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface RewardDocument extends RewardType, Document {}