import { Request, Response } from 'express';
import { handleError } from '../utils/error.utils';
import { errorResponseStatus, successResponseStatus } from '../utils/response.utils';
import sponsorRepository from '../repositories/sponsor.repository';
import { CreateSponsorDto } from '../common/dto/sponsor.dto';

const sponsorController = {
  getSponsors: async (request: Request, response: Response) => {
    try {
      const sponsors = await sponsorRepository.getAll();
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
      const sponsor = await sponsorRepository.getById(request.params.id);
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
      // const userId = request.user?._id;
      const sponsors = await sponsorRepository.getByUser(request.params.id);
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
      const sponsors = await sponsorRepository.getByEvent(request.params.id);
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
      if (!userId) return errorResponseStatus(400, response, 'User does not exist.', null);

      const { eventId, funding } = request.body as CreateSponsorDto;
      if (!eventId || !funding) return errorResponseStatus(400, response, 'Please fill all the fields.', null);

      const newSponsor = await sponsorRepository.create(userId, { eventId, funding });
      return successResponseStatus(
        response,
        'Create sponsor successfully.',
        newSponsor
      );
    } catch (error) {
      handleError(response, error);
    }
  }
};

export default sponsorController;
