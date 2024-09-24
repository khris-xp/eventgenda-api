import express, { Router } from 'express';
import uploadController from '../controllers/upload.controller';
import authUser from '../middlewares/auth.middleware';

const uploadRouter: Router = express.Router();

uploadRouter.post('/upload', authUser, uploadController.uploadImage);
uploadRouter.post('/destroy', authUser, uploadController.deleteImage);

export default uploadRouter;