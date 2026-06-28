import { observer } from 'mobx-react-lite';
import { type Episode } from '../../../Common';
import { episodeTrackingStore } from '../../data/stores/EpisodeTrackingStore';
import { ProgressBar } from './ProgressBar';

interface SeasonProgressSummaryProps {
  tvId: string | number;
  episodes: Episode[];
}

export const SeasonProgressSummary = observer(({ tvId, episodes }: SeasonProgressSummaryProps) => {
  const progress = episodeTrackingStore.getSeasonProgress(tvId, episodes);
  const episodeIds = episodes.map((episode) => episode.id);
  const allWatched = progress.total > 0 && progress.watched === progress.total;

  return (
    <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <ProgressBar
        label="Season progress"
        watched={progress.watched}
        total={progress.total}
        percent={progress.percent}
      />

      <div className="flex flex-wrap gap-2 mt-3">
        <button
          type="button"
          onClick={() => episodeTrackingStore.setSeasonEpisodesWatched(tvId, episodeIds, true)}
          disabled={allWatched}
          className="text-xs px-3 py-1.5 rounded-md font-medium bg-green-600/20 text-green-600 dark:text-green-400 border border-green-500/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-600/30 transition-colors"
        >
          Mark all watched
        </button>
        <button
          type="button"
          onClick={() => episodeTrackingStore.setSeasonEpisodesWatched(tvId, episodeIds, false)}
          disabled={progress.watched === 0}
          className="text-xs px-3 py-1.5 rounded-md font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Unmark all
        </button>
      </div>
    </div>
  );
});