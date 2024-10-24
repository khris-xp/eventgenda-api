import { NextFunction, Request, Response } from 'express';
import { UserType } from '../types/user';

interface AuthRequest extends Request {
  user?: UserType;
}

const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ msg: 'Unauthenticated user' });
      }
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied' });
      }
      next();
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ msg: error.message });
    }
  };
};

export default authorizeRoles;
