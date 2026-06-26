import { z } from 'zod';

// 1. Base Media Item Schema (Handles both Movies and TV Shows)
export const mediaItemSchema = z.object({
    id: z.number(),
    title: z.string().optional(),
    name: z.string().optional(),
    overview: z.string().optional(), // People don't have overviews
    poster_path: z.string().nullable().optional(),
    backdrop_path: z.string().nullable().optional(),
    profile_path: z.string().nullable().optional(), // Added for People
    vote_average: z.number().optional(),
    genre_ids: z.array(z.number()).optional(),
    media_type: z.enum(['movie', 'tv', 'person']).optional(), // Added person
    known_for_department: z.string().optional(),
  });

// Infer the compile-time type
export type MediaItem = z.infer<typeof mediaItemSchema>;

// 2. Generic Paginated Response Schema
// We use a function here so we can reuse this wrapper for any array of items
export const createPaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    page: z.number(),
    results: z.array(itemSchema),
    total_pages: z.number(),
    total_results: z.number(),
  });

// 3. Genre Schema
export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Genre = z.infer<typeof genreSchema>;

export const genreListSchema = z.object({
  genres: z.array(genreSchema),
});


