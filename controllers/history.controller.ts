import { Request, Response } from 'express';
import { CreateHistoryDto, UpdateHistoryDto } from '../common/dto/history.dto';
import historyRepository from '../repositories/history.repository';
import { handleError } from '../utils/error.utils';
import {
  errorResponseStatus,
  successResponseStatus,
} from '../utils/response.utils';

const historyController = {
  getHistories: async (request: Request, response: Response) => {
    try {
      const histories = await historyRepository.getAllHistories();
      return successResponseStatus(
        response,
        'Get all History successfully.',
        histories
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getHistory: async (request: Request, response: Response) => {
    try {
      const history = await historyRepository.getHistoryById(request.params.id);

      return successResponseStatus(
        response,
        'Get history by id successfully',
        history
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getHistoryByUser: async (request: Request, response: Response) => {
    try {
      const history = await historyRepository.getHistoryByUser(
        request.params.user
      );
      return successResponseStatus(
        response,
        'Get history by user successfully',
        history
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  createHistory: async (request: Request, response: Response) => {
    try {
      const { event, user, action } = request.body as CreateHistoryDto;

      if (!event || !user) {
        return errorResponseStatus(
          400,
          response,
          'Please fill all field',
          null
        );
      }

      const newHistory = await historyRepository.createHistory({
        event,
        user,
        action,
      });

      return successResponseStatus(
        response,
        'Create history successfully',
        newHistory
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateHistory: async (request: Request, response: Response) => {
    try {
      const { event, user, action } = request.body as UpdateHistoryDto;

      const historyExist = await historyRepository.getHistoryById(
        request.params.id
      );

      if (!historyExist) {
        return errorResponseStatus(400, response, 'History not found.', null);
      }

      if (!event || !user) {
        return errorResponseStatus(
          400,
          response,
          'Please fill all field.',
          null
        );
      }

      const updateHistory = await historyRepository.updateHistory(
        request.params.id,
        {
          event,
          user,
          action,
        }
      );

      return successResponseStatus(
        response,
        'Update history successfully.',
        updateHistory
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  deleteHistory: async (request: Request, response: Response) => {
    try {
      await historyRepository.deleteHistory(request.params.id);
      return successResponseStatus(
        response,
        'Delete history successfully',
        null
      );
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default historyController;
