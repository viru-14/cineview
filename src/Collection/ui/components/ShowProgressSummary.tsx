import { observer } from 'mobx-react-lite';
import { episodeTrackingStore } from '../../data/stores/EpisodeTrackingStore';
import { ProgressBar } from './ProgressBar';

interface ShowProgressSummaryProps {
  tvId: string | number;
  seasons: { season_number: number; episode_count: number }[];
}

export const ShowProgressSummary = observer(({ tvId, seasons }: ShowProgressSummaryProps) => {
  const progress = episodeTrackingStore.getShowProgress(tvId, seasons);

  if (progress.total === 0) return null;

  return (
    <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <ProgressBar
        label="Show progress"
        watched={progress.watched}
        total={progress.total}
        percent={progress.percent}
      />
    </div>
  );
});