import cloudinaryResult from 'cloudinary';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import { removeTmp } from '../utils/removeTemp.utils';
const cloudinary = require('cloudinary').v2;

class UploadRepository {
  async uploadImage(
    file: fileUpload.UploadedFile
  ): Promise<{ public_id: string; url: string }> {
    return new Promise((resolve, reject) => {
      if (
        !file ||
        (Array.isArray(file)
          ? file.length === 0
          : Object.keys(file).length === 0)
      ) {
        removeTmp(file.tempFilePath);
        reject({ msg: 'No files were uploaded.' });
      }

      if (file.size > 1024 * 1024) {
        removeTmp(file.tempFilePath);
        reject({ msg: 'Size too large.' });
      }

      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        removeTmp(file.tempFilePath);
        reject({ msg: 'File format is incorrect.' });
      }

      cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Careervio' },
        (
          err: cloudinaryResult.UploadApiErrorResponse | null,
          result: cloudinaryResult.UploadApiResponse | undefined
        ) => {
          if (err) {
            removeTmp(file.tempFilePath);
            reject(err);
          } else {
            removeTmp(file.tempFilePath);
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
          err: cloudinaryResult.UploadApiErrorResponse | null,
          result: cloudinaryResult.UploadApiResponse | undefined
        ) => {
          if (err) {
            reject(err);
          } else {
            resolve({ msg: 'Deleted image' });
          }
        }
      );
    });
  }

  async uploadVideo(file: any): Promise<{ public_id: string; url: string }> {
    return new Promise((resolve, reject) => {
      if (
        !file ||
        (Array.isArray(file)
          ? file.length === 0
          : Object.keys(file).length === 0)
      ) {
        removeTmp(file.tempFilePath);
        reject({ msg: 'No files were uploaded.' });
      }

      if (file.size > 1024 * 1024 * 1024) {
        removeTmp(file.tempFilePath);
        reject({ msg: 'Size too large.' });
      }

      if (
        file.mimetype !== 'video/mp4' &&
        file.mimetype !== 'video/mkv' &&
        file.mimetype !== 'video/avi'
      ) {
        removeTmp(file.tempFilePath);
        reject({ msg: 'File format is incorrect.' });
      }

      cloudinary.uploader.upload(
        file.tempFilePath,
        { resource_type: 'video', folder: 'Careervio' },
        (
          err: cloudinaryResult.UploadApiErrorResponse | null,
          result: cloudinaryResult.UploadApiResponse | undefined
        ) => {
          if (err) {
            removeTmp(file.tempFilePath);
            reject(err);
          } else {
            removeTmp(file.tempFilePath);
            resolve({
              public_id: result?.public_id || '',
              url: result?.secure_url || '',
            });
          }
        }
      );
    });
  }
}

export default new UploadRepository();
