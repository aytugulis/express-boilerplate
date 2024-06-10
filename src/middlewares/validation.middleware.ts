import { AppError } from '@/errors/errors';
import { Request } from 'express';
import asyncErrorWrapper from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { chain, isNil } from 'lodash';
import { fromError } from 'zod-validation-error';
import { z } from 'zod';

interface ValidateParams<TBody, TParams, TQuery> {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
}

export const validate = <TBody extends object, TParams extends object, TQuery extends object>({
  body,
  params,
  query,
}: ValidateParams<TBody, TParams, TQuery>) => {
  return asyncErrorWrapper(async (req: Request<TParams, unknown, TBody, TQuery>, res, next) => {
    const parsedParams = params?.safeParse(req.params);
    const parsedBody = body?.safeParse(req.body);
    const parsedQuery = query?.safeParse(req.query);

    const paramsErrors = params && !parsedParams?.success && fromError(parsedParams?.error).toString();
    const bodyErrors = body && !parsedBody?.success && fromError(parsedBody?.error).toString();
    const queryErrors = query && !parsedQuery?.success && fromError(parsedQuery?.error).toString();

    const errors = chain([bodyErrors, paramsErrors, queryErrors]).compact().flatten().value();

    const firstErrorMessage: string | undefined = chain(errors).first().value();

    if (!isNil(firstErrorMessage)) {
      next(new AppError(StatusCodes.BAD_REQUEST, firstErrorMessage, errors));
      return;
    }

    if (parsedParams?.success) {
    }
    if (parsedBody?.success) {
    }
    if (parsedQuery?.success) {
    }

    next();
  });
};
