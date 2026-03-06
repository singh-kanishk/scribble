import type { Request, Response } from 'express';
import {
  generateAccessToken,
  verifyRefreshToken,
  type UserPayload,
} from '../../utils/jwtHandler.ts';
import { sendError, sendSuccess } from '../../utils/responseHandler.ts';

export const refreshSession = (req: Request, res: Response): void => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return sendError({
      res,
      message: 'No refresh token found. Please log in',
      statusCode: 401,
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return sendError({
        res,
        message: 'Invalid or expired refresh token. Please log in',
        statusCode: 401,
      });
    }

    const payload: UserPayload = {
      userId: decoded.userId || '',
      username: decoded.username || '',
    };

    const newAccessToken = generateAccessToken(payload);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return sendSuccess<null>({
      res,
      message: 'Session refreshed',
      statusCode: 200,
      data: null,
    });
  } catch (error) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return sendError({
      res,
      message: 'Session expired. Please log in again',
      statusCode: 403,
    });
  }
};
