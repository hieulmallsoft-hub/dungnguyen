import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationStatus, ReportSeverity, ReportStatus } from '../../common/enums/domain.enums';
import { CandidateProfileEntity, ResumeEntity } from './candidate.entities';
import { JobEntity } from './job.entities';
import { UserEntity } from './user.entity';

@Entity({ name: 'applications' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'job_id' })
  jobId!: string;

  @ManyToOne(() => JobEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job!: JobEntity;

  @Column({ name: 'candidate_id' })
  candidateId!: string;

  @ManyToOne(() => CandidateProfileEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate!: CandidateProfileEntity;

  @Column({ name: 'resume_id', type: 'uuid', nullable: true })
  resumeId!: string | null;

  @ManyToOne(() => ResumeEntity, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'resume_id' })
  resume!: ResumeEntity | null;

  @Column({ name: 'cover_letter', type: 'text', nullable: true })
  coverLetter!: string | null;

  @Column({ default: 'Direct website' })
  source!: string;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.APPLIED })
  status!: ApplicationStatus;

  @Column({ name: 'applied_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  appliedAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

@Entity({ name: 'conversations' })
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'job_id', type: 'uuid', nullable: true })
  jobId!: string | null;

  @ManyToOne(() => JobEntity, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'job_id' })
  job!: JobEntity | null;

  @Column({ name: 'candidate_id' })
  candidateId!: string;

  @ManyToOne(() => CandidateProfileEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate!: CandidateProfileEntity;

  @Column({ name: 'recruiter_id' })
  recruiterId!: string;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recruiter_id' })
  recruiter!: UserEntity;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'conversation_id' })
  conversationId!: string;

  @ManyToOne(() => ConversationEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation!: ConversationEntity;

  @Column({ name: 'sender_id' })
  senderId!: string;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender!: UserEntity;

  @Column({ type: 'text' })
  message!: string;

  @Column({ name: 'is_read', default: false })
  isRead!: boolean;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}

@Entity({ name: 'reports' })
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId!: string | null;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity | null;

  @Column({ name: 'report_type' })
  reportType!: string;

  @Column({ name: 'target_name' })
  targetName!: string;

  @Column({ type: 'enum', enum: ReportSeverity, default: ReportSeverity.MEDIUM })
  severity!: ReportSeverity;

  @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.OPEN })
  status!: ReportStatus;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
