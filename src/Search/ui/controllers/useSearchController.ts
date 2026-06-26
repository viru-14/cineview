import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TMDBService,type MediaItem, type Status, useDebounce } from '../../../Common';

const RECENT_SEARCHES_KEY = 'cineview_recent_searches';

export const useSearchController = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryParam);
  const debouncedQuery = useDebounce(query, 500); // 500ms delay

  const [results, setResults] = useState<MediaItem[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to parse recent searches');
    }
  }, []);

  // Sync URL changes to local state
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  // Fire search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setStatus('idle');
      return;
    }

    const performSearch = async () => {
      setStatus('loading');
      try {
        const { results: rawResults } = await TMDBService.searchMulti(debouncedQuery);
        setResults(rawResults);
        setStatus('success');
        saveRecentSearch(debouncedQuery);
      } catch (error) {
        setStatus('error');
      }
    };

    performSearch();
  }, [debouncedQuery]);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setRecentSearches(prev => {
      // Remove duplicates, add to front, keep max 5
      const updated = [trimmed, ...prev.filter(t => t.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    // Only update URL if there's text, otherwise clear it to keep URL clean
    if (newQuery) {
      setSearchParams({ q: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  return {
    query,
    handleQueryChange,
    results,
    status,
    recentSearches,
    clearRecentSearches
  };
};