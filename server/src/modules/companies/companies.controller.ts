import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthUserPayload, CurrentUser } from '../../common/auth/current-user.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { Roles } from '../../common/auth/roles.decorator';
import { RolesGuard } from '../../common/auth/roles.guard';
import { UserRole } from '../../common/enums/domain.enums';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  listCompanies() {
    return this.companiesService.listCompanies();
  }

  @Get(':id')
  getCompany(@Param('id') id: string) {
    return this.companiesService.getCompany(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.RECRUITER)
  createCompany(@Body() payload: CreateCompanyDto, @CurrentUser() user: AuthUserPayload) {
    return this.companiesService.createCompany(payload, user.sub);
  }
}
