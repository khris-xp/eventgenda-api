import { Request, Response } from 'express';
import { handleError } from '../utils/error.utils';
import { errorResponseStatus, successResponseStatus } from '../utils/response.utils';
import eventRuleRepository from '../repositories/eventRule.repository';
import {CreateEventRuleDto, UpdateEventRuleDto, EventRuleResponseDto} from '../common/dto/eventRule.dto';
import { EventRuleDocument } from '../types/eventRule';

// Helper function to convert EventRuleDocument to EventRuleResponseDto
const convertToDto = (doc: EventRuleDocument): EventRuleResponseDto => ({
    _id: doc._id.toString(), //convert object id to string
    name: doc.name,
    description: doc.description,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
});


// to handle incoming HTTP requests and send responses (traffic director for API requests)
const eventRuleController = {

  getAllEventRules: async (request: Request, response: Response) => {
    try {
      const eventRules = await eventRuleRepository.getAllEventRules();
      const eventRulesDto = eventRules.map(convertToDto)
      return successResponseStatus<EventRuleResponseDto[]>(
        response,
        'Get all event rules successfully.',
        eventRulesDto
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getEventRule: async (request: Request, response: Response) => {
    try {
      const eventRule = await eventRuleRepository.getEventRuleById(request.params.id);
      if (!eventRule) {
        return errorResponseStatus(404, response, 'Event rule not found.', null);
      }
      const eventRuleDto = convertToDto(eventRule)
      return successResponseStatus<EventRuleResponseDto>(
        response,
        'Get event rule by id successfully.',
        eventRuleDto
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  createEventRule: async (request: Request, response: Response) => {
    try {
      const { name, description } = request.body as CreateEventRuleDto;
      
      if (!name || !description) {
        return errorResponseStatus(400, response, 'Please fill all the fields.', null);
      }

      const eventRuleExist = await eventRuleRepository.getEventRuleByName(name);
      if (eventRuleExist) {
        return errorResponseStatus(400, response, 'Event rule already exists.', null);
      }

      const newEventRule = await eventRuleRepository.createEventRule({ name, description });
      const newEventRuleDto = convertToDto(newEventRule)
      return successResponseStatus<EventRuleResponseDto>(
        response,
        'Create event rule successfully.',
        newEventRuleDto
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateEventRule: async (request: Request, response: Response) => {
    try {
      const { name, description } = request.body as UpdateEventRuleDto;
      
      if (!name || !description) {
        return errorResponseStatus(400, response, 'Please fill all the fields.', null);
      }

      const eventRuleExist = await eventRuleRepository.getEventRuleById(request.params.id);
      if (!eventRuleExist) {
        return errorResponseStatus(404, response, 'Event rule not found.', null);
      }

      const updatedEventRule = await eventRuleRepository.updateEventRule(
        request.params.id,
        { name, description }
      );
      const updatedEventRuleDto = convertToDto(updatedEventRule)

      return successResponseStatus<EventRuleResponseDto>(
        response,
        'Update event rule successfully.',
        updatedEventRuleDto
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  deleteEventRule: async (request: Request, response: Response) => {
    try {
      const eventRuleExist = await eventRuleRepository.getEventRuleById(request.params.id);
      if (!eventRuleExist) {
        return errorResponseStatus(404, response, 'Event rule not found.', null);
      }

      await eventRuleRepository.deleteEventRule(request.params.id);
      return successResponseStatus(response, 'Delete event rule successfully.', null);
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default eventRuleController;