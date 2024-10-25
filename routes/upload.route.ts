import express, { Router } from 'express';
import uploadController from '../controllers/upload.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const uploadRouter: Router = express.Router();

uploadRouter.post('/upload', verifyToken, authorizeRoles("user", "organizer", "admin"), uploadController.uploadImage);
uploadRouter.post('/destroy', verifyToken, authorizeRoles("user", "organizer", "admin"), uploadController.deleteImage);

export default uploadRouter;