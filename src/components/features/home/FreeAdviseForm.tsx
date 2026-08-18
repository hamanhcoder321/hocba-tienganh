import { useSimpleRegisterStudy } from '@/hooks/features/use-common';
import { useState } from 'react';

export default function FreeAdviseForm() {
  const { handleRegister, isPending: loading, isSuccess: success } = useSimpleRegisterStudy();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    target: '',
    wishlist_courses: 'HSK 3.0',
    note: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleRegister({
        ...formData,
        data_input: 'Landing Page',
      });
      setFormData({
        name: '',
        phone: '',
        target: '',
        wishlist_courses: 'HSK 3.0',
        note: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
        <div className="order-1 w-full lg:order-none">
          <label className="mb-1 block">Họ và tên:</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Họ và tên"
            className="h-[45px] w-full rounded px-5 text-[#504E4E] sm:h-[60px] sm:py-5"
          />
        </div>

        <div className="order-2 w-full lg:order-none">
          <label className="mb-1 block">Số điện thoại:</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Nhập số điện thoại của bạn"
            className="h-[45px] w-full rounded px-5 text-[#504E4E] sm:h-[60px] sm:py-5"
          />
        </div>

        <div className="order-4 w-full lg:order-none">
          <label className="mb-1 block">Khóa Học Bạn Quan Tâm</label>
          <select
            value={formData.wishlist_courses}
            onChange={(e) => setFormData({ ...formData, wishlist_courses: e.target.value })}
            className="h-[45px] w-full rounded px-5 text-[#504E4E] sm:h-[60px] sm:py-5"
          >
            <option>HSK 3.0</option>
            <option>Học tiếng trung dành cho người đi làm</option>
            <option>Tiếng Trung Doanh Nghiệp</option>
          </select>
        </div>

        <div className="order-3 w-full lg:order-none">
          <label className="mb-1 block">Mục tiêu học</label>
          <input
            type="text"
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
            placeholder="Mục tiêu học của bạn"
            className="h-[45px] w-full rounded px-5 text-[#504E4E] sm:h-[60px] sm:py-5"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block">Câu Hỏi Khác?</label>
        <textarea
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          placeholder="Viết câu hỏi tại đây"
          className="h-[173px] w-full rounded p-4 text-[9.68px] leading-[16.59px] text-black sm:h-[180px] sm:px-5 sm:py-[25px] sm:text-sm"
        ></textarea>
      </div>

      <div className="flex w-full justify-center pb-5 pt-2 sm:py-0">
        <button
          type="submit"
          disabled={loading}
          className="h-[35px] w-[180px] rounded-[1.79px] bg-white p-2 disabled:cursor-not-allowed disabled:opacity-100 sm:h-[80px] sm:w-full sm:rounded"
        >
          <span className="my-4 text-[13.45px] font-bold leading-[10px] text-[#635AD9] sm:text-2xl sm:text-[32px]">
            {loading ? 'Đang xử lý...' : success ? 'Thành công!' : 'NHẬN TƯ VẤN MIỄN PHÍ'}
          </span>
        </button>
      </div>
    </form>
  );
}
