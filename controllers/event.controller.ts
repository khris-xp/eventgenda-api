import { Request, Response } from 'express';
import eventRepository from '../repositories/event.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';

const eventController = {
  getEvents: async (request: Request, response: Response) => {
    try {
      const events = await eventRepository.getAllEvents();
      return successResponseStatus(
        response,
        'Get all events successfully.',
        events
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getEvent: async (request: Request, response: Response) => {
    try {
      const event = await eventRepository.getEventById(request.params.id);
      return successResponseStatus(
        response,
        'Get event by id successfully.',
        event
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getEventByUser: async (request: Request, response: Response) => {
    try {
      const events = await eventRepository.getEventByUserId(request.params.id);
      return successResponseStatus(
        response,
        'Get event by user successfully.',
        events
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getEventByCategory: async (request: Request, response: Response) => {
    try {
      const category = request.params.category;
      const events = await eventRepository.getEventByCategory(category);
      return successResponseStatus(
        response,
        'Get event by category successfully.',
        events
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  createEvent: async (request: Request, response: Response) => {
    try {
      const event = await eventRepository.createEvent(request.body);
      return successResponseStatus(
        response,
        'Create event successfully.',
        event
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateEvent: async (request: Request, response: Response) => {
    try {
      const event = await eventRepository.updateEvent(
        request.params.id,
        request.body
      );
      return successResponseStatus(
        response,
        'Update event successfully.',
        event
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  deleteEvent: async (request: Request, response: Response) => {
    try {
      await eventRepository.deleteEvent(request.params.id);
      return successResponseStatus(
        response,
        'Delete event successfully.',
        null
      );
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default eventController;