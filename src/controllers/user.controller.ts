import { userService } from '@/services/user.service';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const user = await userService.getUser(id);
  res.status(StatusCodes.OK).json({ user });
});
