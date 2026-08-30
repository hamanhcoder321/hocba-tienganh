import commonApi from '@/lib/api/common';
import { RegisterStudyBody, type RegisterStudyBodyType } from '@/lib/schemas/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useRegisterStudy = (overrides?: Partial<RegisterStudyBodyType>) => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  const form = useForm<RegisterStudyBodyType>({
    resolver: zodResolver(RegisterStudyBody),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      wishlist_courses: 'Xét tuyển vào Đại học',
      note: '',
      data_input: '',
      target: 'Du học/ đi làm',
      current_level: 'Mất gốc/ mới bắt đầu',
      contact_method: 'Gọi điện trực tiếp',
      available_time: 'Sáng (8h-12h)',
      ...overrides,
    },
  });

  const handleRegisterStudy = async (data: RegisterStudyBodyType) => {
    setIsPending(true);
    setIsSuccess(false);
    setResponseData(null);

    try {
      const res = await commonApi.registerStudy(data);

      setResponseData(res.data);
      setIsSuccess(true);
      toast.success(res.data?.message || 'Đăng ký thành công!');
      form.reset();

      return res.data;
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra khi đăng ký');
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return {
    form,
    isPending,
    isSuccess,
    data: responseData,
    handleRegisterStudy,
  };
};

export const useSimpleRegisterStudy = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (data: RegisterStudyBodyType) => {
    setIsPending(true);
    setIsSuccess(false);

    try {
      const res = await commonApi.registerStudy(data);
      setIsSuccess(true);
      toast.success(res.data?.message || 'Đăng ký thành công!');
      return res.data;
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra khi đăng ký');
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return {
    handleRegister,
    isPending,
    isSuccess,
  };
};

