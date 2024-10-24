import { NextFunction, Request, Response } from 'express';
import { UserType } from '../types/user';
import { errorResponseStatus } from '../utils/response.utils';
const jwt = require('jsonwebtoken');

interface AuthRequest extends Request {
  user?: UserType;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponseStatus(401, res, 'Invalid Authentication.', null);
    }

    const token = authHeader.split(' ')[1];
    if (!token)
      return errorResponseStatus(401, res, 'Invalid Authentication.', null);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (error: Error, user: UserType) => {
        if (error) {
          return errorResponseStatus(401, res, error.message, null);
        }
        req.user = user;
        next();
      }
    );
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ msg: error.message });
  }
};

export default verifyToken;
