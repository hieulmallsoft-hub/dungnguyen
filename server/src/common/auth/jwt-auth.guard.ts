import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { getJwtSecret } from '../config/app-config';
import { AuthUserPayload } from './current-user.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = String(request.headers.authorization || '');

    if (!authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token.');
    }

    const token = authorization.slice(7).trim();
    const secret = getJwtSecret(this.configService, 'JWT_ACCESS_SECRET');

    try {
      request.user = verify(token, secret) as AuthUserPayload;
      return true;
    } catch (_error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
