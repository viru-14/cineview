import { useNavigate } from 'react-router-dom';

import { type MediaItem } from '../../core/types/TMDB.types';
import { TMDBImage } from './TMDBImage';



interface MediaCardProps {
  item: MediaItem;
  onClick?: (id: number, type: 'movie' | 'tv') => void; 
}

export const MediaCard = ({ item, onClick }: MediaCardProps) => {
  // TMDB uses 'title' for movies and 'name' for TV shows. We handle both cleanly.
  const title = item.title || item.name || 'Unknown Title';
  //const type = item.media_type || (item.title ? 'movie' : 'tv');
  const getCardMediaType = (item: MediaItem): 'movie' | 'tv' => {
    if (item.media_type === 'tv') return 'tv';
    return 'movie';
  };
  const navigate = useNavigate();

  return (
    <div 
      className="relative group cursor-pointer w-36 sm:w-44 flex-shrink-0 transition-transform hover:scale-105"
      onClick={() => {
        if(onClick) onClick(item.id, getCardMediaType(item));
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
        
        {/* Watchlist Placeholder Button (Functional in Milestone 5) */}
        <button 
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600 focus:opacity-100 outline-none"
          onClick={(e) => {
            e.stopPropagation(); // Prevents the card click event from firing
            alert('Watchlist functionality coming in Milestone 5!');
          }}
          title="Add to Watchlist"
        >
          +
        </button>
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