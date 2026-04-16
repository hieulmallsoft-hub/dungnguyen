import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() payload: CreateApplicationDto) {
    return this.applicationsService.create(payload);
  }

  @Patch(':applicationId/status')
  updateStatus(@Param('applicationId') applicationId: string, @Body() payload: UpdateApplicationStatusDto) {
    return this.applicationsService.updateStatus(applicationId, payload);
  }
}
