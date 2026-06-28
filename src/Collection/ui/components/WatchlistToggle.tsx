import { observer } from 'mobx-react-lite';
import { type MediaItem } from '../../../Common';
import { watchlistStore } from '../../data/stores/WatchlistStore';

interface WatchlistToggleProps {
  item: MediaItem;
  variant?: 'icon' | 'button';
}

const getMediaType = (item: MediaItem): 'movie' | 'tv' => {
  if (item.media_type === 'tv') return 'tv';
  return 'movie';
};

export const WatchlistToggle = observer(({ item, variant = 'icon' }: WatchlistToggleProps) => {
  const isSaved = watchlistStore.isInWatchlist(item.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      watchlistStore.removeByMediaId(item.id);
    } else {
      watchlistStore.addEntry(item, getMediaType(item));
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        className={`px-8 py-3 rounded font-bold transition-colors border ${
          isSaved
            ? 'bg-green-600/20 text-green-500 border-green-500 hover:bg-green-600/30'
            : 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
        }`}
      >
        {isSaved ? '✓ In Watchlist' : '+ Add to Watchlist'}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all outline-none z-10 ${
        isSaved
          ? 'bg-green-500 text-white opacity-100'
          : 'bg-gray-900/80 text-white opacity-0 group-hover:opacity-100 hover:bg-blue-600'
      }`}
    >
      {isSaved ? '✓' : '+'}
    </button>
  );
});