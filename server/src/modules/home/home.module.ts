import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateProfileEntity, CompanyEntity, JobEntity } from '../../database/entities';
import { JobsModule } from '../jobs/jobs.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity, CompanyEntity, CandidateProfileEntity]), JobsModule],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
