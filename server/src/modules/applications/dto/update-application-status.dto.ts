import { IsEnum } from 'class-validator';
import { ApplicationStatus } from '../../../common/enums/domain.enums';

export class UpdateApplicationStatusDto {
  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;
}
