export type CreateOrgDto = {
  name: string;
  description: string;
  profileImage: string;
};

export type UpdateOrgDto = {
  name: string;
  description: string;
  profileImage: string;
  funding: number;
  credit: number;
};