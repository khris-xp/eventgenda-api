import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/user.repository';
import { UserType } from '../types/user';

interface AuthRequest extends Request {
  user?: UserType;
}

const authOrganizer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: 'User does not exist.' });
    }

    const user = await UserRepository.findById(userId.toString());

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    if (!user.role.includes('Organizer')) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    next();
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ msg: error.message });
  }
};

export default authOrganizer;