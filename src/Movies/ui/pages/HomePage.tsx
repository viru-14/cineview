import { SectionErrorBoundary } from '../../../Common';
import { useHomeController } from '../controllers/useHomeController';
import { HeroBanner } from '../components/HeroBanner';
import { GenreFilter } from '../components/GenreFilter';
import { ContentRow } from '../components/ContentRow';

export const HomePage = () => {
  const { 
    activeGenreId, setActiveGenreId, genres, 
    trending, popular, topRated 
  } = useHomeController();

  // The first trending item is featured in the Hero Banner
  const heroItem = trending.data[0];

  return (
    <div className="pb-12">
      {/* Hero Banner Section */}
      <SectionErrorBoundary sectionName="Hero Banner">
        {trending.status === 'success' && heroItem && (
          <HeroBanner item={heroItem} />
        )}
      </SectionErrorBoundary>

      {/* Genre Filter Section */}
      {genres.status === 'success' && (
        <GenreFilter 
          genres={genres.data} 
          activeGenreId={activeGenreId} 
          onSelect={setActiveGenreId} 
        />
      )}

      {/* Content Rows */}
      <div className="flex flex-col gap-2 mt-4">
        <SectionErrorBoundary sectionName="Trending Row">
          <ContentRow title="Trending Now" items={trending.data} status={trending.status} />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Popular Row">
          <ContentRow title="Popular Movies" items={popular.data} status={popular.status} />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Top Rated Row">
          <ContentRow title="Top Rated" items={topRated.data} status={topRated.status} />
        </SectionErrorBoundary>
      </div>
    </div>
  );
};