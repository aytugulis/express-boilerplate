import { Router } from 'express';

import { test } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.get('/test', test);
