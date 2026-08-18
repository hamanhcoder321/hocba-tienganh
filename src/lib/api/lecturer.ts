import { API_BASE_URL } from '@/lib/constants/api';

export interface FetchLecturersParams {
  page?: number;
  limit?: number;
  search?: string;
  program?: string;
  min_experience?: number;
  max_experience?: number;
  gender?: number;
}

/**
 * Fetch lecturers from API with filtering support
 *
 * API supports the following query parameters:
 * - page: Page number (default: 1)
 * - limit: Number of items per page (default: 100)
 * - search: Search by lecturer name (e.g., "Hoàng")
 * - program: Filter by program (e.g., "HSK 1-2", "Tiếng Trung Giao Tiếp Cơ Bản")
 * - min_experience: Minimum years of experience (e.g., 1)
 * - max_experience: Maximum years of experience (e.g., 3)
 * - gender: Gender filter (1 for male, 2 for female)
 *
 * Example: /teachers/teacher-list-v2?page=1&limit=10&search=Hùng&min_experience=1&max_experience=3&gender=1
 */
export async function fetchLecturersClient(params: FetchLecturersParams) {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('page', String(params.page || 1));
    searchParams.append('limit', String(params.limit || 100));

    if (params.search) {
      searchParams.append('search', params.search);
    }

    if (params.program) {
      searchParams.append('program', params.program);
    }

    if (params.min_experience !== undefined) {
      searchParams.append('min_experience', String(params.min_experience));
    }

    if (params.max_experience !== undefined) {
      searchParams.append('max_experience', String(params.max_experience));
    }

    if (params.gender !== undefined) {
      searchParams.append('gender', String(params.gender));
    }

    const url = `${API_BASE_URL}/teachers/teacher-list-v2?${searchParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.list || [];
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    return [];
  }
}
