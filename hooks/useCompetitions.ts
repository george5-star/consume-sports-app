import { useState, useEffect } from 'react';
import { League } from '../types/leagues';
import { CompetitionsApi } from '../services/api/competitions';

export const useCompetitions = () => {
  const [competitions, setCompetitions] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setLoading(true);
        const data = await CompetitionsApi.getCompetitions();
        setCompetitions(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch competitions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  return { competitions, loading, error };
}; 