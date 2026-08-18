import { API_ENDPOINTS } from '@/lib/constants/api';
import httpClient from '@/lib/http-client';
import { useEffect, useState } from 'react';

export const useGetClassesListsForCourseId = (courseId: number) => {
  const [data, setData] = useState<TResponse<TResponsePagination<TClasses[]>> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [limit, setLimitState] = useState(10);
  const [page, setPage] = useState(1);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDateOrder, setStartDateOrder] = useState<'asc' | 'desc'>('asc');

  const fetchData = async () => {
    setIsLoading(true);
    setIsPending(true);

    try {
      const res = await httpClient.get<TResponse<TResponsePagination<TClasses[]>>>(
        `${API_ENDPOINTS.SCHEDULE.CLASSES_LIST}?limit=${limit}&offset=${page}&course_id=${courseId}&month=${month}&year=${year}&start_date_order=${startDateOrder}`,
      );

      if (res?.data) {
        setData(res as TResponse<TResponsePagination<TClasses[]>>);
      }
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    } finally {
      setIsLoading(false);
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courseId, limit, page, month, year, startDateOrder]);

  const setLimitHandler = () => {
    setLimitState((prev) => prev + 10);
  };

  const setMonthQuery = (newMonth: number, newYear: number) => {
    setMonth(newMonth);
    setYear(newYear);
    setPage(1);
    setLimitState(10);
  };

  const setDateOrder = (order: 'asc' | 'desc') => {
    setStartDateOrder(order);
    setPage(1);
  };

  return {
    data,
    isLoading,
    isPending,
    setLimit: setLimitHandler,
    setMonthQuery,
    setDateOrder,
  };
};
