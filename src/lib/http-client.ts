import { API_BASE_URL } from '@/lib/constants/api';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string;
  params?: Record<string, string | number | boolean | undefined>;
};

type InternalOptions = CustomOptions & {
  method?: string;
};

export class HttpError extends Error {
  status: number;
  payload: any;

  constructor(status: number, payload: any) {
    super(JSON.stringify(payload));
    this.status = status;
    this.payload = payload;
  }
}

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

async function request<T>(
  endpoint: string,
  { baseUrl = API_BASE_URL, params, headers, ...customConfig }: InternalOptions = {},
) {
  const token = getAccessToken();

  const authHeader: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authHeader,
    ...((headers as Record<string, string>) || {}),
  };

  if (requestHeaders['Content-Type'] === 'undefined') {
    delete requestHeaders['Content-Type'];
  }

  const config: RequestInit = {
    ...customConfig,
    headers: requestHeaders,
  };

  let url = `${baseUrl}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) url += `?${queryString}`;
  }

  const response = await fetch(url, config);

  let data: any;
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : {};
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
    }
    throw new HttpError(response.status, data);
  }

  return data as T;
}

export const httpClient = {
  get: <T>(url: string, options?: CustomOptions) => request<T>(url, { ...options, method: 'GET' }),

  post: <T>(url: string, body: any, options?: CustomOptions) =>
    request<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) }),

  put: <T>(url: string, body: any, options?: CustomOptions) =>
    request<T>(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  delete: <T>(url: string, options?: CustomOptions) => request<T>(url, { ...options, method: 'DELETE' }),

  upload: <T>(url: string, formData: FormData, options?: CustomOptions) => {
    const { headers, ...rest } = options || {};

    return request<T>(url, {
      ...rest,
      method: 'POST',
      body: formData,
      headers: {
        ...headers,
        'Content-Type': 'undefined' as any,
      },
    });
  },
};

export default httpClient;
