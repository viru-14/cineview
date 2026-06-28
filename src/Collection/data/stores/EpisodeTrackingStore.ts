import { makeAutoObservable } from 'mobx';
import { type EpisodeTrackingData, episodeTrackingSchema } from '../../core/types/EpisodeTracking.types';

const STORAGE_KEY = 'cineview_episode_tracking';

export type ProgressStats = {
  watched: number;
  total: number;
  percent: number;
};

class EpisodeTrackingStore {
  watchedEpisodes: EpisodeTrackingData = {};

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  getWatchedEpisodeIds = (tvId: string | number): number[] => {
    return this.watchedEpisodes[String(tvId)] ?? [];
  };

  isEpisodeWatched = (tvId: string | number, episodeId: number): boolean => {
    return this.getWatchedEpisodeIds(tvId).includes(episodeId);
  };

  getWatchedCountForShow = (tvId: string | number): number => {
    return this.getWatchedEpisodeIds(tvId).length;
  };

  getWatchedCountInList = (tvId: string | number, episodeIds: number[]): number => {
    const watchedSet = new Set(this.getWatchedEpisodeIds(tvId));
    return episodeIds.filter((id) => watchedSet.has(id)).length;
  };

  getSeasonProgress = (tvId: string | number, episodes: { id: number }[]): ProgressStats => {
    const total = episodes.length;
    const watched = this.getWatchedCountInList(
      tvId,
      episodes.map((episode) => episode.id)
    );

    return {
      watched,
      total,
      percent: total === 0 ? 0 : Math.round((watched / total) * 100),
    };
  };

  getShowProgress = (
    tvId: string | number,
    seasons: { season_number: number; episode_count: number }[]
  ): ProgressStats => {
    const total = seasons
      .filter((season) => season.season_number > 0)
      .reduce((sum, season) => sum + season.episode_count, 0);

    const watched = Math.min(this.getWatchedCountForShow(tvId), total);

    return {
      watched,
      total,
      percent: total === 0 ? 0 : Math.round((watched / total) * 100),
    };
  };

  toggleEpisode = (tvId: string | number, episodeId: number) => {
    const showIdStr = String(tvId);
    const current = this.getWatchedEpisodeIds(tvId);
    const next = current.includes(episodeId)
      ? current.filter((id) => id !== episodeId)
      : [...current, episodeId];

    this.updateShowEpisodes(showIdStr, next);
  };

  setSeasonEpisodesWatched = (
    tvId: string | number,
    episodeIds: number[],
    watched: boolean
  ) => {
    const showIdStr = String(tvId);
    const current = new Set(this.getWatchedEpisodeIds(tvId));

    if (watched) {
      episodeIds.forEach((id) => current.add(id));
    } else {
      episodeIds.forEach((id) => current.delete(id));
    }

    this.updateShowEpisodes(showIdStr, Array.from(current));
  };

  private updateShowEpisodes = (showIdStr: string, episodeIds: number[]) => {
    if (episodeIds.length === 0) {
      const { [showIdStr]: _removed, ...rest } = this.watchedEpisodes;
      this.watchedEpisodes = rest;
    } else {
      this.watchedEpisodes = {
        ...this.watchedEpisodes,
        [showIdStr]: episodeIds,
      };
    }

    this.saveToStorage();
  };

  private hydrate = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
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