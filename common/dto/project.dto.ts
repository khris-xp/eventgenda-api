export interface CreateProjectDto {
  name: string;
  description: string;
  link: string;
  demo: string;
  event: string;
  createdBy: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  link?: string;
  demo?: string;
  event?: string;
  createdBy: string;
}
