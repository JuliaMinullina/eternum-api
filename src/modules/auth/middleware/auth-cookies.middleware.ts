import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthCookiesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Перехватываем ответы от auth endpoints
    const originalSend = res.send;
    
    res.send = function(data) {
      try {
        const responseData = typeof data === 'string' ? JSON.parse(data) : data;
        
        // Если это ответ от login или refresh endpoints
        if (responseData.access_token) {
          console.log('🔐 Setting cookies for auth response');
          console.log('Access token:', responseData.access_token ? 'PRESENT' : 'NOT FOUND');
          console.log('Refresh token:', responseData.refresh_token ? 'PRESENT' : 'NOT FOUND');
          
          // Устанавливаем access token в httpOnly cookie
          res.cookie('access_token', responseData.access_token, {
            httpOnly: true,
            secure: false, // false для development
            sameSite: 'lax',
            maxAge: (responseData.expires_in || 24 * 60 * 60) * 1000, // 24 часа по умолчанию
            path: '/'
          });
          
          // Устанавливаем refresh token в httpOnly cookie
          if (responseData.refresh_token) {
            res.cookie('refresh_token', responseData.refresh_token, {
              httpOnly: true,
              secure: false, // false для development
              sameSite: 'lax',
              maxAge: 72 * 60 * 60 * 1000, // 72 часа
              path: '/'
            });
          }
          
          console.log('🍪 Cookies set successfully');
          
          // Оставляем токены в ответе для отладки
          return originalSend.call(this, JSON.stringify(responseData));
        }
      } catch (error) {
        console.error('Error in auth cookies middleware:', error);
      }
      
      return originalSend.call(this, data);
    };
    
    next();
  }
}
