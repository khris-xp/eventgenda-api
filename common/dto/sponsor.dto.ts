export type CreateSponsorDto = {
  userId: string;
  eventId: string;
  funding: number;
};

export type AddFundingDto = CreateSponsorDto;