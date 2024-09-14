import { Request, Response } from 'express';
import { handleError } from '../utils/error.utils';
import { errorResponseStatus, successResponseStatus } from '../utils/response.utils';
import organizationRepository from '../repositories/organization.repository';
import { CreateOrgDto, UpdateOrgDto } from '../common/dto/organization.dto';

const organizationController = {
  getOrganizations: async (request: Request, response: Response) => {
    try {
      const organizations = await organizationRepository.getAll();
      return successResponseStatus(
        response,
        'Get all organizations successfully.',
        organizations
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getOrganization: async (request: Request, response: Response) => {
    try {
      const organization = await organizationRepository.getById(request.params.id);
      return successResponseStatus(
        response,
        'Get organization by id successfully.',
        organization
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  // getOrganizationsByUser: async (request: Request, response: Response) => {
  //   try {
  //     const userId = request.user?._id;
  //     const organizations = await organizationRepository.getByUser(userId);
  //     return successResponseStatus(
  //       response,
  //       'Get organizations by user successfully.',
  //       organizations
  //     );
  //   } catch (error) {
  //     handleError(response, error);
  //   }
  // },

  createOrganization: async (request: Request, response: Response) => {
    try {
      const { name, description, profileImage } = request.body as CreateOrgDto;
      if (!name) return errorResponseStatus(400, response, 'Name is required', null);
      if (!description) return errorResponseStatus(400, response, 'Description is required', null);

      const organization = await organizationRepository.create(
        request.params.id,
        { name, description, profileImage }
      );
      return successResponseStatus(
        response,
        'Create organization successfully.',
        organization
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateOrganization: async (request: Request, response: Response) => {
    try {
      const { name, description, profileImage } = request.body as UpdateOrgDto;

      const organization = await organizationRepository.update(
        request.params.id,
        { name, description, profileImage }
      );
      return successResponseStatus(
        response,
        'Update organization successfully.',
        organization
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  deleteOrganization: async (request: Request, response: Response) => {
    try {
      await organizationRepository.delete(request.params.id);
      return successResponseStatus(
        response,
        'Delete organization successfully.',
        null
      );
    } catch (error) {
      handleError(response, error);
    }
  }
};

export default organizationController;
