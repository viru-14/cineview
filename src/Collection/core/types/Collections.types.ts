import { z } from 'zod';
// We reuse our battle-tested media item schema from the Common module!
import { mediaItemSchema } from '../../../Common'; 

export const collectionSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
    .min(1, { message: 'Collection name is required' })
    .max(50, { message: 'Name must be 50 characters or less' }),
  description: z.string()
    .max(200, { message: 'Description must be 200 characters or less' })
    .optional(),
  createdAt: z.string(), // ISO Date String
  items: z.array(mediaItemSchema), 
});

export type CustomCollection = z.infer<typeof collectionSchema>;