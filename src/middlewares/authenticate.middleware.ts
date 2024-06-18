import asyncErrorWrapper from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '@/errors/errors';
import { Payload } from '@/types/authentication.type';

const { JWT_SECRET_KEY } = process.env;

const verifyJwtAsync = (token: string, secret: string) => {
  return new Promise<Payload>((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err.name === 'TokenExpiredError' ? new UnauthorizedError('Token expired') : new UnauthorizedError());
        return;
      }
      resolve(decoded as Payload);
    });
  });
};

export const authenticate = asyncErrorWrapper(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const isTokenIncluded = authorizationHeader?.startsWith('Bearer ');

  if (!isTokenIncluded) {
    throw new UnauthorizedError();
  }

  const authToken = authorizationHeader?.split(' ')[1] ?? '';
  const decoded = await verifyJwtAsync(authToken, JWT_SECRET_KEY);

  req.user = { id: decoded.id, username: decoded.username, email: decoded.email };

  next();
});
