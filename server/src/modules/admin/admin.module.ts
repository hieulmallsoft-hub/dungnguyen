import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity, CompanyMemberEntity, JobEntity, JobCategoryEntity, JobJobCategoryEntity, JobSkillEntity, ApplicationEntity, CandidateProfileEntity, ReportEntity, AuditLogEntity])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
