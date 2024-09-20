import dotenv from 'dotenv';
import { Request, Response } from 'express';
import uploadRepository from '../repositories/upload.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';
import fileUpload from 'express-fileupload';  
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
          //console.log('Request files:', request.files);
          //console.log('Request body:', request.body);
      
          if (!request.files || Object.keys(request.files).length === 0) {
            console.log('No files detected in request');
            return response.status(400).json({ msg: 'No files were uploaded.' });
          }
      
          // Check if 'image' exists in request.files
          if (!request.files.image) {
            console.log('No image field in request.files');
            return response.status(400).json({ msg: 'No image in the request.' });
          }
      
          const file = request.files.image as fileUpload.UploadedFile;
        //   console.log('File details:', {
        //     name: file.name,
        //     size: file.size,
        //     mimetype: file.mimetype,
        //     tempFilePath: file.tempFilePath
        //   });
      
          // Now pass this file to uploadRepository
          const result = await uploadRepository.uploadImage(file);
          return successResponseStatus(
            response,
            'Upload image successfully.',
            result
          );
        } catch (error) {
          console.error('Error in uploadImage:', error);
          handleError(response, error);
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
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default uploadController;