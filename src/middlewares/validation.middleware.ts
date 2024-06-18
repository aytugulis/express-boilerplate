import { Request } from 'express';
import asyncErrorWrapper from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

import { AppError } from '@/errors/errors';

interface ValidateParams {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
}

export const validate = ({ body, params, query }: ValidateParams) => {
  return asyncErrorWrapper(async (req: Request, res, next) => {
    const parsedParams = params?.safeParse(req.params);
    const parsedBody = body?.safeParse(req.body);
    const parsedQuery = query?.safeParse(req.query);

    const errors: string[] = [];
    if (params && !parsedParams?.success) {
      errors.push(fromError(parsedParams?.error).toString());
    }
    if (body && !parsedBody?.success) {
      errors.push(fromError(parsedBody?.error).toString());
    }
    if (query && !parsedQuery?.success) {
      errors.push(fromError(parsedQuery?.error).toString());
    }

    if (errors.length) {
      const errorMessage = errors.join(',\n');
      next(new AppError(StatusCodes.BAD_REQUEST, errorMessage, errors));
      return;
    }

    req.params = parsedParams?.success ? parsedParams.data : req.params;
    req.body = parsedBody?.success ? parsedBody.data : req.body;
    req.query = parsedQuery?.success ? parsedQuery.data : req.query;

    next();
  });
};
