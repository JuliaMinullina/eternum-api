import { Controller, Post, Body, Get, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
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
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    const user = await this.userService.findOne(req.user.UserID);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.UserID);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyToken(@Request() req) {
    return { valid: true, user: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    // В JWT аутентификации logout обычно обрабатывается на клиенте
    // путем удаления токена
    return { message: 'Logged out successfully' };
  }
}
