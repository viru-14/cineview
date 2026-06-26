import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TMDBService, type TVDetail, type Status } from '../../../Common';

export const useTVDetailController = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<TVDetail | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setStatus('loading');
      try {
        const data = await TMDBService.getTVDetails(id);
        setShow(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchDetail();
  }, [id]);

  const trailerVideo = show?.videos?.results.find(
    (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
  ) || show?.videos?.results.find((vid) => vid.site === 'YouTube');

  return {
    show,
    status,
    trailerKey: trailerVideo?.key || null,
    isTrailerOpen,
    setIsTrailerOpen,
  };
};