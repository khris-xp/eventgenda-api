import { Request, Response } from 'express';
import { fundingEventDto } from '../common/dto/event.dto';
import eventRepository from '../repositories/event.repository';
import sponsorRepository from '../repositories/sponsor.repository';
import userRepository from '../repositories/user.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';
import historyRepository from '../repositories/history.repository';
import organizationRepository from '../repositories/organization.repository';

const processEventFunding = async (
  request: Request,
  response: Response,
  type: 'funding' | 'donation'
) => {
  try {
    const userId = request.user?._id;
    const { amount } = request.body as fundingEventDto;
    const event = await eventRepository.getEventById(request.params.id);

    if (event.status !== 'funding') {
      throw new Error('The event is not currently in the funding phase.');
    }
    
    if (amount < 0) {
      throw new Error('Amount must be greater than 0');
    }

    if (event.amountRaised >= event.amountRequired) {
      throw new Error('Event has reached the required amount');
    }

    // check user's coin
    const user = await userRepository.findById(userId);
    if (user.coin < amount) {
      throw new Error('User does not have enough coin to fund this event');
    }

    // Create a new sponsor
    const sponsor = await sponsorRepository.createSponsor({
      user: userId,
      event: request.params.id,
      amount: amount,
      type: type,
    });

    if (!sponsor) {
      throw new Error('Failed to create sponsor');
    }

    // update user's coin
    const newCoin = user.coin - amount;
    await userRepository.updateOne(userId, { coin: newCoin });

    // Update the event's raised amount
    const newAmount = event.amountRaised + amount;
    await eventRepository.updateEventOne(request.params.id, {
      amountRaised: newAmount,
    });
    
    // update organization's coin
    const organizer = await userRepository.findById(event.createdBy as unknown as string);
    const organization = await organizationRepository.getById(organizer.organization as unknown as string);
    const newFunding = organization.funding + amount;
    await organizationRepository.updateOne(organization._id as unknown as string, { funding: newFunding });

    // Update the event status if the required amount is reached
    if (newAmount >= event.amountRequired) {
      await eventRepository.updateEventOne(request.params.id, {
        status: 'open',
      });
    }

    return successResponseStatus(
      response,
      `${type === 'funding' ? 'Funding' : 'Donate'} event successfully.`,
      sponsor
    );
  } catch (error) {
    handleError(response, error);
  }
};

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
      const createdBy = request.user?._id;
      request.body.createdBy = createdBy;
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

  fundingEvent: async (request: Request, response: Response) => {
    processEventFunding(request, response, 'funding');
  },

  donateEvent: async (request: Request, response: Response) => {
    processEventFunding(request, response, 'donation');
  },

  joinEvent: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      // console.log(userId);
      const event = await eventRepository.getEventById(request.params.eventId);

      if (event.status == null) {
        throw new Error('This event is not existed');
      } else if (event.status !== 'open') {
        throw new Error('Event is not open for registration');
      }

      if (event.participants.includes(userId)) {
        throw new Error('User already joined the Event.');
      }

      if (event.participants.length >= event.limit) {
        throw new Error('Event is full');
      }

      event.participants.push(userId);

      if (event.participants.length == event.limit) {
        event.status = 'closed';
      }

      await event.save();

      const userHistory = await historyRepository.createHistory({
        user: userId,
        event: request.params.eventId,
        action: 'participated',
      });

      if (!userHistory) {
        throw new Error('Failed to create history');
      }

      return successResponseStatus(response, 'Join Event Successfully', event);
    } catch (error) {
      handleError(response, error);
    }
  },

  exitEvent: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      const event = await eventRepository.getEventById(request.params.eventId);

      if (!event) {
        throw new Error('Event not found');
      }

      const isParticipant = event.participants.some((participantId) =>
        participantId._id.equals(userId)
      );

      if (!isParticipant) {
        throw new Error('User is not a participant of the Event');
      }

      event.participants = event.participants.filter(
        (participantId) => !participantId._id.equals(userId)
      );

      await event.save();

      const userHistory = await historyRepository.getHistoryByUserAndEvent(userId, request.params.eventId);
      if (!userHistory) {
        throw new Error('Failed to get history');
      }

      await historyRepository.updateHistoryOne(userHistory._id, { action: 'exited' });

      return successResponseStatus(
        response,
        'Successfully exited event',
        event
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  approveEvent: async (request: Request, response: Response) => {
    try {
      const eventId = request.params.eventId;
      const eventExist = await eventRepository.getEventById(eventId);

      if (!eventExist) {
        throw new Error('Event not found');
      }

      const status = eventExist.amountRequired === 0 ? 'open' : 'funding';
      const event = await eventRepository.updateEventOne(eventId, {
        status: status,
      });

      const userHistory = await historyRepository.createHistory({
        user: (eventExist.createdBy as unknown as string),
        event: eventId,
        action: 'created',
      })

      if (!userHistory) {
        throw new Error('Failed to create history');
      }
      
      return successResponseStatus(response, 'event approved', event);
    } catch (error) {
      handleError(response, error);
    }
  },

  rejectEvent: async (request: Request, response: Response) => {
    try {
      const eventId = request.params.eventId;
      const eventExist = await eventRepository.getEventById(eventId);
      
      if (!eventExist) {
        throw new Error('Event not found');
      }
      
      const event = await eventRepository.updateEventOne(eventId, {
        status: 'rejected',
      });

      const userHistory = await historyRepository.createHistory({
        user: (eventExist.createdBy as unknown as string),
        event: eventId,
        action: 'cancelled',
      })

      if (!userHistory) {
        throw new Error('Failed to create history');
      }

      return successResponseStatus(response, 'event rejected', event);
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default eventController;
