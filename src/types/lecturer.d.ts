// Image type from API
type TImage = {
  file_path: string;
  originalname: string;
};

type TLecturer = {
  id: string;
  name: string;
  slug?: string | null;
  avatar_url?: TImage | null;
  description?: string;
  album_url?: TImage[];
  tags: {
    qualification: string[];
    scope: string[];
  };
  program: string[];
  share_content?: {
    title: string;
    description: string;
  };
  qualification_info?: Array<{
    id: string;
    iconUrl: string;
    title: string;
  }>;
  current_class?: Array<{
    type: string;
    title: string;
    desc: string;
    url: string;
  }>;
  gender?: number;
  birth_date?: string;
  experience_years?: number;
  title?: string | null;
  total_student?: number;
  label?: string;
  classroom?: string;
  order?: number | null;
  status?: number;
  createdAt: string;
  updatedAt: string;
  optimizedAvatar?: string;
  optimizedAlbum?: string[];
  teacherHighlights: Array<{
    id: number;
    teacher_id: number;
    section: string;
    content: string;
  }>;
  student_outstanding?: Array<{
    score: string;
    course: string;
    student_name: string;
    short_description: string;
    avatar: string;
    course_type: string;
  }>;
  qualification_info: JSON;
  qualification: TQualification[];
};

type FilterState = {
  searchQuery: string;
  selectedPrograms: string[];
  selectedExperience: Array<{ label: string; min: number; max: number }>;
};

type TLecturerShowcaseProps = {
  lecturers: TLecturer[];
  bgClass?: string;
};
