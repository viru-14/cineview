import { observer } from 'mobx-react-lite';
import { episodeTrackingStore } from '../../data/stores/EpisodeTrackingStore';

interface EpisodeCheckboxProps {
  tvId: string | number;
  episodeId: number;
}

export const EpisodeCheckbox = observer(({ tvId, episodeId }: EpisodeCheckboxProps) => {
  // Read directly from our new MobX store
  const isWatched = episodeTrackingStore.isEpisodeWatched(tvId, episodeId);

  const handleToggle = () => {
    episodeTrackingStore.toggleEpisode(tvId, episodeId);
  };

  return (
    <button 
      onClick={handleToggle}
      className={`flex items-center gap-2 mt-4 px-3 py-1.5 rounded-md transition-colors border ${
        isWatched 
          ? 'bg-green-600/20 border-green-500 text-green-500 hover:bg-green-600/30' 
          : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {/* Custom checkbox icon for better styling control than standard HTML inputs */}
      <div className={`w-5 h-5 rounded flex items-center justify-center border ${
        isWatched ? 'bg-green-500 border-green-500 text-white' : 'border-gray-500 bg-transparent'
      }`}>
        {isWatched && (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      
      <span className="text-sm font-medium">
        {isWatched ? 'Watched' : 'Mark as watched'}
      </span>
    </button>
  );
});