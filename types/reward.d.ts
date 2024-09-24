import { Document } from 'mongoose';

export type RewardType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdDate: Date;
  updatedDate: Date;
} & Document;

export type RewardDocument = RewardType & Document;