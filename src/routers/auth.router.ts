import { Router } from 'express';
import { login, register, changePassword } from '@/controllers/auth.controller';
import { changePasswordBody, loginBody, registerBody } from '@/schemas/auth.schema';
import { validate } from '@/middlewares/validation.middleware';
import { authenticate } from '@/middlewares/authenticate.middleware';

export const authRouter = Router();

authRouter.post('/register', validate({ body: registerBody }), register);
authRouter.post('/login', validate({ body: loginBody }), login);
authRouter.put('/', authenticate, validate({ body: changePasswordBody }), changePassword);
