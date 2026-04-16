import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity, CompanyMemberEntity, JobEntity, JobJobCategoryEntity } from '../../database/entities';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity, JobJobCategoryEntity, CompanyEntity, CompanyMemberEntity])],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService]
})
export class JobsModule {}
