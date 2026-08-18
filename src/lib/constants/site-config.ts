import footerLogo from '@/assets/images/footer.svg';
// import { default as favIcon, default as siteLogo } from '@/assets/images/site-logo.png'; // logo mặc định từ api
import { default as favIcon } from '@/assets/images/site-logo.png'; // logo header mới 
import siteLogo from '@/assets/images/img-hocba-tienganh/logo-hocba-tienganh.png';
import { IMAGES } from '@/lib/constants/images';

export const SITE_SETTINGS = {
  default_country: 'Viet Nam',
  social_login_github_status: '0',
  default_currency: null,
  site_email: 'kiennt.edu8@gmail.com',
  site_phone: '+84888861786',

  // SEO & Meta
  meta_title: 'Tiếng Trung Học Bá - Học Tiếng Trung cá nhân hóa & luyện thi chứng chỉ',
  meta_description:
    'Luyện thi TOCFL, HSK, Giao Tiếp Phiên Biên Dịch, Luyện Thi Đại Học cam kết đầu ra với phương pháp học và lộ trình rõ ràng và chi tiết.',
  meta_keywords: ['Tiếng Trung Học Bá', 'Học tiếng trung', 'Luyện thi HSK', 'Luyện thi TOCFL'],
  site_url: import.meta.env.PUBLIC_CLIENT_URL || 'https://hoc-ba.edu.vn',

  // Analytics
  google_analytics_tracking_id: 'G-YJJT3GGKZL',

  // Branding
  site_name: 'Tiếng Trung Học Bá',
  site_legal_name: 'Công ty Cổ phần Giáo dục & Đào tạo Học Bá',
  site_alternate_name: 'Học Bá Education',
  site_logo: siteLogo,
  site_logo_meta: IMAGES.logoMeta,
  site_footer_logo: footerLogo,
  site_fav_icon: favIcon,
  site_copy_right_text: 'Thuộc quyền quản lí của Tiếng Trung Học Bá',

  // Business Info
  price_range: '$$', // $ (rẻ), $$ (trung bình), $$$ (cao), $$$$ (rất cao)

  // Social Media
  social_facebook_education: 'https://www.facebook.com/hocba.education',
  social_facebook_hocbahsk: 'https://www.facebook.com/hocbahsk',
  social_instagram: 'https://www.instagram.com/hocba.education',
  social_zalo: 'https://zalo.me/68362348417414118',

  // Address
  address_street: ' Toà Nhà GP Building Hòa Phát, 257 Giải Phóng, P. Phương Mai',
  address_locality: 'Hà Nội',
  address_postal_code: '10000',
  address_country: 'VN',

  // Geo Coordinates
  geo_latitude: 20.9859002,
  geo_longitude: 105.8405429,
} as const;
