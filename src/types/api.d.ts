// Định dạng trả về chung của API (Wrapper)
type TResponse<T> = {
  status: number;
  message: string;
  data: T;
};

type TResponsePagination<T> = {
  list: T;
  meta: TPaginationMetaData;
};

type TPaginationMetaData = {
  total?: number;
  lastPage?: number;
  currentPage?: number;
  perPage?: number;
  prev?: number;
  next?: number;
};

// // Định dạng Meta phân trang (Pagination)
// type TPaginationMeta = {
//   total: number;
//   total_page: number;
//   limit: number;
//   current_page: number;
//   next: number | null;     // Trang tiếp theo (null nếu hết)
//   prev: number | null;     // Trang trước (null nếu trang 1)
// };

// // Định dạng trả về cho danh sách có phân trang
// type TResponsePagination<T> = {
//   data: T;
//   meta: TPaginationMeta;
//   message?: string;
// };

// type TBaseParams = {
//   page?: number;
//   limit?: number;
//   search?: string;
//   sort?: string;
// };
