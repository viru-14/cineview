import { z } from 'zod';

// 1. Define the runtime validation schema using Zod
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

// 2. Infer the compile-time TypeScript types directly from the schema
// This guarantees that your types and your validation rules never get out of sync.
export type LoginCredentials = z.infer<typeof loginSchema>;

export interface UserSession {
  username: string;
  token: string;
  authenticatedAt: string;
}