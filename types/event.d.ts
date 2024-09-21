import { Document } from 'mongoose';
import { CategoryType } from './category';
import { EventRuleType } from './eventRule';
import { LocationType } from './location';
import { SponsorType } from './sponsor';
import { UserType } from './user';

export type EventType = {
  title: string;
  description: string;
  limit: number;
  categories: CategoryType[];
  createdBy: UserType;
  eventStartDate: Date;
  eventEndDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  participants: UserType[];
  sponsors: SponsorType[];
  rules: EventRuleType[];
  projects: any[];
  prizes: number[];
  thumbnail: string;
  location: LocationType;
  amountRaised: number;
  amountRequired: number;
  status: 'pending' | 'open' | 'closed' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
} & Document;

export type EventDocument = EventType & Document;
