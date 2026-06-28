import { useNavigate } from 'react-router-dom';
import { type MediaItem } from '../../core/types/TMDB.types';
import { TMDBImage } from './TMDBImage';
import { WatchlistToggle } from '../../../Collection';

interface MediaCardProps {
  item: MediaItem;
  onClick?: (id: number, type: 'movie' | 'tv') => void;
}

const getCardMediaType = (item: MediaItem): 'movie' | 'tv' => {
  if (item.media_type === 'tv') return 'tv';
  return 'movie';
};

export const MediaCard = ({ item, onClick }: MediaCardProps) => {
  const title = item.title || item.name || 'Unknown Title';
  const navigate = useNavigate();

  return (
    <div
      className="relative group cursor-pointer w-36 sm:w-44 flex-shrink-0 transition-transform hover:scale-105"
      onClick={() => {
        if (onClick) onClick(item.id, getCardMediaType(item));
        else navigate(`/${getCardMediaType(item)}/${item.id}`);
      }}
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg relative bg-gray-800">
        <TMDBImage
          path={item.poster_path}
          type="poster"
          alt={title}
          className="w-full h-full"
        />

        <WatchlistToggle item={item} variant="icon" />
      </div>

      <div className="mt-2 px-1">
        <h3 className="text-sm font-semibold text-gray-200 truncate" title={title}>
          {title}
        </h3>
        <div className="flex items-center text-xs text-yellow-500 mt-1">
          <span className="mr-1">★</span>
          <span>{item.vote_average ? item.vote_average.toFixed(1) : 'NR'}</span>
        </div>
      </div>
    </div>
  );
};