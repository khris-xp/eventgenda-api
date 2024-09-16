import mongoose, { Document, Types } from 'mongoose';
import { EventType } from './event';

export type OrganizationType = {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  profileImage: string;
  funding: number;
  coin: number;
  credit: number;
  createdEvents: EventType[];
  createdAt: Date;
  updatedAt: Date;
};

export type OrganizationDocument = OrganizationType & Document;