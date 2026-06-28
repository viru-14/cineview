import { z } from 'zod';

// Define the exact statuses allowed
export const watchStatusSchema = z.enum(['want_to_watch', 'watching', 'completed']);
export type WatchStatus = z.infer<typeof watchStatusSchema>;

// Define the full entry schema
export const watchlistEntrySchema = z.object({
  id: z.string().uuid(),          // Unique ID for the specific list entry
  mediaId: z.number(),            // The TMDB ID
  mediaType: z.enum(['movie', 'tv']),
  status: watchStatusSchema,
  
  // Cached snapshot data so we don't need to fetch from TMDB to display the list
  title: z.string(),
  poster_path: z.string().nullable().optional(),
  
  addedAt: z.string(),            // ISO Date string
  note: z.string().max(300).optional(), // Max 300 chars as per specs
});

export type WatchlistEntry = z.infer<typeof watchlistEntrySchema>;