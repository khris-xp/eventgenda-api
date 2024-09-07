import {Document} from 'mongoose';

export type CategoryType = {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
} & Document;

export type CategoryDocument = CategoryType & Document;