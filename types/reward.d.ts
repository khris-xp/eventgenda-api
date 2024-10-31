import { Document } from 'mongoose';

export interface RewardType {
  name: string;
  description: string;
  price: number;
  image: string;
  content: string;
  category: string;
  createdDate: Date;
  updatedDate: Date;
}

export type RewardDocument = RewardType & Document;