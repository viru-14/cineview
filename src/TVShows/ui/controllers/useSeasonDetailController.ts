import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TMDBService, type SeasonDetail, type Status } from '../../../Common';

export const useSeasonDetailController = () => {
  // We extract both the show ID and the season number from the nested URL
  const { id, seasonNumber } = useParams<{ id: string; seasonNumber: string }>();
  const [season, setSeason] = useState<SeasonDetail | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (!id || !seasonNumber) return;

    const fetchSeason = async () => {
      setStatus('loading');
      try {
        const data = await TMDBService.getSeasonDetails(id, seasonNumber);
        setSeason(data);
        setStatus('success');
      } catch (error) {
        //console.error('Season fetch failed:', error);
        setStatus('error');
      }
    };

    fetchSeason();
  }, [id, seasonNumber]);

  return { season, status };
};