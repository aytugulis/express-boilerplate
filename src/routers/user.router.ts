import { Router } from 'express';

import { getUser } from '@/controllers/user.controller';
import { authenticate } from '@/middlewares/authenticate.middleware';

export const userRouter = Router();

userRouter.get('/', authenticate, getUser);
