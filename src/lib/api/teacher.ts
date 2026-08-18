import { API_ENDPOINTS } from '@/lib/constants/api';
import httpClient from '@/lib/http-client';

export const teacherApi = {
  getTeacherList: async (params: { page: number; limit: number; queryParams?: string }) => {
    const { page, limit, queryParams } = params;
    return await httpClient.get<TResponse<TResponsePagination<TTeacher[]>>>(
      `${API_ENDPOINTS.TEACHER.LIST}?limit=${limit}&offset=${page}${queryParams ? '&' + queryParams : ''}`,
    );
  },
};

export default teacherApi;
