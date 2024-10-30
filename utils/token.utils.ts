import { Response } from 'express';
import { UserType } from '../types/user';
import { createAccessToken, createRefreshToken } from './jwt.utils';

export const generateTokens = (user: UserType) => {
  const {
    _id,
    email,
    password,
    fullName,
    userName,
    age,
    coin,
    rewardPoints,
    role,
    profileImage,
    organization,
    history,
    redeemedRewards,
    createdAt,
    updatedAt,
  } = user;

  const tokenData = {
    _id,
    email,
    password,
    fullName,
    userName,
    age,
    coin,
    rewardPoints,
    role,
    profileImage,
    organization,
    history,
    redeemedRewards,
    createdAt,
    updatedAt,
  };

  const accessToken = createAccessToken(tokenData);
  const refreshToken = createRefreshToken(tokenData);

  return { accessToken, refreshToken };
};

export const setRefreshTokenCookie = (
  response: Response,
  refreshToken: string
) => {
  response.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/user/refresh_token',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
