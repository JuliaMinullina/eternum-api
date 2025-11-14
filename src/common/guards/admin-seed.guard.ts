import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AdminSeedGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Получаем токен из заголовка
    const token = request.headers['x-admin-seed-token'] as string;
    
    // Получаем секретный токен из переменных окружения
    const secretToken = this.configService.get<string>('ADMIN_SEED_TOKEN');
    
    if (!secretToken) {
      throw new UnauthorizedException('Admin seed token not configured');
    }
    
    if (!token || token !== secretToken) {
      throw new UnauthorizedException('Invalid admin seed token');
    }
    
    return true;
  }
}
