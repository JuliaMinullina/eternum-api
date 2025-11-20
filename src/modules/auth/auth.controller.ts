import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      // Проверяем, существует ли пользователь с таким email
      const existingUser = await this.userService.findByEmail(registerDto.Email);
      if (existingUser) {
        throw new UnauthorizedException('User with this email already exists');
      }

      // Создаем пользователя
      const user = await this.userService.create(registerDto);

      // Логиним пользователя
      const result = await this.authService.login(user);
      return result;
    } catch (error) {
      console.error('Error in register:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Registration failed. Please try again.');
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    try {
      console.log('🔐 Login attempt for:', req.user?.Email || 'unknown');

      // LocalAuthGuard уже валидировал пользователя через LocalStrategy
      // и установил req.user, поэтому просто используем его
      const user = req.user;
      
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Account is deactivated');
      }

      const result = await this.authService.login(user);
      console.log('🔐 Login successful, returning tokens in body (no cookies)');
      return res.json(result);
    } catch (error) {
      console.error('Error in login:', error);
      if (error instanceof UnauthorizedException) {
        return res.status(401).json({
          success: false,
          message: error.message || 'Invalid email or password',
          timestamp: new Date().toISOString(),
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Login failed. Please try again.',
        timestamp: new Date().toISOString(),
      });
    }
  }

  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Response() res,
  ) {
    try {
      const result = await this.authService.refreshAccessToken(
        refreshTokenDto.refresh_token,
      );
      return res.json(result);
    } catch (error) {
      console.error('Error in refreshToken:', error);
      if (error instanceof UnauthorizedException) {
        return res.status(401).json({
          success: false,
          message: error.message || 'Invalid refresh token',
          timestamp: new Date().toISOString(),
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Token refresh failed. Please try again.',
        timestamp: new Date().toISOString(),
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    try {
      return await this.authService.getProfile(req.user.UserID);
    } catch (error) {
      console.error('Error in getProfile:', error);
      throw new UnauthorizedException('Failed to get user profile');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyToken(@Request() req) {
    // Записываем ежедневный вход при проверке токена (неблокирующая операция)
    try {
      await this.userService.recordDailyLogin(req.user.UserID);
    } catch (error) {
      // Логируем ошибку, но не прерываем процесс проверки токена
      console.error('Ошибка записи ежедневного входа:', error);
    }
    return { valid: true, user: req.user };
  }

  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto, @Request() req, @Response() res) {
    try {
      const result = await this.authService.logout(logoutDto.refresh_token);
      return res.json(result);
    } catch (error) {
      console.error('Error in logout:', error);
      return res.status(500).json({
        success: false,
        message: 'Logout failed. Please try again.',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
