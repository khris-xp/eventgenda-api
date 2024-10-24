import { Request, Response } from 'express';
import { handleError } from '../utils/error.utils';
import { errorResponseStatus, successResponseStatus } from '../utils/response.utils';
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

  getOrganizationByUser: async (request: Request, response: Response) => {
    try {
      // get user ID from request
      const userId = request.params.userId;

      // Fetch user
      const user = await userRepository.findById(userId);
      if (!user) return errorResponseStatus(404, response, 'User not found', null);
      
      // Fetch organizations
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
      const { name, description, profileImage } = request.body as CreateOrgDto;
      
      // validate request fields
      if (!name) return errorResponseStatus(400, response, 'Name is required', null);
      if (!description) return errorResponseStatus(400, response, 'Description is required', null);

      // Fetch user and check permission
      const user = await userRepository.findById(request.user?._id);
      if (!user) return errorResponseStatus(404, response, 'User not found', null);
      if (user.role !== 'organizer') return errorResponseStatus(403, response, 'User is not an organizer', null);

      // Create organization
      if (user.organization) return errorResponseStatus(400, response, 'User already has an organization', null);
      const organization = await organizationRepository.create({ name, description, profileImage });
      if (!organization) return errorResponseStatus(500, response, 'Create organization failed', null);

      // Update user with organization ID and save
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
      // validate request fields
      const { name, description, profileImage } = request.body as CreateOrgDto;

      // Fetch user and check permission
      const userId = request.params.userId;
      const user = await userRepository.findById(userId);
      if (!user) return errorResponseStatus(404, response, 'User not found', null);
      if (user.role !== 'organizer') return errorResponseStatus(403, response, 'User is not an organizer', null);

      const organization = await organizationRepository.update(
        user.organization._id,
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
      // Fetch user and check permission
      const userId = request.params.userId;
      const user = await userRepository.findById(userId);
      if (!user) return errorResponseStatus(404, response, 'User not found', null);
      if (user.role !== 'organizer') return errorResponseStatus(403, response, 'User is not an organizer', null);

      // Delete organization
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
  }
};

export default organizationController;
