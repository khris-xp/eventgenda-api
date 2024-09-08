import { Request, Response } from 'express';
import { handleError } from '../utils/error.utils';
import { errorResponseStatus, successResponseStatus } from '../utils/response.utils';
import locationRepository from '../repositories/location.repository';
import {
  CreateLocationDto,
  UpdateLocationDto,
} from '../common/dto/location.dto';

const locationController = {
  getLocations: async (request: Request, response: Response) => {
    try {
      const locations = await locationRepository.getAllLocations();
      return successResponseStatus(
        response,
        'Get all locations successfully.',
        locations
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getLocation: async (request: Request, response: Response) => {
    try {
      const location = await locationRepository.getLocationById(
        request.params.id
      );
      return successResponseStatus(
        response,
        'Get location by id successfully.',
        location
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getLocationByName: async (request: Request, response: Response) => {
    try {
      const location = await locationRepository.getLocationByName(
        request.params.name
      );
      return successResponseStatus(
        response,
        'Get location by name successfully.',
        location
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  createLocation: async (request: Request, response: Response) => {
    try {
      const { name, location, prices, thumbnail } = request.body as CreateLocationDto;
      
      const locationExist = await locationRepository.checkLocationExist(name);
      if (locationExist) {
        return errorResponseStatus(
          400,
          response,
          'Location already exists.',
          null
        );
      }

      if (!name || !location || !prices || !thumbnail) {
        return errorResponseStatus(
          400,
          response,
          'Please fill all the fields.',
          null
        );
      }

      const newLocation = await locationRepository.createLocation({
        name,
        location,
        prices,
        thumbnail,
      });

      return successResponseStatus(
        response,
        'Create location successfully.',
        newLocation
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateLocation: async (request: Request, response: Response) => {
    try {
      const { name, location, prices, thumbnail } = request.body as UpdateLocationDto;
      
      const locationExist = await locationRepository.getLocationById(request.params.id);
      if (!locationExist) {
        return errorResponseStatus(
          400,
          response,
          'Location not found.',
          null
        );
      }
      
      if (!name || !location || !prices || !thumbnail) {
        return errorResponseStatus(
          400,
          response,
          'Please fill all the fields.',
          null
        );
      }

      const updateLocation = await locationRepository.updateLocation(
        request.params.id,
        {
          name,
          location,
          prices,
          thumbnail,
        }
      );

      return successResponseStatus(
        response,
        'Update location successfully.',
        updateLocation
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  deleteLocation: async (request: Request, response: Response) => {
    try {
      await locationRepository.deleteLocation(request.params.id);
      return successResponseStatus(
        response,
        'Delete location successfully.',
        null
      );
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default locationController;
