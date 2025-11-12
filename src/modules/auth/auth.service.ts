import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RefreshToken } from './refresh-token.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export interface JwtPayload {
  UserID: string;
  UserName: string;
  UserSurname: string;
  Email: string;
  Role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = {
      UserID: user.UserID,
      UserName: user.UserName,
      UserSurname: user.UserSurname,
      Email: user.Email,
      Role: user.Role,
    };

    // Создаем access token (24 часа)
    const accessToken = this.jwtService.sign(payload, { expiresIn: '24h' });

    // Создаем refresh token (72 часа)
    const refreshToken = await this.createRefreshToken(user.UserID);

    console.log('🔐 AuthService: Tokens generated');
    console.log('Access token length:', accessToken.length);
    console.log('Refresh token length:', refreshToken.token.length);

    return {
      access_token: accessToken,
      refresh_token: refreshToken.token,
      expires_in: 24 * 60 * 60, // 24 часа в секундах
      user: {
        UserID: user.UserID,
        UserName: user.UserName,
        UserSurname: user.UserSurname,
        Email: user.Email,
        Role: user.Role,
      },
    };
  }

  private async createRefreshToken(userId: string): Promise<RefreshToken> {
    // Генерируем случайный токен
    const token = crypto.randomBytes(64).toString('hex');

    // Создаем refresh token с истечением через 72 часа
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 72);

    const refreshToken = this.refreshTokenRepository.create({
      token,
      userId,
      expiresAt,
    });

    return await this.refreshTokenRepository.save(refreshToken);
  }

  async refreshAccessToken(refreshTokenString: string) {
    // Находим refresh token в базе
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token: refreshTokenString, isRevoked: false },
      relations: ['user'],
    });

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Проверяем, не истек ли токен
    if (new Date() > refreshToken.expiresAt) {
      // Помечаем токен как отозванный
      refreshToken.isRevoked = true;
      await this.refreshTokenRepository.save(refreshToken);
      throw new UnauthorizedException('Refresh token expired');
    }

    // Создаем новый access token
    const payload: JwtPayload = {
      UserID: refreshToken.user.UserID,
      UserName: refreshToken.user.UserName,
      UserSurname: refreshToken.user.UserSurname,
      Email: refreshToken.user.Email,
      Role: refreshToken.user.Role,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '24h' });

    return {
      access_token: accessToken,
      expires_in: 24 * 60 * 60, // 24 часа в секундах
      user: {
        UserID: refreshToken.user.UserID,
        UserName: refreshToken.user.UserName,
        UserSurname: refreshToken.user.UserSurname,
        Email: refreshToken.user.Email,
        Role: refreshToken.user.Role,
      },
    };
  }

  async logout(refreshTokenString: string) {
    // Находим и отзываем refresh token
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token: refreshTokenString },
    });

    if (refreshToken) {
      refreshToken.isRevoked = true;
      await this.refreshTokenRepository.save(refreshToken);
    }

    return { message: 'Successfully logged out' };
  }

  async revokeAllUserTokens(userId: string) {
    // Отзываем все токены пользователя
    await this.refreshTokenRepository.update(
      { userId, isRevoked: false },
      { isRevoked: true },
    );
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getProfile(userId: string) {
    const user = await this.userService.findOne(userId);
    return user;
  }
}
