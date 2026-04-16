import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApplicationEntity,
  AuditLogEntity,
  CandidateProfileEntity,
  JobEntity,
  NotificationEntity,
  ResumeEntity,
  UserEntity
} from '../../database/entities';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity, JobEntity, UserEntity, CandidateProfileEntity, ResumeEntity, NotificationEntity, AuditLogEntity])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService]
})
export class ApplicationsModule {}
