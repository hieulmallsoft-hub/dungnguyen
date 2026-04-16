import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { Roles } from '../../common/auth/roles.decorator';
import { RolesGuard } from '../../common/auth/roles.guard';
import { UserRole } from '../../common/enums/domain.enums';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getDashboard() {
    return this.adminService.getDashboard();
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
