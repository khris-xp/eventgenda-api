import { Request, Response } from 'express';
import blogRepository from '../repositories/blog.repository';
import { handleError } from '../utils/error.utils';
import {
  errorResponseStatus,
  successResponseStatus,
} from '../utils/response.utils';

const blogController = {
  getBlogs: async (request: Request, response: Response) => {
    try {
      const blogs = await blogRepository.getAllBlogs();
      return successResponseStatus(
        response,
        'Get all blog successfully.',
        blogs
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getBlog: async (request: Request, response: Response) => {
    try {
      const blog = await blogRepository.getBlogById(request.params.id);
      return successResponseStatus(
        response,
        'Get blog by id successfully.',
        blog
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getBlogByUser: async (request: Request, response: Response) => {
    try {
      const blogs = await blogRepository.getBlogByUserId(request.params.id);
      return successResponseStatus(
        response,
        'Get blog by user successfully.',
        blogs
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getBlogByCategory: async (request: Request, response: Response) => {
    try {
      const category = request.params.category;
      const blogs = await blogRepository.getBlogByCategory(category);
      return successResponseStatus(
        response,
        'Get blog by category successfully.',
        blogs
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  createBlog: async (request: Request, response: Response) => {
    try {
      const { title, description, content, image, category, tags } =
        request.body;
      const author = request.user?._id;
      if (!author)
        return errorResponseStatus(400, response, 'User does not exist.', null);

      if (
        title === '' ||
        description === '' ||
        content === '' ||
        image === '' ||
        category === ''
      ) {
        return errorResponseStatus(
          400,
          response,
          'Please fill all the fields.',
          null
        );
      }

      const newBlog = await blogRepository.createBlog({
        title,
        description,
        content,
        image,
        category,
        author,
      });
      return successResponseStatus(
        response,
        'Create blog successfully.',
        newBlog
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateBlog: async (request: Request, response: Response) => {
    try {
      const { title, description, content, image, category } = request.body;
      const author = request.user?._id;
      if (!author)
        return errorResponseStatus(400, response, 'User does not exist.', null);

      if (
        title === '' ||
        description === '' ||
        content === '' ||
        image === '' ||
        category === ''
      ) {
        return errorResponseStatus(
          400,
          response,
          'Please fill all the fields.',
          null
        );
      }
      const blog = await blogRepository.updateBlog(request.params.id, {
        title,
        description,
        content,
        author,
        image,
        category,
      });
      return successResponseStatus(response, 'Update blog successfully', blog);
    } catch (error) {
      handleError(response, error);
    }
  },

  deleteBlog: async (request: Request, response: Response) => {
    try {
      await blogRepository.deleteBlog(request.params.id);
      return successResponseStatus(response, 'Delete blog successfully.', null);
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default blogController;
