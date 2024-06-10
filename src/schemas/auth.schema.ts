import { z } from 'zod';

export const registerBody = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
});
export type RegisterBody = z.infer<typeof registerBody>;

export const loginBody = z.object({
  username: z.string(),
  password: z.string(),
});
export type LoginBody = z.infer<typeof loginBody>;

export const changePasswordBody = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
export type ChangePasswordBody = z.infer<typeof changePasswordBody>;
