const HOME_DATA = {
  brand: {
    name: 'Việc 3 Miền',
    subtitle: 'Nền tảng kết nối việc làm công nhân và khối sản xuất trên toàn quốc.',
    hotline: '0812 533 533',
    socialLinks: [
      { label: 'Facebook', href: 'https://www.facebook.com/viec3mientuyendung' },
      { label: 'Zalo', href: 'https://zalo.me/viec3mientuyendung' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@viec3mientuyendung1' },
      { label: 'YouTube', href: 'https://www.youtube.com/@viec3mien' }
    ]
  },
  nav: [
    { label: 'Việc làm', href: '/viec-lam' },
    { label: 'Công ty', href: '/company' },
    { label: 'Tin tức', href: '/news' },
    { label: 'Dịch vụ', href: '/service' }
  ],
  heroBanners: [
    {
      id: 'hero-1',
      title: 'Tìm việc nhanh hơn với hệ sinh thái Việc 3 Miền',
      description:
        'Tập trung hàng nghìn việc làm mới mỗi ngày cho khối công nhân, kỹ thuật viên và nhân sự nhà máy trên toàn quốc.',
      imageDesktop: 'https://viec3mien.vn/assets/imgs/home-banner-05-2025-1.jpg',
      imageMobile: 'https://viec3mien.vn/assets/imgs/home-banner-mb-05-2025-1.jpg',
      ctaPrimary: { label: 'Tìm việc ngay', href: '/viec-lam' },
      ctaSecondary: { label: 'Đăng ký CTV', href: '/candidate' }
    },
    {
      id: 'hero-2',
      title: 'Kho việc làm FDI đa ngành, đa khu công nghiệp',
      description:
        'Từ Bắc vào Nam, ứng viên có thể lọc theo mức lương, ca làm, địa điểm và ứng tuyển trực tiếp trên nền tảng.',
      imageDesktop: 'https://viec3mien.vn/assets/imgs/home-banner-05-2025-2.jpg',
      imageMobile: 'https://viec3mien.vn/assets/imgs/home-banner-mb-05-2025-2.jpg',
      ctaPrimary: { label: 'Xem vị trí mới', href: '/viec-lam' },
      ctaSecondary: { label: 'Đăng tin tuyển dụng', href: '/company' }
    },
    {
      id: 'hero-3',
      title: 'Ứng tuyển dễ dàng, theo dõi nhanh tiến trình',
      description:
        'Tạo hồ sơ 1 lần, ứng tuyển nhiều vị trí và nhận phản hồi sớm từ doanh nghiệp đối tác của Việc 3 Miền.',
      imageDesktop: 'https://viec3mien.vn/assets/imgs/home-banner-05-2025-3.jpg',
      imageMobile: 'https://viec3mien.vn/assets/imgs/home-banner-mb-05-2025-3.jpg',
      ctaPrimary: { label: 'Tạo hồ sơ ứng viên', href: '/candidate-profile' },
      ctaSecondary: { label: 'Tư vấn miễn phí', href: '/service' }
    }
  ],
  quickStats: [
    { label: 'Việc làm đang tuyển', value: '8.500+' },
    { label: 'Doanh nghiệp đối tác', value: '1.200+' },
    { label: 'Ứng viên hoạt động', value: '95.000+' },
    { label: 'Khu công nghiệp phủ sóng', value: '120+' }
  ],
  featuredJobs: [
    {
      id: 'job-1',
      title: 'Công nhân lắp ráp linh kiện điện tử',
      company: 'Công ty TNHH Sản Xuất GTV',
      location: 'KCN VSIP - Bắc Ninh',
      salary: '9 - 14 triệu/tháng',
      tags: ['Toàn thời gian', 'Không yêu cầu kinh nghiệm']
    },
    {
      id: 'job-2',
      title: 'Nhân viên kho vận ca đêm',
      company: 'Logistics Miền Nam Group',
      location: 'Thủ Đức - TP.HCM',
      salary: '10 - 13 triệu/tháng',
      tags: ['Ca đêm', 'Có xe đưa đón']
    },
    {
      id: 'job-3',
      title: 'Kỹ thuật viên bảo trì máy sản xuất',
      company: 'Nhà máy Cơ Khí Việt Nhật',
      location: 'Biên Hòa - Đồng Nai',
      salary: '12 - 18 triệu/tháng',
      tags: ['Ưu tiên có kinh nghiệm', 'Phụ cấp chuyên cần']
    },
    {
      id: 'job-4',
      title: 'Nhân viên QC kiểm tra chất lượng',
      company: 'Công ty May Mặc Newtrend',
      location: 'Dĩ An - Bình Dương',
      salary: '8.5 - 12 triệu/tháng',
      tags: ['Làm theo ca', 'Được đào tạo']
    },
    {
      id: 'job-5',
      title: 'Công nhân đóng gói thực phẩm',
      company: 'Nhà máy FMCG Green Foods',
      location: 'Long An',
      salary: '8 - 11 triệu/tháng',
      tags: ['Bao ăn giữa ca', 'Việc làm ổn định']
    },
    {
      id: 'job-6',
      title: 'Tổ trưởng chuyền sản xuất',
      company: 'Công ty TNHH Công Nghiệp Sunrise',
      location: 'Hải Phòng',
      salary: '14 - 20 triệu/tháng',
      tags: ['Quản lý nhóm', 'Thưởng KPI']
    }
  ],
  topCompanies: [
    {
      id: 'company-1',
      name: 'GTV Electronics Vietnam',
      location: 'Bắc Ninh',
      openJobs: 42,
      official: true,
      field: 'Điện tử - Linh kiện',
      logo: 'https://viec3mien.vn/assets/icons/company-rounded.svg'
    },
    {
      id: 'company-2',
      name: 'Global Textile Industrial',
      location: 'Nam Định',
      openJobs: 28,
      official: true,
      field: 'Dệt may',
      logo: 'https://viec3mien.vn/assets/icons/company-rounded.svg'
    },
    {
      id: 'company-3',
      name: 'Mekong Logistics Hub',
      location: 'Long An',
      openJobs: 35,
      official: false,
      field: 'Kho vận',
      logo: 'https://viec3mien.vn/assets/icons/company-rounded.svg'
    },
    {
      id: 'company-4',
      name: 'An Phát Mechanical',
      location: 'Đồng Nai',
      openJobs: 19,
      official: false,
      field: 'Cơ khí chế tạo',
      logo: 'https://viec3mien.vn/assets/icons/company-rounded.svg'
    }
  ],
  services: [
    {
      id: 'service-1',
      title: 'Tư vấn nhân sự sản xuất',
      description:
        'Thiết kế chiến lược tuyển dụng theo mùa vụ, theo dây chuyền và theo năng lực vận hành của từng nhà máy.',
      image: 'https://viec3mien.vn/assets/imgs/service1.png'
    },
    {
      id: 'service-2',
      title: 'Giải pháp tuyển dụng FDI',
      description:
        'Đồng hành cùng doanh nghiệp FDI tối ưu quy trình tuyển dụng và mở rộng nhân lực tại Việt Nam.',
      image: 'https://viec3mien.vn/assets/imgs/service2.png'
    },
    {
      id: 'service-3',
      title: 'Đào tạo CTV tuyển dụng',
      description:
        'Chương trình đào tạo cộng tác viên bài bản để tăng tỉ lệ chuyển đổi ứng viên chất lượng.',
      image: 'https://viec3mien.vn/assets/imgs/service3.png'
    }
  ],
  news: [
    {
      id: 'news-1',
      date: '03/06/2024',
      title: 'Việc 3 Miền cập nhật cơ chế hoa hồng CTV tuyển dụng',
      description:
        'Cơ chế mới tối ưu thu nhập cho cộng tác viên, hỗ trợ tốt hơn cho chiến dịch tuyển dụng diện rộng.',
      image: 'https://viec3mien.vn/assets/imgs/home_image_10.png',
      href: 'https://viec3mien.vn/tin-tuc/viec-3-mien-cap-nhat-co-che-hoa-hong-cho-cong-tac-vien-tuyen-dung-len-den-1-250-000d-luot-tu-01-06-2024-202406030920543454297'
    },
    {
      id: 'news-2',
      date: '18/05/2024',
      title: 'Nhu cầu tuyển dụng công nhân tăng mạnh tại các tỉnh công nghiệp',
      description: 'Các doanh nghiệp mở rộng sản xuất, đẩy mạnh tuyển dụng từ quý II/2024.',
      image: 'https://viec3mien.vn/assets/imgs/home_image_11.png',
      href: '/news'
    },
    {
      id: 'news-3',
      date: '05/05/2024',
      title: '5 bước tối ưu hồ sơ ứng tuyển giúp tăng cơ hội phỏng vấn',
      description: 'Gợi ý ngắn gọn cho ứng viên mới đi làm và người muốn chuyển việc.',
      image: 'https://viec3mien.vn/assets/imgs/banner-tin-tuc.jpg',
      href: '/news'
    }
  ],
  appLinks: {
    ios: 'https://apps.apple.com/vn/app/viec3mien/id1601009849?l=vi',
    android: 'https://play.google.com/store/apps/details?id=com.gtv.viec3mien',
    download: 'https://download-app.viec3mien.vn/'
  }
};

module.exports = HOME_DATA;
