import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Обработка preflight запросов
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.status(200).end();
      return;
    }

    // Добавляем CORS заголовки для всех запросов
    res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    next();
  }
}
