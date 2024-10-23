export type CreateSponsorDto = {
    user: string;
    event: string;
    amount: number
    type: string;
  };
  
  export type UpdateSponsorDto = CreateSponsorDto;
