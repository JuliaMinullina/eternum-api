import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Получаем access token из cookies
    const accessToken = req.cookies?.access_token;

    if (accessToken && !req.headers.authorization) {
      // Устанавливаем токен в Authorization header для JWT guard
      req.headers.authorization = `Bearer ${accessToken}`;
    }

    next();
  }
}
