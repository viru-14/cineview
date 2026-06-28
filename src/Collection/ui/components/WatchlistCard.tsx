import { Link } from 'react-router-dom';
import { type WatchlistEntry, type WatchStatus } from '../../core/types/Watchlist.types';
import { watchlistStore } from '../../data/stores/WatchlistStore';
import { TMDBImage } from '../../../Common';

interface WatchlistCardProps {
  entry: WatchlistEntry;
}

export const WatchlistCard = ({ entry }: WatchlistCardProps) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    watchlistStore.updateStatus(entry.id, e.target.value as WatchStatus);
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      {/* Poster */}
      <Link to={`/${entry.mediaType}/${entry.mediaId}`} className="w-full sm:w-32 flex-shrink-0 bg-gray-100 dark:bg-gray-900">
        <TMDBImage 
          path={entry.poster_path || null} 
          type="poster" 
          alt={entry.title} 
          className="w-full h-full object-cover aspect-[2/3] sm:aspect-auto" 
        />
      </Link>
      
      {/* Details & Controls */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <Link to={`/${entry.mediaType}/${entry.mediaId}`} className="hover:text-blue-500 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                {entry.title}
              </h3>
            </Link>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
              {entry.mediaType}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Added: {new Date(entry.addedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
          <select 
            value={entry.status}
            onChange={handleStatusChange}
            className="bg-gray-50 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="want_to_watch">Want to Watch</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
          </select>

          <button 
            onClick={() => watchlistStore.removeEntry(entry.id)}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};