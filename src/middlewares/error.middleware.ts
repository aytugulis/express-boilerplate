import { ErrorRequestHandler } from 'express';
import { AppError } from '../utils/error.util';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  if (err.name === 'SyntaxError') {
    err = new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Unexpected Syntax');
  }

  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
