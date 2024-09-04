export type CreateLocationDto = {
  name: string;
  location: string;
  prices: number;
  thumbnail: string;
};

export type UpdateLocationDto = CreateLocationDto;
