import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CandidateSkillLevel, Gender } from '../../common/enums/domain.enums';
import { SkillEntity } from './job.entities';
import { UserEntity } from './user.entity';

@Entity({ name: 'candidate_profiles' })
export class CandidateProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', unique: true })
  userId!: string;

  @OneToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ type: 'varchar', nullable: true })
  title!: string | null;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth!: string | null;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender!: Gender | null;

  @Column({ type: 'varchar', nullable: true })
  address!: string | null;

  @Column({ name: 'experience_years', type: 'int', default: 0 })
  experienceYears!: number;

  @Column({ name: 'current_salary', type: 'int', nullable: true })
  currentSalary!: number | null;

  @Column({ name: 'expected_salary', type: 'int', nullable: true })
  expectedSalary!: number | null;

  @Column({ name: 'education_level', type: 'varchar', nullable: true })
  educationLevel!: string | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

@Entity({ name: 'resumes' })
export class ResumeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'candidate_id' })
  candidateId!: string;

  @ManyToOne(() => CandidateProfileEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate!: CandidateProfileEntity;

  @Column({ name: 'file_url' })
  fileUrl!: string;

  @Column({ name: 'file_name' })
  fileName!: string;

  @Column({ name: 'is_default', default: false })
  isDefault!: boolean;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}

@Entity({ name: 'candidate_skills' })
export class CandidateSkillEntity {
  @PrimaryColumn('uuid', { name: 'candidate_id' })
  candidateId!: string;

  @ManyToOne(() => CandidateProfileEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate!: CandidateProfileEntity;

  @PrimaryColumn('uuid', { name: 'skill_id' })
  skillId!: string;

  @ManyToOne(() => SkillEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_id' })
  skill!: SkillEntity;

  @Column({ type: 'enum', enum: CandidateSkillLevel })
  level!: CandidateSkillLevel;
}

@Entity({ name: 'candidate_experiences' })
export class CandidateExperienceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'candidate_id' })
  candidateId!: string;

  @ManyToOne(() => CandidateProfileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate!: CandidateProfileEntity;

  @Column({ name: 'company_name' })
  companyName!: string;

  @Column()
  position!: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate!: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate!: string | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;
}

@Entity({ name: 'candidate_educations' })
export class CandidateEducationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'candidate_id' })
  candidateId!: string;

  @ManyToOne(() => CandidateProfileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate!: CandidateProfileEntity;

  @Column({ name: 'school_name' })
  schoolName!: string;

  @Column({ type: 'varchar', nullable: true })
  major!: string | null;

  @Column({ type: 'varchar', nullable: true })
  degree!: string | null;

  @Column({ name: 'start_date', type: 'date' })
  startDate!: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate!: string | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;
}

@Entity({ name: 'candidate_projects' })
export class CandidateProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'candidate_id' })
  candidateId!: string;

  @ManyToOne(() => CandidateProfileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate!: CandidateProfileEntity;

  @Column({ name: 'project_name' })
  projectName!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ name: 'project_url', type: 'varchar', nullable: true })
  projectUrl!: string | null;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate!: string | null;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate!: string | null;
}

@Entity({ name: 'candidate_certificates' })
export class CandidateCertificateEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'candidate_id' })
  candidateId!: string;

  @ManyToOne(() => CandidateProfileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate!: CandidateProfileEntity;

  @Column()
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  issuer!: string | null;

  @Column({ name: 'issue_date', type: 'date', nullable: true })
  issueDate!: string | null;

  @Column({ name: 'expire_date', type: 'date', nullable: true })
  expireDate!: string | null;
}
