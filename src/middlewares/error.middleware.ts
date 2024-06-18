import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError, BadRequestError, NotFoundError } from '@/errors/errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  let customError = err;

  if (err.name === 'SyntaxError') {
    customError = new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Unexpected Syntax');
  }
  if (err.name === 'CastError') {
    customError = new BadRequestError('Invalid ID');
  }

  // MongoDB Validation Error
  if (err.name === 'ValidationError') {
    customError = new BadRequestError(err.message);
  }
  if (err.code === 11000) {
    // For duplicates of fields that are unique in Mongodb
    customError = new BadRequestError('Duplicate Key Found: Check Your Input');
  }

  if (err.name === 'NotFoundError') {
    customError = new NotFoundError();
  }
  // Response Json Object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resObj: Record<string, any> = {
    message: customError.message,
  };
  // Show error stack only in development
  if (process.env.NODE_ENV === 'development' && err.stack) {
    resObj.stack = err.stack;
  }

  if (err.details) {
    resObj.details = err.details;
  }

  res.status(customError.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: customError.message,
    details: customError.details,
    stack: process.env.NODE_ENV === 'development' ? customError.stack : undefined,
  });
};
