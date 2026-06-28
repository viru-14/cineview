import { useParams } from 'react-router-dom'; // <-- Make sure useParams is imported
import { useSeasonDetailController } from '../controllers/useSeasonDetailController';
import { TMDBImage } from '../../../Common';
import { EpisodeCheckbox } from '../../../Collection'; // <-- Import the new checkbox

export const SeasonDetail = () => {
  // We need the TV Show ID from the URL to pass to our checkbox
  const { id: tvId } = useParams<{ id: string }>(); 
  const { season, status } = useSeasonDetailController();

  if (status === 'loading') return <div className="p-8 text-center text-gray-400 animate-pulse">Loading episodes...</div>;
  if (status === 'error' || !season) return <div className="p-8 text-center text-red-500">Failed to load season details.</div>;

  return (
    <div className="flex flex-col gap-6 mt-6">
      {season.episodes.map((episode) => (
        <div key={episode.id} className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
          
          <div className="w-full md:w-64 h-36 flex-shrink-0 bg-gray-100 dark:bg-gray-900">
            <TMDBImage path={episode.still_path || null} type="backdrop" alt={episode.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="p-4 flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {episode.episode_number}. {episode.name}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                {episode.air_date || 'Unknown Date'}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {episode.overview || 'No synopsis available for this episode.'}
            </p>
            
            {/* Replace the Milestone 6 Placeholder with this: */}
            {tvId && <EpisodeCheckbox tvId={tvId} episodeId={episode.id} />}
            
          </div>
        </div>
      ))}
    </div>
  );
};