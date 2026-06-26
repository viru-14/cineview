import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type MediaItem,
  type Video,
  TMDBImage,
  TrailerModal,
  TMDBService,
} from '../../../Common';

interface HeroBannerProps {
  item: MediaItem;
}

// Same trailer-picking logic as MovieDetailPage / TVShowDetailPage
const pickTrailerKey = (videos?: { results: Video[] }) => {
  const trailer =
    videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
    videos?.results.find((v) => v.site === 'YouTube');

  return trailer?.key ?? null;
};

export const HeroBanner = ({ item }: HeroBannerProps) => {
  const { t } = useTranslation();
  const title = item.title || item.name;

  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const id = String(item.id);
        const isTV = item.media_type === 'tv';

        const data = isTV
          ? await TMDBService.getTVDetails(id)
          : await TMDBService.getMovieDetails(id);

        setTrailerKey(pickTrailerKey(data.videos));
      } catch {
        setTrailerKey(null);
      }
    };

    fetchTrailer();
  }, [item.id, item.media_type]);

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] flex items-end pb-12">
      <TrailerModal
        isOpen={isTrailerOpen}
        videoKey={trailerKey}
        onClose={() => setIsTrailerOpen(false)}
      />

      {/* Background Image with Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <TMDBImage
          path={item.backdrop_path}
          type="backdrop"
          alt={title || 'Hero Banner'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-300 mb-4">
          <span className="flex items-center text-yellow-500">
            <span className="mr-1">★</span>
            {item.vote_average ? item.vote_average.toFixed(1) : 'NR'}
          </span>
          <span className="uppercase border border-gray-500 px-2 rounded text-xs">
            {item.media_type || 'Movie'}
          </span>
        </div>

        <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-6 drop-shadow">
          {item.overview}
        </p>

        {trailerKey && (
          <button
            onClick={() => setIsTrailerOpen(true)}
            className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition-colors"
          >
            ▶ {t('home.playTrailer')}
          </button>
        )}
      </div>
    </div>
  );
};