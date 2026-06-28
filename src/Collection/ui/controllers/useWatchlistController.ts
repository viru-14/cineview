import { useState } from 'react';
import { watchlistStore } from '../../data/stores/WatchlistStore';
import { type WatchStatus } from '../../core/types/Watchlist.types';

type FilterTab = WatchStatus | 'all';
type SortOption = 'date_desc' | 'date_asc' | 'title_asc';

export const useWatchlistController = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');

  // We read directly from the store. Because the component using this hook 
  // will be wrapped in `observer`, it will re-calculate this automatically!
  const rawEntries = watchlistStore.entries;

  // 1. Apply Filter
  const filteredEntries = rawEntries.filter(entry => 
    activeTab === 'all' ? true : entry.status === activeTab
  );

  // 2. Apply Sort
  const sortedAndFiltered = [...filteredEntries].sort((a, b) => {
    if (sortBy === 'date_desc') {
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }
    if (sortBy === 'date_asc') {
      return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
    }
    if (sortBy === 'title_asc') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return {
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    entries: sortedAndFiltered,
    counts: {
      total: watchlistStore.totalCount,
      wantToWatch: watchlistStore.wantToWatchCount,
      watching: watchlistStore.watchingCount,
      completed: watchlistStore.completedCount,
    }
  };
};