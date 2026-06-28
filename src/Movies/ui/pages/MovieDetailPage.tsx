import { useParams, Link } from 'react-router-dom';
import { useMovieDetailController } from '../controllers/useMovieDetailController';
import { TMDBImage, TrailerModal, SectionErrorBoundary } from '../../../Common';
import { WatchlistToggle } from '../../../Collection';

export const MovieDetailPage = () => {
  const { id } = useParams();
  const { 
    movie, status, trailerKey, isTrailerOpen, setIsTrailerOpen, formatRuntime 
  } = useMovieDetailController();

  if (status === 'loading') {
    return <div className="p-12 text-center text-gray-400">Loading movie details...</div>;
  }

  if (status === 'error' || !movie) {
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl text-red-500 mb-4">Movie Not Found</h1>
        <p className="text-gray-400 mb-6">We couldn't find the movie you're looking for (ID: {id}).</p>
        <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="pb-20 relative">
      <TrailerModal 
        isOpen={isTrailerOpen} 
        videoKey={trailerKey} 
        onClose={() => setIsTrailerOpen(false)} 
      />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <div className="absolute inset-0 z-0 opacity-30">
          <TMDBImage path={movie.backdrop_path} type="backdrop" alt={movie.title || 'Backdrop'} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col md:flex-row items-end pb-12 gap-8">
          {/* Poster */}
          <div className="hidden md:block w-64 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-gray-700 mt-12">
            <TMDBImage path={movie.poster_path} type="poster" alt={movie.title || 'Poster'} className="w-full" />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
              <span className="text-yellow-500 font-bold">★ {movie.vote_average?.toFixed(1) || 'NR'}</span>
              <span>{movie.release_date?.split('-')[0] || 'Unknown Year'}</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <div className="flex gap-2">
                {movie.genres?.map(g => (
                  <span key={g.id} className="border border-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-300 text-lg max-w-3xl mb-8 leading-relaxed">
              {movie.overview}
            </p>

            <div className="flex gap-4">
              {trailerKey && (
                <button 
                  onClick={() => setIsTrailerOpen(true)}
                  className="bg-white text-black px-8 py-3 rounded hover:bg-gray-200 font-bold transition flex items-center gap-2"
                >
                  ▶ Play Trailer
                </button>
              )}
              <WatchlistToggle item={movie} variant="button" />
            </div>
          </div>
        </div>
      </div>

      {/* Cast Carousel */}
      <SectionErrorBoundary sectionName="Cast Members">
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <div className="container mx-auto px-6 mt-12">
            <h2 className="text-2xl font-bold mb-6">Top Cast</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
              {movie.credits.cast.slice(0, 15).map(person => (
                <div key={person.id} className="w-32 flex-shrink-0">
                  <div className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2">
                    <TMDBImage path={person.profile_path || null} type="profile" alt={person.name} className="w-full h-full" />
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">{person.name}</h3>
                  <p className="text-xs text-gray-400 truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionErrorBoundary>
    </div>
  );
};