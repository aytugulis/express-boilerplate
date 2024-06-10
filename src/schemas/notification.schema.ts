import { z } from 'zod';

export const notificationAction = z.enum(['RESET_PASSWORD']);
export type NotificationAction = z.infer<typeof notificationAction>;

export const forgetPasswordBody = z.object({
  email: z.string().email(),
});
export type ForgetPasswordBody = z.infer<typeof forgetPasswordBody>;

export const resetPasswordBody = z.object({
  password: z.string(),
});
export type ResetPasswordBody = z.infer<typeof resetPasswordBody>;

export const resetPasswordQuery = z.object({
  token: z.string(),
});
export type ResetPasswordQuery = z.infer<typeof resetPasswordQuery>;
