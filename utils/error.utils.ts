import { Response } from 'express';
import { errorResponseStatus } from './response.utils';

export const handleError = (res: Response, err: Error | unknown) => {
  if (err instanceof Error) {
    return errorResponseStatus(500, res, err.message, null);
  } else {
    const error = err as Error;
    return errorResponseStatus(500, res, error.message, null);
  }
};
