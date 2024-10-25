import express, { Router } from 'express';
import userController from '../controllers/user.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const userRouter: Router = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/refresh-token', userController.refreshToken);
userRouter.get('/profile', verifyToken, authorizeRoles("user", "organizer", "admin"), userController.getUserProfile);

export default userRouter;
