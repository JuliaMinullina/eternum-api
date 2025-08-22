import { Controller, Post, Body, Get, UseGuards, Request, Response, UnauthorizedException } from '@nestjs/common';
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
    
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const result = await this.authService.login(user);
    console.log('🔐 Login successful, setting cookies and returning result');

    // Явные CORS заголовки для ответов аутентификации
    const allowedOrigin = process.env.CORS_ORIGIN || 'https://eternum-book.netlify.app';
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', allowedOrigin);

    const cookieDomain = process.env.COOKIE_DOMAIN || process.env.API_COOKIE_DOMAIN;
    const commonCookieOptions: any = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    };

    res.cookie('access_token', result.access_token, {
      ...commonCookieOptions,
      maxAge: (result.expires_in || 24 * 60 * 60) * 1000,
    });

    if (result.refresh_token) {
      res.cookie('refresh_token', result.refresh_token, {
        ...commonCookieOptions,
        maxAge: 72 * 60 * 60 * 1000,
      });
    }
    return res.json(result);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Response() res) {
    const result = await this.authService.refreshAccessToken(refreshTokenDto.refresh_token);

    // Явные CORS заголовки для ответов аутентификации
    const allowedOrigin = process.env.CORS_ORIGIN || 'https://eternum-book.netlify.app';
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', allowedOrigin);

    const cookieDomain = process.env.COOKIE_DOMAIN || process.env.API_COOKIE_DOMAIN;
    const commonCookieOptions: any = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    };

    res.cookie('access_token', result.access_token, {
      ...commonCookieOptions,
      maxAge: (result.expires_in || 24 * 60 * 60) * 1000,
    });

    // Подтверждаем refresh_token cookie тем же значением, чтобы гарантировать ровно 2 Set-Cookie
    if (refreshTokenDto.refresh_token) {
      res.cookie('refresh_token', refreshTokenDto.refresh_token, {
        ...commonCookieOptions,
        maxAge: 72 * 60 * 60 * 1000,
      });
    }
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

  @Get('test-cookies')
  async testCookies(@Request() req, @Response() res) {
    console.log('🍪 Testing cookies endpoint');
    console.log('Request cookies:', req.cookies);
    
    // Устанавливаем тестовую cookie
    res.cookie('test_cookie', 'test_value', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 1000, // 1 минута
      path: '/'
    });
    
    return { message: 'Test cookie set', cookies: req.cookies };
  }

  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto, @Request() req, @Response() res) {
    const result = await this.authService.logout(logoutDto.refresh_token);
    
    // Очищаем cookies
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
    
    return result;
  }
}
