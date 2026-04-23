export const adminNavigation = [
  {
    label: 'Tổng quan',
    path: '/admin/dashboard',
    icon: 'dashboard',
    hint: 'Toàn cảnh vận hành'
  },
  {
    label: 'Người dùng',
    path: '/admin/users',
    icon: 'users',
    hint: 'Ứng viên và tuyển dụng'
  },
  {
    label: 'Doanh nghiệp',
    path: '/admin/companies',
    icon: 'building',
    hint: 'Tài khoản tuyển dụng'
  },
  {
    label: 'Việc làm',
    path: '/admin/jobs',
    icon: 'briefcase',
    hint: 'Tin đăng và kiểm duyệt'
  },
  {
    label: 'Ứng tuyển',
    path: '/admin/applications',
    icon: 'inbox',
    hint: 'Phễu ứng viên'
  },
  {
    label: 'Báo cáo',
    path: '/admin/reports',
    icon: 'flag',
    hint: 'Gian lận và lạm dụng'
  },
  {
    label: 'Danh mục',
    path: '/admin/categories',
    icon: 'folder',
    hint: 'Quản lý phân loại'
  },
  {
    label: 'Nhật ký kiểm toán',
    path: '/admin/audit-logs',
    icon: 'history',
    hint: 'Lịch sử thay đổi'
  }
];

export const dashboardMetrics = [
  {
    id: 'users',
    label: 'Total users',
    value: 18420,
    change: 12.4,
    trend: 'up',
    tone: 'slate'
  },
  {
    id: 'companies',
    label: 'Active companies',
    value: 362,
    change: 8.1,
    trend: 'up',
    tone: 'emerald'
  },
  {
    id: 'jobs',
    label: 'Live jobs',
    value: 1128,
    change: 4.7,
    trend: 'up',
    tone: 'amber'
  },
  {
    id: 'applications',
    label: 'Pending applications',
    value: 486,
    change: -1.8,
    trend: 'down',
    tone: 'rose'
  }
];

export const applicationTrend = [
  { month: 'Jan', users: 1240, jobs: 760, applications: 2840 },
  { month: 'Feb', users: 1380, jobs: 812, applications: 3014 },
  { month: 'Mar', users: 1520, jobs: 864, applications: 3260 },
  { month: 'Apr', users: 1684, jobs: 902, applications: 3482 },
  { month: 'May', users: 1732, jobs: 946, applications: 3615 },
  { month: 'Jun', users: 1810, jobs: 984, applications: 3894 },
  { month: 'Jul', users: 1888, jobs: 1032, applications: 4128 },
  { month: 'Aug', users: 1946, jobs: 1080, applications: 4386 },
  { month: 'Sep', users: 2028, jobs: 1128, applications: 4512 }
];

export const hiringFunnel = [
  { stage: 'Applications received', value: 4512, percentage: 100 },
  { stage: 'Screened by employer', value: 2410, percentage: 53.4 },
  { stage: 'Interview scheduled', value: 948, percentage: 21.0 },
  { stage: 'Offer sent', value: 318, percentage: 7.0 },
  { stage: 'Hires completed', value: 146, percentage: 3.2 }
];

export const sourceMix = [
  { label: 'Direct website', value: 42, tone: '#161617' },
  { label: 'Referral campaigns', value: 24, tone: '#f24d36' },
  { label: 'Social channels', value: 18, tone: '#fb923c' },
  { label: 'Agency partners', value: 10, tone: '#0f766e' },
  { label: 'Campus events', value: 6, tone: '#2563eb' }
];

export const operationalAlerts = [
  {
    id: 'alert-1',
    title: 'Spike in duplicate applications',
    severity: 'high',
    detail: 'Warehouse jobs in Binh Duong generated 37 duplicate applications in the last 6 hours.',
    owner: 'Trust & Safety',
    time: '2026-04-12T08:20:00.000Z'
  },
  {
    id: 'alert-2',
    title: 'Employer verification backlog',
    severity: 'medium',
    detail: '9 companies are waiting more than 24 hours for onboarding verification.',
    owner: 'Operations',
    time: '2026-04-12T06:15:00.000Z'
  },
  {
    id: 'alert-3',
    title: 'Critical job nearing SLA breach',
    severity: 'low',
    detail: '3 urgent listings have no employer response after 18 hours.',
    owner: 'Account Success',
    time: '2026-04-11T21:45:00.000Z'
  }
];

export const activityFeed = [
  {
    id: 'feed-1',
    actor: 'Trang Nguyen',
    action: 'approved company profile',
    target: 'Mekong Industrial Supply',
    time: '2026-04-12T09:40:00.000Z'
  },
  {
    id: 'feed-2',
    actor: 'System rule',
    action: 'auto-paused suspicious job',
    target: 'Forklift Operator - Delta Port',
    time: '2026-04-12T08:05:00.000Z'
  },
  {
    id: 'feed-3',
    actor: 'Linh Tran',
    action: 'exported user report',
    target: 'Q2 Talent Pulse',
    time: '2026-04-12T07:30:00.000Z'
  },
  {
    id: 'feed-4',
    actor: 'Minh Le',
    action: 'resolved abuse report',
    target: 'Candidate spam cluster',
    time: '2026-04-11T18:10:00.000Z'
  }
];

export const adminUsers = [
  {
    id: 'usr-001',
    name: 'Nguyen Hoang An',
    email: 'an.nguyen@SHGINVESTMENT.vn',
    role: 'admin',
    company: 'SHGINVESTMENT HQ',
    status: 'active',
    verified: true,
    region: 'HCMC',
    createdAt: '2026-01-10T08:00:00.000Z',
    lastActiveAt: '2026-04-12T09:08:00.000Z'
  },
  {
    id: 'usr-002',
    name: 'Pham Thu Linh',
    email: 'linh.hr@sunrisemanufacturing.vn',
    role: 'employer',
    company: 'Sunrise Manufacturing',
    status: 'active',
    verified: true,
    region: 'Hai Phong',
    createdAt: '2026-01-13T08:00:00.000Z',
    lastActiveAt: '2026-04-12T08:41:00.000Z'
  },
  {
    id: 'usr-003',
    name: 'Do Khanh Vy',
    email: 'vy.do@gmail.com',
    role: 'candidate',
    company: '-',
    status: 'active',
    verified: true,
    region: 'Binh Duong',
    createdAt: '2026-02-02T08:00:00.000Z',
    lastActiveAt: '2026-04-12T07:55:00.000Z'
  },
  {
    id: 'usr-004',
    name: 'Tran Quoc Dat',
    email: 'dat.ops@mekonglogistics.vn',
    role: 'employer',
    company: 'Mekong Logistics Hub',
    status: 'pending',
    verified: false,
    region: 'Long An',
    createdAt: '2026-03-08T08:00:00.000Z',
    lastActiveAt: '2026-04-11T19:30:00.000Z'
  },
  {
    id: 'usr-005',
    name: 'Le Thuy Duong',
    email: 'duong.le@SHGINVESTMENT.vn',
    role: 'recruiter',
    company: 'SHGINVESTMENT HQ',
    status: 'active',
    verified: true,
    region: 'Hanoi',
    createdAt: '2026-02-18T08:00:00.000Z',
    lastActiveAt: '2026-04-12T06:55:00.000Z'
  },
  {
    id: 'usr-006',
    name: 'Vo Minh Khang',
    email: 'khang.vo@gmail.com',
    role: 'candidate',
    company: '-',
    status: 'suspended',
    verified: false,
    region: 'Dong Nai',
    createdAt: '2026-03-17T08:00:00.000Z',
    lastActiveAt: '2026-04-09T16:14:00.000Z'
  },
  {
    id: 'usr-007',
    name: 'Bui Gia Han',
    email: 'han.bui@gtvelectronics.vn',
    role: 'employer',
    company: 'GTV Electronics Vietnam',
    status: 'active',
    verified: true,
    region: 'Bac Ninh',
    createdAt: '2026-01-21T08:00:00.000Z',
    lastActiveAt: '2026-04-12T08:02:00.000Z'
  },
  {
    id: 'usr-008',
    name: 'Nguyen Gia Huy',
    email: 'huy.nguyen@gmail.com',
    role: 'candidate',
    company: '-',
    status: 'inactive',
    verified: true,
    region: 'Da Nang',
    createdAt: '2026-02-28T08:00:00.000Z',
    lastActiveAt: '2026-03-26T10:44:00.000Z'
  },
  {
    id: 'usr-009',
    name: 'Tran Bao Chau',
    email: 'chau.tran@SHGINVESTMENT.vn',
    role: 'admin',
    company: 'SHGINVESTMENT HQ',
    status: 'active',
    verified: true,
    region: 'Remote',
    createdAt: '2026-01-05T08:00:00.000Z',
    lastActiveAt: '2026-04-12T09:21:00.000Z'
  },
  {
    id: 'usr-010',
    name: 'Pham Quang Minh',
    email: 'minh.pham@greenfoods.vn',
    role: 'employer',
    company: 'Green Foods FMCG',
    status: 'review',
    verified: false,
    region: 'Long An',
    createdAt: '2026-03-11T08:00:00.000Z',
    lastActiveAt: '2026-04-10T11:05:00.000Z'
  }
];

export const companies = [
  {
    id: 'cmp-001',
    name: 'GTV Electronics Vietnam',
    industry: 'Electronics Manufacturing',
    location: 'Bac Ninh',
    size: '1200 employees',
    plan: 'Enterprise',
    status: 'verified',
    openJobs: 42,
    applications: 684,
    owner: 'Bui Gia Han',
    updatedAt: '2026-04-12T07:50:00.000Z'
  },
  {
    id: 'cmp-002',
    name: 'Mekong Logistics Hub',
    industry: 'Logistics',
    location: 'Long An',
    size: '430 employees',
    plan: 'Growth',
    status: 'pending',
    openJobs: 15,
    applications: 201,
    owner: 'Tran Quoc Dat',
    updatedAt: '2026-04-12T06:40:00.000Z'
  },
  {
    id: 'cmp-003',
    name: 'Sunrise Manufacturing',
    industry: 'Mechanical Engineering',
    location: 'Hai Phong',
    size: '860 employees',
    plan: 'Enterprise',
    status: 'verified',
    openJobs: 27,
    applications: 318,
    owner: 'Pham Thu Linh',
    updatedAt: '2026-04-11T17:24:00.000Z'
  },
  {
    id: 'cmp-004',
    name: 'Green Foods FMCG',
    industry: 'Food Production',
    location: 'Long An',
    size: '540 employees',
    plan: 'Starter',
    status: 'review',
    openJobs: 11,
    applications: 122,
    owner: 'Pham Quang Minh',
    updatedAt: '2026-04-10T16:10:00.000Z'
  },
  {
    id: 'cmp-005',
    name: 'Northern Logistics Line',
    industry: 'Supply Chain',
    location: 'Hai Phong',
    size: '300 employees',
    plan: 'Growth',
    status: 'verified',
    openJobs: 9,
    applications: 142,
    owner: 'Vu Thanh Son',
    updatedAt: '2026-04-12T05:52:00.000Z'
  },
  {
    id: 'cmp-006',
    name: 'Vina Safety Manufacturing',
    industry: 'Industrial Safety',
    location: 'Binh Duong',
    size: '220 employees',
    plan: 'Growth',
    status: 'flagged',
    openJobs: 6,
    applications: 56,
    owner: 'Le Minh Duc',
    updatedAt: '2026-04-11T12:35:00.000Z'
  },
  {
    id: 'cmp-007',
    name: 'Smart Plant Solutions',
    industry: 'Industrial Software',
    location: 'Da Nang',
    size: '128 employees',
    plan: 'Starter',
    status: 'verified',
    openJobs: 4,
    applications: 78,
    owner: 'Ngoc Ha',
    updatedAt: '2026-04-09T15:18:00.000Z'
  },
  {
    id: 'cmp-008',
    name: 'Delta Manufacturing',
    industry: 'Procurement Services',
    location: 'Ha Noi',
    size: '260 employees',
    plan: 'Growth',
    status: 'archived',
    openJobs: 0,
    applications: 0,
    owner: 'Hoang Minh Hieu',
    updatedAt: '2026-03-21T09:42:00.000Z'
  }
];

export const jobs = [
  {
    id: 'job-001',
    title: 'SMT Line Operator',
    company: 'GTV Electronics Vietnam',
    category: 'Production',
    location: 'Bac Ninh',
    type: 'Shift',
    salary: '$420 - $620',
    status: 'live',
    applications: 152,
    qualityScore: 94,
    postedAt: '2026-04-10T08:00:00.000Z',
    deadline: '2026-05-05T08:00:00.000Z'
  },
  {
    id: 'job-002',
    title: 'Night Shift Warehouse Staff',
    company: 'Mekong Logistics Hub',
    category: 'Warehouse',
    location: 'HCMC',
    type: 'Shift',
    salary: '$480 - $610',
    status: 'live',
    applications: 96,
    qualityScore: 88,
    postedAt: '2026-04-09T08:00:00.000Z',
    deadline: '2026-04-30T08:00:00.000Z'
  },
  {
    id: 'job-003',
    title: 'Maintenance Technician',
    company: 'Sunrise Manufacturing',
    category: 'Engineering',
    location: 'Dong Nai',
    type: 'Full-time',
    salary: '$650 - $920',
    status: 'live',
    applications: 71,
    qualityScore: 91,
    postedAt: '2026-04-08T08:00:00.000Z',
    deadline: '2026-05-01T08:00:00.000Z'
  },
  {
    id: 'job-004',
    title: 'Quality Control Inspector',
    company: 'Global Textile Industrial',
    category: 'Quality',
    location: 'Ha Noi',
    type: 'Full-time',
    salary: '$390 - $520',
    status: 'review',
    applications: 43,
    qualityScore: 82,
    postedAt: '2026-04-07T08:00:00.000Z',
    deadline: '2026-04-29T08:00:00.000Z'
  },
  {
    id: 'job-005',
    title: 'Food Packaging Operator',
    company: 'Green Foods FMCG',
    category: 'Production',
    location: 'Long An',
    type: 'Shift',
    salary: '$360 - $490',
    status: 'draft',
    applications: 0,
    qualityScore: 74,
    postedAt: '2026-04-10T08:00:00.000Z',
    deadline: '2026-05-06T08:00:00.000Z'
  },
  {
    id: 'job-006',
    title: 'Production Team Leader',
    company: 'Sunrise Manufacturing',
    category: 'Leadership',
    location: 'Hai Phong',
    type: 'Full-time',
    salary: '$810 - $1120',
    status: 'live',
    applications: 58,
    qualityScore: 95,
    postedAt: '2026-04-06T08:00:00.000Z',
    deadline: '2026-04-28T08:00:00.000Z'
  },
  {
    id: 'job-007',
    title: 'Factory Recruiter',
    company: 'HR Factory Partner',
    category: 'Recruitment',
    location: 'Binh Duong',
    type: 'Full-time',
    salary: '$540 - $760',
    status: 'flagged',
    applications: 22,
    qualityScore: 69,
    postedAt: '2026-04-05T08:00:00.000Z',
    deadline: '2026-04-25T08:00:00.000Z'
  },
  {
    id: 'job-008',
    title: 'Procurement Specialist',
    company: 'Delta Manufacturing',
    category: 'Procurement',
    location: 'Ha Noi',
    type: 'Full-time',
    salary: '$580 - $810',
    status: 'archived',
    applications: 37,
    qualityScore: 84,
    postedAt: '2026-04-04T08:00:00.000Z',
    deadline: '2026-04-24T08:00:00.000Z'
  }
];

export const applications = [
  {
    id: 'app-001',
    candidate: 'Do Khanh Vy',
    jobTitle: 'Night Shift Warehouse Staff',
    company: 'Mekong Logistics Hub',
    stage: 'screening',
    score: 86,
    source: 'Direct',
    submittedAt: '2026-04-12T08:45:00.000Z',
    owner: 'Tran Quoc Dat'
  },
  {
    id: 'app-002',
    candidate: 'Vo Minh Khang',
    jobTitle: 'SMT Line Operator',
    company: 'GTV Electronics Vietnam',
    stage: 'rejected',
    score: 42,
    source: 'Referral',
    submittedAt: '2026-04-12T07:30:00.000Z',
    owner: 'Bui Gia Han'
  },
  {
    id: 'app-003',
    candidate: 'Pham Tuan Kiet',
    jobTitle: 'Maintenance Technician',
    company: 'Sunrise Manufacturing',
    stage: 'interview',
    score: 91,
    source: 'Direct',
    submittedAt: '2026-04-11T19:15:00.000Z',
    owner: 'Pham Thu Linh'
  },
  {
    id: 'app-004',
    candidate: 'Le Bao Chau',
    jobTitle: 'Production Team Leader',
    company: 'Sunrise Manufacturing',
    stage: 'offer',
    score: 95,
    source: 'Agency',
    submittedAt: '2026-04-11T15:00:00.000Z',
    owner: 'Pham Thu Linh'
  },
  {
    id: 'app-005',
    candidate: 'Tran Minh Khoa',
    jobTitle: 'Quality Control Inspector',
    company: 'Global Textile Industrial',
    stage: 'new',
    score: 80,
    source: 'Social',
    submittedAt: '2026-04-11T13:20:00.000Z',
    owner: 'Ha Truong'
  },
  {
    id: 'app-006',
    candidate: 'Nguyen Thu Ha',
    jobTitle: 'Procurement Specialist',
    company: 'Delta Manufacturing',
    stage: 'hired',
    score: 89,
    source: 'Direct',
    submittedAt: '2026-04-10T16:12:00.000Z',
    owner: 'Hoang Minh Hieu'
  },
  {
    id: 'app-007',
    candidate: 'Ly Quoc Hung',
    jobTitle: 'Factory Recruiter',
    company: 'HR Factory Partner',
    stage: 'new',
    score: 64,
    source: 'Referral',
    submittedAt: '2026-04-10T10:11:00.000Z',
    owner: 'Thanh Bui'
  },
  {
    id: 'app-008',
    candidate: 'Phan Hoang Yen',
    jobTitle: 'SMT Line Operator',
    company: 'GTV Electronics Vietnam',
    stage: 'screening',
    score: 84,
    source: 'Direct',
    submittedAt: '2026-04-10T08:08:00.000Z',
    owner: 'Bui Gia Han'
  },
  {
    id: 'app-009',
    candidate: 'Dang Hai Nam',
    jobTitle: 'Food Packaging Operator',
    company: 'Green Foods FMCG',
    stage: 'withdrawn',
    score: 58,
    source: 'Social',
    submittedAt: '2026-04-09T17:35:00.000Z',
    owner: 'Pham Quang Minh'
  },
  {
    id: 'app-010',
    candidate: 'Vu Gia Bao',
    jobTitle: 'Night Shift Warehouse Staff',
    company: 'Mekong Logistics Hub',
    stage: 'interview',
    score: 88,
    source: 'Agency',
    submittedAt: '2026-04-09T15:10:00.000Z',
    owner: 'Tran Quoc Dat'
  }
];

export const reports = [
  {
    id: 'rpt-001',
    type: 'Spam application',
    target: 'Candidate cluster / warehouse listing',
    reporter: 'Auto-detection',
    severity: 'high',
    status: 'open',
    createdAt: '2026-04-12T08:10:00.000Z'
  },
  {
    id: 'rpt-002',
    type: 'Fake company profile',
    target: 'Vina Safety Manufacturing',
    reporter: 'Le Minh Duc',
    severity: 'critical',
    status: 'escalated',
    createdAt: '2026-04-11T17:30:00.000Z'
  },
  {
    id: 'rpt-003',
    type: 'Salary mismatch',
    target: 'Production Team Leader',
    reporter: 'Candidate complaint',
    severity: 'medium',
    status: 'reviewing',
    createdAt: '2026-04-11T13:24:00.000Z'
  },
  {
    id: 'rpt-004',
    type: 'Harassment claim',
    target: 'Mekong Logistics interviewer',
    reporter: 'Anonymous',
    severity: 'high',
    status: 'open',
    createdAt: '2026-04-10T18:00:00.000Z'
  },
  {
    id: 'rpt-005',
    type: 'Duplicate company',
    target: 'Delta Manufacturing',
    reporter: 'Ops audit',
    severity: 'low',
    status: 'resolved',
    createdAt: '2026-04-09T09:18:00.000Z'
  },
  {
    id: 'rpt-006',
    type: 'Credential abuse',
    target: 'Admin account anomaly',
    reporter: 'Security monitor',
    severity: 'critical',
    status: 'resolved',
    createdAt: '2026-04-08T23:12:00.000Z'
  }
];

export const categories = [
  {
    id: 'cat-001',
    name: 'Production',
    parent: 'Operations',
    status: 'active',
    activeJobs: 248,
    companies: 76,
    skills: ['Assembly', 'Line Ops', 'Safety'],
    updatedAt: '2026-04-12T07:10:00.000Z'
  },
  {
    id: 'cat-002',
    name: 'Warehouse',
    parent: 'Operations',
    status: 'active',
    activeJobs: 182,
    companies: 58,
    skills: ['Inventory', 'Scanner', 'Forklift'],
    updatedAt: '2026-04-11T16:50:00.000Z'
  },
  {
    id: 'cat-003',
    name: 'Engineering',
    parent: 'Technical',
    status: 'active',
    activeJobs: 164,
    companies: 39,
    skills: ['PLC', 'Maintenance', 'CAD'],
    updatedAt: '2026-04-11T15:18:00.000Z'
  },
  {
    id: 'cat-004',
    name: 'Quality',
    parent: 'Technical',
    status: 'active',
    activeJobs: 92,
    companies: 27,
    skills: ['QC', 'QA', 'ISO'],
    updatedAt: '2026-04-10T13:44:00.000Z'
  },
  {
    id: 'cat-005',
    name: 'Recruitment',
    parent: 'Corporate',
    status: 'active',
    activeJobs: 51,
    companies: 17,
    skills: ['ATS', 'Mass Hiring', 'Onboarding'],
    updatedAt: '2026-04-09T11:24:00.000Z'
  },
  {
    id: 'cat-006',
    name: 'Procurement',
    parent: 'Corporate',
    status: 'draft',
    activeJobs: 28,
    companies: 11,
    skills: ['Vendor Mgmt', 'Negotiation', 'ERP'],
    updatedAt: '2026-04-08T10:02:00.000Z'
  }
];

export const auditLogs = [
  {
    id: 'log-001',
    actor: 'Nguyen Hoang An',
    actorRole: 'admin',
    action: 'Approved company verification',
    target: 'Mekong Logistics Hub',
    ip: '115.77.20.81',
    status: 'success',
    occurredAt: '2026-04-12T09:10:00.000Z',
    details: 'Document set #KYC-8821 approved after manual review.'
  },
  {
    id: 'log-002',
    actor: 'System rule',
    actorRole: 'system',
    action: 'Paused job listing',
    target: 'Factory Recruiter',
    ip: 'internal',
    status: 'warning',
    occurredAt: '2026-04-12T08:03:00.000Z',
    details: 'Triggered by duplicated salary template and low trust score.'
  },
  {
    id: 'log-003',
    actor: 'Pham Thu Linh',
    actorRole: 'employer',
    action: 'Updated job description',
    target: 'Production Team Leader',
    ip: '14.169.55.12',
    status: 'success',
    occurredAt: '2026-04-12T07:12:00.000Z',
    details: 'Expanded benefits block and deadline note.'
  },
  {
    id: 'log-004',
    actor: 'Trang Nguyen',
    actorRole: 'admin',
    action: 'Resolved abuse report',
    target: 'Report #rpt-005',
    ip: '113.190.17.41',
    status: 'success',
    occurredAt: '2026-04-11T16:22:00.000Z',
    details: 'Merged duplicate employer account and archived stale profile.'
  },
  {
    id: 'log-005',
    actor: 'Unknown IP',
    actorRole: 'external',
    action: 'Failed admin login',
    target: 'admin panel',
    ip: '91.201.14.90',
    status: 'blocked',
    occurredAt: '2026-04-11T02:11:00.000Z',
    details: 'Rate limiter blocked after 10 invalid attempts.'
  },
  {
    id: 'log-006',
    actor: 'Le Minh Duc',
    actorRole: 'employer',
    action: 'Downloaded candidate export',
    target: 'HSE shortlist',
    ip: '42.115.81.10',
    status: 'success',
    occurredAt: '2026-04-10T18:46:00.000Z',
    details: 'CSV export of 18 candidates.'
  }
];
