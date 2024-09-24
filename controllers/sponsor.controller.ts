import { Request, Response } from 'express';
import { handleError } from '../utils/error.utils';
import {
  errorResponseStatus,
  successResponseStatus,
} from '../utils/response.utils';
import sponsorRepository from '../repositories/sponsor.repository';
import { CreateSponsorDto, UpdateSponsorDto } from '../common/dto/sponsor.dto';

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
      const sponsors = await sponsorRepository.getByUserId(request.params.id);
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
      const sponsors = await sponsorRepository.getByEventId(request.params.id);
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
      const sponsor = await sponsorRepository.create({
        user: userId,
        ...request.body,
      } as CreateSponsorDto);

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
      const sponsor = await sponsorRepository.update(request.params.id, {
        user: userId,
        ...request.body,
      } as UpdateSponsorDto);
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
      await sponsorRepository.delete(request.params.id);
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