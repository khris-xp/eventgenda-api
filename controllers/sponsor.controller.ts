import { Request, Response } from 'express';
import { default as sponsorRepository } from '../repositories/sponsor.repository';
import { handleError } from '../utils/error.utils';
import { errorResponseStatus, successResponseStatus } from '../utils/response.utils';

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
      const sponsors = await sponsorRepository.getSponsorsByUserId(
        request.params.id
      );
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
      const sponsors = await sponsorRepository.getSponsorsByEventId(
        request.params.id
      );
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
      const sponsor = await sponsorRepository.createSponsor({
        user: userId,
        ...request.body,
      });

      if (!sponsor) {
        return errorResponseStatus(400, response, 'Create sponsor failed.', null);
      }

      return successResponseStatus(
        response,
        'Create sponsor successfully.',
        sponsor
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateSponsor: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      const sponsor = await sponsorRepository.updateSponsor(request.params.id, {
        user: userId,
        ...request.body,
      });
      return successResponseStatus(
        response,
        'Update sponsor successfully.',
        sponsor
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  deleteSponsor: async (request: Request, response: Response) => {
    try {
      await sponsorRepository.deleteSponsor(request.params.id);
      return successResponseStatus(
        response,
        'Delete sponsor successfully.',
        null
      );
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default sponsorController;
