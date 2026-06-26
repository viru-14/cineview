import { type MediaItem, MediaCard, type Status } from '../../../Common';

interface ContentRowProps {
  title: string;
  items: MediaItem[];
  status: Status;
}

export const ContentRow = ({ title, items, status }: ContentRowProps) => {
  // If the API call fails, we just don't render this row.
  // The SectionErrorBoundary higher up can also catch harder crashes.
  if (status === 'error') return null; 

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold text-white mb-4 px-6">{title}</h2>
      
      <div className="flex overflow-x-auto gap-4 px-6 pb-4 no-scrollbar">
        {status === 'loading' || status === 'idle' ? (
          // Loading Skeletons
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-36 sm:w-44 aspect-[2/3] bg-gray-800 rounded-lg animate-pulse flex-shrink-0" />
          ))
        ) : items.length === 0 ? (
          // Empty State (e.g., if genre filtering leaves no results)
          <p className="text-gray-500 italic">No items found for this category.</p>
        ) : (
          // Actual Data
          items.map((item) => (
            <MediaCard 
              key={item.id} 
              item={item} 
            />
          ))
        )}
      </div>
    </div>
  );
};