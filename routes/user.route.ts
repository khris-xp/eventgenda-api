import express, { Router } from 'express';
import userController from '../controllers/user.controller';
import authUser from '../middlewares/auth.middleware';
//import authAdmin from '../middlewares/authAdmin.middleware';
const userRouter: Router = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/refresh-token', userController.refreshToken);
userRouter.get('/profile', authUser, userController.getUserProfile);

export default userRouter;
