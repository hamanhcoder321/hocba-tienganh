type TBlogBase = {
  id: number;
  title?: string;
  slug?: string;
  status?: number;
  authorId?: number;
  blogCategoryId?: number;
  tag?: string;
  allow_comment?: boolean;
  is_featured?: boolean;
  thumbnail_link?: TImageFile;
  cover_image_link?: TImageFile;
  description?: string;
  json_ld?: string;
  views?: number;
  publish_at?: string;
  meta_title?: string;
  meta_keyword?: string;
  meta_description?: string;
  meta_img?: TImageFile;
  created_at?: string;
  updated_at?: string;
  BlogCategory?: TBlogCategory;
};

type TImageFile = {
  file_path: string;
  originalname: string;
};

type TCreateBlog = {
  blog_category_id?: number;
  description?: string;
  meta_description?: string;
  meta_keyword?: string;
  meta_title?: string;
  status?: number;
  tag?: string;
  title?: string;
  thumbnail_link?: string;
  cover_image_link?: string;
  meta_img?: string;
};

type TBlogs = TBlogBase & {
  recentPosts?: TBlogBase[];
  categories?: TCategoryBlog[];
  User?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    user_name?: string;
    photo?: string;
  };
  categories?: TBlogCategory[];
  BlogCategor?: {
    id: number;
    name: string;
  };
};

// Category

type TBlogCategory = {
  id: number;
  slug: string;
  name: string;
  status: number;
  parent_id: number;
  created_at: string;
  updated_at: string;
};

type TCategoryBlog = {
  id: number;
  slug: string | null;
  name: string;
  status: number;
  parent_id: number;
  children: TCategoryBlog[];
  created_at: string;
  updated_at: string;
};
