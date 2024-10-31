export interface CreateRewardDto {
    name: string;
    description: string;
    price: number;
    image: string;
  }
  
  export interface UpdateRewardDto {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
  }