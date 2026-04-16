import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateProfileEntity } from '../../database/entities';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateProfileEntity])],
  controllers: [CandidatesController],
  providers: [CandidatesService]
})
export class CandidatesModule {}
