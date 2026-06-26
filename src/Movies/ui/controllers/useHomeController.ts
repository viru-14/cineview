import { useState, useEffect } from 'react';
import { TMDBService, type MediaItem, type Genre, type  Status } from '../../../Common';

interface RowState {
  data: MediaItem[];
  status: Status;
}

export const useHomeController = () => {
  const [activeGenreId, setActiveGenreId] = useState<number | null>(null);
  
  // Independent states for each section
  const [genres, setGenres] = useState<{ data: Genre[], status: Status }>({ data: [], status: 'idle' });
  const [trending, setTrending] = useState<RowState>({ data: [], status: 'idle' });
  const [popular, setPopular] = useState<RowState>({ data: [], status: 'idle' });
  const [topRated, setTopRated] = useState<RowState>({ data: [], status: 'idle' });

  useEffect(() => {
    // 1. Fetch Genres
    const fetchGenres = async () => {
      setGenres(prev => ({ ...prev, status: 'loading' }));
      try {
        const data = await TMDBService.getMovieGenres();
        setGenres({ data, status: 'success' });
      } catch (error) {
        setGenres(prev => ({ ...prev, status: 'error' }));
      }
    };

    // 2. Fetch Trending
    const fetchTrending = async () => {
      setTrending(prev => ({ ...prev, status: 'loading' }));
      try {
        const { results } = await TMDBService.getTrending('day');
        setTrending({ data: results, status: 'success' });
      } catch (error) {
        setTrending(prev => ({ ...prev, status: 'error' }));
      }
    };

    // 3. Fetch Popular
    const fetchPopular = async () => {
      setPopular(prev => ({ ...prev, status: 'loading' }));
      try {
        const { results } = await TMDBService.getPopularMovies();
        setPopular({ data: results, status: 'success' });
      } catch (error) {
        setPopular(prev => ({ ...prev, status: 'error' }));
      }
    };

    // 4. Fetch Top Rated
    const fetchTopRated = async () => {
      setTopRated(prev => ({ ...prev, status: 'loading' }));
      try {
        const { results } = await TMDBService.getTopRatedMovies();
        setTopRated({ data: results, status: 'success' });
      } catch (error) {
        setTopRated(prev => ({ ...prev, status: 'error' }));
      }
    };

    fetchGenres();
    fetchTrending();
    fetchPopular();
    fetchTopRated();
  }, []); // Empty dependency array means this runs exactly once on mount

  // Helper to filter items based on the selected genre
  const filterByGenre = (items: MediaItem[]) => {
    if (activeGenreId === null) return items;
    return items.filter(item => item.genre_ids.includes(activeGenreId));
  };

  return {
    activeGenreId,
    setActiveGenreId,
    genres,
    trending: { ...trending, data: filterByGenre(trending.data) },
    popular: { ...popular, data: filterByGenre(popular.data) },
    topRated: { ...topRated, data: filterByGenre(topRated.data) },
  };
};