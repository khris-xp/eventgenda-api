import { Request, Response } from 'express';
import {
  CreateEventDto,
  FundingEventDto,
  UpdateEventDto,
} from '../common/dto/event.dto';
import eventRepository from '../repositories/event.repository';
import historyRepository from '../repositories/history.repository';
import locationRepository from '../repositories/location.repository';
import organizationRepository from '../repositories/organization.repository';
import sponsorRepository from '../repositories/sponsor.repository';
import userRepository from '../repositories/user.repository';
import { handleError } from '../utils/error.utils';
import {
  errorResponseStatus,
  successResponseStatus,
} from '../utils/response.utils';

const processEventFunding = async (
  request: Request,
  response: Response,
  type: 'funding' | 'donation'
) => {
  try {
    const userId = request.user?._id;
    const { amount } = request.body as FundingEventDto;
    const event = await eventRepository.getEventById(request.params.id);
    const createdBy = event.createdBy as unknown as string;

    if (event.status !== 'funding') {
      return errorResponseStatus(
        400,
        response,
        'This event is not currently open for funding.',
        null
      );
    }

    if (userId === createdBy) {
      return errorResponseStatus(
        400,
        response,
        'You cannot fund your own event.',
        null
      );
    }

    if (event.participants.includes(userId)) {
      return errorResponseStatus(
        400,
        response,
        'You cannot fund an event you are already participating in.',
        null
      );
    }

    if (amount <= 0) {
      return errorResponseStatus(
        400,
        response,
        'Amount must be greater than 0.',
        null
      );
    }

    if (event.amountRaised >= event.amountRequired) {
      return errorResponseStatus(
        400,
        response,
        'This event has reached the required amount.',
        null
      );
    }

    // check user's coin
    const user = await userRepository.findById(userId);
    if (user.coin < amount) {
      return errorResponseStatus(400, response, 'Not enough coin.', null);
    }

    // create sponsor
    let sponsor;
    const sponsorExist = await sponsorRepository.getSponsorByUserAndEvent(
      userId,
      request.params.id
    );
    if (sponsorExist) {
      sponsorExist.amount += amount;
      sponsor = await sponsorExist.save();
    } else {
      sponsor = await sponsorRepository.createSponsor({
        user: userId,
        event: request.params.id,
        amount: amount,
        type: type,
      });

      event.sponsors.push(sponsor);
    }

    // Update the event's raised amount
    const newAmount = event.amountRaised + amount;
    event.amountRaised = newAmount;

    if (newAmount >= event.amountRequired) {
      event.status = 'open';
    }

    await event.save();

    // update organization's coin
    const organizer = await userRepository.findById(createdBy);
    const organization = await organizationRepository.getById(
      organizer.organization as string
    );
    organization.funding += amount;
    await organization.save();

    // update coin and reward to user
    user.coin -= amount;
    const reward = amount * 0.1;
    user.reward += reward;
    await user.save();

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

      // change the event status
      for (const event of events) {
        if (event.eventEndDate < new Date() && event.status === 'open') {
          event.status = 'closed';
          const organizer = await userRepository.findById(
            event.createdBy as unknown as string
          );
          const organization = await organizationRepository.getById(
            organizer.organization as string
          );
          organization.credit +=
            (event.participants.length / event.limit) * 100;
          await organization.save();
          await event.save();
        }

        if (
          event.registrationEndDate < new Date() &&
          event.amountRaised < event.amountRequired
        ) {
          event.status = 'canceled';

          // Map to accumulate refund amounts per user
          const refundMap = new Map();

          for (const sponsor of event.sponsors) {
            const userId = sponsor.user._id;
            const amount = sponsor.amount;

            // Accumulate the refund amount for the user
            if (refundMap.has(userId)) {
              refundMap.set(userId, refundMap.get(userId) + amount);
            } else {
              refundMap.set(userId, amount);
            }
          }

          // Process refunds for each user
          for (const [userId, totalAmount] of refundMap.entries()) {
            const user = await userRepository.findById(userId);
            if (!user) {
              return errorResponseStatus(
                400,
                response,
                'User not found.',
                null
              );
            }

            user.coin += totalAmount;
            event.amountRaised -= totalAmount;
            await user.save();
            console.log(`Refunded ${totalAmount} coins to user ${userId}`);
          }

          await event.save();
        }
      }

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
      const userId = request.user?._id;
      const events = await eventRepository.getEventByUserId(userId);
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
      const userId = request.user?._id;
      const {
        title,
        location,
        eventStartDate,
        eventEndDate,
        registrationStartDate,
        registrationEndDate,
      } = request.body as CreateEventDto;

      // validate date
      if (eventStartDate >= eventEndDate) {
        return errorResponseStatus(
          400,
          response,
          'Event start date must be before event end date.',
          null
        );
      }

      if (registrationStartDate >= registrationEndDate) {
        return errorResponseStatus(
          400,
          response,
          'Registration start date must be before registration end date.',
          null
        );
      }

      if (registrationStartDate >= eventStartDate) {
        return errorResponseStatus(
          400,
          response,
          'Registration start date must be before event start date.',
          null
        );
      }

      if (registrationEndDate >= eventEndDate) {
        return errorResponseStatus(
          400,
          response,
          'Registration end date must be before event end date.',
          null
        );
      }

      // validate title
      const existingEvent = await eventRepository.getEventByTitle(title);
      if (existingEvent.length > 0) {
        return errorResponseStatus(
          400,
          response,
          'Event title already exists.',
          null
        );
      }

      // validate location
      const existingLocation = await locationRepository.getById(location);
      if (!existingLocation) {
        return errorResponseStatus(
          400,
          response,
          'Location is not available.',
          null
        );
      }

      request.body.createdBy = userId;
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
      const userId = request.user?._id;
      const {
        title,
        location,
        eventStartDate,
        eventEndDate,
        registrationStartDate,
        registrationEndDate,
      } = request.body as UpdateEventDto;

      // validate date
      if (eventStartDate >= eventEndDate) {
        return errorResponseStatus(
          400,
          response,
          'Event start date must be before event end date.',
          null
        );
      }

      if (registrationStartDate >= registrationEndDate) {
        return errorResponseStatus(
          400,
          response,
          'Registration start date must be before registration end date.',
          null
        );
      }

      if (registrationStartDate >= eventStartDate) {
        return errorResponseStatus(
          400,
          response,
          'Registration start date must be before event start date.',
          null
        );
      }

      if (registrationEndDate >= eventEndDate) {
        return errorResponseStatus(
          400,
          response,
          'Registration end date must be before event end date.',
          null
        );
      }
      
      // validate location
      const existingLocation = await locationRepository.getById(location);
      if (!existingLocation) {
        return errorResponseStatus(
          400,
          response,
          'Location is not available.',
          null
        );
      }

      request.body.createdBy = userId;
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
      const event = await eventRepository.getEventById(request.params.eventId);

      if (!event)
        return errorResponseStatus(400, response, 'Event not found.', null);

      if (event.status !== 'open') {
        return errorResponseStatus(
          400,
          response,
          'Event is not open for registration.',
          null
        );
      }

      if (event.participants.includes(userId)) {
        return errorResponseStatus(
          400,
          response,
          'User already joined the event.',
          null
        );
      }

      if (event.participants.length >= event.limit) {
        return errorResponseStatus(400, response, 'Event is full.', null);
      }

      const user = await userRepository.findById(userId);
      if (!user)
        return errorResponseStatus(400, response, 'User not found.', null);

      event.participants.push(user);

      if (event.participants.length == event.limit) {
        event.status = 'closed';
      }

      await event.save();

      const history = await historyRepository.createHistory({
        user: userId,
        event: event._id as string,
        action: 'participated',
      });

      if (!history)
        return errorResponseStatus(
          400,
          response,
          'Create history failed.',
          null
        );

      user.history.push(history._id);
      await user.save();

      return successResponseStatus(response, 'Join Event Successfully', event);
    } catch (error) {
      handleError(response, error);
    }
  },

  exitEvent: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      const event = await eventRepository.getEventById(request.params.eventId);

      if (!event)
        return errorResponseStatus(400, response, 'Event not found.', null);

      if (event.status !== 'open') {
        return errorResponseStatus(
          400,
          response,
          'Exiting the event is not allowed at this moment.',
          null
        );
      }

      const isParticipant = event.participants.some((participantId) =>
        participantId._id.equals(userId)
      );

      if (!isParticipant) {
        return errorResponseStatus(
          400,
          response,
          'User is not a participant of this event.',
          null
        );
      }

      event.participants = event.participants.filter(
        (participantId) => !participantId._id.equals(userId)
      );

      await event.save();

      const history = await historyRepository.getHistoryByUserAndEvent(
        userId,
        request.params.eventId
      );
      if (!history)
        return errorResponseStatus(400, response, 'History not found.', null);

      history.action = 'exited';
      await history.save();

      return successResponseStatus(response, 'Exit event Successfully', event);
    } catch (error) {
      handleError(response, error);
    }
  },

  cancelEvent: async (request: Request, response: Response) => {
    try {
      const eventId = request.params.eventId;

      const event = await eventRepository.getEventById(eventId);
      if (!event) {
        return errorResponseStatus(404, response, 'Event not found.', null);
      }

      event.status = 'canceled';

      // Map to accumulate refund amounts per user
      const refundMap = new Map();

      for (const sponsor of event.sponsors) {
        const userId = sponsor.user._id;
        const amount = sponsor.amount;

        // Accumulate the refund amount for the user
        if (refundMap.has(userId)) {
          refundMap.set(userId, refundMap.get(userId) + amount);
        } else {
          refundMap.set(userId, amount);
        }
      }

      // Process refunds for each user
      for (const [userId, totalAmount] of refundMap.entries()) {
        const user = await userRepository.findById(userId);
        if (!user) {
          return errorResponseStatus(400, response, 'User not found.', null);
        }

        user.coin += totalAmount;
        event.amountRaised -= totalAmount;
        await user.save();
        console.log(`Refunded ${totalAmount} coins to user ${userId}`);
      }

      await event.save();

      return successResponseStatus(
        response,
        'Event canceled successfully.',
        event
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  approveEvent: async (request: Request, response: Response) => {
    try {
      const eventId = request.params.eventId;
      const event = await eventRepository.getEventById(eventId);

      if (!event)
        return errorResponseStatus(400, response, 'Event not found.', null);

      const status = event.amountRequired === 0 ? 'open' : 'funding';
      event.status = status;
      await event.save();

      const userId = event.createdBy as unknown as string;
      const user = await userRepository.findById(userId);
      if (!user)
        return errorResponseStatus(400, response, 'User not found.', null);

      const history = await historyRepository.createHistory({
        user: userId,
        event: eventId,
        action: 'created',
      });

      if (!history)
        return errorResponseStatus(
          400,
          response,
          'Create history failed.',
          null
        );

      user.history.push(history._id);
      await user.save();

      return successResponseStatus(response, 'event approved', event.status);
    } catch (error) {
      handleError(response, error);
    }
  },

  rejectEvent: async (request: Request, response: Response) => {
    try {
      const eventId = request.params.eventId;
      const event = await eventRepository.getEventById(eventId);

      if (!event)
        return errorResponseStatus(400, response, 'Event not found.', null);

      event.status = 'rejected';
      await event.save();

      return successResponseStatus(response, 'event rejected', event.status);
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default eventController;
