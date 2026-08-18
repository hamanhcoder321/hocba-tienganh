import httpClient from './http-client';

export async function fetchCourseDetail(slug: string) {
  try {
    const res = await httpClient.get<TResponse<TCourse>>(`/course/course-details/${slug}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch course detail for ${slug}:`, error);
    return null;
  }
}

export async function fetchCourseList(params: { page?: number; limit?: number; queryParams?: string }) {
  try {
    const { page = 1, limit = 50, queryParams } = params;
    let url = `/course/course-list?limit=${limit}&offset=${page}&type_course=0&sort_by=order_courses`;
    if (queryParams) url += `&${queryParams}`;

    const res = await httpClient.get<TResponse<TResponsePagination<TCourse[]>>>(url);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch course list:', error);
    return null;
  }
}

export async function fetchCourseListHeader(params: { page?: number; limit?: number }) {
  try {
    const { page = 1, limit = 100 } = params;
    const url = `/course/course-list-header?limit=${limit}&offset=${page}`;
    const res = await httpClient.get<TResponse<TResponsePagination<TCourse[]>>>(url);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch course list header:', error);
    return null;
  }
}

export async function fetchTeacherList(params: { page?: number; limit?: number }) {
  try {
    const { page = 0, limit = 20 } = params;
    const url = `/teachers/teacher-list?limit=${limit}&offset=${page}`;
    const res = await httpClient.get<TResponse<TResponsePagination<TLecturer[]>>>(url);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch teacher list:', error);
    return null;
  }
}

export async function fetchTeacherListV2(params: {
  page?: number;
  limit?: number;
  search?: string;
  program?: string;
  experience?: string;
}) {
  try {
    const { page = 1, limit = 100, search, program, experience } = params;
    let url = `/teachers/teacher-list-v2?page=${page}&limit=${limit}`;

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    if (program) {
      url += `&program=${encodeURIComponent(program)}`;
    }
    if (experience) {
      url += `&experience=${encodeURIComponent(experience)}`;
    }

    const res = await httpClient.get<TResponse<TResponsePagination<TLecturer[]>>>(url);

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function fetchTeacherDetail(slug: string) {
  try {
    const url = `/teachers/teacher-detail/${slug}`;
    const res = await httpClient.get<TResponse<TLecturer>>(url);

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function fetchRelatedTeachers(params: { tag: string; limit?: number }) {
  try {
    const { tag, limit = 4 } = params;
    const url = `/teachers/related?tag=${tag}&limit=${limit}`;
    const res = await httpClient.get<TResponse<TLecturer[]>>(url);

    return res.data;
  } catch (error) {
    console.error('Failed to fetch related teachers:', error);
    return null;
  }
}
export async function fetchStudents(params: { page: number; limit?: number }) {
  try {
    const { page, limit = 10 } = params;
    const url = `/student?page=${page}&limit=${limit}`;
    const res = await httpClient.get<TResponse<TStudentResponse>>(url);

    return res.data;
  } catch (error) {
    console.error('Failed to fetch related teachers:', error);
    return null;
  }
}

export async function fetchClassesList(params: {
  limit?: number;
  page?: number;
  month?: number;
  year?: number;
  course_id?: number;
  start_date_order?: string;
}) {
  try {
    const { limit = 10, page = 1, month, year, course_id, start_date_order } = params;
    let url = `/classes/classes-list?limit=${limit}&offset=${page}`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    if (course_id) url += `&course_id=${course_id}`;
    if (start_date_order) url += `&start_date_order=${start_date_order}`;

    const res = await httpClient.get<TResponse<TResponsePagination<TClasses[]>>>(url);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch classes list:', error);
    return null;
  }
}

export async function fetchOpeningSchedule(category: string) {
  try {
    const res = await httpClient.get<TResponse<TSchedule[]>>(`/classes/list-all?category_id=${category}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch opening schedule for category ${category}:`, error);
    return null;
  }
}

export async function fetchBlogCategoryList() {
  try {
    const res = await httpClient.get<TResponse<any>>('/public/get-category-list');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch blog categories:', error);
    return null;
  }
}

export async function fetchBlogList(params: { page?: number; limit?: number; queryParams?: string; notId?: string }) {
  try {
    const { page = 1, limit = 24, queryParams, notId } = params;
    let url = `/public/blog-list?limit=${limit}&offset=${page}`;
    if (queryParams) url += `&${queryParams}`;
    if (notId) url += `&notId=${notId}`;

    const res = await httpClient.get<TResponse<TResponsePagination<TBlogs[]>>>(url);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch blog list:', error);
    return null;
  }
}

export async function fetchBlogDetail(slug: string, categorySlug?: string) {
  try {
    const apiUrl = categorySlug
      ? `/public/blog-details/${categorySlug}/${slug}`
      : `/public/blog-details/${slug}`;
      
    const res = await httpClient.get<TResponse<TBlogs>>(apiUrl);
    return res;
  } catch (error) {
    console.error(`Failed to fetch blog detail for ${slug}:`, error);
    return null;
  }
}
