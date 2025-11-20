import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      console.log('🔐 LocalStrategy: Validating user with email:', email);
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        console.log('🔐 LocalStrategy: User not found or password incorrect');
        throw new UnauthorizedException('Invalid email or password');
      }
      console.log('🔐 LocalStrategy: User validated successfully:', user.Email);
      return user;
    } catch (error) {
      console.error('🔐 LocalStrategy: Error in validate:', {
        error: error?.message,
        stack: error?.stack,
        name: error?.name,
      });
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      // Если это ошибка базы данных, пробрасываем более понятное сообщение
      if (error?.message?.includes('Database connection')) {
        throw new UnauthorizedException('Database connection failed. Please try again later.');
      }
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
