import { API_ENDPOINTS } from '@/lib/constants/api';
import { httpClient } from '@/lib/http-client';

export interface RedirectResult {
  target?: string;
  source?: string;
  [key: string]: unknown;
}

export async function checkRedirectApi(source: string): Promise<RedirectResult | null> {
  try {
    const data = await httpClient.post<{ data: RedirectResult | null }>(API_ENDPOINTS.REDIRECT.CHECK, { source });
    return data.data;
  } catch (error) {
    return null;
  }
}
