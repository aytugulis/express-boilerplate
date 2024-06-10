import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { ChangePasswordBody, LoginBody, RegisterBody } from '@/schemas/auth.schema';
import { authService } from '@/services/auth.service';

interface RegisterResponse {
  token: string;
}

interface LoginResponse {
  token: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const register = asyncHandler(
  async (req: Request<unknown, unknown, RegisterBody>, res: Response<RegisterResponse>) => {
    const token = await authService.register(req.body);
    res.status(StatusCodes.CREATED).json({ token });
  },
);

export const login = asyncHandler(async (req: Request<unknown, unknown, LoginBody>, res: Response<LoginResponse>) => {
  const token = await authService.login(req.body);
  res.status(StatusCodes.OK).json({ token });
});

export const changePassword = asyncHandler(
  async (req: Request<unknown, unknown, ChangePasswordBody>, res: Response<ChangePasswordResponse>) => {
    await authService.changePassword(req.body, req.user?.id);
    res.status(StatusCodes.OK).json({ success: true, message: 'Password changed' });
  },
);
