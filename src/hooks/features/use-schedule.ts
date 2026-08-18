import scheduleApi from '@/lib/api/schedule';
import type { TSchedule } from '@/types/schedule';
import { useCallback, useEffect, useState } from 'react';

export const useGetOpeningSchedule = (category: string, session?: string, shift?: string) => {
  const [data, setData] = useState<TSchedule[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = useCallback(async () => {
    if (!category) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await scheduleApi.getOpeningSchedule(category, session, shift);
      setData(res.data || null);
    } catch (err: any) {
      console.error('Error fetching schedule:', err);
      setError(err.message || 'Failed to fetch schedule');
    } finally {
      setIsLoading(false);
    }
  }, [category, session, shift]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchSchedule,
  };
};
