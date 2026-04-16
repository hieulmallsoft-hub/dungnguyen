import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  jobId!: string;

  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  cvLink?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
