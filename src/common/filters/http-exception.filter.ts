import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as any;
        // Для массива сообщений берем первое, иначе само сообщение
        if (Array.isArray(responseObj.message)) {
          message = responseObj.message[0] || exception.message;
        } else {
          message = responseObj.message || exception.message;
        }
        errors = responseObj.errors || null;
      }
      
      // Специальная обработка для UnauthorizedException
      if (status === HttpStatus.UNAUTHORIZED) {
        console.error('🔐 Unauthorized error:', {
          message,
          path: request.url,
          method: request.method,
        });
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      
      // Специальная обработка ошибок подключения к базе данных
      if (message.includes('Database connection failed') || 
          message.includes('connect') ||
          (exception as any)?.code === 'ECONNREFUSED' ||
          (exception as any)?.code === 'ENOTFOUND') {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Database connection failed. Please ensure PostgreSQL is running.';
      }
    }

    // Логируем ошибку для отладки
    if (status === HttpStatus.INTERNAL_SERVER_ERROR || status === HttpStatus.SERVICE_UNAVAILABLE) {
      console.error('❌ Error:', exception);
    }

    const errorResponse = {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    response.status(status).json(errorResponse);
  }
}
