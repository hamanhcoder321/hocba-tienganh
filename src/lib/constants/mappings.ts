// File này dùng để hiển thị lên UI (Biến con số thành chữ hoặc màu).
// Map trạng thái tư vấn
export const CONSULTATION_STATUS_LABELS: Record<number, string> = {
  0: 'Đang chờ',
  1: 'Đã xử lí',
  2: 'Đã hủy',
};

// Map trạng thái tài khoản
export const ACCOUNT_STATUS_LABELS: Record<number, string> = {
  0: 'Vô hiệu hóa',
  1: 'Hoạt động',
};

// Map trạng thái danh mục
export const CATEGORY_STATUS_LABELS: Record<number, string> = {
  0: 'Không hoạt động',
  1: 'Hoạt động',
};

// Map màu sắc theo trạng thái
export const STATUS_COLORS: Record<number, string> = {
  0: '#FAAD14', // Warning/Pending
  1: '#52C41A', // Success/Active
  2: '#FF4D4F', // Error/Inactive
};
