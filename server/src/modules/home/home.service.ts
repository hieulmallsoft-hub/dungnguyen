import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidateProfileEntity, CompanyEntity, JobEntity } from '../../database/entities';
import { JobStatus } from '../../common/enums/domain.enums';
import { translateDemoText } from '../../common/utils/demo-translation';
import { JobsService } from '../jobs/jobs.service';
import { STATIC_HOME_DATA } from './home.data';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>,
    @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(CandidateProfileEntity) private readonly candidateRepository: Repository<CandidateProfileEntity>,
    private readonly jobsService: JobsService
  ) {}

  async getHomeData() {
    const [jobs, companies, candidates] = await Promise.all([
      this.jobRepository.find({ where: { status: JobStatus.PUBLISHED }, order: { createdAt: 'DESC' }, take: 6 }),
      this.companyRepository.find({ order: { updatedAt: 'DESC' }, take: 6 }),
      this.candidateRepository.count()
    ]);

    const responseRate = jobs.length ? '86%' : '0%';

    return {
      ...STATIC_HOME_DATA,
      jobs: jobs.map((job) => this.jobsService.mapPublicJob(job)),
      quickStats: [
        { label: 'Việc làm đang mở', value: `${jobs.length}+` },
        { label: 'Doanh nghiệp đối tác', value: `${companies.length}+` },
        { label: 'Hồ sơ ứng viên', value: `${candidates}+` },
        { label: 'Tỷ lệ phản hồi 7 ngày', value: responseRate }
      ],
      topCompanies: companies.map((company) => ({
        id: company.id,
        name: translateDemoText(company.name),
        field: translateDemoText(company.industry) || 'Tổng quát',
        location: translateDemoText(company.city) || 'Toàn quốc',
        logoUrl: company.logoUrl,
        openJobs: jobs.filter((job) => job.companyId === company.id).length
      }))
    };
  }
}
