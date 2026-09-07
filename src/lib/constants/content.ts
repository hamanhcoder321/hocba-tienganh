import { CATEGORY_TYPES } from './enums';

export type CategoryItem = {
  id: number;
  link: string;
  image: string;
  title: string;
  content: string;
  color: string;
  secondBg: string;
  bgRoadmap: string;
};

export const HOME_CATEGORIES: CategoryItem[] = [
  {
    id: CATEGORY_TYPES.HSK,
    link: '/khoa-hoc-ielts',
    image: '/images/hero-hsk.webp',
    title: 'IELTS',
    // title: 'hsk',
    content:
      'Xây dựng nền tảng kiến thức vững chắc, chuẩn chỉnh từ sơ cấp tới nâng cao. Học tập và ôn luyện cùng giáo viên giàu kinh nghiệm giúp bạn tiến bộ rõ nét qua từng bài học.',
    color: '#B90E0A',
    secondBg: 'bg-red-200',
    bgRoadmap: 'bg-[#B90E0A]',
  },
  // {
  //   id: CATEGORY_TYPES.TIENG_TRUNG_CHO_NGUOI_DI_LAM,
  //   link: '/tieng-trung-cho-nguoi-di-lam',
  //   image: '/images/clarity_talk.png',
  //   title: 'Tiếng Trung cho người đi làm',
  //   content:
  //     'Lộ trình học được thiết kế theo năng lực và mục tiêu của từng học viên, giúp bạn nhanh chóng sở hữu được bộ kỹ năng của một biên, phiên dịch chuyên nghiệp.',
  //   color: '#B90E0A',
  //   secondBg: 'bg-red-200',
  //   bgRoadmap: 'bg-[#B90E0A]',
  // },
  //   {
  //     id: CATEGORY_TYPES.TOCFL,
  //     link: '/khoa-hoc-tocfl',
  //     image: '/images/hero-tof.webp',
  //     title: 'tocfl',
  //     content:
  //       'Phương pháp giảng dạy hiệu quả và giáo trình được biên soạn bám sát cấu trúc đề thi giúp bạn rèn luyện 4 kỹ năng một cách toàn diện và đạt được kết quả cao nhất.',
  //     color: '#11573d',
  //     secondBg: 'bg-red-200',
  //     bgRoadmap: 'bg-[#11573d]',
  //   },
];

export const PROGRAM_OPTIONS = {
  // HSK: {
  //   label: 'HSK',
  //   options: ['HSK 1-2', 'HSK 3-4', 'HSK 5-6'],
  // },
  CHINESE: {
    label: 'IELTS',
    options: [
      'IELTS Khởi động (0-3.0+)',
      'IELTS Cất cánh (3.0-4.0+)',
      'IELTS Tăng tốc (4.0-5.0+)',
      'IELTS Bứt phá (5.0-6.0+)',
      'IELTS Vươn xa (6.0-7.0+)',
      'IELTS Chinh phục (7.0-8.0+)'
    ],
  },
} as const;

export const EXPERIENCE_OPTIONS = [
  { label: '1-3 năm', min: 1, max: 3 },
  { label: '3-5 năm', min: 3, max: 5 },
  { label: '5+ năm', min: 5, max: 100 },
] as const;

export const CONTACTS = {
  address: {
    label: 'Toà Nhà Hoà Phát, 257 Giải Phóng, Bạch Mai, Hà Nội',
    value: 'https://maps.app.goo.gl/kMGiEXyvfdGzYEVB8',
  },
  linkWeb: import.meta.env.PUBLIC_CLIENT_URL ?? 'https://hoc-ba.edu.vn',
  hotline: '0888.861.786',
  email: 'theenglishspace01@gmail.com',
  facebookHskUrl: 'https://www.facebook.com/hocbahsk',
  facebookEducationUrl: 'https://www.facebook.com/hocba.education',
  facebookChineseUrl: 'https://www.facebook.com/hocbachinese',
  tiktokUrl: 'https://www.tiktok.com/@hocba.hsk',
  ytbkUrl: 'https://www.youtube.com/@MarketingH%E1%BB%8DcB%C3%A1',
  igUrl: 'https://www.instagram.com/hocba_hsk/',
  linkMap:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8543960250013!2d105.83695097921886!3d20.998472930733282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87bbf06ce69841b7%3A0xb9558b4da269809b!2zSOG7jWMgQsOhIEVkdWNhdGlvbg!5e0!3m2!1svi!2s!4v1771991546559!5m2!1svi!2s',
};

const SlugCourseMap = {
  SO_0: 'so-0',
  HSK_2: 'hsk-1-2',
  HSK_3: 'hsk-3',
  HSK_4: 'hsk-4',
  HSK_5: 'hsk-5',
  HSK_6: 'hsk-6',
} as const;

export const input: TRoadmapCourse[] = [
  {
    id: 'inp_band_0',
    name: 'Số 0',
    slug: SlugCourseMap.SO_0,
    content:
      'Chưa có nền tảng hoặc mới bắt đầu làm quen với tiếng Anh, cần xây dựng từ những kiến thức cốt lõi đầu tiên.',
  },
  {
    id: 'inp_band_3',
    name: 'Band 3.0',
    slug: SlugCourseMap.HSK_2,
    content:
      'Có nền tảng từ vựng và ngữ pháp cơ bản, hiểu được những nội dung đơn giản.',
  },
  {
    id: 'inp_band_4',
    name: 'Band 4.0',
    slug: SlugCourseMap.HSK_3,
    content:
      'Có thể hiểu và diễn đạt những ý quen thuộc, đã biết cách xử lý một số dạng bài nhưng thiếu sự linh hoạt và ổn định.',
  },
  {
    id: 'inp_band_5',
    name: 'Band 5.0',
    slug: SlugCourseMap.HSK_4,
    content:
      'Có khả năng sử dụng tiếng Anh tương đối độc lập và xử lý các dạng bài IELTS phổ biến, nhưng còn hạn chế với nội dung phức tạp và học thuật.',
  },
  {
    id: 'inp_band_6',
    name: 'Band 6.0',
    slug: SlugCourseMap.HSK_5,
    content:
      'Có thể sử dụng tiếng Anh khá hiệu quả, diễn đạt tương đối rõ ràng và xử lý phần lớn yêu cầu của bài thi với độ chính xác khá tốt trong các tình huống quen thuộc.',
  },
  {
    id: 'inp_band_7',
    name: 'Band 7.0',
    slug: SlugCourseMap.HSK_6,
    content:
      'Sử dụng tiếng Anh tốt và linh hoạt, xử lý hiệu quả nội dung quen thuộc, diễn đạt mạch lạc và duy trì độ chính xác cao ở cả 4 kỹ năng.',
  },
];
export const output: TRoadmapCourse[] = [
  {
    id: 'out_band_3',
    name: 'Band 3.0',
    slug: SlugCourseMap.HSK_2,
    content:
      'Có nền tảng từ vựng và ngữ pháp cơ bản, hiểu được những nội dung đơn giản.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Lộ trình dành cho người chưa từng học tiếng Trung hoặc mới bắt đầu, chưa có nền tảng về phát âm, từ vựng và ngữ pháp. Học viên sẽ bắt đầu từ hệ thống ngữ âm chuẩn (pinyin, thanh điệu), sau đó từng bước xây dựng nền tảng từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK.

        <br/><br/>Trong quá trình học, học viên được rèn luyện nghe - nói qua các tình huống giao tiếp quen thuộc như chào hỏi, giới thiệu bản thân, mua sắm, ăn uống, hỏi đường… Đồng thời phát triển kỹ năng đọc - viết cơ bản và hình thành phản xạ sử dụng tiếng Trung ngay từ giai đoạn đầu.

        <br/><br/>👉 Lộ trình: Số 0 ➡  HSK1 ➡  HSK2

        <br/><br/>Phù hợp để xây nền bài bản từ đầu, vừa giao tiếp cơ bản vừa định hướng thi HSK1–2 và HSKK sơ cấp.`,
        knowledg: `Sau khóa học, học viên xây dựng được nền tảng tiếng Trung sơ cấp vững chắc, có thể sử dụng trong các tình huống giao tiếp hằng ngày.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~1.200 từ vựng | ~92 ngữ pháp | 100+ mẫu câu</li>
          <li>Nghe - hiểu câu nói đơn giản trong giao tiếp quen thuộc</li>
          <li>Giao tiếp cơ bản: giới thiệu, mua sắm, hỏi đường, trao đổi thông tin</li>
          <li>Đọc hiểu câu ngắn, hội thoại đơn giản</li>
          <li>Viết đoạn 50–80 chữ với cấu trúc rõ ràng</li>
          <li>Đủ năng lực thi HSK1–2 &amp; HSKK sơ cấp</li>
        </ul>

        <br/>Là bước đệm vững chắc để học lên HSK3 và các cấp độ cao hơn.`,
      },
    ],
  },
  {
    id: 'out_band_4',
    name: 'Band 4.0',
    slug: SlugCourseMap.HSK_3,
    content:
      'Có thể hiểu và diễn đạt những ý quen thuộc, đã biết cách xử lý một số dạng bài nhưng thiếu sự linh hoạt và ổn định.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Lộ trình dành cho người chưa từng học tiếng Trung hoặc mới bắt đầu, muốn xây dựng nền tảng vững chắc và nâng lên trình độ sơ - trung cấp. Học viên bắt đầu từ hệ thống phát âm chuẩn (pinyin, thanh điệu), sau đó từng bước phát triển từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK.

        <br/><br/>Trong quá trình học, học viên được rèn luyện nghe - nói qua các tình huống đời sống thực tế, đồng thời nâng cao dần khả năng giao tiếp, đọc - viết và hình thành phản xạ sử dụng tiếng Trung một cách tự nhiên.
        <br/><br/>👉 Lộ trình: Số 0 ➡ HSK2 ➡ HSK3
        <br/><br/>Phù hợp cho người muốn không chỉ giao tiếp cơ bản mà còn sử dụng tiếng Trung trong học tập và công việc ở mức nền tảng.`,

        knowledg: `Sau khóa học, học viên đạt trình độ sơ - trung cấp, có thể sử dụng tiếng Trung linh hoạt trong các tình huống quen thuộc.<br/><br/>
        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~2.200 từ vựng | ~210 ngữ pháp</li>
          <li>Giao tiếp tự nhiên trong đời sống và học tập</li>
          <li>Nghe - hiểu hội thoại cơ bản và nắm được ý chính</li>
          <li>Đọc hiểu đoạn văn ngắn, tin nhắn và nội dung đơn giản</li>
          <li>Viết đoạn 100–150 chữ với cấu trúc rõ ràng</li>
          <li>Đủ năng lực thi HSK3 &amp; HSKK sơ cấp</li>
        </ul>
        <br/>Là nền tảng vững chắc để học lên HSK4 và các cấp độ cao hơn.`,
      },
      {
        slug: SlugCourseMap.HSK_2,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK2 hoặc có nền tảng tiếng Trung cơ bản, muốn nâng cấp lên trình độ sơ – trung cấp. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời phát triển khả năng giao tiếp và sử dụng tiếng Trung trong thực tế.

        <br/><br/>Trong quá trình học, học viên được rèn luyện nghe – nói qua các tình huống đời sống quen thuộc, kết hợp nâng cao khả năng đọc – viết và hình thành phản xạ sử dụng tiếng Trung một cách tự nhiên.

        <br/><br/>👉 Lộ trình: HSK2 ➡  HSK3

        <br/><br/>Phù hợp cho người muốn giao tiếp tự nhiên hơn và sử dụng tiếng Trung trong học tập, công việc ở mức nền tảng.`,
        knowledg: `Sau khóa học, học viên đạt trình độ sơ – trung cấp, có thể sử dụng tiếng Trung linh hoạt trong các tình huống quen thuộc.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~2.200 từ vựng | ~210 ngữ pháp</li>
          <li>Giao tiếp tự nhiên trong đời sống và học tập</li>
          <li>Nghe - hiểu hội thoại cơ bản, nắm được ý chính</li>
          <li>Đọc hiểu đoạn văn ngắn, tin nhắn và nội dung đơn giản</li>
          <li>Viết đoạn 100–150 chữ với cấu trúc rõ ràng</li>
          <li>Đủ năng lực thi HSK3 &amp; HSKK sơ cấp</li>
        </ul>

        <br/>👉 Bắt đầu sử dụng tiếng Trung trong học tập và công việc cơ bản

        <br/><br/>Là nền tảng vững chắc để học lên HSK4 và các cấp độ cao hơn.`,
      },
    ],
  },
  {
    id: 'out_band_5',
    name: 'Band 5.0',
    slug: SlugCourseMap.HSK_4,
    content:
      'Có khả năng sử dụng tiếng Anh tương đối độc lập và xử lý các dạng bài IELTS phổ biến, nhưng còn hạn chế với nội dung phức tạp và học thuật.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Lộ trình dành cho người chưa từng học tiếng Trung, bắt đầu từ nền tảng phát âm (pinyin, thanh điệu) và từng bước xây dựng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK.

        <br/><br/>Học viên được phát triển theo từng giai đoạn: từ giao tiếp cơ bản đến khả năng sử dụng tiếng Trung trong học tập và công việc. Kết hợp rèn luyện toàn diện nghe - nói - đọc - viết và hình thành phản xạ ngôn ngữ một cách tự nhiên.

        <br/><br/>👉 Lộ trình: Số 0 ➡  HSK2 ➡  HSK3 ➡  HSK4

        <br/><br/>Phù hợp cho người muốn sử dụng tiếng Trung tương đối thành thạo trong học tập và công việc, bắt đầu ứng dụng vào thực tế.`,
        knowledg: `Sau khóa học, học viên đạt trình độ trung cấp, có thể sử dụng tiếng Trung linh hoạt trong nhiều tình huống thực tế.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~3.200 từ vựng | ~286 ngữ pháp</li>
          <li>Giao tiếp trôi chảy trong đời sống và công việc</li>
          <li>Nghe - hiểu hội thoại và nội dung trung cấp, nắm được ý chính</li>
          <li>Đọc hiểu email, tin tức và văn bản công việc cơ bản</li>
          <li>Viết đoạn 200-300 chữ với bố cục rõ ràng</li>
          <li>Đủ năng lực thi HSK4 &amp; HSKK trung cấp</li>
        </ul>

        <br/>👉 Bắt đầu sử dụng tiếng Trung trong công việc thực tế

        <br/><br/>Là nền tảng vững chắc để học lên HSK5 và các cấp độ cao hơn.`,
      },
      {
        slug: SlugCourseMap.HSK_2,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK2 hoặc có nền tảng cơ bản, muốn nâng cấp lên trình độ trung cấp để sử dụng tiếng Trung trong học tập và công việc. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời phát triển toàn diện kỹ năng giao tiếp, đọc – viết và phản xạ ngôn ngữ.

        <br/><br/>Quá trình học được nâng cấp theo từng giai đoạn từ sơ - trung cấp đến trung cấp, giúp học viên sử dụng tiếng Trung rõ ràng, mạch lạc và tự nhiên hơn trong nhiều bối cảnh thực tế.

        <br/><br/>👉 Lộ trình: HSK2 ➡  HSK3 ➡  HSK4

        <br/><br/>Phù hợp cho người muốn sử dụng tiếng Trung tương đối thành thạo trong môi trường học tập và công việc.`,
        knowledg: `Sau khóa học, học viên đạt trình độ trung cấp, có thể sử dụng tiếng Trung linh hoạt trong nhiều tình huống thực tế.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~3.200 từ vựng | ~286 ngữ pháp</li>
          <li>Giao tiếp trôi chảy trong đời sống và công việc</li>
          <li>Nghe - hiểu hội thoại và nội dung trung cấp, nắm được ý chính</li>
          <li>Đọc hiểu email, tin tức và văn bản công việc cơ bản</li>
          <li>Viết đoạn 200–300 chữ với bố cục rõ ràng</li>
          <li>Đủ năng lực thi HSK4 &amp; HSKK trung cấp</li>
        </ul>

        <br/>Là nền tảng vững chắc để học lên HSK5 và các cấp độ cao hơn.`,
      },
      {
        slug: SlugCourseMap.HSK_3,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK3 hoặc có nền tảng sơ – trung cấp, muốn nâng cấp lên trình độ trung cấp để sử dụng tiếng Trung trong học tập và công việc. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời phát triển toàn diện kỹ năng giao tiếp, đọc – viết và phản xạ ngôn ngữ.

        <br/><br/>Quá trình học tập trung nâng cao khả năng diễn đạt, giúp học viên sử dụng tiếng Trung rõ ràng, mạch lạc và tự nhiên hơn trong nhiều tình huống thực tế.

        <br/><br/>👉 Lộ trình: HSK3 ➡  HSK4

        <br/><br/>Phù hợp cho người muốn sử dụng tiếng Trung tương đối thành thạo trong môi trường học tập và công việc.`,
        knowledg: `Sau khóa học, học viên đạt trình độ trung cấp, có thể sử dụng tiếng Trung linh hoạt trong nhiều bối cảnh thực tế.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~3.200 từ vựng | ~286 ngữ pháp</li>
          <li>Giao tiếp trôi chảy trong đời sống và công việc</li>
          <li>Nghe - hiểu hội thoại và nội dung trung cấp, nắm được ý chính</li>
          <li>Đọc hiểu email, tin tức và văn bản công việc cơ bản</li>
          <li>Viết đoạn 200–300 chữ với bố cục rõ ràng</li>
          <li>Đủ năng lực thi HSK4 &amp; HSKK trung cấp</li>
        </ul>

        <br/>Là nền tảng vững chắc để học lên HSK5 và các cấp độ cao hơn.`,
      },
    ],
  },
  {
    id: 'out_band_6',
    name: 'Band 6.0',
    slug: SlugCourseMap.HSK_5,
    content:
      'Có thể sử dụng tiếng Anh khá hiệu quả, diễn đạt tương đối rõ ràng và xử lý phần lớn yêu cầu của bài thi với độ chính xác khá tốt trong các tình huống quen thuộc.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Lộ trình dành cho người chưa từng học tiếng Trung nhưng có mục tiêu dài hạn, muốn sử dụng tiếng Trung trong học tập, công việc hoặc định hướng du học. Học viên bắt đầu từ nền tảng phát âm (pinyin, thanh điệu), sau đó từng bước phát triển hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK.

        <br/><br/>Quá trình học được nâng cấp theo từng giai đoạn từ cơ bản đến trung - cao cấp, kết hợp rèn luyện toàn diện nghe - nói - đọc - viết và phát triển khả năng diễn đạt, lập luận bằng tiếng Trung.

        <br/><br/>👉 Lộ trình: Số 0 ➡  HSK2 ➡  HSK3 ➡  HSK4 ➡  HSK5

        <br/><br/>Phù hợp cho người muốn phát triển tiếng Trung ở mức chuyên sâu, phục vụ học thuật và công việc.`,
        knowledg: `Sau khóa học, học viên đạt trình độ trung - cao cấp, có thể sử dụng tiếng Trung linh hoạt trong nhiều bối cảnh.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~4.300 từ vựng | ~350 ngữ pháp</li>
          <li>Giao tiếp, thuyết trình và trình bày ý kiến rõ ràng</li>
          <li>Nghe - hiểu hội thoại dài và nội dung học thuật cơ bản</li>
          <li>Đọc hiểu báo chí, văn bản chuyên sâu</li>
          <li>Viết bài 300-400 chữ, nội dung có lập luận</li>
          <li>Đủ năng lực thi HSK5 &amp; HSKK cao cấp</li>
        </ul>

        <br/>Là nền tảng để học lên <strong>HSK6 và phát triển chuyên môn bằng tiếng Trung.</strong>`,
      },
      {
        slug: SlugCourseMap.HSK_2,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK2 hoặc có nền tảng cơ bản, muốn phát triển tiếng Trung lên trình độ trung – cao cấp để phục vụ học tập, công việc hoặc định hướng du học. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời nâng cao khả năng giao tiếp, đọc – viết và diễn đạt.

        <br/><br/>Quá trình học được nâng cấp theo từng giai đoạn từ sơ – trung cấp đến trung – cao cấp, giúp học viên sử dụng tiếng Trung linh hoạt, mạch lạc và có khả năng lập luận, trình bày ý kiến rõ ràng.

        <br/><br/>👉 Lộ trình: HSK2 ➡  HSK3 ➡  HSK4 ➡  HSK5

        <br/><br/>Phù hợp cho người muốn sử dụng tiếng Trung trong học thuật và công việc chuyên sâu.`,
        knowledg: `Sau khóa học, học viên đạt trình độ trung – cao cấp, có thể sử dụng tiếng Trung linh hoạt trong nhiều bối cảnh học tập và công việc.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~4.300 từ vựng | ~350 ngữ pháp</li>
          <li>Giao tiếp, thuyết trình và trình bày ý kiến rõ ràng</li>
          <li>Nghe - hiểu hội thoại dài và nội dung học thuật, nắm được ý chính</li>
          <li>Đọc hiểu báo chí, văn bản chuyên sâu</li>
          <li>Viết bài 300–400 chữ với nội dung có lập luận rõ ràng</li>
          <li>Đủ năng lực thi HSK5 &amp; HSKK cao cấp</li>
        </ul>

        <br/>Là nền tảng vững chắc để học lên HSK6 và phát triển sự nghiệp bằng tiếng Trung.`,
      },
      {
        slug: SlugCourseMap.HSK_3,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK3 hoặc có nền tảng sơ - trung cấp, muốn nâng cấp lên trình độ trung - cao cấp để sử dụng tiếng Trung trong học tập, công việc hoặc định hướng du học. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời nâng cao khả năng giao tiếp, đọc – viết và diễn đạt.

        <br/><br/>Quá trình học được nâng cấp theo từng giai đoạn từ trung cấp đến trung - cao cấp, giúp học viên sử dụng tiếng Trung linh hoạt, mạch lạc và có khả năng lập luận, trình bày ý kiến rõ ràng.

        <br/><br/>👉 Lộ trình: HSK3 ➡  HSK4 ➡  HSK5

        <br/><br/>Phù hợp cho người muốn sử dụng tiếng Trung trong học thuật và công việc chuyên sâu.`,
        knowledg: `Sau khóa học, học viên đạt trình độ trung - cao cấp, có thể sử dụng tiếng Trung linh hoạt trong nhiều bối cảnh học tập và công việc.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~4.300 từ vựng | ~350 ngữ pháp</li>
          <li>Giao tiếp, thuyết trình và trình bày ý kiến rõ ràng</li>
          <li>Nghe - hiểu hội thoại dài và nội dung học thuật, nắm được ý chính</li>
          <li>Đọc hiểu báo chí, văn bản chuyên sâu</li>
          <li>Viết bài 300–400 chữ với nội dung có lập luận rõ ràng</li>
          <li>Đủ năng lực thi HSK5 &amp; HSKK cao cấp</li>
        </ul>

        <br/>Là nền tảng vững chắc để học lên HSK6 và phát triển sự nghiệp bằng tiếng Trung.`,
      },
      {
        slug: SlugCourseMap.HSK_4,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK4 hoặc có nền tảng trung cấp, muốn nâng cấp lên trình độ trung – cao cấp để sử dụng tiếng Trung trong học thuật và công việc chuyên sâu. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời phát triển khả năng diễn đạt, lập luận và giao tiếp nâng cao.

        <br/><br/>Quá trình học tập trung nâng cao khả năng sử dụng tiếng Trung linh hoạt, giúp học viên trình bày ý kiến rõ ràng, tham gia trao đổi, thuyết trình và xử lý hiệu quả các nội dung phức tạp.

        <br/><br/>👉 Lộ trình: HSK4 ➡  HSK5

        <br/><br/>Phù hợp cho người muốn sử dụng tiếng Trung trong môi trường học thuật và công việc chuyên nghiệp.`,
        knowledg: `Sau khóa học, học viên đạt trình độ trung – cao cấp, có thể sử dụng tiếng Trung linh hoạt trong nhiều bối cảnh học tập và công việc.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~4.300 từ vựng | ~350 ngữ pháp</li>
          <li>Giao tiếp, thuyết trình và trình bày ý kiến rõ ràng</li>
          <li>Nghe - hiểu hội thoại dài và nội dung học thuật, nắm được ý chính</li>
          <li>Đọc hiểu báo chí, văn bản chuyên sâu</li>
          <li>Viết bài 300–400 chữ với nội dung có lập luận rõ ràng</li>
          <li>Đủ năng lực thi HSK5 &amp; HSKK cao cấp</li>
        </ul>

        <br/>Là nền tảng vững chắc để học lên HSK6 và phát triển sự nghiệp bằng tiếng Trung.`,
      },
    ],
  },
  {
    id: 'out_band_7',
    name: 'Band 7.0',
    slug: SlugCourseMap.HSK_6,
    content:
      'Sử dụng tiếng Anh tốt và linh hoạt, xử lý hiệu quả nội dung quen thuộc, diễn đạt mạch lạc và duy trì độ chính xác cao ở cả 4 kỹ năng.',
    dataResults: [
      {
        slug: SlugCourseMap.SO_0,
        sugges: `Lộ trình dành cho người bắt đầu từ con số 0 nhưng có mục tiêu dài hạn, định hướng sử dụng tiếng Trung trong học thuật, nghiên cứu hoặc môi trường làm việc quốc tế. Học viên bắt đầu từ nền tảng phát âm (pinyin, thanh điệu), sau đó từng bước phát triển toàn diện hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK.

        <br/><br/>Quá trình học được nâng cấp theo từng giai đoạn từ cơ bản đến cao cấp, kết hợp rèn luyện toàn diện 5 kỹ năng nghe - nói - đọc - viết - dịch và phát triển khả năng diễn đạt, lập luận, phản biện bằng tiếng Trung.

        <br/><br/>👉 Lộ trình: Số 0 ➡  HSK2 ➡  HSK3 ➡  HSK4 ➡  HSK5 ➡  HSK6

        <br/><br/>Phù hợp cho người muốn chinh phục trình độ tiếng Trung cao cấp, phục vụ học thuật, nghiên cứu và phát triển sự nghiệp quốc tế.`,
        knowledg: `Sau khóa học, học viên đạt trình độ tiếng Trung cao cấp, có thể sử dụng linh hoạt trong học thuật và công việc chuyên môn.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~5.500 từ vựng | ~424 ngữ pháp</li>
          <li>Thành thạo 5 kỹ năng Nghe - Nói - Đọc - Viết - Dịch</li>
          <li>Nghe - hiểu bài giảng, hội thảo, nội dung học thuật chuyên sâu</li>
          <li>Giao tiếp, thuyết trình, tranh luận và phản biện chuyên nghiệp</li>
          <li>Đọc hiểu tài liệu nghiên cứu, văn bản chuyên ngành</li>
          <li>Viết bài 400-600 chữ, nội dung học thuật và phân tích</li>
          <li>Đủ năng lực thi HSK6 &amp; HSKK cao cấp</li>
        </ul>

        <br/>Là nền tảng để phát triển chuyên môn, nghiên cứu và làm việc trong môi trường quốc tế bằng tiếng Trung.`,
      },
      {
        slug: SlugCourseMap.HSK_2,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK2 hoặc có nền tảng cơ bản, muốn phát triển tiếng Trung lên trình độ cao cấp để phục vụ học thuật, nghiên cứu hoặc làm việc trong môi trường quốc tế. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời phát triển toàn diện 5 kỹ năng.

        <br/><br/>Quá trình học được nâng cấp theo từng giai đoạn từ sơ - trung cấp đến cao cấp, giúp học viên sử dụng tiếng Trung linh hoạt, mạch lạc và có khả năng diễn đạt, lập luận, phản biện chuyên sâu.

        <br/><br/>👉 Lộ trình: HSK2 ➡  HSK3 ➡  HSK4 ➡  HSK5 ➡  HSK6

        <br/><br/>Phù hợp cho người muốn chinh phục trình độ tiếng Trung cao cấp và phát triển sự nghiệp bằng ngôn ngữ này.`,
        knowledg: `Sau khóa học, học viên đạt trình độ tiếng Trung cao cấp, có thể sử dụng linh hoạt trong học thuật và công việc chuyên môn.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~5.500 từ vựng | ~424 ngữ pháp</li>
          <li>Thành thạo 5 kỹ năng Nghe - Nói - Đọc - Viết - Dịch</li>
          <li>Nghe - hiểu bài giảng, hội thảo và nội dung học thuật</li>
          <li>Giao tiếp, thuyết trình, tranh luận và phản biện rõ ràng, logic</li>
          <li>Đọc hiểu tài liệu chuyên ngành, văn bản chuyên sâu</li>
          <li>Viết bài 400–600 chữ với nội dung học thuật, phân tích rõ ràng</li>
          <li>Đủ năng lực thi HSK6 &amp; HSKK cao cấp</li>
        </ul>

        <br/>Là nền tảng để phát triển chuyên môn, nghiên cứu và làm việc trong môi trường quốc tế bằng tiếng Trung.`,
      },
      {
        slug: SlugCourseMap.HSK_3,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK3 hoặc có nền tảng sơ – trung cấp, muốn nâng cấp toàn diện lên trình độ cao cấp để phục vụ học thuật, nghiên cứu hoặc làm việc trong môi trường quốc tế. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời phát triển toàn diện 5 kỹ năng.

        <br/><br/>Quá trình học được nâng cấp theo từng giai đoạn từ trung cấp đến cao cấp, giúp học viên sử dụng tiếng Trung linh hoạt, mạch lạc và có khả năng diễn đạt, lập luận, phản biện chuyên sâu.

        <br/><br/>👉 Lộ trình: HSK3 ➡  HSK4 ➡  HSK5 ➡  HSK6

        <br/><br/>Phù hợp cho người muốn chinh phục trình độ tiếng Trung cao cấp và phát triển sự nghiệp bằng tiếng Trung.`,
        knowledg: `Sau khóa học, học viên đạt trình độ tiếng Trung cao cấp, có thể sử dụng linh hoạt trong học thuật và công việc chuyên môn.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~5.500 từ vựng | ~424 ngữ pháp</li>
          <li>Thành thạo 5 kỹ năng Nghe - Nói - Đọc - Viết - Dịch</li>
          <li>Nghe - hiểu bài giảng, hội thảo và nội dung học thuật</li>
          <li>Giao tiếp, thuyết trình, tranh luận và phản biện chuyên sâu</li>
          <li>Đọc hiểu tài liệu chuyên ngành, văn bản chuyên sâu</li>
          <li>Viết bài 400–600 chữ với nội dung học thuật, phân tích rõ ràng</li>
          <li>Đủ năng lực thi HSK6 &amp; HSKK cao cấp</li>
        </ul>

        <br/>Là nền tảng để phát triển chuyên môn, nghiên cứu và làm việc trong môi trường quốc tế bằng tiếng Trung.`,
      },
      {
        slug: SlugCourseMap.HSK_4,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK4 hoặc có nền tảng trung cấp, muốn nâng cấp toàn diện lên trình độ cao cấp để phục vụ học thuật, nghiên cứu hoặc làm việc trong môi trường quốc tế. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời phát triển toàn diện 5 kỹ năng.

        <br/><br/>Quá trình học được nâng cấp theo từng giai đoạn từ trung cấp đến cao cấp, giúp học viên sử dụng tiếng Trung linh hoạt, mạch lạc và có khả năng diễn đạt, lập luận, phản biện chuyên sâu.

        <br/><br/>👉 Lộ trình: HSK4 ➡  HSK5 ➡  HSK6

        <br/><br/>Phù hợp cho người muốn chinh phục trình độ tiếng Trung cao cấp và phát triển sự nghiệp bằng tiếng Trung.`,
        knowledg: `Sau khóa học, học viên đạt trình độ tiếng Trung cao cấp, có thể sử dụng linh hoạt trong học thuật và công việc chuyên môn.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~5.500 từ vựng | ~424 ngữ pháp</li>
          <li>Thành thạo 5 kỹ năng Nghe - Nói - Đọc - Viết - Dịch</li>
          <li>Nghe - hiểu bài giảng, hội thảo và nội dung học thuật</li>
          <li>Giao tiếp, thuyết trình, tranh luận và phản biện chuyên sâu</li>
          <li>Đọc hiểu tài liệu chuyên ngành, văn bản chuyên sâu</li>
          <li>Viết bài 400–600 chữ với nội dung học thuật, phân tích rõ ràng</li>
          <li>Đủ năng lực thi HSK6 &amp; HSKK cao cấp</li>
        </ul>

        <br/>Là nền tảng để phát triển chuyên môn, nghiên cứu và làm việc trong môi trường quốc tế bằng tiếng Trung.`,
      },
      {
        slug: SlugCourseMap.HSK_5,
        sugges: `Lộ trình dành cho học viên đã hoàn thành HSK5 hoặc có nền tảng trung – cao cấp, muốn nâng cấp lên trình độ cao cấp để phục vụ học thuật, nghiên cứu hoặc làm việc trong môi trường quốc tế. Học viên tiếp tục mở rộng hệ thống từ vựng - ngữ pháp - chữ Hán theo chuẩn HSK, đồng thời phát triển toàn diện 5 kỹ năng.

        <br/><br/>Quá trình học tập trung nâng cao khả năng sử dụng tiếng Trung ở mức chuyên sâu, giúp học viên diễn đạt mạch lạc, lập luận chặt chẽ và phản biện hiệu quả trong các bối cảnh học thuật và công việc.

        <br/><br/>👉 Lộ trình: HSK5 ➡  HSK6

        <br/><br/>Phù hợp cho người muốn chinh phục trình độ tiếng Trung cao cấp và phát triển sự nghiệp bằng tiếng Trung.`,
        knowledg: `Sau khóa học, học viên đạt trình độ tiếng Trung cao cấp, có thể sử dụng linh hoạt trong học thuật và công việc chuyên môn.<br/><br/>

        <ul style="margin-left: 16px; padding-left: 18px; list-style: disc;">
          <li>~5.500 từ vựng | ~424 ngữ pháp</li>
          <li>Thành thạo 5 kỹ năng Nghe - Nói - Đọc - Viết - Dịch</li>
          <li>Nghe - hiểu bài giảng, hội thảo và nội dung học thuật</li>
          <li>Giao tiếp, thuyết trình, tranh luận và phản biện chuyên sâu</li>
          <li>Đọc hiểu tài liệu chuyên ngành, văn bản chuyên sâu</li>
          <li>Viết bài 400–600 chữ với nội dung học thuật, phân tích rõ ràng</li>
          <li>Đủ năng lực thi HSK6 &amp; HSKK cao cấp</li>
        </ul>

        <br/>Là nền tảng để phát triển chuyên môn, nghiên cứu và làm việc trong môi trường quốc tế bằng tiếng Trung.`,
      },
    ],
  },
  {
    id: 'out_band_8',
    name: 'Band 8.0',
    slug: SlugCourseMap.HSK_6,
    content:
      'Làm chủ tiếng Anh ở trình độ cao, sử dụng ngôn ngữ linh hoạt, chính xác và tự nhiên trong những tình huống học thuật phức tạp.',
    dataResults: [],
  },
];

export const HOC_VIEN_DIEM_CAO_SLUG = 'hoc-vien-diem-cao';
export const NEWS_SLUGS = ['tong-hop-tin-tuc', 'tong-hop-su-kien'];
export const EXCLUDED_FROM_CAM_NANG = [...NEWS_SLUGS, HOC_VIEN_DIEM_CAO_SLUG];

