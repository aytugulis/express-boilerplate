import { z } from 'zod';

export const environmentVariable = z.object({
  NODE_ENV: z.string(),
  PORT: z.string(),
  MONGODB_HOST: z.string(),
  MONGODB_PORT: z.string(),
  MONGODB_NAME: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRE: z.string(),
  RESET_PASSWORD_EXPIRE_IN_MIN: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
});
export type EnvironmentVariable = z.infer<typeof environmentVariable>;
