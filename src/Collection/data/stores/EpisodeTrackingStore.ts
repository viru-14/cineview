import { makeAutoObservable } from 'mobx';
import { type EpisodeTrackingData, episodeTrackingSchema } from '../../core/types/EpisodeTracking.types';

const STORAGE_KEY = 'cineview_episode_tracking';

class EpisodeTrackingStore {
  // Our reactive dictionary state
  watchedEpisodes: EpisodeTrackingData = {};

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  // --- COMPUTED VALUES ---
  
  // Quick lookup to see if a specific episode is checked
  isEpisodeWatched = (tvId: string | number, episodeId: number): boolean => {
    const showIdStr = String(tvId);
    const showEpisodes = this.watchedEpisodes[showIdStr];
    
    if (!showEpisodes) return false;
    return showEpisodes.includes(episodeId);
  };

  // Useful for displaying progress bars later (e.g., "12 episodes watched")
  getWatchedCountForShow = (tvId: string | number): number => {
    const showIdStr = String(tvId);
    return this.watchedEpisodes[showIdStr]?.length || 0;
  };

  // --- ACTIONS ---

  toggleEpisode = (tvId: string | number, episodeId: number) => {
    const showIdStr = String(tvId);
    
    // Initialize the array if this is the first episode checked for this show
    if (!this.watchedEpisodes[showIdStr]) {
      this.watchedEpisodes[showIdStr] = [];
    }

    const showEpisodes = this.watchedEpisodes[showIdStr];
    const episodeIndex = showEpisodes.indexOf(episodeId);

    if (episodeIndex > -1) {
      // If it exists, remove it (uncheck)
      showEpisodes.splice(episodeIndex, 1);
    } else {
      // If it doesn't exist, add it (check)
      showEpisodes.push(episodeId);
    }

    // Clean up empty arrays to keep localStorage lean
    if (showEpisodes.length === 0) {
      delete this.watchedEpisodes[showIdStr];
    }

    this.saveToStorage();
  };

  // --- PERSISTENCE ---

  private hydrate = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // Run the raw JSON through our Zod dictionary schema
        this.watchedEpisodes = episodeTrackingSchema.parse(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to parse episode tracking data', error);
      this.watchedEpisodes = {};
    }
  };

  private saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.watchedEpisodes));
  };
}

export const episodeTrackingStore = new EpisodeTrackingStore();