import teacherApi from '@/lib/api/teacher';
import { useCallback, useEffect, useState } from 'react';

export const useGetTeacherLists = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(12);
  const [queryParams, setQueryParams] = useState('');
  const [enabled, setEnabled] = useState(true);

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const fetchTeachers = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setIsPending(true);

    try {
      const res = await teacherApi.getTeacherList({
        page,
        limit,
        queryParams,
      });

      if (res?.data) {
        setData(res.data);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setIsLoading(false);
      setIsPending(false);
    }
  }, [page, limit, queryParams, enabled]);

  useEffect(() => {
    if (enabled) {
      fetchTeachers();
    }
  }, [fetchTeachers, enabled]);

  return {
    data,
    isLoading,
    isPending,
    setPage,
    setLimit,
    limit,
    setQueryParams,
    setEnabled,
    refetch: fetchTeachers,
  };
};
