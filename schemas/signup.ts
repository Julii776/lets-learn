import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    verifyPassword: z.string(),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: 'Passwords do not match',
    path: ['verifyPassword'],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
