import { useState } from 'react';

// Fallback to the public CDN if the env variable isn't read properly
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

interface TMDBImageProps {
  path: string | null | undefined;
  type: 'poster' | 'backdrop' | 'profile';
  alt: string;
  className?: string;
}

export const TMDBImage = ({ path, type, alt, className = '' }: TMDBImageProps) => {
  const [hasError, setHasError] = useState(false);

  // TMDB requires explicit sizes in the URL. We use sensible defaults here.
  const sizeMap = {
    poster: 'w500',
    backdrop: 'w780',
    profile: 'w185',
  };

  // If the API returned null for the path, or the image failed to download, show a placeholder
  if (!path || hasError) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center text-gray-500 text-center p-4 ${className}`}>
        <span className="text-sm">{alt || 'No Image'}</span>
      </div>
    );
  }

  const imageUrl = `${IMAGE_BASE_URL}/${sizeMap[type]}${path}`;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};