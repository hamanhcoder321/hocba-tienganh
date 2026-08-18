import blogApi from '@/lib/api/blog';
import commonApi from '@/lib/api/common';
import { RegisterStudyBody, type RegisterStudyBodyType } from '@/lib/schemas/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useGetBlogList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(24);
  const [queryParams, setQueryParams] = useState('');
  const [enabled, setEnabled] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const fetchBlogs = useCallback(
    async (currentPage: number, isLoadMore: boolean) => {
      if (!enabled && currentPage === 1 && !isLoadMore) return;

      const loadingState = isLoadMore ? setIsFetchingNextPage : setIsLoading;
      loadingState(true);

      try {
        const res = await blogApi.getBlogList({
          page: currentPage,
          limit,
          queryParams,
        });

        loadingState(false);

        if (res?.data) {
          const blogList = res.data.list || [];

          setData((prev) => (isLoadMore ? [...prev, ...blogList] : blogList));

          setHasNextPage(!!res.data.meta?.next);
        }
      } catch (error) {
        console.error(error);
        loadingState(false);
      }
    },
    [limit, queryParams, enabled],
  );

  useEffect(() => {
    if (enabled) {
      setPage(1);
      fetchBlogs(1, false);
    }
  }, [queryParams, limit, enabled]);

  const fetchNextPage = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(nextPage, true);
  };

  return {
    data: { pages: [{ data }] },
    flatData: data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    setPage,
    setLimit,
    setQueryParams,
    setEnabled,
    refetch: () => fetchBlogs(1, false),
  };
};

export const useGetBlogDetail = (slug: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await blogApi.getBlogDetail(slug);
        if (res) setData(res);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [slug]);

  return { data, isLoading };
};

export const useGetBlogCategoryList = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await blogApi.getBlogCategoryList();
        if (res) setData(res);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
};

export const useUpdateBlogViews = () => {
  const [isPending, setIsPending] = useState(false);

  const updateViews = async (slug: string) => {
    setIsPending(true);
    try {
      await blogApi.updateBlogViews(slug);
    } catch (error) {
      console.error('Failed to update blog views:', error);
    } finally {
      setIsPending(false);
    }
  };

  return { updateViews, isPending };
};

export const useRegisterStudyFormHandler = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  const form = useForm<RegisterStudyBodyType>({
    resolver: zodResolver(RegisterStudyBody),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      wishlist_courses: '',
      note: '',
      data_input: '',
    },
  });

  const handleRegisterStudy = async (data: RegisterStudyBodyType) => {
    setIsPending(true);
    setIsSuccess(false);

    try {
      const res = await commonApi.registerStudy(data);

      setResponseData(res);
      setIsSuccess(true);
      toast.success(res.data?.message || 'Đăng ký thành công!');
      form.reset();
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra');
      console.error(error);
    }

    setIsPending(false);
  };

  return {
    form,
    isPending,
    isSuccess,
    data: responseData,
    handleRegisterStudy,
  };
};
