import { makeAutoObservable } from 'mobx';
import { z } from 'zod';
import { type WatchlistEntry, watchlistEntrySchema, type WatchStatus } from '../../core/types/Watchlist.types';
import { type MediaItem } from '../../../Common';

const STORAGE_KEY = 'cineview_watchlist';

class WatchlistStore {
  entries: WatchlistEntry[] = [];

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  // --- COMPUTED VALUES (Derived State) ---
  get totalCount() { 
    return this.entries.length; 
  }
  
  get wantToWatchCount() { 
    return this.entries.filter(e => e.status === 'want_to_watch').length; 
  }
  
  get watchingCount() { 
    return this.entries.filter(e => e.status === 'watching').length; 
  }
  
  get completedCount() { 
    return this.entries.filter(e => e.status === 'completed').length; 
  }

  // Quick lookup to see if an item is already added
  isInWatchlist = (mediaId: number) => {
    return this.entries.some(e => e.mediaId === mediaId);
  };

  getEntryStatus = (mediaId: number): WatchStatus | null => {
    const entry = this.entries.find(e => e.mediaId === mediaId);
    return entry ? entry.status : null;
  };

  // --- ACTIONS (Mutations) ---
  addEntry = (item: MediaItem, type: 'movie' | 'tv') => {
    // Prevent duplicates
    if (this.isInWatchlist(item.id)) return; 

    const newEntry: WatchlistEntry = {
      id: crypto.randomUUID(),
      mediaId: item.id,
      mediaType: type,
      status: 'want_to_watch', // Default status on add
      title: item.title || item.name || 'Unknown Title',
      poster_path: item.poster_path,
      addedAt: new Date().toISOString(),
    };

    this.entries.push(newEntry);
    this.saveToStorage();
  };

  removeEntry = (id: string) => {
    this.entries = this.entries.filter(e => e.id !== id);
    this.saveToStorage();
  };

  // Alternative remove using the TMDB ID (useful from MediaCards)
  removeByMediaId = (mediaId: number) => {
    this.entries = this.entries.filter(e => e.mediaId !== mediaId);
    this.saveToStorage();
  };

  updateStatus = (id: string, status: WatchStatus) => {
    const entry = this.entries.find(e => e.id === id);
    if (entry) {
      entry.status = status;
      this.saveToStorage();
    }
  };

  updateNote = (id: string, note: string) => {
    const entry = this.entries.find(e => e.id === id);
    if (entry) {
      entry.note = note.slice(0, 300); // Enforce 300 char limit at the data level
      this.saveToStorage();
    }
  };

  // --- PERSISTENCE ---
  private hydrate = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // Parse the entire array through our Zod schema!
        const parsedArray = z.array(watchlistEntrySchema).parse(JSON.parse(stored));
        this.entries = parsedArray;
      }
    } catch (error) {
      console.error('Failed to parse watchlist from localStorage. Data may be corrupted.', error);
      // We start with an empty array if parsing fails to prevent UI crashes.
      this.entries = [];
    }
  };

  private saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
  };
}

// Export Singleton
export const watchlistStore = new WatchlistStore();