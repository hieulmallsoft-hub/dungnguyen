import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { hash } from 'bcryptjs';
import { getBooleanConfig, isProduction } from '../common/config/app-config';
import {
  ApplicationEntity,
  AuditLogEntity,
  CandidateEducationEntity,
  CandidateExperienceEntity,
  CandidateProfileEntity,
  CandidateSkillEntity,
  CompanyEntity,
  CompanyMemberEntity,
  ConversationEntity,
  JobCategoryEntity,
  JobEntity,
  JobJobCategoryEntity,
  JobSkillEntity,
  JobViewEntity,
  MessageEntity,
  NotificationEntity,
  ReportEntity,
  ResumeEntity,
  SavedJobEntity,
  SkillEntity,
  UserEntity
} from './entities';
import {
  ApplicationStatus,
  CandidateSkillLevel,
  CompanyMemberRole,
  CompanyPlan,
  CompanyStatus,
  ExperienceLevel,
  Gender,
  JobStatus,
  JobType,
  ReportSeverity,
  ReportStatus,
  UserRole,
  UserStatus
} from '../common/enums/domain.enums';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService
  ) {}

  async onApplicationBootstrap() {
    if (!getBooleanConfig(this.configService, 'ENABLE_SEED', false)) {
      return;
    }

    if (isProduction(this.configService)) {
      this.logger.warn('Demo database seeding is disabled in production.');
      return;
    }

    const userRepo = this.dataSource.getRepository(UserEntity);
    if ((await userRepo.count()) > 0) {
      return;
    }

    const passwordHash = await hash('Password@123', 10);
    const date = (value: string) => new Date(value);

    await this.dataSource.transaction(async (manager) => {
      const users = await manager.getRepository(UserEntity).save([
        { email: 'admin@viec3mien.vn', passwordHash, fullName: 'Nguyen Hoang An', phone: '0901000001', role: UserRole.ADMIN, status: UserStatus.ACTIVE, createdAt: date('2026-01-05T08:00:00Z'), updatedAt: date('2026-04-12T08:00:00Z') },
        { email: 'linh.hr@sunrise.vn', passwordHash, fullName: 'Pham Thu Linh', phone: '0901000002', role: UserRole.RECRUITER, status: UserStatus.ACTIVE, createdAt: date('2026-01-12T08:00:00Z'), updatedAt: date('2026-04-11T08:00:00Z') },
        { email: 'dat.ops@mekong.vn', passwordHash, fullName: 'Tran Quoc Dat', phone: '0901000003', role: UserRole.RECRUITER, status: UserStatus.ACTIVE, createdAt: date('2026-01-15T08:00:00Z'), updatedAt: date('2026-04-10T08:00:00Z') },
        { email: 'vy.do@gmail.com', passwordHash, fullName: 'Do Khanh Vy', phone: '0901000004', role: UserRole.CANDIDATE, status: UserStatus.ACTIVE, createdAt: date('2026-02-10T08:00:00Z'), updatedAt: date('2026-04-12T06:00:00Z') },
        { email: 'huy.nguyen@gmail.com', passwordHash, fullName: 'Nguyen Gia Huy', phone: '0901000005', role: UserRole.CANDIDATE, status: UserStatus.ACTIVE, createdAt: date('2026-02-20T08:00:00Z'), updatedAt: date('2026-04-11T06:00:00Z') },
        { email: 'thu.le@gmail.com', passwordHash, fullName: 'Le Thi Thu', phone: '0901000006', role: UserRole.CANDIDATE, status: UserStatus.PENDING, createdAt: date('2026-03-02T08:00:00Z'), updatedAt: date('2026-04-09T06:00:00Z') }
      ]);
      const userMap = new Map(users.map((item) => [item.email, item]));

      const companies = await manager.getRepository(CompanyEntity).save([
        { name: 'Sunrise Manufacturing', logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80', website: 'https://sunrise.example.com', description: 'Nha may san xuat quy mo lon.', address: 'KCN Trang Due', city: 'Hai Phong', industry: 'Manufacturing', companySize: '500-1000', plan: CompanyPlan.ENTERPRISE, status: CompanyStatus.VERIFIED, createdById: userMap.get('linh.hr@sunrise.vn')!.id, createdAt: date('2026-01-20T08:00:00Z'), updatedAt: date('2026-04-10T08:00:00Z') },
        { name: 'Mekong Logistics Hub', logoUrl: 'https://images.unsplash.com/photo-1581092446327-9dbcd70d6d72?auto=format&fit=crop&w=300&q=80', website: 'https://mekong.example.com', description: 'Trung tam logistics va fulfillment.', address: 'Thu Duc', city: 'TP.HCM', industry: 'Logistics', companySize: '200-500', plan: CompanyPlan.GROWTH, status: CompanyStatus.VERIFIED, createdById: userMap.get('dat.ops@mekong.vn')!.id, createdAt: date('2026-01-25T08:00:00Z'), updatedAt: date('2026-04-09T08:00:00Z') },
        { name: 'An Phat Mechanical', logoUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=300&q=80', website: 'https://anphat.example.com', description: 'Don vi bao tri co khi cong nghiep.', address: 'Bien Hoa', city: 'Dong Nai', industry: 'Mechanical', companySize: '100-200', plan: CompanyPlan.STARTER, status: CompanyStatus.REVIEW, createdById: userMap.get('admin@viec3mien.vn')!.id, createdAt: date('2026-02-05T08:00:00Z'), updatedAt: date('2026-04-08T08:00:00Z') }
      ]);
      const companyMap = new Map(companies.map((item) => [item.name, item]));

      await manager.getRepository(CompanyMemberEntity).save([
        { companyId: companyMap.get('Sunrise Manufacturing')!.id, userId: userMap.get('linh.hr@sunrise.vn')!.id, roleInCompany: CompanyMemberRole.OWNER, createdAt: date('2026-01-20T08:00:00Z') },
        { companyId: companyMap.get('Mekong Logistics Hub')!.id, userId: userMap.get('dat.ops@mekong.vn')!.id, roleInCompany: CompanyMemberRole.OWNER, createdAt: date('2026-01-25T08:00:00Z') }
      ]);

      const categories = await manager.getRepository(JobCategoryEntity).save([
        { name: 'IT', slug: 'it' },
        { name: 'Logistics', slug: 'logistics' },
        { name: 'Mechanical', slug: 'mechanical' },
        { name: 'Quality Control', slug: 'quality-control' }
      ]);
      const categoryMap = new Map(categories.map((item) => [item.slug, item]));

      const skills = await manager.getRepository(SkillEntity).save([
        { name: 'Java', slug: 'java' },
        { name: 'Spring Boot', slug: 'spring-boot' },
        { name: 'PostgreSQL', slug: 'postgresql' },
        { name: 'Warehouse Management', slug: 'warehouse-management' },
        { name: 'PLC', slug: 'plc' },
        { name: 'Quality Inspection', slug: 'quality-inspection' }
      ]);
      const skillMap = new Map(skills.map((item) => [item.slug, item]));

      const candidateProfiles = await manager.getRepository(CandidateProfileEntity).save([
        { userId: userMap.get('vy.do@gmail.com')!.id, title: 'Java Backend Developer', dateOfBirth: '1998-05-12', gender: Gender.FEMALE, address: 'Thu Duc, TP.HCM', experienceYears: 3, currentSalary: 18000000, expectedSalary: 22000000, educationLevel: 'Bachelor', description: 'Phat trien API backend va toi uu database.', createdAt: date('2026-02-10T08:00:00Z'), updatedAt: date('2026-04-10T08:00:00Z') },
        { userId: userMap.get('huy.nguyen@gmail.com')!.id, title: 'Maintenance Technician', dateOfBirth: '1997-09-20', gender: Gender.MALE, address: 'Bien Hoa, Dong Nai', experienceYears: 4, currentSalary: 16000000, expectedSalary: 19000000, educationLevel: 'College', description: 'Bao tri may moc va xu ly su co co dien.', createdAt: date('2026-02-20T08:00:00Z'), updatedAt: date('2026-04-10T06:30:00Z') },
        { userId: userMap.get('thu.le@gmail.com')!.id, title: 'QC Staff', dateOfBirth: '2000-12-11', gender: Gender.FEMALE, address: 'Gia Lam, Ha Noi', experienceYears: 1, currentSalary: 9000000, expectedSalary: 12000000, educationLevel: 'High School', description: 'Muon phat trien theo huong QC nha may.', createdAt: date('2026-03-02T08:00:00Z'), updatedAt: date('2026-04-08T08:00:00Z') }
      ]);
      const candidateMap = new Map(candidateProfiles.map((item) => [item.userId, item]));

      const resumes = await manager.getRepository(ResumeEntity).save([
        { candidateId: candidateMap.get(userMap.get('vy.do@gmail.com')!.id)!.id, fileUrl: 'https://example.com/resumes/do-khanh-vy-java-backend.pdf', fileName: 'Do-Khanh-Vy-Java-Backend.pdf', isDefault: true, createdAt: date('2026-02-10T08:10:00Z') },
        { candidateId: candidateMap.get(userMap.get('huy.nguyen@gmail.com')!.id)!.id, fileUrl: 'https://example.com/resumes/nguyen-gia-huy-maintenance.pdf', fileName: 'Nguyen-Gia-Huy-Maintenance.pdf', isDefault: true, createdAt: date('2026-02-20T08:10:00Z') },
        { candidateId: candidateMap.get(userMap.get('thu.le@gmail.com')!.id)!.id, fileUrl: 'https://example.com/resumes/le-thi-thu-qc.pdf', fileName: 'Le-Thi-Thu-QC.pdf', isDefault: true, createdAt: date('2026-03-02T08:10:00Z') }
      ]);
      const resumeMap = new Map(resumes.map((item) => [item.fileName, item]));
      const jobs = await manager.getRepository(JobEntity).save([
        { companyId: companyMap.get('Sunrise Manufacturing')!.id, title: 'Java Backend Developer', description: 'Xay dung API cho he thong ERP noi bo.', requirements: ['3 nam Java.', 'Spring Boot.', 'PostgreSQL.'], benefits: ['Hybrid.', 'Thuong quy.', 'BHYT full luong.'], salaryMin: 25000000, salaryMax: 35000000, currency: 'VND', location: 'Ha Noi', district: 'Cau Giay', jobType: JobType.FULL_TIME, experienceLevel: ExperienceLevel.MID, quantity: 2, deadline: date('2026-05-10T00:00:00Z'), status: JobStatus.PUBLISHED, createdById: userMap.get('linh.hr@sunrise.vn')!.id, urgent: true, shift: 'Hanh chinh', qualityScore: 95, tags: ['Hybrid', 'Java', 'Backend'], createdAt: date('2026-01-25T08:00:00Z'), updatedAt: date('2026-04-10T08:00:00Z') },
        { companyId: companyMap.get('Mekong Logistics Hub')!.id, title: 'Nhan vien kho van ca dem', description: 'Nhap xuat hang, kiem dem bang handheld scanner.', requirements: ['Kinh nghiem kho van.', 'Dung may quet ma vach.', 'Lam ca dem.'], benefits: ['Phu cap dem.', 'Kham suc khoe.', 'Lo trinh thang tien.'], salaryMin: 11000000, salaryMax: 14000000, currency: 'VND', location: 'TP.HCM', district: 'Thu Duc', jobType: JobType.SHIFT, experienceLevel: ExperienceLevel.JUNIOR, quantity: 6, deadline: date('2026-04-30T00:00:00Z'), status: JobStatus.PUBLISHED, createdById: userMap.get('dat.ops@mekong.vn')!.id, urgent: true, shift: '22:00 - 06:00', qualityScore: 88, tags: ['Phu cap dem', 'Bao hiem'], createdAt: date('2026-02-08T08:00:00Z'), updatedAt: date('2026-04-09T08:00:00Z') },
        { companyId: companyMap.get('An Phat Mechanical')!.id, title: 'Ky thuat vien bao tri day chuyen', description: 'Bao tri may moc san xuat va xu ly su co co dien.', requirements: ['Bao tri may cong nghiep.', 'Doc ban ve.', 'Biet PLC la loi the.'], benefits: ['Thu nhap canh tranh.', 'Ho tro khoa hoc.', 'Bua trua nha may.'], salaryMin: 14000000, salaryMax: 20000000, currency: 'VND', location: 'Dong Nai', district: 'Bien Hoa', jobType: JobType.FULL_TIME, experienceLevel: ExperienceLevel.MID, quantity: 4, deadline: date('2026-05-01T00:00:00Z'), status: JobStatus.PUBLISHED, createdById: userMap.get('admin@viec3mien.vn')!.id, urgent: false, shift: 'Hanh chinh + truc su co', qualityScore: 90, tags: ['PLC', 'Bao tri'], createdAt: date('2026-03-05T08:00:00Z'), updatedAt: date('2026-04-08T08:00:00Z') },
        { companyId: companyMap.get('Sunrise Manufacturing')!.id, title: 'Nhan vien QC kiem tra chat luong', description: 'Kiem tra chat luong thanh pham theo checklist.', requirements: ['Tot nghiep THPT.', 'Can than.', 'Uu tien tung lam QC.'], benefits: ['Phu cap chuyen can.', 'Ho tro bua an.', 'Thuong hieu suat.'], salaryMin: 9000000, salaryMax: 12000000, currency: 'VND', location: 'Ha Noi', district: 'Gia Lam', jobType: JobType.FULL_TIME, experienceLevel: ExperienceLevel.NONE, quantity: 8, deadline: date('2026-04-29T00:00:00Z'), status: JobStatus.PUBLISHED, createdById: userMap.get('linh.hr@sunrise.vn')!.id, urgent: false, shift: 'Ca ngay', qualityScore: 84, tags: ['QC', 'Checklist'], createdAt: date('2026-03-18T08:00:00Z'), updatedAt: date('2026-04-07T08:00:00Z') }
      ]);
      const jobMap = new Map(jobs.map((item) => [item.title, item]));

      await manager.getRepository(JobJobCategoryEntity).save([
        { jobId: jobMap.get('Java Backend Developer')!.id, categoryId: categoryMap.get('it')!.id },
        { jobId: jobMap.get('Nhan vien kho van ca dem')!.id, categoryId: categoryMap.get('logistics')!.id },
        { jobId: jobMap.get('Ky thuat vien bao tri day chuyen')!.id, categoryId: categoryMap.get('mechanical')!.id },
        { jobId: jobMap.get('Nhan vien QC kiem tra chat luong')!.id, categoryId: categoryMap.get('quality-control')!.id }
      ]);

      await manager.getRepository(JobSkillEntity).save([
        { jobId: jobMap.get('Java Backend Developer')!.id, skillId: skillMap.get('java')!.id },
        { jobId: jobMap.get('Java Backend Developer')!.id, skillId: skillMap.get('spring-boot')!.id },
        { jobId: jobMap.get('Java Backend Developer')!.id, skillId: skillMap.get('postgresql')!.id },
        { jobId: jobMap.get('Nhan vien kho van ca dem')!.id, skillId: skillMap.get('warehouse-management')!.id },
        { jobId: jobMap.get('Ky thuat vien bao tri day chuyen')!.id, skillId: skillMap.get('plc')!.id },
        { jobId: jobMap.get('Nhan vien QC kiem tra chat luong')!.id, skillId: skillMap.get('quality-inspection')!.id }
      ]);

      await manager.getRepository(CandidateSkillEntity).save([
        { candidateId: candidateMap.get(userMap.get('vy.do@gmail.com')!.id)!.id, skillId: skillMap.get('java')!.id, level: CandidateSkillLevel.ADVANCED },
        { candidateId: candidateMap.get(userMap.get('vy.do@gmail.com')!.id)!.id, skillId: skillMap.get('spring-boot')!.id, level: CandidateSkillLevel.ADVANCED },
        { candidateId: candidateMap.get(userMap.get('huy.nguyen@gmail.com')!.id)!.id, skillId: skillMap.get('plc')!.id, level: CandidateSkillLevel.INTERMEDIATE },
        { candidateId: candidateMap.get(userMap.get('thu.le@gmail.com')!.id)!.id, skillId: skillMap.get('quality-inspection')!.id, level: CandidateSkillLevel.BEGINNER }
      ]);

      await manager.getRepository(ApplicationEntity).save([
        { jobId: jobMap.get('Java Backend Developer')!.id, candidateId: candidateMap.get(userMap.get('vy.do@gmail.com')!.id)!.id, resumeId: resumeMap.get('Do-Khanh-Vy-Java-Backend.pdf')!.id, coverLetter: 'Toi da co 3 nam kinh nghiem xay dung API Java backend.', source: 'Direct website', status: ApplicationStatus.INTERVIEWED, appliedAt: date('2026-03-25T08:00:00Z'), updatedAt: date('2026-04-10T08:00:00Z') },
        { jobId: jobMap.get('Ky thuat vien bao tri day chuyen')!.id, candidateId: candidateMap.get(userMap.get('huy.nguyen@gmail.com')!.id)!.id, resumeId: resumeMap.get('Nguyen-Gia-Huy-Maintenance.pdf')!.id, coverLetter: 'Toi co 4 nam xu ly su co may moc va PLC co ban.', source: 'Direct website', status: ApplicationStatus.HIRED, appliedAt: date('2026-03-20T08:00:00Z'), updatedAt: date('2026-04-06T08:00:00Z') },
        { jobId: jobMap.get('Nhan vien QC kiem tra chat luong')!.id, candidateId: candidateMap.get(userMap.get('thu.le@gmail.com')!.id)!.id, resumeId: resumeMap.get('Le-Thi-Thu-QC.pdf')!.id, coverLetter: 'Toi muon phat trien theo huong QC nha may.', source: 'Campus events', status: ApplicationStatus.APPLIED, appliedAt: date('2026-04-01T08:00:00Z'), updatedAt: date('2026-04-08T08:00:00Z') },
        { jobId: jobMap.get('Nhan vien kho van ca dem')!.id, candidateId: candidateMap.get(userMap.get('huy.nguyen@gmail.com')!.id)!.id, resumeId: resumeMap.get('Nguyen-Gia-Huy-Maintenance.pdf')!.id, coverLetter: 'Toi co the ho tro van hanh kho va bao tri handheld scanner.', source: 'Referral campaigns', status: ApplicationStatus.REVIEWING, appliedAt: date('2026-04-04T08:00:00Z'), updatedAt: date('2026-04-09T08:00:00Z') }
      ]);

      await manager.getRepository(SavedJobEntity).save([
        { jobId: jobMap.get('Java Backend Developer')!.id, candidateId: candidateMap.get(userMap.get('vy.do@gmail.com')!.id)!.id, createdAt: date('2026-04-01T08:00:00Z') },
        { jobId: jobMap.get('Ky thuat vien bao tri day chuyen')!.id, candidateId: candidateMap.get(userMap.get('huy.nguyen@gmail.com')!.id)!.id, createdAt: date('2026-04-02T08:00:00Z') }
      ]);

      await manager.getRepository(JobViewEntity).save([
        { jobId: jobMap.get('Java Backend Developer')!.id, userId: userMap.get('vy.do@gmail.com')!.id, ipAddress: '10.10.0.12', viewedAt: date('2026-04-10T10:00:00Z') },
        { jobId: jobMap.get('Nhan vien kho van ca dem')!.id, userId: null, ipAddress: '171.244.10.10', viewedAt: date('2026-04-11T11:00:00Z') },
        { jobId: jobMap.get('Ky thuat vien bao tri day chuyen')!.id, userId: userMap.get('huy.nguyen@gmail.com')!.id, ipAddress: '10.10.0.13', viewedAt: date('2026-04-11T12:00:00Z') }
      ]);
      await manager.getRepository(CandidateExperienceEntity).save([
        { candidateId: candidateMap.get(userMap.get('vy.do@gmail.com')!.id)!.id, companyName: 'TechFlow Solutions', position: 'Backend Developer', startDate: '2023-01-01', endDate: null, description: 'Phat trien API va toi uu truy van PostgreSQL.' },
        { candidateId: candidateMap.get(userMap.get('huy.nguyen@gmail.com')!.id)!.id, companyName: 'Smart Factory VN', position: 'Maintenance Staff', startDate: '2021-06-01', endDate: null, description: 'Bao tri day chuyen co dien va xu ly su co.' }
      ]);

      await manager.getRepository(CandidateEducationEntity).save([
        { candidateId: candidateMap.get(userMap.get('vy.do@gmail.com')!.id)!.id, schoolName: 'Dai hoc Cong nghe TP.HCM', major: 'Cong nghe phan mem', degree: 'Bachelor', startDate: '2016-09-01', endDate: '2020-06-01', description: 'Tap trung Java va he quan tri CSDL.' }
      ]);

      await manager.getRepository(NotificationEntity).save([
        { userId: userMap.get('vy.do@gmail.com')!.id, title: 'Ho so da duoc xem', content: 'Nha tuyen dung Sunrise Manufacturing da xem ho so cua ban.', type: 'application', isRead: false, createdAt: date('2026-04-10T09:00:00Z') },
        { userId: userMap.get('linh.hr@sunrise.vn')!.id, title: 'Job sap het han', content: 'Tin Java Backend Developer se het han trong 7 ngay toi.', type: 'job-expiry', isRead: false, createdAt: date('2026-04-11T08:00:00Z') }
      ]);

      await manager.getRepository(AuditLogEntity).save([
        { userId: userMap.get('admin@viec3mien.vn')!.id, action: 'company.verify', entityType: 'company', entityId: companyMap.get('Sunrise Manufacturing')!.id, oldData: { status: 'pending' }, newData: { status: 'verified' }, createdAt: date('2026-04-10T08:30:00Z') },
        { userId: userMap.get('linh.hr@sunrise.vn')!.id, action: 'job.create', entityType: 'job', entityId: jobMap.get('Java Backend Developer')!.id, oldData: null, newData: { title: 'Java Backend Developer' }, createdAt: date('2026-03-25T08:00:00Z') },
        { userId: userMap.get('dat.ops@mekong.vn')!.id, action: 'job.update', entityType: 'job', entityId: jobMap.get('Nhan vien kho van ca dem')!.id, oldData: { qualityScore: 82 }, newData: { qualityScore: 88 }, createdAt: date('2026-04-09T08:10:00Z') }
      ]);

      const conversations = await manager.getRepository(ConversationEntity).save([
        { jobId: jobMap.get('Java Backend Developer')!.id, candidateId: candidateMap.get(userMap.get('vy.do@gmail.com')!.id)!.id, recruiterId: userMap.get('linh.hr@sunrise.vn')!.id, createdAt: date('2026-04-10T09:00:00Z') }
      ]);

      await manager.getRepository(MessageEntity).save([
        { conversationId: conversations[0].id, senderId: userMap.get('linh.hr@sunrise.vn')!.id, message: 'Chi muon dat lich phong van ky thuat vao thu Sau.', isRead: true, createdAt: date('2026-04-10T09:05:00Z') },
        { conversationId: conversations[0].id, senderId: userMap.get('vy.do@gmail.com')!.id, message: 'Em co the tham gia vao 9h sang thu Sau.', isRead: true, createdAt: date('2026-04-10T09:20:00Z') }
      ]);

      await manager.getRepository(ReportEntity).save([
        { userId: userMap.get('admin@viec3mien.vn')!.id, reportType: 'Fraud profile', targetName: 'Nhan vien kho van ca dem', severity: ReportSeverity.HIGH, status: ReportStatus.REVIEWING, description: 'Can kiem tra lai mo ta viec va thong tin lien he.', createdAt: date('2026-04-11T09:00:00Z') },
        { userId: userMap.get('vy.do@gmail.com')!.id, reportType: 'Abusive recruiter', targetName: 'Mekong Logistics Hub', severity: ReportSeverity.MEDIUM, status: ReportStatus.OPEN, description: 'Ung vien phan anh recruiter phan hoi cham.', createdAt: date('2026-04-12T05:30:00Z') }
      ]);
    });

    this.logger.log('Database seeded with NestJS baseline data.');
  }
}
