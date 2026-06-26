import { z } from 'zod';
import { preferencesStore } from '../../../Preferences';
import { 
    mediaItemSchema, createPaginatedSchema, genreListSchema, 
    movieDetailSchema, tvDetailSchema, seasonDetailSchema, // <-- Add these
    type MediaItem, type Genre, type MovieDetail, type TVDetail, type SeasonDetail // <-- Add these
  } from '../../core/types/TMDB.types';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Create a configured paginated schema specifically for MediaItems
const mediaListSchema = createPaginatedSchema(mediaItemSchema);

/**
 * Internal helper to handle the HTTP fetch and Zod parsing
 */
async function fetchFromTMDB<T>(endpoint: string, schema: z.ZodType<T>): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Using the Read Access Token as a Bearer token
      Authorization: `Bearer ${API_KEY}`,
    },
    });

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }

  const rawData = await response.json();
  
  // This is the moat! If the data is malformed, it throws an error right here,
  // preventing bad data from ever reaching our React components.
  return schema.parse(rawData);
}

/**
 * The public API surface for TMDB operations
 */

const getTMDBLanguage = () => {
    return preferencesStore.language === 'es' ? 'es-ES' : 'en-US';
  };

export const TMDBService = {
  getTrending: (timeWindow: 'day' | 'week' = 'day'): Promise<{ results: MediaItem[] }> => {
    return fetchFromTMDB(`/trending/all/${timeWindow}?language={getTMDBLanguage()}`, mediaListSchema);
  },

  getPopularMovies: (): Promise<{ results: MediaItem[] }> => {
    return fetchFromTMDB(`/movie/popular?language=${getTMDBLanguage()}&page=1`, mediaListSchema);
  },

  getTopRatedMovies: (): Promise<{ results: MediaItem[] }> => {
    return fetchFromTMDB(`/movie/top_rated?language=${getTMDBLanguage()}&page=1`, mediaListSchema);
  },

  getUpcomingMovies: (): Promise<{ results: MediaItem[] }> => {
    return fetchFromTMDB(`/movie/upcoming?language=${getTMDBLanguage()}&page=1`, mediaListSchema);
  },

  getMovieGenres: async (): Promise<Genre[]> => {
    const data = await fetchFromTMDB(`/genre/movie/list?language=${getTMDBLanguage()}`, genreListSchema);
    return data.genres;
  },
  searchMulti: (query: string): Promise<{ results: MediaItem[] }> => {
    // We encode the query to handle spaces and special characters safely
    return fetchFromTMDB(
      `/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=${getTMDBLanguage()}&page=1`, 
      mediaListSchema
    );
  },
  getMovieDetails: (id: string): Promise<MovieDetail> => {
    // append_to_response bundles the cast and trailers into the single response!
    return fetchFromTMDB(`/movie/${id}?language=${getTMDBLanguage()}&append_to_response=credits,videos`, movieDetailSchema);
  },

  getTVDetails: (id: string): Promise<TVDetail> => {
    return fetchFromTMDB(`/tv/${id}?language=${getTMDBLanguage()}&append_to_response=credits,videos`, tvDetailSchema);
  },

  getSeasonDetails: (tvId: string, seasonNumber: string): Promise<SeasonDetail> => {
    return fetchFromTMDB(`/tv/${tvId}/season/${seasonNumber}?language=${getTMDBLanguage()}`, seasonDetailSchema);
  },
};