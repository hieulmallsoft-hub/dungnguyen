import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity, CompanyMemberEntity } from '../../database/entities';
import { CompanyMemberRole, CompanyPlan, CompanyStatus } from '../../common/enums/domain.enums';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(CompanyMemberEntity) private readonly companyMemberRepository: Repository<CompanyMemberEntity>
  ) {}

  listCompanies() {
    return this.companyRepository.find({ order: { updatedAt: 'DESC' } });
  }

  async getCompany(id: string) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Không tìm thấy doanh nghiệp.');
    }
    return company;
  }

  async createCompany(payload: CreateCompanyDto, createdById: string) {
    const company = await this.companyRepository.save(
      this.companyRepository.create({
        ...payload,
        createdById,
        plan: CompanyPlan.STARTER,
        status: CompanyStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );

    await this.companyMemberRepository.save({
      companyId: company.id,
      userId: createdById,
      roleInCompany: CompanyMemberRole.OWNER,
      createdAt: new Date()
    });

    return company;
  }
}
