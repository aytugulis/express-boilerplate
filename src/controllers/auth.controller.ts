import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { authService } from '../services';

interface TestResponse {
  test: string;
}
export const test = asyncHandler(async (req: Request, res: Response<TestResponse>) => {
  const testing = authService.test();
  res.status(StatusCodes.CREATED).json(testing);
});
