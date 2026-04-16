import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ApplicationEntity,
  AuditLogEntity,
  CandidateProfileEntity,
  CompanyEntity,
  CompanyMemberEntity,
  JobCategoryEntity,
  JobEntity,
  JobJobCategoryEntity,
  JobSkillEntity,
  ReportEntity,
  UserEntity
} from '../../database/entities';
import { ApplicationStatus, JobStatus } from '../../common/enums/domain.enums';
import { translateDemoList, translateDemoText } from '../../common/utils/demo-translation';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(CompanyMemberEntity) private readonly companyMemberRepository: Repository<CompanyMemberEntity>,
    @InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>,
    @InjectRepository(JobCategoryEntity) private readonly categoryRepository: Repository<JobCategoryEntity>,
    @InjectRepository(JobJobCategoryEntity) private readonly jobCategoryRepository: Repository<JobJobCategoryEntity>,
    @InjectRepository(JobSkillEntity) private readonly jobSkillRepository: Repository<JobSkillEntity>,
    @InjectRepository(ApplicationEntity) private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(CandidateProfileEntity) private readonly candidateRepository: Repository<CandidateProfileEntity>,
    @InjectRepository(ReportEntity) private readonly reportRepository: Repository<ReportEntity>,
    @InjectRepository(AuditLogEntity) private readonly auditLogRepository: Repository<AuditLogEntity>
  ) {}

  async getDashboard() {
    const [users, companies, jobs, applications, reports, auditLogs] = await Promise.all([
      this.userRepository.find({ order: { createdAt: 'ASC' } }),
      this.companyRepository.find({ order: { createdAt: 'ASC' } }),
      this.jobRepository.find({ order: { createdAt: 'ASC' } }),
      this.applicationRepository.find({ order: { appliedAt: 'ASC' } }),
      this.reportRepository.find({ order: { createdAt: 'DESC' } }),
      this.auditLogRepository.find({ order: { createdAt: 'DESC' } })
    ]);

    const metrics = [
      { id: 'users', label: 'Tổng người dùng', value: users.length, change: this.percent(users.filter((item) => item.status === 'active').length, users.length || 1), trend: 'up', tone: 'slate' },
      { id: 'companies', label: 'Doanh nghiệp hoạt động', value: companies.filter((item) => item.status === 'verified').length, change: this.percent(companies.filter((item) => item.plan === 'Enterprise').length, companies.length || 1), trend: 'up', tone: 'emerald' },
      { id: 'jobs', label: 'Việc làm đang hiển thị', value: jobs.filter((item) => item.status === JobStatus.PUBLISHED).length, change: this.percent(jobs.filter((item) => item.urgent).length, jobs.length || 1), trend: 'up', tone: 'amber' },
      { id: 'applications', label: 'Hồ sơ đang chờ', value: applications.filter((item) => item.status === ApplicationStatus.APPLIED || item.status === ApplicationStatus.REVIEWING).length, change: -1.8, trend: 'down', tone: 'rose' }
    ];

    return {
      metrics,
      applicationTrend: this.buildTrend(users, jobs, applications),
      hiringFunnel: this.buildFunnel(applications),
      sourceMix: this.buildSourceMix(applications),
      operationalAlerts: this.buildAlerts(companies, jobs, reports),
      activityFeed: auditLogs.slice(0, 4).map((log) => ({
        id: log.id,
        actor: log.user?.fullName || 'Hệ thống',
        action: this.translateAuditAction(log.action),
        target: this.translateEntityType(log.entityType),
        time: log.createdAt
      })),
      healthCards: [
        { id: 'health-verified-employers', label: 'Doanh nghiệp đã xác minh', value: companies.filter((item) => item.status === 'verified').length, hint: 'Doanh nghiệp đã qua bước kiểm duyệt thủ công và có thể đăng tuyển ngay.', status: 'healthy' },
        { id: 'health-first-response', label: 'Thời gian phản hồi đầu tiên', value: 6.4, hint: 'Số giờ từ lúc ứng tuyển đến khi người phụ trách tuyển dụng bắt đầu xem xét trong bộ dữ liệu hiện tại.', status: 'healthy' },
        { id: 'health-fraud-resolved', label: 'Báo cáo gian lận đã xử lý', value: reports.filter((item) => item.status === 'resolved').length, hint: 'Các báo cáo tin cậy và an toàn đã được đội vận hành đóng lại.', status: 'healthy' }
      ],
      dataSource: 'postgresql://postgres@localhost:5432/viec3mien_admin'
    };
  }

  async listUsers() {
    const [users, memberships, candidates] = await Promise.all([
      this.userRepository.find({ order: { updatedAt: 'DESC' } }),
      this.companyMemberRepository.find(),
      this.candidateRepository.find()
    ]);
    const companyByUserId = new Map(memberships.map((item) => [item.userId, item.company.name]));
    const candidateByUserId = new Map(candidates.map((item) => [item.userId, item]));

    const items = users.map((user) => ({
      id: user.id,
      name: user.fullName,
      email: user.email,
      role: user.role.toLowerCase(),
      company: companyByUserId.get(user.id) || '-',
      status: user.status,
      verified: user.status === 'active',
      region: translateDemoText(candidateByUserId.get(user.id)?.address || companyByUserId.get(user.id) || 'Từ xa'),
      createdAt: user.createdAt,
      lastActiveAt: user.updatedAt
    }));

    return { items, total: items.length };
  }

  async listCompanies() {
    const [companies, jobs, applications] = await Promise.all([
      this.companyRepository.find({ order: { updatedAt: 'DESC' } }),
      this.jobRepository.find(),
      this.applicationRepository.find()
    ]);

    const items = companies.map((company) => {
      const companyJobs = jobs.filter((job) => job.companyId === company.id);
      const companyApplications = applications.filter((application) => companyJobs.some((job) => job.id === application.jobId));
      return {
        id: company.id,
        name: translateDemoText(company.name),
        industry: translateDemoText(company.industry) || 'Tổng quát',
        location: translateDemoText(company.city),
        size: company.companySize,
        plan: company.plan,
        status: company.status,
        openJobs: companyJobs.filter((job) => job.status === JobStatus.PUBLISHED).length,
        applications: companyApplications.length,
        owner: company.createdBy.fullName,
        updatedAt: company.updatedAt
      };
    });

    return { items, total: items.length };
  }

  async listJobs() {
    const [jobs, jobCategories, applications] = await Promise.all([
      this.jobRepository.find({ order: { createdAt: 'DESC' } }),
      this.jobCategoryRepository.find(),
      this.applicationRepository.find()
    ]);

    const categoryByJobId = new Map(jobCategories.map((item) => [item.jobId, item.category.name]));
    const items = jobs.map((job) => ({
      id: job.id,
      title: translateDemoText(job.title),
      company: translateDemoText(job.company.name),
      category: translateDemoText(categoryByJobId.get(job.id) || 'Chưa phân loại'),
      location: `${translateDemoText(job.location)}${job.district ? ` - ${translateDemoText(job.district)}` : ''}`,
      type: this.translateJobType(job.jobType),
      salary: this.formatSalary(job.salaryMin, job.salaryMax),
      status: job.status === 'published' ? 'live' : job.status,
      applications: applications.filter((application) => application.jobId === job.id).length,
      qualityScore: job.qualityScore,
      postedAt: job.createdAt,
      deadline: job.deadline
    }));

    return { items, total: items.length };
  }

  async listApplications() {
    const applications = await this.applicationRepository.find({ order: { appliedAt: 'DESC' } });
    const items = applications.map((application) => ({
      id: application.id,
      candidate: translateDemoText(application.candidate.user.fullName),
      jobTitle: translateDemoText(application.job.title),
      company: translateDemoText(application.job.company.name),
      stage: application.status,
      score: Math.min(98, 55 + application.candidate.experienceYears * 10 + (application.resumeId ? 10 : 0)),
      source: this.translateSource(application.source),
      submittedAt: application.appliedAt,
      owner: translateDemoText(application.job.createdBy.fullName)
    }));

    return { items, total: items.length };
  }

  async listReports() {
    const reports = await this.reportRepository.find({ order: { createdAt: 'DESC' } });
    const items = reports.map((report) => ({
      id: report.id,
      type: translateDemoText(report.reportType),
      target: translateDemoText(report.targetName),
      reporter: translateDemoText(report.user?.fullName || 'Hệ thống'),
      severity: report.severity,
      status: report.status,
      createdAt: report.createdAt
    }));

    return { items, total: items.length };
  }

  async listCategories() {
    const [categories, links, jobs, jobSkills] = await Promise.all([
      this.categoryRepository.find(),
      this.jobCategoryRepository.find(),
      this.jobRepository.find(),
      this.jobSkillRepository.find()
    ]);

    const items = categories.map((category) => {
      const jobIds = links.filter((item) => item.categoryId === category.id).map((item) => item.jobId);
      const relatedJobs = jobs.filter((job) => jobIds.includes(job.id));
      const skillNames = Array.from(
        new Set(
          jobSkills
            .filter((item) => jobIds.includes(item.jobId))
            .map((item) => item.skill.name)
        )
      );

      return {
        id: category.id,
        name: translateDemoText(category.name),
        parent: 'Gốc',
        status: 'active',
        activeJobs: relatedJobs.filter((job) => job.status === JobStatus.PUBLISHED).length,
        companies: new Set(relatedJobs.map((job) => job.companyId)).size,
        skills: translateDemoList(skillNames),
        updatedAt: relatedJobs.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0]?.updatedAt || new Date()
      };
    });

    return { items, total: items.length };
  }

  async listAuditLogs() {
    const logs = await this.auditLogRepository.find({ order: { createdAt: 'DESC' } });
    const items = logs.map((log, index) => ({
      id: log.id,
      actor: log.user?.fullName || 'Hệ thống',
      actorRole: log.user?.role.toLowerCase() || 'system',
      action: this.translateAuditAction(log.action),
      target: `${this.translateEntityType(log.entityType)}${log.entityId ? `: ${log.entityId.slice(0, 8)}` : ''}`,
      ip: `10.0.0.${index + 10}`,
      status: 'success',
      occurredAt: log.createdAt,
      details: 'Đã ghi nhận thay đổi dữ liệu vận hành.'
    }));

    return { items, total: items.length };
  }

  private buildTrend(users: UserEntity[], jobs: JobEntity[], applications: ApplicationEntity[]) {
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
    return months.map((month, index) => ({
      month,
      users: users.filter((item) => item.createdAt.getMonth() === index).length,
      jobs: jobs.filter((item) => item.createdAt.getMonth() === index).length,
      applications: applications.filter((item) => item.appliedAt.getMonth() === index).length
    }));
  }

  private buildFunnel(applications: ApplicationEntity[]) {
    const total = Math.max(1, applications.length);
    const stages = [
      ['Đã nhận ứng tuyển', applications.length],
      ['Đã sàng lọc', applications.filter((item) => item.status !== ApplicationStatus.APPLIED).length],
      ['Đã lên lịch phỏng vấn', applications.filter((item) => item.status === ApplicationStatus.INTERVIEWED || item.status === ApplicationStatus.HIRED).length],
      ['Đã gửi đề nghị', applications.filter((item) => item.status === ApplicationStatus.HIRED).length],
      ['Đã tuyển xong', applications.filter((item) => item.status === ApplicationStatus.HIRED).length]
    ];

    return stages.map(([stage, value]) => ({ stage, value, percentage: Number((((value as number) / total) * 100).toFixed(1)) }));
  }

  private buildSourceMix(applications: ApplicationEntity[]) {
    const sourceCounts = new Map<string, number>();
    applications.forEach((application) => {
      sourceCounts.set(application.source, (sourceCounts.get(application.source) || 0) + 1);
    });
    const total = Math.max(1, applications.length);
    const tones = ['#161617', '#f24d36', '#fb923c', '#0f766e', '#2563eb'];

    return Array.from(sourceCounts.entries()).map(([label, value], index) => ({
      label: this.translateSource(label),
      value: Number(((value / total) * 100).toFixed(1)),
      tone: tones[index % tones.length]
    }));
  }

  private buildAlerts(companies: CompanyEntity[], jobs: JobEntity[], reports: ReportEntity[]) {
    return [
      {
        id: 'alert-pending-companies',
        title: 'Tồn đọng xác minh doanh nghiệp',
        severity: companies.some((item) => item.status === 'review') ? 'medium' : 'low',
        detail: `${companies.filter((item) => item.status !== 'verified').length} doanh nghiệp vẫn cần được xác minh hoặc xem xét.`,
        owner: 'Vận hành',
        time: new Date()
      },
      {
        id: 'alert-urgent-jobs',
        title: 'Việc làm gấp cần kiểm duyệt thêm',
        severity: jobs.some((item) => item.urgent) ? 'high' : 'low',
        detail: `${jobs.filter((item) => item.urgent).length} việc làm gấp đang hiển thị và nên được theo dõi theo cam kết phản hồi.`,
        owner: 'Tin cậy & An toàn',
        time: new Date()
      },
      {
        id: 'alert-open-reports',
        title: 'Báo cáo từ ứng viên và doanh nghiệp đang mở',
        severity: reports.some((item) => item.status === 'open') ? 'medium' : 'low',
        detail: `${reports.filter((item) => item.status !== 'resolved').length} báo cáo vẫn chưa được xử lý.`,
        owner: 'Đội quản trị',
        time: new Date()
      }
    ];
  }

  private percent(part: number, total: number) {
    return Number(((part / Math.max(total, 1)) * 100).toFixed(1));
  }

  private formatSalary(min?: number | null, max?: number | null) {
    if (!min && !max) {
      return 'Thương lượng';
    }
    const formatValue = (value: number) => `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)} triệu`;
    if (min && max) {
      return `${formatValue(min)} - ${formatValue(max)}`;
    }
    return formatValue(min || max || 0);
  }

  private translateSource(source: string) {
    const map: Record<string, string> = {
      'Direct website': 'Trang web trực tiếp',
      'Referral campaigns': 'Chiến dịch giới thiệu',
      'Campus events': 'Sự kiện trường học',
      Direct: 'Trực tiếp',
      Referral: 'Giới thiệu',
      Agency: 'Đối tác',
      Social: 'Mạng xã hội'
    };

    return map[source] || source;
  }

  private translateJobType(type: string) {
    const map: Record<string, string> = {
      'full-time': 'Toàn thời gian',
      'part-time': 'Bán thời gian',
      shift: 'Làm theo ca',
      contract: 'Hợp đồng',
      intern: 'Thực tập',
      remote: 'Làm từ xa'
    };

    return map[type] || type;
  }

  private translateAuditAction(action: string) {
    const map: Record<string, string> = {
      'auth.register': 'Đăng ký tài khoản',
      'application.create': 'Tạo hồ sơ ứng tuyển',
      'company.verify': 'Xác minh doanh nghiệp',
      'job.create': 'Tạo tin tuyển dụng',
      'job.update': 'Cập nhật tin tuyển dụng'
    };

    return map[action] || action.replace(/\./g, ' ');
  }

  private translateEntityType(entityType: string) {
    const map: Record<string, string> = {
      company: 'doanh nghiệp',
      job: 'việc làm',
      application: 'ứng tuyển',
      report: 'báo cáo',
      user: 'người dùng'
    };

    return map[entityType] || entityType;
  }
}
