import { API_ENDPOINTS } from '@/lib/constants/api';
import httpClient from '@/lib/http-client';
import type { RegisterStudyBodyType } from '@/lib/schemas/common';

export const commonApi = {
  registerStudy: async (data: RegisterStudyBodyType) => {
    return await httpClient.post<TResponse<any>>(API_ENDPOINTS.USER.REGISTER_STUDY, data);
  },
  getSettings: async () => {
    return await httpClient.get<any>(API_ENDPOINTS.COMMON.SETTINGS);
  },
};

export default commonApi;
