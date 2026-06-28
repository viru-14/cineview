import { useState } from 'react';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import { useTVDetailController } from '../controllers/useTVDetailController';
import { TMDBImage, TrailerModal, SectionErrorBoundary, type MediaItem } from '../../../Common';
import { WatchlistToggle, AddToCollectionModal } from '../../../Collection';

export const TVShowDetailPage = () => {
  const { id } = useParams();
  const { show, status, trailerKey, isTrailerOpen, setIsTrailerOpen } = useTVDetailController();

  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  if (status === 'loading') {
    return <div className="p-12 text-center text-gray-400">Loading TV show details...</div>;
  }

  if (status === 'error' || !show) {
    return <div className="p-12 text-center text-red-500">Show Not Found</div>;
  }

  const standardSeasons = show.seasons?.filter((s) => s.season_number > 0) || [];
  const mediaItem = show as MediaItem;

  return (
    <div className="pb-20 relative">
      <TrailerModal
        isOpen={isTrailerOpen}
        videoKey={trailerKey}
        onClose={() => setIsTrailerOpen(false)}
      />

      <AddToCollectionModal
        isOpen={isCollectionModalOpen}
        mediaItem={mediaItem}
        onClose={() => setIsCollectionModalOpen(false)}
      />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <div className="absolute inset-0 z-0 opacity-30">
          <TMDBImage
            path={show.backdrop_path}
            type="backdrop"
            alt={show.name || 'Backdrop'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col md:flex-row items-end pb-12 gap-8">
          <div className="hidden md:block w-64 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-gray-700 mt-12">
            <TMDBImage
              path={show.poster_path}
              type="poster"
              alt={show.name || 'Poster'}
              className="w-full"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{show.name}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
              <span className="text-yellow-500 font-bold">
                ★ {show.vote_average?.toFixed(1) || 'NR'}
              </span>
              <span>{show.first_air_date?.split('-')[0] || 'Unknown Year'}</span>
              <span>{show.number_of_seasons} Seasons</span>
            </div>

            <p className="text-gray-300 text-lg max-w-3xl mb-8 leading-relaxed">{show.overview}</p>

            <div className="flex flex-wrap gap-4">
              {trailerKey && (
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition"
                >
                  ▶ Play Trailer
                </button>
              )}

              <WatchlistToggle item={mediaItem} variant="button" />

              <button
                onClick={() => setIsCollectionModalOpen(true)}
                className="bg-transparent border border-white text-white px-8 py-3 rounded font-bold hover:bg-white/10 transition"
              >
                + Add to List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons & Episodes Section */}
      <div className="container mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">Seasons</h2>

        <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
          {standardSeasons.map((season) => (
            <NavLink
              key={season.id}
              to={`/tv/${id}/season/${season.season_number}`}
              className={({ isActive }) =>
                `whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-colors border ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                }`
              }
            >
              Season {season.season_number}
            </NavLink>
          ))}
        </div>

        <SectionErrorBoundary sectionName="Season Episodes">
          <Outlet />
        </SectionErrorBoundary>
      </div>
    </div>
  );
};