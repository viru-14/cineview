import { z } from 'zod';

// We use a string for the Key (TV Show ID) because JavaScript object keys are always strings.
// The Value is an array of numbers (Episode IDs).
export const episodeTrackingSchema = z.record(z.string(), z.array(z.number()));

export type EpisodeTrackingData = z.infer<typeof episodeTrackingSchema>;