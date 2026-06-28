import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { collectionsStore } from '../../data/stores/CollectionsStore';
import { CreateCollectionModal } from '../components/CreateCollectionModal';
import { TMDBImage } from '../../../Common';

type PendingDelete = {
  id: string;
  name: string;
};

export const CollectionsPage = observer(() => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const collections = collectionsStore.collections;

  const handleCreate = (name: string, desc: string) => {
    collectionsStore.createCollection(name, desc);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    collectionsStore.deleteCollection(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pb-20">
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
      />

      {pendingDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Delete collection?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Delete &quot;{pendingDelete.name}&quot;? This will not remove items from your
              watchlist.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Collections</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
        >
          + New Collection
        </button>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            You haven&apos;t created any custom collections yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => {
            const coverPath =
              collection.items.length > 0 ? collection.items[0].poster_path : null;

            return (
              <div
                key={collection.id}
                className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors h-48 flex flex-col"
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
                  <TMDBImage
                    path={coverPath}
                    type="backdrop"
                    alt="Cover"
                    className="w-full h-full object-cover blur-sm"
                  />
                </div>

                <div className="relative z-20 flex justify-end p-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setPendingDelete({ id: collection.id, name: collection.name })
                    }
                    className="text-xs text-red-600 hover:text-red-800 font-semibold bg-white/95 dark:bg-gray-900/95 px-3 py-1.5 rounded shadow-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </div>

                <Link
                  to={`/collections/${collection.id}`}
                  className="relative z-0 flex flex-1 flex-col px-6 pb-4 justify-between min-h-0 bg-gradient-to-t from-white/90 dark:from-gray-900/90 to-transparent"
                >
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                      {collection.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                      {collection.description || 'No description'}
                    </p>
                  </div>

                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {collection.items.length} Items
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});