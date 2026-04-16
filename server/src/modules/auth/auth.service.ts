import { randomUUID } from 'crypto';
import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { getJwtSecret } from '../../common/config/app-config';
import { UserRole, UserStatus } from '../../common/enums/domain.enums';
import { AuditLogEntity, CandidateProfileEntity, RefreshTokenEntity, UserEntity } from '../../database/entities';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CandidateProfileEntity) private readonly candidateRepository: Repository<CandidateProfileEntity>,
    @InjectRepository(RefreshTokenEntity) private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    @InjectRepository(AuditLogEntity) private readonly auditLogRepository: Repository<AuditLogEntity>,
    private readonly configService: ConfigService
  ) {}

  async register(payload: RegisterDto) {
    const existingUser = await this.userRepository.findOne({ where: { email: payload.email.toLowerCase() } });
    if (existingUser) {
      throw new ConflictException('Email đã tồn tại.');
    }

    const role = payload.role === UserRole.RECRUITER ? UserRole.RECRUITER : UserRole.CANDIDATE;
    const user = await this.userRepository.save(
      this.userRepository.create({
        email: payload.email.toLowerCase(),
        passwordHash: await hash(payload.password, 10),
        fullName: payload.fullName,
        phone: payload.phone || null,
        role,
        status: role === UserRole.RECRUITER ? UserStatus.PENDING : UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );

    if (role === UserRole.CANDIDATE) {
      await this.candidateRepository.save(
        this.candidateRepository.create({
          userId: user.id,
          title: null,
          address: null,
          experienceYears: 0,
          currentSalary: null,
          expectedSalary: null,
          educationLevel: null,
          description: null,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      );
    }

    await this.auditLogRepository.save({
      userId: user.id,
      action: 'auth.register',
      entityType: 'user',
      entityId: user.id,
      oldData: null,
      newData: { email: user.email, role: user.role },
      createdAt: new Date()
    });

    return this.createAuthResponse(user);
  }

  async login(payload: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: payload.email.toLowerCase() } });
    if (!user || !(await compare(payload.password, user.passwordHash))) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng.');
    }

    if (user.status === UserStatus.BANNED) {
      throw new UnauthorizedException('Tài khoản này đã bị khóa.');
    }

    user.updatedAt = new Date();
    await this.userRepository.save(user);
    return this.createAuthResponse(user);
  }

  async me(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng.');
    }
    return this.serializeUser(user);
  }

  async refresh(payload: RefreshTokenDto) {
    const token = await this.refreshTokenRepository.findOne({ where: { token: payload.refreshToken, revoked: false } });
    if (!token || token.expiredAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn.');
    }

    return this.createAuthResponse(token.user);
  }

  async logout(payload: RefreshTokenDto) {
    const token = await this.refreshTokenRepository.findOne({ where: { token: payload.refreshToken } });
    if (token) {
      token.revoked = true;
      await this.refreshTokenRepository.save(token);
    }

    return { message: 'Đăng xuất thành công.' };
  }

  private async createAuthResponse(user: UserEntity) {
    const accessSecret = getJwtSecret(this.configService, 'JWT_ACCESS_SECRET');
    const refreshSecret = getJwtSecret(this.configService, 'JWT_REFRESH_SECRET');
    const accessToken = sign({ sub: user.id, email: user.email, role: user.role }, accessSecret, { expiresIn: '1d' });
    const refreshToken = sign({ sub: user.id, nonce: randomUUID() }, refreshSecret, { expiresIn: '30d' });

    await this.refreshTokenRepository.save({
      userId: user.id,
      token: refreshToken,
      expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      revoked: false,
      createdAt: new Date()
    });

    return {
      user: this.serializeUser(user),
      accessToken,
      refreshToken
    };
  }

  private serializeUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
