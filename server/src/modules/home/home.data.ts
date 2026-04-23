export const STATIC_HOME_DATA = {
  brand: {
    logoUrl: '/logo-shg.jpg',
    logoAlt: 'SHG Investment',
    name: 'SHG INVESTMENT',
    subtitle: 'Nền tảng tuyển dụng cho lĩnh vực bất động sản, môi giới và quản lý dự án trên toàn quốc.',
    hotline: '0812 533 533',
    email: 'support@SHGINVESTMENT.vn',
    socialLinks: [
      { label: 'Facebook', href: 'https://www.facebook.com/SHGINVESTMENTtuyendung' },
      { label: 'Zalo', href: 'https://zalo.me/SHGINVESTMENTtuyendung' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@SHGINVESTMENTtuyendung1' }
    ]
  },
  nav: [
    { label: 'Việc làm', href: '/viec-lam' },
    { label: 'CV mẫu', href: '/cv-mau' },
    { label: 'Tin tức', href: '/tin-tuc' },
    { label: 'Doanh nghiệp', href: '#companies' },
    { label: 'Quy trình', href: '#journey' },
    { label: 'Dịch vụ', href: '#services' }
  ],
  heroBanners: [
    {
      id: 'hero-1',
      displayMode: 'image-only',
      title: 'Tuyển dụng hiệu quả cho lĩnh vực bất động sản',
      description: 'Tập trung việc làm chất lượng, thông tin rõ ràng và luồng ứng tuyển nhanh trong một giao diện duy nhất.',
      imageDesktop: '/banner-shg.jpg',
      imageMobile: '/banner-shg.jpg',
      imageAlt: 'Công ty Cổ phần Quốc tế SHG',
      ctaPrimary: { label: 'Tìm việc ngay', href: '/viec-lam' },
      ctaSecondary: { label: 'Tạo CV ứng tuyển', href: '/cv-mau' }
    },
    {
      id: 'hero-2',
      displayMode: 'image-only',
      title: 'Tối ưu chi phí tuyển dụng cho doanh nghiệp',
      description: 'Lọc ứng viên theo khu vực và kỹ năng, kết hợp bảng điều hành vận hành để quản trị chất lượng tin đăng.',
      imageDesktop: '/banner-shg.jpg',
      imageMobile: '/banner-shg.jpg',
      imageAlt: 'Công ty Cổ phần Quốc tế SHG',
      ctaPrimary: { label: 'Đăng tin tuyển dụng', href: '#services' },
      ctaSecondary: { label: 'Xem doanh nghiệp', href: '#companies' }
    }
  ],
  testimonials: [
    { id: 'ts-1', author: 'Trần Bảo Châu, Quản trị nền tảng', quote: 'SHG INVESTMENT giúp đội vận hành theo dõi chất lượng tin đăng, cam kết phản hồi từ doanh nghiệp và tiến trình ứng viên trong một nơi duy nhất.' },
    { id: 'ts-2', author: 'Phạm Thu Linh, Trưởng phòng nhân sự', quote: 'Bảng điều khiển quản trị rõ ràng, đội nhân sự có thể lọc hồ sơ nhanh và xem lịch sử thay đổi tin đăng để ra quyết định tốt hơn.' }
  ],
  talentJourney: [
    { id: 'journey-1', title: 'Chọn việc đúng nhu cầu', description: 'Lọc theo mức lương, kinh nghiệm, khu vực và hình thức làm việc.' },
    { id: 'journey-2', title: 'Gửi CV trong vài phút', description: 'Ứng viên có thể nộp CV mặc định hoặc liên kết CV mới ngay trong cửa sổ xem việc làm.' },
    { id: 'journey-3', title: 'Theo dõi phản hồi', description: 'Hệ thống ghi nhận trạng thái ứng tuyển để ứng viên và người phụ trách tuyển dụng cùng theo dõi.' }
  ],
  cvTemplates: [
    {
      id: 'cv-standard',
      category: 'Đơn giản',
      name: 'Tiêu chuẩn',
      tagline: 'Mẫu gọn, sáng và dễ đọc, phù hợp hồ sơ ATS và ứng tuyển nhanh.',
      accent: '#c62839',
      softTone: '#fff2f4',
      palette: ['#111827', '#d1d5db', '#e5e7eb', '#7c2d39'],
      styleTags: ['ATS', 'Đơn giản'],
      layout: 'clean',
      recommendedFor: ['Chuyên viên Tư vấn BĐS', 'Pháp lý', 'Kho vận', 'Quản lý dự án'],
      highlights: ['Bố cục 1 trang', 'Tối ưu đọc nhanh', 'Nhấn vào kinh nghiệm'],
      preview: {
        fullName: 'Nguyễn Gia Huy',
        title: 'Chuyên viên Tư vấn BĐS',
        summary: '4 năm kinh nghiệm chăm sóc khách hàng dự án, kiểm soát vấn đề pháp lý và phối hợp tổ kinh doanh dự án.',
        meta: ['Biên Hòa, Đồng Nai', 'Sẵn sàng đi thị trường', 'Mong muốn 30-50 triệu'],
        stats: [
          { label: 'Kinh nghiệm', value: '4 năm' },
          { label: 'Dự án nổi bật', value: '12+' },
          { label: 'Phù hợp ATS', value: 'Cao' }
        ],
        experience: [
          'Giảm 18% thời gian dừng máy nhờ checklist chăm sóc khách hàng định kỳ.',
          'Phối hợp kỹ thuật điện, vấn đề và QC trong ca kinh doanh dự án.'
        ],
        skills: ['Chốt sale, Quản lý tệp KH', 'Chốt sale, Quản lý tệp KH', 'Chốt sale, Quản lý tệp KH', 'Phong thủy cơ bản']
      }
    },
    {
      id: 'cv-standard-junior',
      category: 'Đơn giản',
      name: 'Tiêu chuẩn (ít kinh nghiệm)',
      tagline: 'Tập trung học vấn, thực tập và kỹ năng nền tảng cho người mới đi làm.',
      accent: '#2563eb',
      softTone: '#eef4ff',
      palette: ['#d9e7f6', '#f4efe6', '#dce8d3', '#f6ece8'],
      styleTags: ['ATS', 'Đơn giản', 'Chuyên nghiệp'],
      layout: 'centered',
      isNew: true,
      recommendedFor: ['Thực tập sinh', 'Junior', 'Nhân viên mới tốt nghiệp'],
      highlights: ['Mở đầu rõ ràng', 'Dễ điền', 'Tối ưu cho người mới'],
      preview: {
        fullName: 'Nguyễn Minh Trang',
        title: 'Nhân viên kiểm toán nội bộ',
        summary: 'Mới tốt nghiệp, chăm chỉ, có trải nghiệm thực tập và muốn phát triển theo hướng kiểm soát nội bộ.',
        meta: ['Hà Nội', 'IELTS 6.0', 'Sẵn sàng học nhanh'],
        stats: [
          { label: 'Thực tập', value: '2 kỳ' },
          { label: 'Chứng chỉ', value: '03' },
          { label: 'Dự án', value: '05' }
        ],
        experience: [
          'Thực tập kiểm soát hồ sơ và đối chiếu chứng từ nội bộ.',
          'Hỗ trợ lập báo cáo định kỳ và tổng hợp dữ liệu kiểm tra.'
        ],
        skills: ['Excel', 'Phân tích số liệu', 'Báo cáo', 'Chi tiết']
      }
    },
    {
      id: 'cv-impact-6',
      category: 'Ấn tượng',
      name: 'Ấn tượng 6',
      tagline: 'Mẫu có cột màu nổi bật, hợp ngành sáng tạo, truyền thông và nội dung.',
      accent: '#6b4b4b',
      softTone: '#f6efee',
      palette: ['#6b4b4b', '#7f8f7f', '#5b7c89', '#8f6b84', '#9b5757'],
      styleTags: ['ATS', 'Hiện đại', 'Chuyên nghiệp'],
      layout: 'sidebar-dark',
      recommendedFor: ['Content', 'Marketing', 'Thiết kế', 'Truyền thông'],
      highlights: ['Cột trái nổi bật', 'Đậm cá tính', 'Rõ kỹ năng'],
      preview: {
        fullName: 'Trần Mạnh Dũng',
        title: 'Content Leader',
        summary: 'Làm nội dung đa nền tảng, dẫn dắt team nhỏ và tối ưu hiệu quả chiến dịch bằng số liệu.',
        meta: ['Hà Nội', '4 năm kinh nghiệm', 'Mạnh chiến dịch số'],
        stats: [
          { label: 'Chiến dịch', value: '27' },
          { label: 'Nhân sự phụ trách', value: '4' },
          { label: 'Tăng trưởng', value: '180%' }
        ],
        experience: [
          'Xây dựng nội dung cho chiến dịch social và landing page chuyển đổi.',
          'Quản lý dự án cộng tác viên, theo dõi KPI và tối ưu hiệu suất nội dung.'
        ],
        skills: ['Content plan', 'SEO', 'Analytics', 'Leadership']
      }
    },
    {
      id: 'cv-impact-2',
      category: 'Ấn tượng',
      name: 'Ấn tượng 2',
      tagline: 'Thiết kế sidebar xanh trầm, hợp IT, sản phẩm và hồ sơ cần nhấn độ tin cậy.',
      accent: '#4d5d4d',
      softTone: '#eef3ef',
      palette: ['#445546', '#89a691', '#4f7286', '#a56a6a'],
      styleTags: ['ATS', 'Chuyên nghiệp', 'Ấn tượng'],
      layout: 'sidebar-soft',
      recommendedFor: ['Lập trình viên', 'Phân tích nghiệp vụ', 'Sản phẩm'],
      highlights: ['Sidebar mạnh', 'Rõ kỹ năng', 'Nhấn tiến trình làm việc'],
      preview: {
        fullName: 'Lê Chiến',
        title: 'Lập trình viên',
        summary: '2 năm kinh nghiệm phát triển ứng dụng web và phối hợp cùng team sản phẩm theo sprint.',
        meta: ['Đà Nẵng', 'Có thể làm hybrid', 'Mạnh React'],
        stats: [
          { label: 'Dự án', value: '09' },
          { label: 'Kỹ năng chính', value: '6' },
          { label: 'Sprint', value: '20+' }
        ],
        experience: [
          'Phát triển dashboard nội bộ và tối ưu hiệu suất hiển thị dữ liệu.',
          'Làm việc chặt với thiết kế và kiểm thử để hoàn thiện luồng người dùng.'
        ],
        skills: ['React', 'TypeScript', 'REST API', 'UI logic']
      }
    },
    {
      id: 'cv-elegant',
      category: 'Chuyên nghiệp',
      name: 'Thanh lịch',
      tagline: 'Bố cục cân bằng, hợp hồ sơ kinh doanh, vận hành và vị trí chuyên viên.',
      accent: '#0f8f63',
      softTone: '#edf8f3',
      palette: ['#c43746', '#6574b3', '#6ca36f', '#e9a61f'],
      styleTags: ['ATS', 'Đơn giản', 'Hiện đại'],
      layout: 'split',
      recommendedFor: ['Chuyên viên', 'Kinh doanh', 'Vận hành'],
      highlights: ['Nhìn sáng', 'Dễ quét nội dung', 'Cân bằng giữa kinh nghiệm và kỹ năng'],
      preview: {
        fullName: 'Nguyễn Quỳnh Như',
        title: 'Quản lý nhà hàng',
        summary: 'Quản lý vận hành, đào tạo nhân sự và theo dõi doanh thu theo tuần trong môi trường dịch vụ.',
        meta: ['TP.HCM', '6 năm kinh nghiệm', 'Mạnh điều phối đội nhóm'],
        stats: [
          { label: 'Nhân sự phụ trách', value: '18' },
          { label: 'Doanh thu', value: '+24%' },
          { label: 'Chi nhánh', value: '02' }
        ],
        experience: [
          'Quản lý vận hành nhà hàng và tối ưu chất lượng phục vụ theo ca.',
          'Huấn luyện đội ngũ mới, chuẩn hóa quy trình và kiểm soát chi phí.'
        ],
        skills: ['Quản lý ca', 'Đào tạo', 'Báo cáo', 'CSKH']
      }
    },
    {
      id: 'cv-ambition',
      category: 'Hiện đại',
      name: 'Tham vọng',
      tagline: 'Phong cách đậm, hợp hồ sơ cần cá tính và định vị rõ dấu ấn cá nhân.',
      accent: '#d97706',
      softTone: '#fff7ed',
      palette: ['#d97706', '#0ea5e9'],
      styleTags: ['ATS', 'Chuyên nghiệp', 'Ấn tượng'],
      layout: 'contrast',
      recommendedFor: ['Digital marketing', 'Creative', 'Branding'],
      highlights: ['Màu sắc rõ', 'Có điểm nhấn mạnh', 'Phù hợp hồ sơ nổi bật'],
      preview: {
        fullName: 'Vũ Tùng Dương',
        title: 'Senior Digital Marketing',
        summary: 'Xây chiến lược tăng trưởng, vận hành quảng cáo số và tối ưu hiệu quả theo từng kênh.',
        meta: ['Hà Nội', '7 năm kinh nghiệm', 'Mạnh performance'],
        stats: [
          { label: 'Ngân sách quản lý', value: '5 tỷ' },
          { label: 'ROAS', value: '4.2' },
          { label: 'Chiến dịch', value: '40+' }
        ],
        experience: [
          'Quản lý ngân sách quảng cáo đa kênh và tối ưu theo mục tiêu chuyển đổi.',
          'Lập kế hoạch tăng trưởng và phối hợp cùng content, thiết kế, sales.'
        ],
        skills: ['Performance', 'Meta Ads', 'GA4', 'Growth']
      }
    },
    {
      id: 'cv-harvard',
      category: 'Harvard',
      name: 'Harvard tối giản',
      tagline: 'Phong cách học thuật, tối giản và rất phù hợp hồ sơ cần cảm giác chuẩn chỉnh.',
      accent: '#243447',
      softTone: '#f1f5f9',
      palette: ['#243447', '#94a3b8', '#dbe4ee'],
      styleTags: ['Harvard', 'Chuyên nghiệp'],
      layout: 'minimal',
      recommendedFor: ['Tư vấn', 'Tài chính', 'Phân tích dữ liệu'],
      highlights: ['Rất sạch', 'Chuẩn học thuật', 'Ưu tiên nội dung'],
      preview: {
        fullName: 'Phạm Thuý Hà',
        title: 'Nhân viên kế toán nội bộ',
        summary: 'Tập trung số liệu, quy trình và báo cáo tài chính định kỳ trong doanh nghiệp tăng trưởng nhanh.',
        meta: ['Hà Nội', '3 năm kinh nghiệm', 'Tiếng Anh tốt'],
        stats: [
          { label: 'Báo cáo', value: '120+' },
          { label: 'Đối soát', value: '98%' },
          { label: 'Sổ sách', value: 'Chuẩn' }
        ],
        experience: [
          'Đối soát chứng từ, kiểm tra chi phí và lập báo cáo tháng.',
          'Phối hợp kiểm toán nội bộ, chuẩn hóa quy trình lưu trữ hồ sơ.'
        ],
        skills: ['Excel', 'Kế toán nội bộ', 'Đối soát', 'Cẩn thận']
      }
    }
  ],
  services: [
    {
      id: 'service-1',
      title: 'Xây dựng thương hiệu tuyển dụng',
      description: 'Trang công ty, hồ sơ phụ trách tuyển dụng và thông tin xác minh tập trung.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'service-2',
      title: 'Vận hành tuyển dụng',
      description: 'Bảng điều khiển quản trị, nhật ký kiểm toán và báo cáo kiểm duyệt cho đội vận hành.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'service-3',
      title: 'Tăng chuyển đổi ứng viên',
      description: 'Chi tiết việc làm rõ ràng, CV đa dạng và theo dõi ứng tuyển theo từng giai đoạn.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
    }
  ],
  news: [
    {
      id: 'news-1',
      category: 'Tư vấn',
      title: '5 mẹo viết CV nổi bật cho lĩnh vực bất động sản, Sale Admin',
      excerpt: 'Tập trung vào kỹ năng vận hành, tính kỷ luật, và số liệu kết quả để CV dễ được nhà tuyển dụng chú ý.',
      publishedAt: '2026-04-10',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'news-2',
      category: 'Thị trường',
      title: 'Xu hướng tuyển dụng 2026: Chuyên viên Tư vấn BĐS & Pháp lý tăng nhu cầu',
      excerpt: 'Các doanh nghiệp kinh doanh dự án ưu tiên ứng viên có chứng chỉ, kinh nghiệm thực hành và khả năng làm việc theo ca.',
      publishedAt: '2026-03-22',
      imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'news-3',
      category: 'Kinh nghiệm',
      title: 'Chuẩn bị phỏng vấn: 8 câu hỏi thường gặp và cách trả lời',
      excerpt: 'Gợi ý cách kể câu chuyện kinh nghiệm, xử lý tình huống và chứng minh sự phù hợp với ca/kíp.',
      publishedAt: '2026-02-18',
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
    }
  ]
};
