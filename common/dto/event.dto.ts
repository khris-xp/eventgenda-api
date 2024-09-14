export type CreateEventDto = {
  title: string;
  description: string;
  limit: number;
  category: string;
  createdBy: string;
  eventStartDate: Date;
  eventEndDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  participants: string[];
  sponsor: string;
  eventRule: string;
  donate: string[];
  projects: any;
  prizes: number[];
  thumbnail: string;
  location: string;
};
