import { type Genre } from '../../../Common';

interface GenreFilterProps {
  genres: Genre[];
  activeGenreId: number | null;
  onSelect: (id: number | null) => void;
}

export const GenreFilter = ({ genres, activeGenreId, onSelect }: GenreFilterProps) => {
  if (!genres.length) return null;

  return (
    <div className="flex overflow-x-auto gap-3 py-4 px-6 no-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeGenreId === null 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        All
      </button>
      
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeGenreId === genre.id 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};