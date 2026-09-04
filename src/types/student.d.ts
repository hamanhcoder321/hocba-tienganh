type TStudent = {
  id: string;
  name: string;
  avatar_url: string;
  certificate_url?: string;
  description: string;
  title: string;
  score: number;
  course: string;
  profession: string;
  createdAt: string;
  updatedAt: string;
}

type TStudentResponse = {
  list: TStudent[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
