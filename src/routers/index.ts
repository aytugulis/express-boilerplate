import { Router } from 'express';

import { authRouter } from './auth.router';
import { notificationRouter } from './notification.router';
import { userRouter } from './user.router';

export const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/notification', notificationRouter);
