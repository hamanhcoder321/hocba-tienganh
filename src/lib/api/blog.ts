import { API_ENDPOINTS } from '@/lib/constants/api';
import httpClient from '@/lib/http-client';

export const blogApi = {
  getBlogList: async (params: { page: number; limit: number; queryParams?: string }) => {
    const { page, limit, queryParams } = params;
    return await httpClient.get<TResponse<TResponsePagination<any[]>>>(
      `${API_ENDPOINTS.BLOG.LIST}?page=${page}&limit=${limit}${queryParams ? '&' + queryParams : ''}`,
    );
  },

  getBlogDetail: async (slug: string) => {
    return await httpClient.get(`${API_ENDPOINTS.BLOG.DETAIL_PREFIX}${slug}`);
  },

  getBlogCategoryList: async () => {
    return await httpClient.get(API_ENDPOINTS.BLOG.CATEGORY_LIST);
  },

  updateBlogViews: async (slug: string) => {
    return await httpClient.put(`${API_ENDPOINTS.BLOG.VIEWS_PREFIX}${slug}`, {});
  },
};

export default blogApi;
