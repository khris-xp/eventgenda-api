// Methods for interacting with database

import { default as EventRule } from '../models/eventRule.model';
import { EventRuleDocument } from '../types/eventRule';
import { CreateEventRuleDto, UpdateEventRuleDto } from '../common/dto/eventRule.dto';

class EventRuleRepository {
  async getAllEventRules(): Promise<EventRuleDocument[]> {
    return await EventRule.find().exec();
  }

  async getEventRuleById(id: string): Promise<EventRuleDocument> {
    const result = await EventRule.findById(id).exec();
    if (result === null) {
      throw new Error('Event rule not found');
    }
    return result;
  }

  async getEventRuleByName(name: string): Promise<EventRuleDocument | null> {
    return await EventRule.findOne({ name: name }).exec();
  }

  async createEventRule(create: CreateEventRuleDto): Promise<EventRuleDocument> {
    const newEventRule = new EventRule(create);
    return await newEventRule.save();
  }

  async updateEventRule(id: string, updates: UpdateEventRuleDto): Promise<EventRuleDocument> {
    const eventRule = await EventRule.findByIdAndUpdate(id, updates, { new: true }).exec();
    if (eventRule === null) {
      throw new Error('Update event rule failed');
    }
    return eventRule;
  }

  async deleteEventRule(id: string): Promise<void> {
    const result = await EventRule.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new Error('Delete event rule failed');
    }
  }
}

export default new EventRuleRepository();