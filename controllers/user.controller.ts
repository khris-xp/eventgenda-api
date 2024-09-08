import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginUserDto, RegisterUserDto } from '../common/dto/auth.dto';
import { default as User } from '../models/user.model';
import userRepository from '../repositories/user.repository';
import { UserType } from '../types/user';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';
import { generateTokens, setRefreshTokenCookie } from '../utils/token.utils';

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

const authController = {
  register: async (request: Request, response: Response) => {
    try {
      const { fullName, userName, email, password, age } =
        request.body as RegisterUserDto;

        const user = await User.findOne({ email });

      if (user) {
        return response.status(400).json({ message: 'Email already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        fullName,
        userName,
        email,
        password: hashedPassword,
        age,
      });

      const { accessToken, refreshToken } = generateTokens(newUser);

      setRefreshTokenCookie(response, refreshToken);

      await newUser.save();

      return successResponseStatus(response, 'Register successfully.', {
        accessToken,
      });
    } catch (error) {
      handleError(response, error);
    }
  },
  login: async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body as LoginUserDto;

      const user = await User.findOne({ email });
      
      if (!user) {
        return response.status(400).json({ message: 'User does not exist.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return response.status(400).json({ message: 'Incorrect password.' });
      }

      const { accessToken, refreshToken } = generateTokens(user);

      setRefreshTokenCookie(response, refreshToken);

      return successResponseStatus(response, 'Login successfully.', {
        accessToken,
      });
    } catch (error) {
      handleError(response, error);
    }
  },
  refreshToken: async (request: Request, response: Response) => {
    try {
      const refreshToken = request.cookies.refreshToken;

      if (!refreshToken) {
        return response.status(400).json({ message: 'Please login now.' });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as UserType;

      if (!decoded)
        return response.status(400).json({ msg: 'Please login now!' });

      const user = await User.findById(decoded._id).select('-password');
      if (!user)
        return response
          .status(400)
          .json({ msg: 'This account does not exist.' });

      const { accessToken } = generateTokens(user);

      return successResponseStatus(response, 'Refresh token successfully.', {
        accessToken,
      });
    } catch (error) {
      handleError(response, error);
    }
  },
  getUserProfile: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      const user = await userRepository.findById(userId);
      return successResponseStatus(
        response,
        'Get user profile successfully.',
        user
      );
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default authController;
