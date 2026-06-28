import { observer } from 'mobx-react-lite';
import { useWatchlistController } from '../controllers/useWatchlistController';
import { WatchlistCard } from '../components/WatchlistCard';

export const WatchlistPage = observer(() => {
  const { 
    activeTab, setActiveTab, sortBy, setSortBy, entries, counts 
  } = useWatchlistController();

  return (
    <div className="max-w-5xl mx-auto p-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
          My Watchlist
        </h1>
        
        {/* Sort Controls */}
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="title_asc">Title (A-Z)</option>
        </select>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2 no-scrollbar">
        {[
          { id: 'all', label: 'All', count: counts.total },
          { id: 'want_to_watch', label: 'Want to Watch', count: counts.wantToWatch },
          { id: 'watching', label: 'Watching', count: counts.watching },
          { id: 'completed', label: 'Completed', count: counts.completed }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`whitespace-nowrap px-4 py-2 rounded-t-lg text-sm font-bold transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label} <span className="ml-1 opacity-70 text-xs">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* List / Empty State */}
      {entries.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 transition-colors">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            {counts.total === 0 
              ? "Your watchlist is empty. Go find some great movies!" 
              : "No items match this status."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(entry => (
            <WatchlistCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
});