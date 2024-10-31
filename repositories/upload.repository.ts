import cloudinaryResult from 'cloudinary';
import fileUpload from 'express-fileupload';
import { removeTmp } from '../utils/removeTemp.utils';
const cloudinary = require('cloudinary').v2;

class UploadRepository {
    async uploadImage(
        file: fileUpload.UploadedFile
      ): Promise<{ public_id: string; url: string }> {
        return new Promise((resolve, reject) => {
          if (!file || Object.keys(file).length === 0) {
            reject(new Error('No file was uploaded.'));
            return;
          }
      
          if (file.size > 1024 * 1024) {
            reject(new Error('Size too large.'));
            return;
          }
      
          if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            reject(new Error('File format is incorrect.'));
            return;
          }
      
          cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'Rug Pull' },
            (
              error: cloudinaryResult.UploadApiErrorResponse | null,
              result: cloudinaryResult.UploadApiResponse | undefined
            ) => {
              removeTmp(file.tempFilePath);
              if (error) {
                reject(error);
              } else {
                resolve({
                  public_id: result?.public_id || '',
                  url: result?.secure_url || '',
                });
              }
            }
          );
        });
      }

      

      
  async deleteImage(public_id: string): Promise<{ msg: string }> {
    return new Promise((resolve, reject) => {
      if (!public_id) reject({ msg: 'No images selected.' });

      cloudinary.uploader.destroy(
        public_id,
        (
          error: cloudinaryResult.UploadApiErrorResponse | null,
          result: cloudinaryResult.UploadApiResponse | undefined
        ) => {
          if (error) {
            reject(error);
          } else {
            resolve({ msg: 'Deleted image' });
          }
        }
      );
    });
  }
}

export default new UploadRepository();