import { API_ENDPOINTS } from '@/lib/constants/api';
import httpClient from '@/lib/http-client';
import type { TClasses, TSchedule } from '@/types/schedule';

export const scheduleApi = {
  getOpeningSchedule: async (categoryId: string, session?: string, shift?: string) => {
    let url = `${API_ENDPOINTS.SCHEDULE.OPENING}?category_id=${categoryId}`;
    if (session && session !== 'Tất cả') {
      url += `&session=${encodeURIComponent(session)}`;
    }
    if (shift && shift !== 'Tất cả') {
      url += `&shift=${encodeURIComponent(shift)}`;
    }
    return await httpClient.get<TResponse<TSchedule[]>>(url);
  },

  getClassesList: async (params: {
    limit: number;
    page: number;
    course_id: number;
    month: number;
    year: number;
    start_date_order: 'asc' | 'desc';
  }) => {
    const { limit, page, course_id, month, year, start_date_order } = params;
    return await httpClient.get<TResponse<TResponsePagination<TClasses[]>>>(
      `${API_ENDPOINTS.SCHEDULE.CLASSES_LIST}?limit=${limit}&offset=${page}&course_id=${course_id}&month=${month}&year=${year}&start_date_order=${start_date_order}`,
    );
  },
};

export default scheduleApi;
