import dotenv from 'dotenv';
import { Request, Response } from 'express';
import uploadRepository from '../repositories/upload.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';
const cloudinary = require('cloudinary').v2;

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadController = {
  uploadImage: async (request: Request, response: Response) => {
    try {
      if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).json({ msg: 'No files were uploaded.' });
      }
      const file = Array.isArray(request.files.file)
        ? request.files.file[0]
        : request.files.file;
      const result = await uploadRepository.uploadImage(file);
      return successResponseStatus(
        response,
        'Upload image successfully.',
        result
      );
    } catch (err) {
      handleError(response, err);
    }
  },

  deleteImage: async (request: Request, response: Response) => {
    try {
      const { public_id } = request.body;
      const result = await uploadRepository.deleteImage(public_id);
      return successResponseStatus(
        response,
        'Delete image successfully.',
        null
      );
    } catch (err) {
      handleError(response, err);
    }
  },
  uploadVideo: async (request: Request, response: Response) => {
    try {
      if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).json({ msg: 'No files were uploaded.' });
      }
      const file = Array.isArray(request.files.file)
        ? request.files.file[0]
        : request.files.file;
      const result = await uploadRepository.uploadVideo(file);
      return successResponseStatus(
        response,
        'Upload video successfully.',
        result
      );
    } catch (err) {
      handleError(response, err);
    }
  },
};

export default uploadController;
