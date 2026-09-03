type TCourse = {
  id: number;
  name: string;
  slug: string;
  status: number;
  duration: number;
  study_time: number;
  order: number;
  short_description: string;
  description: string;
  private_status: boolean;
  course_level: number;
  is_free: boolean;
  price: string;
  payable_price: number;
  discount_status: boolean;
  discount_type: number;
  discount_value: string;
  thumbnail_link: string;
  cover_image_link: string;
  demo_video: null;
  video_upload_source: number;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  what_you_will_learn: string;
  free_gift?: string;
  requirments: string;
  targets: string;
  target_description?: string;
  documents: string;
  category_id: number;
  sub_category_id: number;
  instructorId: number;
  created_at: string;
  updated_at: string;
  category: TBlogCategory;
  User: TUserBase;
  Section: TCourseSection[];
  content_sections?: TCourseSection[];
  lession_count?: number;
  average_rating?: number;
};
type TCourseSection = {
  id: number | string;
  title: string;
  description?: string;
  order?: number;
  course_id?: number;
  createed_at?: string;
  updated_at?: string;
  Lesson?: TCourseSectionLesson[];
  options?: TCourseSectionOption[];
};

type TCourseSectionOptionItem = {
  label: string;
  content: string;
};

type TCourseSectionLesson = {
  id: number | string;
  title: string;
  description?: string;
  content?: string;
  order?: number;
};

type TCourseSectionOption = {
  id: number | string;
  title: string;
  description?: string;
  content?: string;
  order?: number;
  type?: 'text' | 'lesson';
  items?: TCourseSectionOptionItem[];
};

type TRoadmapCourse = {
  id: string;
  name: string;
  slug: string;
  content: string;
  dataResults?: any[];
};
