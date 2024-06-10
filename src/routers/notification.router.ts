import { Router } from 'express';
import { forgetPassword, resetPassword } from '@/controllers/notification.controller';
import { validate } from '@/middlewares/validation.middleware';
import { forgetPasswordBody, resetPasswordBody, resetPasswordQuery } from '@/schemas/notification.schema';

export const notificationRouter = Router();

notificationRouter.post('/forget-password', validate({ body: forgetPasswordBody }), forgetPassword);
notificationRouter.put(
  '/reset-password',
  validate({ body: resetPasswordBody, query: resetPasswordQuery }),
  resetPassword,
);
