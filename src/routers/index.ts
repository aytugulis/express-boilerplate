import { Router } from 'express';

import { authRouter } from './auth.router';

export const router = Router();

router.use('/auth', authRouter);
