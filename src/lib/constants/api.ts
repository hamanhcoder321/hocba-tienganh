export const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3007/api';
export const baseUrl = import.meta.env.PUBLIC_CLIENT_URL ?? 'https://hoc-ba.edu.vn';

export const API_TIMEOUT = 10000;

export const API_ENDPOINTS = {
  COMMON: {
    SETTINGS: '/public-api/common-settings',
    CATEGORIES_NAME: '/public/categories-name',
  },
  BLOG: {
    LIST: '/public/blog-list',
    CATEGORY_LIST: '/public/get-category-list',
    NAMES: '/public/blogs-name',
    DETAIL_PREFIX: '/public/blog-details-',
    VIEWS_PREFIX: '/public/blog-views-',
  },
  COURSE: {
    NAMES: '/public/courses-name',
  },
  USER: {
    REGISTER_STUDY: '/user/consultation-register',
    CONSULTATION_COUNT: '/user/consultation-count',
  },
  SCHEDULE: {
    OPENING: '/classes/list-all',
    CLASSES_LIST: '/classes/classes-list',
  },
  TEACHER: {
    LIST: '/teachers/teacher-list',
    LIST_V2: '/teachers/teacher-list-v2',
  },
  REDIRECT: {
    CHECK: '/redirects/check',
  },
  SEARCH: {
    GLOBAL: '/public/search',
  },
} as const;
