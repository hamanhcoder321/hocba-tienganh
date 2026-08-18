import { getImage } from 'astro:assets';
import { IMAGES } from './images';

export async function getSlidesData() {
  const optimizedKimanh = await getImage({
    src: IMAGES.students.kimanh,
    format: 'webp',
  });
  const optimizedLananh = await getImage({
    src: IMAGES.students.lananh,
    format: 'webp',
  });
  const optimizedNguyenthigiang = await getImage({
    src: IMAGES.students.nguyenthigiang,
    format: 'webp',
  });
  const optimizedThuyanh = await getImage({
    src: IMAGES.students.thuyanh,
    format: 'webp',
  });
  const optimizedHaimy = await getImage({
    src: IMAGES.students.haimy,
    format: 'webp',
  });

  const slides: SlideType[] = [
    {
      id: 1,
      name: 'Kim Anh',
      description:
        'Trước đây mình nghĩ học tiếng Trung để thi HSK thật khó, nhưng nhờ lộ trình cá nhân hóa của Học Bá, mình đã học đúng trọng tâm, không bị lan man. Các thầy cô thì siêu nhiệt tình, support 1:1, mình tiến bộ qua từng buổi học và chỉ hơn 6 tháng, mình đã tự tin thi đỗ HSK 5 với số điểm ấn tượng! Rất cảm ơn đội ngũ giáo viên tận tâm.',
      image: optimizedKimanh.src,
      level: 'HSK 3',
    },
    {
      id: 2,
      name: 'Giang Nguyễn',
      description:
        'Lộ trình học ở Học Bá rất bài bản và hiệu quả. Mình chỉ cần dành 1.5 tiếng mỗi buổi để ôn luyện và nắm chắc các phần trọng điểm. Sau 3 tháng, mình đã thi đậu HSK 4, còn nhanh hơn cả mong đợi ban đầu!',
      image: optimizedNguyenthigiang.src,
      level: 'HSK 4',
    },
    {
      id: 3,
      name: 'Lan Anh',
      description:
        'Ban đầu mình hơi lo lắng vì mới bắt đầu học tiếng Trung. Nhưng tại Học Bá, lộ trình học rõ ràng, tài liệu phong phú, và giáo viên hỗ trợ rất nhiệt tình. Chỉ sau 4 tháng, từ con số 0 mình đã tự tin vượt qua kỳ thi HSK 3.',
      image: optimizedLananh.src,
      level: 'HSK 3',
    },
    {
      id: 4,
      name: 'Hải My',
      description:
        'Trước đây mình hay gặp khó khăn khi giao tiếp với đối tác Trung Quốc. Nhờ khóa học tại Học Bá, mình đã cải thiện rõ rệt khả năng phản xạ, tự tin trao đổi qua email, điện thoại và thuyết trình trước sếp. Chỉ sau 3 tháng, mình đã đàm phán hợp đồng bằng tiếng Trung một cách trôi chảy',
      image: optimizedHaimy.src,
      level: 'HSK 4',
    },
    {
      id: 5,
      name: 'Thùy Anh',
      description:
        'Mình đăng ký khoá ôn HSK khi chỉ còn 4 tháng trước kỳ thi. Thật bất ngờ, giáo viên không chỉ giúp mình nắm vững kiến thức mà còn cải thiện kỹ năng làm bài, điểm số nhanh chóng. Điểm thi HSK 6 của mình là minh chứng rõ ràng nhất cho chất lượng đào tạo tại Học Bá.',
      image: optimizedThuyanh.src,
      level: 'Cơ bản',
    },
  ];

  return slides;
}
