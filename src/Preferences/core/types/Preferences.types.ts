import { z } from 'zod';

export const preferencesSchema = z.object({
  theme: z.enum(['light', 'dark']),
  language: z.enum(['en', 'es']), // Starting with English and Spanish
  region: z.string().min(2),      // e.g., 'US', 'IN', 'GB'
});

export type UserPreferences = z.infer<typeof preferencesSchema>;