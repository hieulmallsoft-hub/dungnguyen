import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthUserPayload, CurrentUser } from '../../common/auth/current-user.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { Roles } from '../../common/auth/roles.decorator';
import { RolesGuard } from '../../common/auth/roles.guard';
import { UserRole } from '../../common/enums/domain.enums';
import { AdminService } from './admin.service';
import { AdminUpsertJobDto } from './dto/admin-upsert-job.dto';
import { AdminUpdateJobDto } from './dto/admin-update-job.dto';
import { AdminUpdateJobStatusDto } from './dto/admin-update-job-status.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getDashboard(@Query() query: { from?: string; to?: string; granularity?: string }) {
    return this.adminService.getDashboard(query);
  }

  @Get('users')
  getUsers() {
    return this.adminService.listUsers();
  }

  @Get('companies')
  getCompanies() {
    return this.adminService.listCompanies();
  }

  @Get('jobs')
  getJobs() {
    return this.adminService.listJobs();
  }

  @Get('jobs/:id')
  getJob(@Param('id') id: string) {
    return this.adminService.getJobById(id);
  }

  @Post('jobs')
  createJob(@Body() payload: AdminUpsertJobDto, @CurrentUser() user: AuthUserPayload) {
    return this.adminService.createJob(payload, user);
  }

  @Patch('jobs/:id')
  updateJob(@Param('id') id: string, @Body() payload: AdminUpdateJobDto) {
    return this.adminService.updateJob(id, payload);
  }

  @Patch('jobs/:id/status')
  updateJobStatus(@Param('id') id: string, @Body() payload: AdminUpdateJobStatusDto) {
    return this.adminService.updateJobStatus(id, payload.status);
  }

  @Get('applications')
  getApplications() {
    return this.adminService.listApplications();
  }

  @Get('reports')
  getReports() {
    return this.adminService.listReports();
  }

  @Get('categories')
  getCategories() {
    return this.adminService.listCategories();
  }

  @Get('audit-logs')
  getAuditLogs() {
    return this.adminService.listAuditLogs();
  }
}
