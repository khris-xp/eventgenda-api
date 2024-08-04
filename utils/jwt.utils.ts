import jwt from 'jsonwebtoken';
import { UserType } from '../types/user';

export const createAccessToken = (user: UserType) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '11m',
  });
};

export const createRefreshToken = (user: UserType) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '7d',
  });
};
