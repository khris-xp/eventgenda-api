export type CreateEventDto = {
  title: string;
  description: string;
  limit: number;
  categories: string[];
  createdBy: string;
  eventStartDate: Date;
  eventEndDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  participants: string[];
  sponsors: string[];
  rules: string[];
  projects: any;
  prizes: number[];
  thumbnail: string;
  location: string;
  amountRaised: number;
  amountRequired: number;
  status: string;
};

export type fundingEventDto = {
  amount: number;
};