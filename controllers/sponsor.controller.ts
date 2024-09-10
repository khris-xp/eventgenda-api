import { Request, Response } from 'express';
import { handleError } from '../utils/error.utils';
import { errorResponseStatus, successResponseStatus } from '../utils/response.utils';
import sponsorRepository from '../repositories/sponsor.repository';
import { CreateSponsorDto, AddFundingDto } from '../common/dto/sponsor.dto';
import userRepository from '../repositories/user.repository';

const sponsorController = {
  getSponsors: async (request: Request, response: Response) => {
    try {
      const sponsors = await sponsorRepository.getAllSponsors();
      return successResponseStatus(
        response,
        'Get all sponsors successfully.',
        sponsors
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getSponsor: async (request: Request, response: Response) => {
    try {
      const sponsor = await sponsorRepository.getSponsorById(request.params.id);
      return successResponseStatus(
        response,
        'Get sponsor by id successfully.',
        sponsor
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getSponsorByUser: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      const sponsors = await sponsorRepository.getSponsorByUser(request.params.id);
      return successResponseStatus(
        response,
        'Get sponsor by user successfully.',
        sponsors
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getSponsorByEvent: async (request: Request, response: Response) => {
    try {
      const eventId = request.params.id;
      const sponsors = await sponsorRepository.getSponsorByEvent(eventId);
      return successResponseStatus(
        response,
        'Get sponsor by event successfully.',
        sponsors
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  createSponsor: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      const user = await userRepository.findById(userId);
      if (!user) {
        return errorResponseStatus(400, response, 'User does not exist.', null);
      }

      const { eventId, funding } = request.body as CreateSponsorDto;
      if (!eventId || !funding) {
        return errorResponseStatus(400, response, 'Please fill all the fields.', null);
      }

      // ------------- awaiting for the event repository -------------
      // const event = await eventRepository.getEventById(eventId);
      // if (!event) {
      //   return errorResponseStatus(400, response, 'Event does not exist.', null);
      // }
      // -------------------------------------------------------------

      const newSponsor = await sponsorRepository.createSponsor({
        userId,
        eventId,
        funding,
      })

      return successResponseStatus(
        response,
        'Create sponsor successfully.',
        newSponsor
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  addSponsorFunding: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      const user = await userRepository.findById(userId);
      if (!user) {
        return errorResponseStatus(400, response, 'User does not exist.', null);
      }

      const { eventId, funding } = request.body as AddFundingDto;
      if (!eventId || !funding) {
        return errorResponseStatus(400, response, 'Please fill all the fields.', null);
      }

      // ------------- awaiting for the event repository -------------
      // const event = await eventRepository.getEventById(eventId);
      // if (!event) {
      //   return errorResponseStatus(400, response, 'Event does not exist.', null);
      // }
      // -------------------------------------------------------------

      const sponsor = await sponsorRepository.getSponsorByEventAndUser( userId, eventId );
      if (!sponsor) {
        return errorResponseStatus(400, response, 'Sponsor does not exist.', null);
      }

      const updatedSponsor = await sponsorRepository.addFunding(
        sponsor._id,
        {
          userId,
          eventId,
          funding,
        }
      );

      return successResponseStatus(
        response,
        'Add sponsor funding successfully.',
        updatedSponsor
      );
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default sponsorController;