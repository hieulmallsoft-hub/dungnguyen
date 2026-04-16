import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ExperienceLevel, JobStatus, JobType } from '../../../common/enums/domain.enums';

export class CreateJobDto {
  @IsString()
  companyId!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  requirements!: string[];

  @IsArray()
  benefits!: string[];

  @IsOptional()
  @IsInt()
  salaryMin?: number;

  @IsOptional()
  @IsInt()
  salaryMax?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsEnum(JobType)
  jobType!: JobType;

  @IsEnum(ExperienceLevel)
  experienceLevel!: ExperienceLevel;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;

  @IsOptional()
  @IsString()
  shift?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];
}
