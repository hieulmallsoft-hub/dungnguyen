import { IsEnum } from 'class-validator';
import { JobStatus } from '../../../common/enums/domain.enums';

export class AdminUpdateJobStatusDto {
  @IsEnum(JobStatus)
  status!: JobStatus;
}

