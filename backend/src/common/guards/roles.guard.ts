import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';

interface AuthenticatedRequest extends Request {
  user?: {
    role?: string;
  };
}
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    return user?.role ? requiredRoles.includes(user.role) : false;
  }
}
