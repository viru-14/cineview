import { observer } from 'mobx-react-lite';
import { type MediaItem } from '../../../Common';
import { collectionsStore } from '../../data/stores/CollectionsStore';

interface AddToCollectionModalProps {
  isOpen: boolean;
  mediaItem: MediaItem;
  onClose: () => void;
}

export const AddToCollectionModal = observer(({ isOpen, mediaItem, onClose }: AddToCollectionModalProps) => {
  if (!isOpen) return null;

  const collections = collectionsStore.collections;

  const handleToggle = (collectionId: string) => {
    const isInside = collectionsStore.isItemInCollection(collectionId, mediaItem.id);
    if (isInside) {
      collectionsStore.removeItemFromCollection(collectionId, mediaItem.id);
    } else {
      collectionsStore.addItemToCollection(collectionId, mediaItem);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800 transition-colors flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Save to Collection</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 font-bold">X</button>
        </div>
        
        {collections.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">You don't have any collections yet. Create one from the Collections page!</p>
        ) : (
          <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar py-2">
            {collections.map(collection => {
              const isSaved = collectionsStore.isItemInCollection(collection.id, mediaItem.id);
              return (
                <button
                  key={collection.id}
                  onClick={() => handleToggle(collection.id)}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white truncate pr-4">{collection.name}</span>
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border ${
                    isSaved ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-400 bg-transparent'
                  }`}>
                    {isSaved && <span className="text-xs">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});