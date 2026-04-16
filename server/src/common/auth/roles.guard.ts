import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthUserPayload } from './current-user.decorator';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from '../enums/domain.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUserPayload | undefined;

    if (!user || !requiredRoles.includes(user.role as UserRole)) {
      throw new ForbiddenException('You do not have permission to access this resource.');
    }

    return true;
  }
}
