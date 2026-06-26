import { type MediaItem, TMDBImage } from '../../../Common';

interface HeroBannerProps {
  item: MediaItem;
}

export const HeroBanner = ({ item }: HeroBannerProps) => {
  const title = item.title || item.name;

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] flex items-end pb-12">
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

        <button 
          onClick={() => alert('Trailer functionality coming in detail pages!')}
          className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition-colors"
        >
          ▶ Play Trailer
        </button>
      </div>
    </div>
  );
};