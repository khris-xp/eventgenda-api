import { Document, Types } from 'mongoose';

export type LocationType = {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  location: string;
  prices: number;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
} & Document;

export type LocationDocument = LocationType & Document;
