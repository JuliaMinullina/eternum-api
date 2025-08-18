import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestOrigin = req.headers.origin as string | undefined;
    const originToAllow = requestOrigin || '*';

    // Обработка preflight запросов
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', originToAllow);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.status(200).end();
      return;
    }

    // Добавляем CORS заголовки для всех запросов
    res.header('Access-Control-Allow-Origin', originToAllow);
    res.header('Access-Control-Allow-Credentials', 'true');
    
    next();
  }
}
