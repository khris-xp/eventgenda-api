// Data Transfer Objects define the structure of data for input (requests) and output (responses)
export type CreateEventRuleDto = {
    name: string;
    description: string;
}

export type UpdateEventRuleDto = CreateEventRuleDto;

export type EventRuleResponseDto = {
    _id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };