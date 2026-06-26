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



export const castSchema = z.object({
    id: z.number(),
    name: z.string(),
    character: z.string(),
    profile_path: z.string().nullable().optional(),
  });
export type CastMember = z.infer<typeof castSchema>;

export const videoSchema = z.object({
    id: z.string(),
    key: z.string(), // The YouTube video ID
    name: z.string(),
    site: z.string(),
    type: z.string(), // e.g., 'Trailer', 'Teaser'
});
export type Video = z.infer<typeof videoSchema>;

export const seasonSchema = z.object({
    id: z.number(),
    name: z.string(),
    season_number: z.number(),
    episode_count: z.number(),
    poster_path: z.string().nullable().optional(),
});
export type Season = z.infer<typeof seasonSchema>;

export const episodeSchema = z.object({
    id: z.number(),
    name: z.string(),
    overview: z.string().optional().nullable(),  // was: z.string()
    episode_number: z.number(),
    still_path: z.string().nullable().optional(),
    air_date: z.string().nullable().optional(),
  });
export type Episode = z.infer<typeof episodeSchema>;

// Detailed Movie Schema (includes credits and videos via append_to_response)
export const movieDetailSchema = mediaItemSchema.extend({
    runtime: z.number().nullable().optional(),
    release_date: z.string().optional(),
    genres: z.array(genreSchema).optional(), // Detail endpoints return full genre objects, not just IDs
    credits: z.object({ cast: z.array(castSchema) }).optional(),
    videos: z.object({ results: z.array(videoSchema) }).optional(),
});
export type MovieDetail = z.infer<typeof movieDetailSchema>;

// Detailed TV Schema
export const tvDetailSchema = mediaItemSchema.extend({
    first_air_date: z.string().optional(),
    number_of_seasons: z.number().optional(),
    genres: z.array(genreSchema).optional(),
    seasons: z.array(seasonSchema).optional(),
    credits: z.object({ cast: z.array(castSchema) }).optional(),
    videos: z.object({ results: z.array(videoSchema) }).optional(),
});
export type TVDetail = z.infer<typeof tvDetailSchema>;

// Detailed Season Schema (fetched separately when clicking a season)
export const seasonDetailSchema = z.object({
    id: z.number(),
    name: z.string(),
    season_number: z.number(),
    overview: z.string().optional(),
    poster_path: z.string().nullable().optional(),
    episodes: z.array(episodeSchema),
  });
export type SeasonDetail = z.infer<typeof seasonDetailSchema>;