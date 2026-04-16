import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { CandidatesService } from './candidates.service';
import { UpdateCandidateProfileDto } from './dto/update-candidate-profile.dto';

@Controller('candidate')
@UseGuards(JwtAuthGuard)
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get('me')
  getMyProfile(@CurrentUser() user: { sub: string }) {
    return this.candidatesService.getMyProfile(user.sub);
  }

  @Patch('me')
  updateMyProfile(@CurrentUser() user: { sub: string }, @Body() payload: UpdateCandidateProfileDto) {
    return this.candidatesService.updateMyProfile(user.sub, payload);
  }
}
