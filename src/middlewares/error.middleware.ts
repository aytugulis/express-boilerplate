import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../utils/error.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  let customErr = err;
  if (err.name === 'SyntaxError') {
    customErr = new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Unexpected Syntax');
  }

  res.status(customErr.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: customErr.message,
    stack: process.env.NODE_ENV === 'development' ? customErr.stack : undefined,
  });
};
