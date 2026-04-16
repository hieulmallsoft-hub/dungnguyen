                                                                                                                                                        import { ApplicationEntity, ConversationEntity, MessageEntity, ReportEntity } from './application.entities';
import {
  CandidateCertificateEntity,
  CandidateEducationEntity,
  CandidateExperienceEntity,
  CandidateProfileEntity,
  CandidateProjectEntity,
  CandidateSkillEntity,
  ResumeEntity
} from './candidate.entities';
import { CompanyEntity, CompanyMemberEntity } from './company.entities';
import { AuditLogEntity, NotificationEntity, RefreshTokenEntity } from './operations.entities';
import { JobCategoryEntity, JobEntity, JobJobCategoryEntity, JobSkillEntity, JobViewEntity, SavedJobEntity, SkillEntity } from './job.entities';
import { UserEntity } from './user.entity';

export const ENTITIES = [
  UserEntity,
  CompanyEntity,
  CompanyMemberEntity,
  JobEntity,
  CandidateProfileEntity,
  ResumeEntity,
  ApplicationEntity,
  JobCategoryEntity,
  JobJobCategoryEntity,
  SkillEntity,
  JobSkillEntity,
  CandidateSkillEntity,
  SavedJobEntity,
  JobViewEntity,
  CandidateExperienceEntity,
  CandidateEducationEntity,
  CandidateProjectEntity,
  CandidateCertificateEntity,
  NotificationEntity,
  RefreshTokenEntity,
  AuditLogEntity,
  ConversationEntity,
  MessageEntity,
  ReportEntity
];

export {
  ApplicationEntity,
  AuditLogEntity,
  CandidateCertificateEntity,
  CandidateEducationEntity,
  CandidateExperienceEntity,
  CandidateProfileEntity,
  CandidateProjectEntity,
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
  RefreshTokenEntity,
  ReportEntity,
  ResumeEntity,
  SavedJobEntity,
  SkillEntity,
  UserEntity
};
