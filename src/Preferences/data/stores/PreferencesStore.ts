import { makeAutoObservable } from 'mobx';
import { type UserPreferences, preferencesSchema } from '../../core/types/Preferences.types';

const STORAGE_KEY = 'cineview_preferences';

class PreferencesStore {
  // 1. Observables (The State)
  theme: UserPreferences['theme'] = 'dark'; // Default fallback
  language: UserPreferences['language'] = 'en';
  region: UserPreferences['region'] = 'US';

  constructor() {
    // This MobX magic tells the class to track all properties and actions automatically
    makeAutoObservable(this);
    this.hydrate();
  }

  // 2. Computed Values (Derived State)
  get isDarkMode() {
    return this.theme === 'dark';
  }

  // 3. Actions (Mutations)
  setTheme = (theme: UserPreferences['theme']) => {
    this.theme = theme;
    this.saveToStorage();
  };

  setLanguage = (language: UserPreferences['language']) => {
    this.language = language;
    this.saveToStorage();
  };

  setRegion = (region: UserPreferences['region']) => {
    this.region = region;
    this.saveToStorage();
  };

  // 4. Persistence Logic
  private hydrate = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // Parse and validate the stored data through our Zod schema!
        const parsed = preferencesSchema.parse(JSON.parse(stored));
        this.theme = parsed.theme;
        this.language = parsed.language;
        this.region = parsed.region;
      } else {
        // If no stored preference, check the OS default for theme
        const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.theme = osPrefersDark ? 'dark' : 'light';
        // Save this initial state
        this.saveToStorage();
      }
    } catch (error) {
      console.warn('Corrupted preferences found in localStorage. Reverting to defaults.');
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  private saveToStorage = () => {
    const data: UserPreferences = {
      theme: this.theme,
      language: this.language,
      region: this.region,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };
}

// Export a single instance of the store (Singleton pattern)
// This ensures the entire app shares the exact same state in memory.
export const preferencesStore = new PreferencesStore();