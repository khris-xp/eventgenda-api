import { Request, Response } from 'express';
import { CreateCategoryDto } from '../common/dto/category.dto';
import CategoryRepository from '../repositories/category.repository';
import { handleError } from '../utils/error.utils';

import {
  errorResponseStatus,
  successResponseStatus,
} from '../utils/response.utils';

const CategoryController = {
  getCategories: async (request: Request, response: Response) => {
    try {
      const categories = await CategoryRepository.getAllCategories();
      return successResponseStatus(
        response,
        'Get all category successfully.',
        categories
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getCategory: async (request: Request, response: Response) => {
    try {
      const category = await CategoryRepository.getCategoryById(
        request.params.id
      );
      return successResponseStatus(
        response,
        'Get category by id successfully.',
        category
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getCategoryByName: async (request: Request, response: Response) => {
    try {
      const category = await CategoryRepository.getCategoryByName(
        request.params.name
      );
      return successResponseStatus(
        response,
        'Get category by name successfully',
        category
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  createCategory: async (request: Request, response: Response) => {
    try {
      const { name, description } = request.body as CreateCategoryDto;
      const categoryIsExist = await CategoryRepository.getCategoryByName(name);

      if (categoryIsExist) {
        return errorResponseStatus(
          400,
          response,
          'category is already exist',
          null
        );
      }
      if (!name || !description) {
        return errorResponseStatus(
          400,
          response,
          'Please fill all field',
          null
        );
      }

      const NewCategory = await CategoryRepository.createCategory({
        name,
        description,
      });

      return successResponseStatus(
        response,
        'create location successfully',
        NewCategory
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateCategory: async (request: Request, response: Response) => {
    try {
      const { name, description } = request.body as CreateCategoryDto;
      const categoryIsExist = await CategoryRepository.getCategoryById(
        request.params.id
      );
      console.log(categoryIsExist);
      if (!categoryIsExist) {
        return errorResponseStatus(404, response, 'Category not exist', null);
      }

      if (!name || !description) {
        return errorResponseStatus(
          400,
          response,
          'Please fill all the field',
          null
        );
      }

      const updateCategory = await CategoryRepository.updateCategory(
        request.params.id,
        {
          name,
          description,
        }
      );

      return successResponseStatus(
        response,
        'updateCategory successfully',
        updateCategory
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  deleteCategory: async (request: Request, response: Response) => {
    try {
      const categoryIsExist = await CategoryRepository.getCategoryById(
        request.params.id
      );

      if (!categoryIsExist) {
        return errorResponseStatus(
          404, // HTTP status code for "Not Found"
          response,
          'Category does not exist',
          null
        );
      }
      await CategoryRepository.deleteCategory(request.params.id);
      return successResponseStatus(
        response,
        'Delete category successfully',
        null
      );
    } catch (error) {
      // Handle any errors that may occur during the process
      handleError(response, error);
    }
  },
};

export default CategoryController;
