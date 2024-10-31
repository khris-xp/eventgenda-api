import { Request, Response } from 'express';
import { handleError } from '../utils/error.utils';
import { successResponseStatus, errorResponseStatus } from '../utils/response.utils';
import organizationRepository from '../repositories/organization.repository';
import { CreateOrgDto, UpdateOrgDto } from '../common/dto/organization.dto';
import userRepository from '../repositories/user.repository';

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
      const organization = await organizationRepository.getById(
        request.params.id
      );
      if (!organization) return errorResponseStatus(404, response, 'Organization not found', null);
      return successResponseStatus(
        response,
        'Get organization by id successfully.',
        organization
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getOrganizationByUser: async (request: Request, response: Response) => {
    try {
      const userId = request.params.userId;
      const user = await userRepository.findById(userId);
      if (!user) return errorResponseStatus(404, response, 'User not found', null);

      const organization = await organizationRepository.getById(user.organization._id);
      if (!organization) return errorResponseStatus(404, response, 'Organization not found', null);

      return successResponseStatus(
        response,
        'Get organizations by user successfully.',
        organization
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  createOrganization: async (request: Request, response: Response) => {
    try {
      const user = await userRepository.findById(request.user?._id);
      if (!user) return errorResponseStatus(404, response, 'User not found', null);
      if (user.organization) return errorResponseStatus(400, response, 'User already has an organization', null);

      const organization = await organizationRepository.create(request.body as CreateOrgDto);
      if (!organization) return errorResponseStatus(400, response, 'Create organization failed', null);

      user.organization = organization._id;
      await user.save();

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
      const userId = request.params.userId;
      const user = await userRepository.findById(userId);
      if (!user) return errorResponseStatus(404, response, 'User not found', null);

      const organization = await organizationRepository.update(
        user.organization._id,
        request.body as UpdateOrgDto
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
      const userId = request.params.userId;
      const user = await userRepository.findById(userId);
      if (!user) return errorResponseStatus(404, response, 'User not found', null);
      if (!user.organization) return errorResponseStatus(404, response, 'User does not have an organization', null);

      await organizationRepository.delete(user.organization._id);

      // Update user with organization ID and save
      user.organization = null;
      await user.save();

      return successResponseStatus(
        response,
        'Delete organization successfully.',
        null
      );
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default organizationController;
