import { API_ENDPOINTS } from '@/lib/constants/api';
import httpClient from '@/lib/http-client';

export const searchApi = {
  globalSearch: async (params: { s: string; page?: number; limit?: number }) => {
    const { s, page = 1, limit = 10 } = params;
    return await httpClient.get<TResponse<TResponsePagination<TBlogs[]>>>(
      `${API_ENDPOINTS.SEARCH.GLOBAL}?s=${encodeURIComponent(s)}&page=${page}&limit=${limit}`,
    );
  },
};

export default searchApi;
