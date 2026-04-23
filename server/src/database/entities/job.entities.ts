import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ExperienceLevel, JobStatus, JobType } from '../../common/enums/domain.enums';
import { CompanyEntity } from './company.entities';
import { UserEntity } from './user.entity';
import { CandidateProfileEntity } from './candidate.entities';

@Entity({ name: 'jobs' })
export class JobEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'company_id' })
  companyId!: string;

  @ManyToOne(() => CompanyEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company!: CompanyEntity;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  requirements!: string[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  benefits!: string[];

  @Column({ name: 'salary_min', type: 'bigint', nullable: true, transformer: { to: (v) => v, from: (v) => (v ? Number(v) : null) } })
  salaryMin!: number | null;

  @Column({ name: 'salary_max', type: 'bigint', nullable: true, transformer: { to: (v) => v, from: (v) => (v ? Number(v) : null) } })
  salaryMax!: number | null;

  @Column({ default: 'VND' })
  currency!: string;

  @Column()
  location!: string;

  @Column({ type: 'varchar', nullable: true })
  district!: string | null;

  @Column({ name: 'job_type', type: 'enum', enum: JobType })
  jobType!: JobType;

  @Column({ name: 'experience_level', type: 'enum', enum: ExperienceLevel })
  experienceLevel!: ExperienceLevel;

  @Column({ type: 'int', default: 1 })
  quantity!: number;

  @Column({ type: 'timestamptz', nullable: true })
  deadline!: Date | null;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.DRAFT })
  status!: JobStatus;

  @Column({ name: 'created_by' })
  createdById!: string;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'created_by' })
  createdBy!: UserEntity;

  @Column({ default: false })
  urgent!: boolean;

  @Column({ type: 'varchar', nullable: true })
  shift!: string | null;

  @Column({ name: 'quality_score', type: 'int', default: 80 })
  qualityScore!: number;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  tags!: string[];

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

@Entity({ name: 'job_categories' })
export class JobCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  slug!: string;
}

@Entity({ name: 'job_job_categories' })
export class JobJobCategoryEntity {
  @PrimaryColumn('uuid', { name: 'job_id' })
  jobId!: string;

  @ManyToOne(() => JobEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job!: JobEntity;

  @PrimaryColumn('uuid', { name: 'category_id' })
  categoryId!: string;

  @ManyToOne(() => JobCategoryEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category!: JobCategoryEntity;
}

@Entity({ name: 'skills' })
export class SkillEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  slug!: string;
}

@Entity({ name: 'job_skills' })
export class JobSkillEntity {
  @PrimaryColumn('uuid', { name: 'job_id' })
  jobId!: string;

  @ManyToOne(() => JobEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job!: JobEntity;

  @PrimaryColumn('uuid', { name: 'skill_id' })
  skillId!: string;

  @ManyToOne(() => SkillEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_id' })
  skill!: SkillEntity;
}

@Entity({ name: 'saved_jobs' })
export class SavedJobEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'candidate_id' })
  candidateId!: string;

  @ManyToOne(() => CandidateProfileEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate!: CandidateProfileEntity;

  @Column({ name: 'job_id' })
  jobId!: string;

  @ManyToOne(() => JobEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job!: JobEntity;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}

@Entity({ name: 'job_views' })
export class JobViewEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'job_id' })
  jobId!: string;

  @ManyToOne(() => JobEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job!: JobEntity;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId!: string | null;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity | null;

  @Column({ name: 'ip_address', type: 'varchar', nullable: true })
  ipAddress!: string | null;

  @Column({ name: 'viewed_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  viewedAt!: Date;
}
