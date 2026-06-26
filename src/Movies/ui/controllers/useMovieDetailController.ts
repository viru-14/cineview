import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TMDBService, type MovieDetail, type Status } from '../../../Common';

export const useMovieDetailController = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setStatus('loading');
      try {
        const data = await TMDBService.getMovieDetails(id);
        setMovie(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchDetail();
  }, [id]);

  // Find the first official YouTube trailer, or fallback to a teaser
  const trailerVideo = movie?.videos?.results.find(
    (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
  ) || movie?.videos?.results.find((vid) => vid.site === 'YouTube');

  // Format runtime (e.g., 148 -> "2h 28m")
  const formatRuntime = (minutes?: number | null) => {
    if (!minutes) return 'N/A';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return {
    movie,
    status,
    trailerKey: trailerVideo?.key || null,
    isTrailerOpen,
    setIsTrailerOpen,
    formatRuntime,
  };
};