import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ExperienceLevel, JobStatus, JobType } from '../../../common/enums/domain.enums';

export class AdminUpsertJobDto {
  @IsString()
  companyId!: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  requirements!: string[];

  @IsArray()
  benefits!: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  salaryMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
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

  @Type(() => Number)
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

