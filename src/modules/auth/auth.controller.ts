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
  async login(@Body() loginDto: LoginDto, @Response() res) {
    console.log('🔐 Login attempt for:', loginDto.email);

    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const result = await this.authService.login(user);
    console.log('🔐 Login successful, returning tokens in body (no cookies)');
    return res.json(result);
  }

  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Response() res,
  ) {
    const result = await this.authService.refreshAccessToken(
      refreshTokenDto.refresh_token,
    );
    return res.json(result);
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

  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto, @Request() req, @Response() res) {
    const result = await this.authService.logout(logoutDto.refresh_token);
    return result;
  }
}
