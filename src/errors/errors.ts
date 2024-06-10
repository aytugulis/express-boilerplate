import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: any,
  ) {
    super(message);
  }
}

export class BadRequestError extends AppError {
  constructor(message?: string) {
    super(StatusCodes.BAD_REQUEST, message ?? ReasonPhrases.BAD_REQUEST);
  }
}

export class NotFoundError extends AppError {
  constructor(message?: string) {
    super(StatusCodes.NOT_FOUND, message ?? ReasonPhrases.NOT_FOUND);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message?: string) {
    super(StatusCodes.UNAUTHORIZED, message ?? 'You are not authorized to access this route.');
  }
}
