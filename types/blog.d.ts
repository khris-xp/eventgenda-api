import { Document } from 'mongoose';
import { UserDocument } from './user';

export type BlogType = {
  title: string;
  description: string;
  content: string;
  author: UserDocument;
  image: string;
  category: string;
} & Document;

export type BlogDocument = BlogType & Document;
