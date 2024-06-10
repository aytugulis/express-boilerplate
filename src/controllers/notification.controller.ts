import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { ForgetPasswordBody, ResetPasswordBody, ResetPasswordQuery } from '@/schemas/notification.schema';
import { notificationService } from '@/services/notification.service';

interface ForgetPasswordResponse {
  success: boolean;
}

interface ResetPasswordResponse {
  success: boolean;
}

export const forgetPassword = asyncHandler(
  async (req: Request<unknown, unknown, ForgetPasswordBody>, res: Response<ForgetPasswordResponse>) => {
    const success = await notificationService.forgetPassword(req.body);
    res.status(StatusCodes.OK).json({ success });
  },
);

export const resetPassword = asyncHandler(
  async (
    req: Request<unknown, unknown, ResetPasswordBody, ResetPasswordQuery>,
    res: Response<ResetPasswordResponse>,
  ) => {
    const { token } = req.query;
    const { password } = req.body;
    await notificationService.resetPassword(token, password);
    res.status(StatusCodes.OK).json({ success: true });
  },
);
