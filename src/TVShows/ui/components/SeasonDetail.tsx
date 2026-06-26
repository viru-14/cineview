import { useSeasonDetailController } from '../controllers/useSeasonDetailController';
import { TMDBImage } from '../../../Common';

export const SeasonDetail = () => {
  const { season, status } = useSeasonDetailController();

  if (status === 'loading') return <div className="p-8 text-center text-gray-400 animate-pulse">Loading episodes...</div>;
  if (status === 'error' || !season) return <div className="p-8 text-center text-red-500">Failed to load season details.</div>;

  return (
    <div className="flex flex-col gap-6 mt-6">
      {season.episodes.map((episode) => (
        <div key={episode.id} className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-md">
          {/* Episode Image */}
          <div className="w-full md:w-64 h-36 flex-shrink-0 bg-gray-900">
            <TMDBImage 
              path={episode.still_path || null} 
              type="backdrop" 
              alt={episode.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Episode Details */}
          <div className="p-4 flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-white">
                {episode.episode_number}. {episode.name}
              </h4>
              <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                {episode.air_date || 'Unknown Date'}
              </span>
            </div>
            <p className="text-sm text-gray-300 line-clamp-3">
              {episode.overview || 'No synopsis available for this episode.'}
            </p>
            
            {/* Milestone 6 Placeholder: Watched Checkbox */}
            <div className="mt-4 flex items-center gap-2">
              <input 
                type="checkbox" 
                disabled 
                className="w-4 h-4 rounded bg-gray-700 border-gray-600"
                title="Episode tracking coming in Milestone 6"
              />
              <span className="text-xs text-gray-500 italic">Mark as watched (Coming in M6)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};