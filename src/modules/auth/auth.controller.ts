import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Request, 
  Get, 
  HttpCode, 
  HttpStatus,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Регистрация нового пользователя
   * @param registerDto - данные для регистрации
   * @returns объект с токеном доступа и данными пользователя
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(registerDto);
      return {
        success: true,
        message: 'User registered successfully',
        data: result
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Registration failed');
    }
  }

  /**
   * Вход в систему
   * @param loginDto - данные для входа
   * @returns объект с токеном доступа и данными пользователя
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return {
        success: true,
        message: 'Login successful',
        data: result
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Login failed');
    }
  }

  /**
   * Обновление токена доступа
   * @param req - объект запроса с данными пользователя
   * @returns новый токен доступа
   */
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Request() req) {
    try {
      const result = await this.authService.refreshToken(req.user.UserID);
      return {
        success: true,
        message: 'Token refreshed successfully',
        data: result
      };
    } catch (error) {
      throw new UnauthorizedException('Token refresh failed');
    }
  }

  /**
   * Получение профиля текущего пользователя
   * @param req - объект запроса с данными пользователя
   * @returns данные пользователя без пароля
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return {
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user: req.user
      }
    };
  }

  /**
   * Проверка валидности токена
   * @param req - объект запроса с данными пользователя
   * @returns статус валидности токена
   */
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  verifyToken(@Request() req) {
    return {
      success: true,
      message: 'Token is valid',
      data: {
        user: req.user
      }
    };
  }

  /**
   * Выход из системы (клиентская сторона должна удалить токен)
   * @returns сообщение об успешном выходе
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    return {
      success: true,
      message: 'Logout successful',
      data: null
    };
  }
}
