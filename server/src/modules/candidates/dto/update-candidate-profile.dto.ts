import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCandidateProfileDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  experienceYears?: number;

  @IsOptional()
  @IsInt()
  currentSalary?: number;

  @IsOptional()
  @IsInt()
  expectedSalary?: number;

  @IsOptional()
  @IsString()
  educationLevel?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
