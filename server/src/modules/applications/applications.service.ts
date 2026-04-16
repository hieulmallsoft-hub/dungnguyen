import { randomUUID } from 'crypto';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { ApplicationStatus, UserRole, UserStatus } from '../../common/enums/domain.enums';
import {
  ApplicationEntity,
  AuditLogEntity,
  CandidateProfileEntity,
  JobEntity,
  NotificationEntity,
  ResumeEntity,
  UserEntity
} from '../../database/entities';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationEntity) private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CandidateProfileEntity) private readonly candidateRepository: Repository<CandidateProfileEntity>,
    @InjectRepository(ResumeEntity) private readonly resumeRepository: Repository<ResumeEntity>,
    @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(AuditLogEntity) private readonly auditLogRepository: Repository<AuditLogEntity>
  ) {}

  async create(payload: CreateApplicationDto) {
    const job = await this.jobRepository.findOne({ where: { id: payload.jobId } });
    if (!job) {
      throw new NotFoundException('Không tìm thấy việc làm.');
    }

    let user = await this.userRepository.findOne({ where: { email: payload.email.toLowerCase() } });
    if (!user) {
      user = await this.userRepository.save(
        this.userRepository.create({
          email: payload.email.toLowerCase(),
          passwordHash: await hash(randomUUID(), 10),
          fullName: payload.fullName,
          phone: payload.phone,
          role: UserRole.CANDIDATE,
          status: UserStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      );
    }

    let candidate = await this.candidateRepository.findOne({ where: { userId: user.id } });
    if (!candidate) {
      candidate = await this.candidateRepository.save(
        this.candidateRepository.create({
          userId: user.id,
          title: null,
          address: null,
          experienceYears: 0,
          currentSalary: null,
          expectedSalary: null,
          educationLevel: null,
          description: payload.message || null,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      );
    }

    const duplicate = await this.applicationRepository.findOne({
      where: { jobId: job.id, candidateId: candidate.id }
    });
    if (duplicate) {
      throw new ConflictException('Bạn đã ứng tuyển vị trí này rồi.');
    }

    let resumeId: string | null = null;
    if (payload.cvLink) {
      const resume = await this.resumeRepository.save(
        this.resumeRepository.create({
          candidateId: candidate.id,
          fileUrl: payload.cvLink,
          fileName: `${payload.fullName.replace(/\s+/g, '-')}-CV.pdf`,
          isDefault: true,
          createdAt: new Date()
        })
      );
      resumeId = resume.id;
    }

    const application = await this.applicationRepository.save(
      this.applicationRepository.create({
        jobId: job.id,
        candidateId: candidate.id,
        resumeId,
        coverLetter: payload.message || null,
        source: 'Direct website',
        status: ApplicationStatus.APPLIED,
        appliedAt: new Date(),
        updatedAt: new Date()
      })
    );

    await this.notificationRepository.save({
      userId: job.createdById,
      title: 'Có ứng viên mới',
      content: `${payload.fullName} vừa ứng tuyển vị trí ${job.title}.`,
      type: 'application',
      isRead: false,
      createdAt: new Date()
    });

    await this.auditLogRepository.save({
      userId: user.id,
      action: 'application.create',
      entityType: 'application',
      entityId: application.id,
      oldData: null,
      newData: { jobId: job.id, candidateId: candidate.id },
      createdAt: new Date()
    });

    return { message: 'Ứng tuyển thành công.', applicationId: application.id };
  }

  async updateStatus(applicationId: string, payload: UpdateApplicationStatusDto) {
    const application = await this.applicationRepository.findOne({ where: { id: applicationId } });
    if (!application) {
      throw new NotFoundException('Không tìm thấy hồ sơ ứng tuyển.');
    }

    application.status = payload.status;
    application.updatedAt = new Date();
    await this.applicationRepository.save(application);

    return { message: 'Đã cập nhật trạng thái ứng tuyển.', application };
  }
}
