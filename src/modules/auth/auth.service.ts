import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

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
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
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

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        UserID: user.UserID,
        UserName: user.UserName,
        UserSurname: user.UserSurname,
        Email: user.Email,
        Role: user.Role,
      },
    };
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
