import { Response } from 'express';
import { DataResponseType, DataType } from '../types/response';

export function successResponseStatus<T>(
  response: Response,
  message: string,
  data: DataType<T>
): Response {
  const dataResponse: DataResponseType<T> = {
    status: 200,
    message: message,
    success: true,
    data: data,
  };

  return response.status(200).json(dataResponse);
}

export function errorResponseStatus<T>(
  status: number,
  response: Response,
  message: string,
  data: DataType<T>
): Response {
  const dataResponse: DataResponseType<T> = {
    status,
    message: message,
    success: false,
    data: data,
  };

  return response.status(status).json(dataResponse);
}
