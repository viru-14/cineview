import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { collectionsStore } from '../../data/stores/CollectionsStore';
import { MediaCard } from '../../../Common';

export const CollectionDetailPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const collection = id ? collectionsStore.getCollectionById(id) : undefined;

  if (!collection) {
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl text-red-500 mb-4">Collection Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          This collection doesn't exist or may have been deleted.
        </p>
        <Link to="/collections" className="text-blue-500 hover:underline">
          ← Back to Collections
        </Link>
      </div>
    );
  }

  const handleRemoveItem = (mediaId: number) => {
    collectionsStore.removeItemFromCollection(collection.id, mediaId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pb-20">
      <Link
        to="/collections"
        className="text-blue-500 hover:underline text-sm font-medium mb-6 inline-block"
      >
        ← Back to Collections
      </Link>

      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {collection.name}
        </h1>
        {collection.description && (
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            {collection.description}
          </p>
        )}
      </div>

      {collection.items.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          This collection is empty. Go to a movie or TV show page to add items here!
        </p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {collection.items.map((item) => (
            <div key={item.id} className="relative group">
              <MediaCard item={item} />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveItem(item.id);
                }}
                className="absolute top-2 left-2 w-8 h-8 rounded-full bg-red-600 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:bg-red-700 shadow-md"
                title="Remove from collection"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});