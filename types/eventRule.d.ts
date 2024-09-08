// defines structure of event rule data

import { Document, Types } from 'mongoose';

export type EventRuleType = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EventRuleDocument = EventRuleType & Document;