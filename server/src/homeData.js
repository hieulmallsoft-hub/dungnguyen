const HOME_DATA = {
  brand: {
    name: 'Viec 3 Mien',
    subtitle: 'Nen tang tuyen dung cho khoi san xuat, logistics va ky thuat tren toan quoc.',
    hotline: '0812 533 533',
    email: 'support@viec3mien.vn',
    socialLinks: [
      { label: 'Facebook', href: 'https://www.facebook.com/viec3mientuyendung' },
      { label: 'Zalo', href: 'https://zalo.me/viec3mientuyendung' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@viec3mientuyendung1' },
      { label: 'YouTube', href: 'https://www.youtube.com/@viec3mien' }
    ]
  },
  nav: [
    { label: 'Viec lam', href: '#jobs' },
    { label: 'Doanh nghiep', href: '#companies' },
    { label: 'Quy trinh', href: '#journey' },
    { label: 'Dich vu', href: '#services' }
  ],
  heroBanners: [
    {
      id: 'hero-1',
      title: 'Tuyen dung hieu qua cho khoi san xuat',
      description:
        'Tap trung viec lam chat luong, thong tin ro rang va luong ung tuyen nhanh trong mot giao dien duy nhat.',
      imageDesktop: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1800&q=80',
      imageMobile: 'https://images.unsplash.com/photo-1573164574230-db1d5e960238?auto=format&fit=crop&w=900&q=80',
      ctaPrimary: { label: 'Tim viec ngay', href: '#jobs' },
      ctaSecondary: { label: 'Tao ho so ung vien', href: '#jobs' }
    },
    {
      id: 'hero-2',
      title: 'Toi uu chi phi tuyen dung cho doanh nghiep',
      description:
        'Tu nhu cau tuyen gap den chien dich dai han, doanh nghiep co the tiep can ung vien theo khu vuc va ky nang.',
      imageDesktop: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80',
      imageMobile: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
      ctaPrimary: { label: 'Dang tin tuyen dung', href: '#services' },
      ctaSecondary: { label: 'Xem doanh nghiep', href: '#companies' }
    },
    {
      id: 'hero-3',
      title: 'Ung tuyen nhanh, phan hoi minh bach',
      description:
        'Ung vien co the loc viec theo muc luong, kinh nghiem va khu vuc, sau do nop ho so truc tiep trong vai phut.',
      imageDesktop: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80',
      imageMobile: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
      ctaPrimary: { label: 'Xem vi tri moi', href: '#jobs' },
      ctaSecondary: { label: 'Tu van nghe nghiep', href: '#journey' }
    }
  ],
  quickStats: [
    { label: 'Viec lam dang mo', value: '12.680+' },
    { label: 'Doanh nghiep doi tac', value: '1.540+' },
    { label: 'Ho so ung vien', value: '102.000+' },
    { label: 'Ty le phan hoi 7 ngay', value: '87%' }
  ],
  jobFilters: {
    locations: ['TP.HCM', 'Ha Noi', 'Binh Duong', 'Dong Nai', 'Bac Ninh', 'Long An', 'Hai Phong', 'Da Nang'],
    types: [
      { value: 'full-time', label: 'Toan thoi gian' },
      { value: 'shift', label: 'Lam theo ca' },
      { value: 'contract', label: 'Hop dong thoi vu' },
      { value: 'intern', label: 'Thuc tap' }
    ],
    experienceLevels: [
      { value: 'none', label: 'Chua co kinh nghiem' },
      { value: 'junior', label: 'Tu 6 thang - 1 nam' },
      { value: 'mid', label: 'Tu 1 - 3 nam' },
      { value: 'senior', label: 'Tren 3 nam' }
    ],
    salaryOptions: [
      { value: '8000000', label: 'Tu 8 trieu' },
      { value: '10000000', label: 'Tu 10 trieu' },
      { value: '15000000', label: 'Tu 15 trieu' },
      { value: '20000000', label: 'Tu 20 trieu' }
    ]
  },
  jobs: [
    {
      id: 'job-001',
      title: 'Cong nhan van hanh may SMT',
      company: 'GTV Electronics Vietnam',
      location: 'Bac Ninh',
      district: 'KCN VSIP',
      salaryMin: 10000000,
      salaryMax: 15000000,
      salaryLabel: '10 - 15 trieu/thang',
      type: 'shift',
      typeLabel: 'Lam theo ca',
      experience: 'none',
      experienceLabel: 'Chua co kinh nghiem',
      shift: 'Ca 1 / Ca 2 luan phien',
      postedAt: '2026-04-10',
      deadline: '2026-05-05',
      urgent: true,
      tags: ['Bao an', 'Thuong chuyen can', 'Ky tuc xa'],
      summary:
        'Van hanh day chuyen SMT, dam bao thong so may va chat luong linh kien theo tieu chuan nha may.',
      requirements: [
        'Tot nghiep THPT tro len.',
        'San sang lam theo ca va tang ca khi can.',
        'Tinh ky luat cao, thao tac nhanh va chinh xac.'
      ],
      benefits: [
        'Luong thang 13 va thuong nang suat quy.',
        'Xe dua don tu thanh pho Bac Ninh.',
        'Dao tao nghe bai ban trong 2 tuan dau nhan viec.'
      ]
    },
    {
      id: 'job-002',
      title: 'Nhan vien kho van ca dem',
      company: 'Mekong Logistics Hub',
      location: 'TP.HCM',
      district: 'Thu Duc',
      salaryMin: 11000000,
      salaryMax: 14000000,
      salaryLabel: '11 - 14 trieu/thang',
      type: 'shift',
      typeLabel: 'Lam theo ca',
      experience: 'junior',
      experienceLabel: 'Tu 6 thang - 1 nam',
      shift: '22:00 - 06:00',
      postedAt: '2026-04-09',
      deadline: '2026-04-30',
      urgent: true,
      tags: ['Phu cap dem', 'Bao hiem full luong', 'Xe dua don'],
      summary:
        'Thuc hien nhap xuat hang, kiem dem bang handheld scanner va phoi hop doi van tai ca dem.',
      requirements: [
        'Co kinh nghiem kho van toi thieu 6 thang.',
        'Su dung duoc may quet ma vach va phan mem kho co ban.',
        'Suc khoe tot, san sang lam dem.'
      ],
      benefits: [
        'Phu cap ca dem 35% tren don gia gio.',
        'Kham suc khoe dinh ky moi nam.',
        'Co lo trinh len to pho kho sau 6 thang.'
      ]
    },
    {
      id: 'job-003',
      title: 'Ky thuat vien bao tri day chuyen',
      company: 'An Phat Mechanical',
      location: 'Dong Nai',
      district: 'Bien Hoa',
      salaryMin: 14000000,
      salaryMax: 20000000,
      salaryLabel: '14 - 20 trieu/thang',
      type: 'full-time',
      typeLabel: 'Toan thoi gian',
      experience: 'mid',
      experienceLabel: 'Tu 1 - 3 nam',
      shift: 'Hanh chinh + truc su co',
      postedAt: '2026-04-08',
      deadline: '2026-05-01',
      urgent: false,
      tags: ['Thuong KPI', 'Phu cap dien thoai', 'Dao tao PLC'],
      summary:
        'Bao tri may moc san xuat, xu ly su co co dien va toi uu hieu suat thiet bi theo ke hoach tuan.',
      requirements: [
        'Co kinh nghiem bao tri may cong nghiep tu 1 nam tro len.',
        'Doc hieu ban ve co khi, dien dieu khien co ban.',
        'Uu tien biet PLC Siemens hoac Mitsubishi.'
      ],
      benefits: [
        'Thu nhap canh tranh theo nang luc thuc te.',
        'Duoc ho tro khoa hoc nang cao chuyen mon.',
        'Bua trua tai nha may va phu cap xang xe.'
      ]
    },
    {
      id: 'job-004',
      title: 'Nhan vien QC kiem tra chat luong',
      company: 'Global Textile Industrial',
      location: 'Ha Noi',
      district: 'Gia Lam',
      salaryMin: 9000000,
      salaryMax: 12000000,
      salaryLabel: '9 - 12 trieu/thang',
      type: 'full-time',
      typeLabel: 'Toan thoi gian',
      experience: 'none',
      experienceLabel: 'Chua co kinh nghiem',
      shift: 'Ca ngay',
      postedAt: '2026-04-07',
      deadline: '2026-04-29',
      urgent: false,
      tags: ['Dao tao noi bo', 'Thuong can cu', 'Moi truong on dinh'],
      summary:
        'Kiem tra chat luong ban thanh pham va thanh pham theo checklist, ghi nhan loi theo bieu mau chuan.',
      requirements: [
        'Tot nghiep THPT, can than trong thao tac kiem tra.',
        'Co the dung lam viec trong xuong trong thoi gian dai.',
        'Uu tien ung vien tung lam QC may mac.'
      ],
      benefits: [
        'Phu cap chuyen can hang thang.',
        'Ho tro bua an giua ca.',
        'Thuong hieu suat theo nhom chuyen.'
      ]
    },
    {
      id: 'job-005',
      title: 'Cong nhan dong goi thuc pham',
      company: 'Green Foods FMCG',
      location: 'Long An',
      district: 'Ben Luc',
      salaryMin: 8500000,
      salaryMax: 11500000,
      salaryLabel: '8.5 - 11.5 trieu/thang',
      type: 'shift',
      typeLabel: 'Lam theo ca',
      experience: 'none',
      experienceLabel: 'Chua co kinh nghiem',
      shift: 'Ca xoay 8 tieng',
      postedAt: '2026-04-10',
      deadline: '2026-05-06',
      urgent: false,
      tags: ['Bao an', 'Phu cap ca', 'Viec on dinh'],
      summary:
        'Thuc hien dong goi san pham, dan tem va kiem tra ngoai quan truoc khi chuyen sang kho thanh pham.',
      requirements: [
        'Suc khoe tot, khong di ung voi moi truong lanh nhe.',
        'Tuan thu quy dinh ve sinh an toan thuc pham.',
        'Co the tang ca vao giai doan cao diem.'
      ],
      benefits: [
        'Bao an trong ca va cap phat dong phuc.',
        'Thuong nang suat cuoi thang.',
        'Ho tro nha tro cho nhan su o xa.'
      ]
    },
    {
      id: 'job-006',
      title: 'To truong chuyen san xuat',
      company: 'Sunrise Industrial',
      location: 'Hai Phong',
      district: 'KCN Trang Due',
      salaryMin: 17000000,
      salaryMax: 24000000,
      salaryLabel: '17 - 24 trieu/thang',
      type: 'full-time',
      typeLabel: 'Toan thoi gian',
      experience: 'senior',
      experienceLabel: 'Tren 3 nam',
      shift: 'Hanh chinh',
      postedAt: '2026-04-06',
      deadline: '2026-04-28',
      urgent: true,
      tags: ['Quan ly doi', 'Thuong quy', 'Lo trinh quan ly'],
      summary:
        'Dieu phoi nhan luc chuyen, giam sat ke hoach san xuat va cai tien ty le loi trong cong doan chinh.',
      requirements: [
        'It nhat 3 nam kinh nghiem quan ly chuyen san xuat.',
        'Ky nang lap ke hoach va xu ly su co tot.',
        'Co tu duy cai tien lien tuc va quan tri hieu suat.'
      ],
      benefits: [
        'Thuong KPI theo san luong va chat luong.',
        'Bao hiem suc khoe mo rong cho quan ly.',
        'Duoc tham gia chuong trinh phat trien lanh dao.'
      ]
    },
    {
      id: 'job-007',
      title: 'Nhan vien tuyen dung noi bo nha may',
      company: 'HR Factory Partner',
      location: 'Binh Duong',
      district: 'Thuan An',
      salaryMin: 12000000,
      salaryMax: 17000000,
      salaryLabel: '12 - 17 trieu/thang',
      type: 'full-time',
      typeLabel: 'Toan thoi gian',
      experience: 'mid',
      experienceLabel: 'Tu 1 - 3 nam',
      shift: 'Hanh chinh',
      postedAt: '2026-04-05',
      deadline: '2026-04-25',
      urgent: false,
      tags: ['Thuong tuyen dung', 'Data ung vien co san', 'Hybrid 1 ngay/tuan'],
      summary:
        'Phu trach chien dich tuyen dung cong nhan, dieu phoi lich phong van va onboarding tai nha may.',
      requirements: [
        'Kinh nghiem tuyen mass tu 1 nam.',
        'Ky nang giao tiep va quan ly pipeline ung vien.',
        'Thanh thao Google Sheets hoac ATS co ban.'
      ],
      benefits: [
        'Thuong theo so luong ung vien onboard.',
        'Duoc dao tao ve thuong hieu tuyen dung.',
        'Phuc loi day du theo quy dinh cong ty.'
      ]
    },
    {
      id: 'job-008',
      title: 'Nhan vien mua hang vat tu',
      company: 'Delta Manufacturing',
      location: 'Ha Noi',
      district: 'Long Bien',
      salaryMin: 13000000,
      salaryMax: 18000000,
      salaryLabel: '13 - 18 trieu/thang',
      type: 'full-time',
      typeLabel: 'Toan thoi gian',
      experience: 'junior',
      experienceLabel: 'Tu 6 thang - 1 nam',
      shift: 'Hanh chinh',
      postedAt: '2026-04-04',
      deadline: '2026-04-24',
      urgent: false,
      tags: ['Phu cap an trua', 'Ky hop dong chinh thuc', 'Thuong theo du an'],
      summary:
        'Tim kiem nha cung ung, dam phan gia va dam bao nguon vat tu on dinh cho ke hoach san xuat.',
      requirements: [
        'Toi thieu 6 thang kinh nghiem mua hang.',
        'Ky nang dam phan tot, can than chung tu.',
        'Uu tien ung vien tung lam viec voi nha cung cap Trung Quoc.'
      ],
      benefits: [
        'Muc thu nhap on dinh va thuong ket qua dam phan.',
        'Moi truong lam viec chuyen nghiep.',
        'Co hoi phat trien len vi tri buyer cap cao.'
      ]
    },
    {
      id: 'job-009',
      title: 'Thuc tap sinh QA du lieu san xuat',
      company: 'Smart Plant Solutions',
      location: 'Da Nang',
      district: 'Lien Chieu',
      salaryMin: 5000000,
      salaryMax: 7000000,
      salaryLabel: '5 - 7 trieu/thang',
      type: 'intern',
      typeLabel: 'Thuc tap',
      experience: 'none',
      experienceLabel: 'Chua co kinh nghiem',
      shift: 'Part-time linh hoat',
      postedAt: '2026-04-03',
      deadline: '2026-04-27',
      urgent: false,
      tags: ['Ho tro mentor', 'Co dau moc', 'Co hoi len chinh thuc'],
      summary:
        'Ho tro kiem tra chat luong du lieu van hanh nha may va chuan hoa bao cao theo template noi bo.',
      requirements: [
        'Sinh vien nam cuoi cac nganh ky thuat hoac CNTT.',
        'Su dung tot Excel, biet SQL co ban la loi the.',
        'Chu dong hoc hoi va co trach nhiem voi deadline.'
      ],
      benefits: [
        'Tro cap thuc tap hang thang.',
        'Mentor 1-1 va danh gia dinh ky.',
        'Co hoi chuyen chinh thuc sau ky thuc tap.'
      ]
    },
    {
      id: 'job-010',
      title: 'Nhan vien van hanh xe nang',
      company: 'Northern Logistics Line',
      location: 'Hai Phong',
      district: 'Dinh Vu',
      salaryMin: 10500000,
      salaryMax: 14500000,
      salaryLabel: '10.5 - 14.5 trieu/thang',
      type: 'contract',
      typeLabel: 'Hop dong thoi vu',
      experience: 'junior',
      experienceLabel: 'Tu 6 thang - 1 nam',
      shift: 'Ca ngay',
      postedAt: '2026-04-02',
      deadline: '2026-04-26',
      urgent: false,
      tags: ['Ho tro chung chi', 'Thuong an toan', 'Co the gia han'],
      summary:
        'Van hanh xe nang tai kho ngoai quan, phoi hop kiem hang va xuat nhap container dung quy trinh.',
      requirements: [
        'Co chung chi van hanh xe nang con hieu luc.',
        'Kinh nghiem lam kho tu 6 thang tro len.',
        'Tuan thu nghiem ngat quy dinh an toan lao dong.'
      ],
      benefits: [
        'Phu cap an toan va thuong ca day du.',
        'Xet gia han hop dong sau 3 thang.',
        'Ho tro bua an trong ca lam viec.'
      ]
    },
    {
      id: 'job-011',
      title: 'Chuyen vien HSE nha may',
      company: 'Vina Safety Manufacturing',
      location: 'Binh Duong',
      district: 'Tan Uyen',
      salaryMin: 16000000,
      salaryMax: 23000000,
      salaryLabel: '16 - 23 trieu/thang',
      type: 'full-time',
      typeLabel: 'Toan thoi gian',
      experience: 'senior',
      experienceLabel: 'Tren 3 nam',
      shift: 'Hanh chinh',
      postedAt: '2026-04-01',
      deadline: '2026-04-23',
      urgent: true,
      tags: ['Chinh sach quoc te', 'Thuong du an', 'Dao tao dinh ky'],
      summary:
        'Xay dung va giam sat chuong trinh an toan lao dong, moi truong theo tieu chuan ISO tai nha may.',
      requirements: [
        'Tren 3 nam kinh nghiem HSE trong moi truong san xuat.',
        'Nam ro phap ly an toan lao dong tai Viet Nam.',
        'Uu tien ung vien co chung chi NEBOSH/IOSH.'
      ],
      benefits: [
        'Thu nhap hap dan theo nang luc.',
        'Bao hiem suc khoe mo rong cho gia dinh.',
        'Lo trinh len quan ly HSE khu vuc.'
      ]
    },
    {
      id: 'job-012',
      title: 'Nhan vien cham soc ung vien',
      company: 'Viec3mien Talent Hub',
      location: 'TP.HCM',
      district: 'Quan 3',
      salaryMin: 9000000,
      salaryMax: 13000000,
      salaryLabel: '9 - 13 trieu/thang',
      type: 'full-time',
      typeLabel: 'Toan thoi gian',
      experience: 'junior',
      experienceLabel: 'Tu 6 thang - 1 nam',
      shift: 'Hanh chinh',
      postedAt: '2026-03-30',
      deadline: '2026-04-22',
      urgent: false,
      tags: ['Lam viec van phong', 'Thuong CSAT', 'Dao tao onboarding'],
      summary:
        'Ho tro ung vien cap nhat ho so, tu van lo trinh ung tuyen va theo doi phan hoi tu doanh nghiep.',
      requirements: [
        'Ky nang giao tiep tot qua dien thoai va chat.',
        'Tung lam CSKH hoac tuyen dung la mot loi the.',
        'Chu dong xu ly tinh huong va theo doi tien do.'
      ],
      benefits: [
        'Thuong chat luong dich vu theo thang.',
        'Moi truong tre va quy trinh ro rang.',
        'Lo trinh phat trien len chuyen vien tuyen dung.'
      ]
    }
  ],
  topCompanies: [
    {
      id: 'company-1',
      name: 'GTV Electronics Vietnam',
      location: 'Bac Ninh',
      openJobs: 42,
      official: true,
      field: 'Dien tu - linh kien'
    },
    {
      id: 'company-2',
      name: 'Global Textile Industrial',
      location: 'Ha Noi',
      openJobs: 28,
      official: true,
      field: 'Det may xuat khau'
    },
    {
      id: 'company-3',
      name: 'Mekong Logistics Hub',
      location: 'Long An',
      openJobs: 35,
      official: false,
      field: 'Kho van - chuoi cung ung'
    },
    {
      id: 'company-4',
      name: 'Sunrise Industrial',
      location: 'Hai Phong',
      openJobs: 19,
      official: false,
      field: 'Co khi che tao'
    }
  ],
  talentJourney: [
    {
      id: 'journey-1',
      title: 'Tao ho so 5 phut',
      description: 'Dien thong tin co ban, ky nang va kinh nghiem de he thong goi y viec lam phu hop.'
    },
    {
      id: 'journey-2',
      title: 'Loc viec thong minh',
      description: 'Tim theo khu vuc, muc luong va ca lam de tiet kiem thoi gian tim kiem.'
    },
    {
      id: 'journey-3',
      title: 'Ung tuyen truc tiep',
      description: 'Nop ho so ngay tren nen tang, theo doi trang thai phan hoi minh bach.'
    },
    {
      id: 'journey-4',
      title: 'Nhan ho tro 1-1',
      description: 'Doi ngu tu van dong hanh truoc phong van va trong qua trinh nhan viec.'
    }
  ],
  services: [
    {
      id: 'service-1',
      title: 'Managed Recruitment',
      description:
        'Doi ngu chuyen trach dong hanh tu khau hoach dinh nhu cau, truyen thong tuyen dung den onboarding.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'service-2',
      title: 'Employer Branding',
      description:
        'Xay dung hinh anh tuyen dung ro rang, nhat quan, giup tang ty le ung tuyen chat luong.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'service-3',
      title: 'HR Data Dashboard',
      description:
        'Bao cao realtime ve funnel tuyen dung, giup doanh nghiep toi uu chi phi va toc do tuyen.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    }
  ],
  testimonials: [
    {
      id: 'testimonial-1',
      quote:
        'Sau khi dung nen tang, thoi gian tuyen du chuyen cua chung toi giam tu 21 ngay xuong con 11 ngay.',
      author: 'Truong phong Nhan su - GTV Electronics'
    },
    {
      id: 'testimonial-2',
      quote:
        'Giao dien loc viec ro rang, doi cham soc phan hoi nhanh va ty le ung vien di lam thuc te tang dang ke.',
      author: 'HRBP - Mekong Logistics Hub'
    }
  ],
  appLinks: {
    ios: 'https://apps.apple.com/vn/app/viec3mien/id1601009849?l=vi',
    android: 'https://play.google.com/store/apps/details?id=com.gtv.viec3mien',
    download: 'https://download-app.viec3mien.vn/'
  }
};

module.exports = HOME_DATA;

