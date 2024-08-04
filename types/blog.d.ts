import { Document } from 'mongoose';

export type BlogType = {
  title: string;
  description: string;
  content: string;
  author: string;
  image: string;
  category: string;
} & Document;

export type BlogDocument = BlogType & Document;
