import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useSeasonDetailController } from '../controllers/useSeasonDetailController';
import { TMDBImage } from '../../../Common';
import {
  EpisodeCheckbox,
  SeasonProgressSummary,
  episodeTrackingStore,
} from '../../../Collection';

export const SeasonDetail = observer(() => {
  const { id: tvId } = useParams<{ id: string }>();
  const { season, status } = useSeasonDetailController();

  if (status === 'loading') {
    return (
      <div className="p-8 text-center text-gray-400 animate-pulse">Loading episodes...</div>
    );
  }

  if (status === 'error' || !season) {
    return (
      <div className="p-8 text-center text-red-500">Failed to load season details.</div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-6">
      {tvId && <SeasonProgressSummary tvId={tvId} episodes={season.episodes} />}

      {season.episodes.map((episode) => {
        const isWatched = tvId
          ? episodeTrackingStore.isEpisodeWatched(tvId, episode.id)
          : false;

        return (
          <div
            key={episode.id}
            className={`relative flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg overflow-hidden border shadow-sm transition-colors ${
              isWatched
                ? 'border-green-500/40 dark:border-green-500/30'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            {isWatched && (
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"
                aria-hidden="true"
              />
            )}

            <div className="w-full md:w-64 h-36 flex-shrink-0 bg-gray-100 dark:bg-gray-900">
              <TMDBImage
                path={episode.still_path || null}
                type="backdrop"
                alt={episode.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-2 gap-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {episode.episode_number}. {episode.name}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {episode.air_date || 'Unknown Date'}
                </span>
              </div>

              {isWatched && (
                <span className="inline-flex self-start text-xs font-semibold text-green-600 dark:text-green-400 mb-2">
                  ✓ Watched
                </span>
              )}

              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {episode.overview || 'No synopsis available for this episode.'}
              </p>

              <div className="mt-3">
                <div className="h-1 w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isWatched ? 'bg-green-500 w-full' : 'bg-transparent w-0'
                    }`}
                  />
                </div>

                {tvId && <EpisodeCheckbox tvId={tvId} episodeId={episode.id} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});