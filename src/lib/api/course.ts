import httpClient from '@/lib/http-client';

export const courseApi = {
  getCourseList: async (params: { limit: number; offset: number }) => {
    return await httpClient.get<TResponse<TResponsePagination<TCourse[]>>>('/course/course-list', {
      params,
    });
  },
};

export default courseApi;
