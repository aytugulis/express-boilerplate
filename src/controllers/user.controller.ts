import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { userService } from '@/services/user.service';

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const user = await userService.getUser(id);
  res.status(StatusCodes.OK).json({ user });
});
