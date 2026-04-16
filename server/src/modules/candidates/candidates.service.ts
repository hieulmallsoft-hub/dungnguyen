import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidateProfileEntity } from '../../database/entities';
import { UpdateCandidateProfileDto } from './dto/update-candidate-profile.dto';

@Injectable()
export class CandidatesService {
  constructor(@InjectRepository(CandidateProfileEntity) private readonly candidateRepository: Repository<CandidateProfileEntity>) {}

  async getMyProfile(userId: string) {
    const profile = await this.candidateRepository.findOne({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Không tìm thấy hồ sơ ứng viên.');
    }
    return profile;
  }

  async updateMyProfile(userId: string, payload: UpdateCandidateProfileDto) {
    const profile = await this.getMyProfile(userId);
    Object.assign(profile, payload, { updatedAt: new Date() });
    return this.candidateRepository.save(profile);
  }
}
