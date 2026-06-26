import { useSearchController } from '../controllers/useSearchController';
import { MediaCard, TMDBImage, SectionErrorBoundary } from '../../../Common';

export const SearchPage = () => {
  const { 
    query, handleQueryChange, results, status, 
    recentSearches, clearRecentSearches 
  } = useSearchController();

  // Grouping logic as requested by specification
  const movies = results.filter(r => r.media_type === 'movie');
  const tvShows = results.filter(r => r.media_type === 'tv');
  const people = results.filter(r => r.media_type === 'person');

  return (
    <div className="p-6 max-w-7xl mx-auto pb-20">
      {/* Mobile/Dedicated Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        placeholder="Search for movies, TV shows, people..."
        className="w-full bg-gray-800 text-white text-xl p-4 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 mb-8"
        autoFocus
      />

      {/* Loading State */}
      {status === 'loading' && <p className="text-gray-400">Searching TMDB...</p>}
      
      {/* Error State */}
      {status === 'error' && <p className="text-red-500">Failed to fetch search results.</p>}

      {/* Idle / Recent Searches State */}
      {status === 'idle' && !query && recentSearches.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-300">Recent Searches</h2>
            <button onClick={clearRecentSearches} className="text-sm text-gray-500 hover:text-white">Clear</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map(term => (
              <button 
                key={term} 
                onClick={() => handleQueryChange(term)}
                className="bg-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results State */}
      {status === 'success' && results.length === 0 && (
        <p className="text-gray-400 text-lg">No results found for "{query}".</p>
      )}

      {status === 'success' && results.length > 0 && (
        <div className="flex flex-col gap-10">
          <SectionErrorBoundary sectionName="Movies Results">
            {movies.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Movies</h2>
                <div className="flex flex-wrap gap-4">
                  {movies.map(movie => <MediaCard key={movie.id} item={movie} />)}
                </div>
              </section>
            )}
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="TV Shows Results">
            {tvShows.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">TV Shows</h2>
                <div className="flex flex-wrap gap-4">
                  {tvShows.map(show => <MediaCard key={show.id} item={show} />)}
                </div>
              </section>
            )}
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="People Results">
            {people.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">People</h2>
                <div className="flex flex-wrap gap-4">
                  {people.map(person => (
                    <div key={person.id} className="w-36 flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800 mb-2">
                        <TMDBImage path={person.profile_path || null} type="profile" alt={person.name || 'Person'} className="w-full h-full" />
                      </div>
                      <span className="text-sm font-semibold">{person.name}</span>
                      <span className="text-xs text-gray-500 truncate w-full">{person.known_for_department}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </SectionErrorBoundary>
        </div>
      )}
    </div>
  );
};