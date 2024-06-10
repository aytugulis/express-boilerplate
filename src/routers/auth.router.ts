import { Router } from 'express';

import { changePassword, login, register } from '@/controllers/auth.controller';
import { authenticate } from '@/middlewares/authenticate.middleware';
import { validate } from '@/middlewares/validation.middleware';
import { changePasswordBody, loginBody, registerBody } from '@/schemas/auth.schema';

export const authRouter = Router();

authRouter.post('/register', validate({ body: registerBody }), register);
authRouter.post('/login', validate({ body: loginBody }), login);
authRouter.put('/', authenticate, validate({ body: changePasswordBody }), changePassword);
