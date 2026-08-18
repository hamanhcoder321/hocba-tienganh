import { z } from 'astro/zod';
import validator from 'validator';

export const RegisterStudyBody = z
  .object({
    name: z.string().trim().min(1, 'Vui lòng nhập họ và tên').max(50, 'Vui lòng nhập ít hơn 50 kí tự'),
    email: z.string().trim().optional(),
    target: z.string().trim().optional(),
    job: z.string().trim().optional(),
    phone: z.string(),
    wishlist_courses: z.string().optional(),
    note: z.string().optional(),
    data_input: z.string().optional(),
    current_level: z.string().trim().optional(),
    contact_method: z.string().trim().optional(),
    available_time: z.string().trim().optional(),
  })
  .superRefine(({ email, phone }, ctx) => {
    if (phone.length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Vui lòng nhập số điện thoại',
        path: ['phone'],
      });
    }
    if (!validator.isMobilePhone(phone, 'vi-VN')) {
      ctx.addIssue({
        code: 'custom',
        message: 'Số điện thoại không hợp lệ',
        path: ['phone'],
      });
    }
    if (email && !validator.isEmail(email)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Địa chỉ email không hợp lệ',
        path: ['email'],
      });
    }
  });

export type RegisterStudyBodyType = z.TypeOf<typeof RegisterStudyBody>;

export const UserProfile = z.object({
  first_name: z.string().min(1, 'Vui lòng nhập họ và tên đệm'),
  last_name: z.string().min(1, 'Vui lòng nhập tên'),
  user_name: z.string().min(1, 'Vui lòng nhập tên người dùng'),
  phone: z
    .string()
    .min(1, 'Số điện thoại không được để trống')
    .regex(/^[0-9]{7,12}$/, 'Số điện thoại không hợp lệ'),
  gender: z
    .object({
      value: z.number().optional(),
      label: z.string().optional(),
    })
    .optional(),
});

export type UserProfile = z.TypeOf<typeof UserProfile>;

export const SettingSMTP = z.object({
  smtp_host: z.string().trim().min(1, 'Tối thiểu 1 ký tự'),
  smtp_port: z
    .string()
    .trim()
    .regex(/^[0-9]+$/, 'Chỉ có thể chứa chữ số')
    .refine((val) => parseInt(val, 10) >= 1 && parseInt(val, 10) <= 65535, {
      message: 'Phải nằm trong khoảng từ 1 đến 65535',
    }),
  smtp_user_name: z.string().trim().email('Tài khoản không hợp lệ'),
  smtp_password: z.string().trim().min(8, 'Tối thiểu 8 ký tự'),
  smtp_sender_email: z.string().trim().email('Email không hợp lệ'),
  smtp_encryption: z.string().trim().min(1, 'Tối thiểu 1 ký tự'),
});

export type SettingSMTP = z.TypeOf<typeof SettingSMTP>;

export const TestingSMTP = z.object({
  email: z.string().trim().email('Email không hợp lệ'),
});

export type TestingSMTP = z.TypeOf<typeof TestingSMTP>;

export const WebSetting = z.object({
  site_name: z.string().trim().min(1, 'Tên trang không được để trống'),
  google_analytics_tracking_id: z.string().trim(),
  meta_title: z.string().trim().min(1, 'Tiêu đề thẻ trang không được để trống'),
  meta_description: z.string().trim().min(1, 'Mô tả thẻ trang không được để trống'),
  meta_keywords: z.string().trim().min(1, 'Từ khóa thẻ trang không được để trống'),
  site_logo: z.any(),
  site_fav_icon: z.any(),
});

export type WebSetting = z.TypeOf<typeof WebSetting>;
