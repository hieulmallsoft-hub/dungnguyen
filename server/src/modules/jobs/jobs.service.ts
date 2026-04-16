import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserPayload } from '../../common/auth/current-user.decorator';
import { CompanyEntity, CompanyMemberEntity, JobEntity, JobJobCategoryEntity } from '../../database/entities';
import { ExperienceLevel, JobStatus, JobType, UserRole } from '../../common/enums/domain.enums';
import { translateDemoList, translateDemoText } from '../../common/utils/demo-translation';
import { CreateJobDto } from './dto/create-job.dto';
import { JobQueryDto } from './dto/job-query.dto';

const JOB_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Toàn thời gian',
  'part-time': 'Bán thời gian',
  intern: 'Thực tập',
  remote: 'Làm từ xa',
  shift: 'Làm theo ca',
  contract: 'Hợp đồng'
};

const EXPERIENCE_LABELS: Record<string, string> = {
  none: 'Chưa có kinh nghiệm',
  junior: 'Từ 6 tháng - 1 năm',
  mid: 'Từ 1 - 3 năm',
  senior: 'Trên 3 năm'
};

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>,
    @InjectRepository(JobJobCategoryEntity) private readonly jobCategoryRepository: Repository<JobJobCategoryEntity>,
    @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(CompanyMemberEntity) private readonly companyMemberRepository: Repository<CompanyMemberEntity>
  ) {}

  mapPublicJob(job: JobEntity) {
    return {
      id: job.id,
      title: translateDemoText(job.title),
      company: translateDemoText(job.company.name),
      location: translateDemoText(job.location),
      district: translateDemoText(job.district),
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryLabel: this.formatSalaryLabel(job.salaryMin, job.salaryMax),
      type: job.jobType,
      typeLabel: JOB_TYPE_LABELS[job.jobType] || job.jobType,
      experience: job.experienceLevel,
      experienceLabel: EXPERIENCE_LABELS[job.experienceLevel] || job.experienceLevel,
      shift: translateDemoText(job.shift),
      postedAt: job.createdAt,
      deadline: job.deadline,
      urgent: job.urgent,
      tags: translateDemoList(job.tags),
      summary: translateDemoText(job.description),
      requirements: translateDemoList(job.requirements),
      benefits: translateDemoList(job.benefits)
    };
  }

  async getPublicJobs(query: JobQueryDto) {
    const page = Number(query.page || 1);
    const pageSize = Number(query.pageSize || 6);
    let jobs = await this.jobRepository.find({ where: { status: JobStatus.PUBLISHED }, order: { createdAt: 'DESC' } });

    jobs = jobs.filter((job) => {
      const keyword = query.keyword?.trim().toLowerCase();
      const searchable = [
        translateDemoText(job.title),
        translateDemoText(job.description),
        translateDemoText(job.company.name),
        translateDemoText(job.location),
        translateDemoText(job.district)
      ]
        .join(' ')
        .toLowerCase();
      const matchesKeyword = !keyword || searchable.includes(keyword);
      const matchesLocation = !query.location || translateDemoText(job.location) === query.location;
      const matchesType = !query.type || job.jobType === query.type;
      const matchesExperience = !query.experience || job.experienceLevel === query.experience;
      const matchesSalary = !query.salaryMin || Number(job.salaryMin || 0) >= Number(query.salaryMin);
      return matchesKeyword && matchesLocation && matchesType && matchesExperience && matchesSalary;
    });

    if (query.sort === 'salary_desc') {
      jobs.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    } else if (query.sort === 'salary_asc') {
      jobs.sort((a, b) => (a.salaryMin || 0) - (b.salaryMin || 0));
    }

    const total = jobs.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const items = jobs.slice((page - 1) * pageSize, page * pageSize).map((job) => this.mapPublicJob(job));

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
      filters: {
        locations: Array.from(new Set(jobs.map((job) => translateDemoText(job.location)))).sort(),
        types: Array.from(new Set(jobs.map((job) => job.jobType)))
          .sort()
          .map((value) => ({ value, label: JOB_TYPE_LABELS[value] || value })),
        experienceLevels: Array.from(new Set(jobs.map((job) => job.experienceLevel)))
          .sort()
          .map((value) => ({ value, label: EXPERIENCE_LABELS[value] || value })),
        salaryOptions: ['8000000', '10000000', '15000000', '20000000'].map((value) => ({
          value,
          label: `Từ ${(Number(value) / 1000000).toFixed(0)} triệu`
        }))
      }
    };
  }

  async getJobById(id: string) {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException('Không tìm thấy việc làm.');
    }
    return job;
  }

  async createJob(payload: CreateJobDto, user: AuthUserPayload) {
    const company = await this.companyRepository.findOne({ where: { id: payload.companyId } });
    if (!company) {
      throw new NotFoundException('Không tìm thấy doanh nghiệp.');
    }

    if (user.role !== UserRole.ADMIN) {
      const membership = await this.companyMemberRepository.findOne({
        where: {
          companyId: payload.companyId,
          userId: user.sub
        }
      });

      if (!membership) {
        throw new ForbiddenException('Bạn không có quyền đăng tin cho doanh nghiệp này.');
      }
    }

    const entity = this.jobRepository.create({
      ...payload,
      createdById: user.sub,
      currency: payload.currency || 'VND',
      deadline: payload.deadline ? new Date(payload.deadline) : null,
      status: payload.status || JobStatus.DRAFT,
      urgent: payload.urgent || false,
      tags: payload.tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return this.jobRepository.save(entity);
  }

  private formatSalaryLabel(min?: number | null, max?: number | null) {
    if (!min && !max) {
      return 'Thương lượng';
    }
    const formatter = (value?: number | null) => (value ? `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)} triệu` : '');
    if (min && max) {
      return `${formatter(min)} - ${formatter(max)}/tháng`;
    }
    return `${formatter(min || max)}/tháng`;
  }
}
