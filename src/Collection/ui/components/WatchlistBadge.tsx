import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { watchlistStore } from '../../data/stores/WatchlistStore';

export const WatchlistBadge = observer(() => {
  const count = watchlistStore.totalCount;

  return (
    <Link 
      to="/watchlist" 
      className="relative flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
      title="My Watchlist"
    >
      {/* A simple bookmark/list icon representation */}
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      
      {/* Only show the red bubble if there is at least 1 item */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
});