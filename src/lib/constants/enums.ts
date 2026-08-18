export const COURSE_LEVEL = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
} as const;

export const GENDER = {
  MALE: 1,
  FEMALE: 2,
  OTHERS: 3,
} as const;

export const DISCOUNT_TYPE = {
  PERCENTAGE: 0,
  AMOUNT: 1,
} as const;

export const INSTRUCTOR_COURSE_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  PENDING: 2,
} as const;

export const STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  PENDING: 2,
  REJECTED: 3,
} as const;

export const UPLOAD_SOURCE = {
  LOCAL: 1,
  YOUTUBE: 2,
  VIMEO: 3,
} as const;

export const USER_ROLES = {
  ADMIN: 1,
  SUPER_ADMIN: 2,
  STUDENT: 3,
  INSTRUCTOR: 4,
  SEO_EDITOR: 5,
} as const;

export const CATEGORY_TYPES = {
  HSK: 0,
  TIENG_TRUNG_CHO_NGUOI_DI_LAM: 1,
  TOCFL: 2,
  LUYEN_THI_DAI_HOC: 3,
} as const;

export const LEARNING_TYPE = {
  ONLINE: 0,
  OFFLINE: 1,
} as const;

export const DATA_INPUT_SOURCE = {
  LANDING_PAGE: 'Trang chủ',
  COURSE_DETAIL: 'Khóa học',
} as const;

export const ROADMAP_KEYS = {
  FROM: 'titleFrom',
  TO: 'titleTo',
} as const;

export const TitleMenu = {
  INTRODUCE: 'Giới thiệu',
  XAY_DUNG_LO_TRINH: 'Xây dựng lộ trình',
  LICH_KHAI_GIANG: 'Lịch khai giảng',
  KHOA_HOC: 'Khóa học',
  CAM_NANG: 'Cẩm nang',
  TIN_TUC: 'Tin tức',
  LIEN_HE: 'Liên hệ',
} as const;

export const DATA_VALUE = {
  CONSULTANT: 'Cố vấn chuyên môn',
  LECTURER: 'Đội ngũ giảng viên',
  LECTURER_DETAIL: 'Chi tiết giảng viên',
  GUIDE_HSK: 'Cẩm nang HSK-HSKK',
  GUIDE_FOR_WORKERS: 'Cẩm nang tiếng Trung cho người đi làm',
  GUIDE_TOCFL: 'Cẩm nang TOCFL',
  COURSE_HSK: 'Khóa học HSK',
  COURSE_FOR_WORKERS: 'Tiếng Trung cho người đi làm',
  COURSE_TOCFL: 'Khóa học TOCFL',
  SCHEDULE: 'Lịch khai giảng',
  CONTACT: 'Liên hệ',
  ABOUT: 'Giới thiệu',
  NEWS: 'Tin tức & sự kiện',
  EVENTS: 'Sự kiện',
  OTHER_NEWS: 'Tin tức',
  TERMS: 'Điều khoản sử dụng',
  PRIVACY: 'Chính sách bảo mật',
  COPYRIGHT: 'Chính sách bản quyền',
  COMMITMENT: 'Cam kết đầu ra',
  STUDENT_ACHIEVEMENTS: 'Học viên điểm cao',
};

export const DATA_INPUT_MAP: Record<string, string> = {
  '/chuyen-gia/gs-baozhang-he': DATA_VALUE.CONSULTANT,
  '/doi-ngu-giang-vien': DATA_VALUE.LECTURER,
  '/cam-nang-hsk-hskk': DATA_VALUE.GUIDE_HSK,
  '/cam-nang-tieng-trung-cho-nguoi-di-lam': DATA_VALUE.GUIDE_FOR_WORKERS,
  '/cam-nang-tocfl': DATA_VALUE.GUIDE_TOCFL,
  '/khoa-hoc-hsk': DATA_VALUE.COURSE_HSK,
  '/tieng-trung-cho-nguoi-di-lam': DATA_VALUE.COURSE_FOR_WORKERS,
  '/khoa-hoc-tocfl': DATA_VALUE.COURSE_TOCFL,
  '/lich-khai-giang': DATA_VALUE.SCHEDULE,
  '/lien-he': DATA_VALUE.CONTACT,
  '/gioi-thieu': DATA_VALUE.ABOUT,
  '/dieu-khoan-su-dung': DATA_VALUE.TERMS,
  '/chinh-sach-bao-mat': DATA_VALUE.PRIVACY,
  '/chinh-sach-ban-quyen': DATA_VALUE.COPYRIGHT,
  '/cam-ket-dau-ra': DATA_VALUE.COMMITMENT,
  '/hoc-vien-diem-cao': DATA_VALUE.STUDENT_ACHIEVEMENTS,
  '/tin-tuc': DATA_VALUE.NEWS,
  '/tong-hop-su-kien': DATA_VALUE.EVENTS,
  '/tong-hop-tin-tuc': DATA_VALUE.OTHER_NEWS,
};
