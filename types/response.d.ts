import { AuthResponseType } from './auth';
import { UserType } from './user';

export type DataResponseType<T> = {
  status: number;
  message: string;
  success: boolean;
  data: T;
};

export type DataType<T> = T;

type UserResponseType = DataResponseType<UserType | UserType[] | null>;
type AuthResponseType = DataResponseType<AuthResponseType | null>;

function createResponse<T>(
  status: number,
  message: string,
  success: boolean,
  data: T
): DataResponseType<T> {
  return { status, message, success, data };
}
