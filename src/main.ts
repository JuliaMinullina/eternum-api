import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import cookieParser from 'cookie-parser';

// Глобальный обработчик необработанных ошибок БД
process.on('unhandledRejection', (reason: any, promise) => {
  if (reason?.message?.includes('could not write init file') || 
      reason?.code === 'XX000' ||
      reason?.message?.includes('connection')) {
    console.error('⚠️  Unhandled database error (ignoring):', reason?.message || reason);
    // Не падаем при ошибках БД
    return;
  }
  console.error('❌ Unhandled rejection:', reason);
});

process.on('uncaughtException', (error: any) => {
  if (error?.message?.includes('could not write init file') || 
      error?.code === 'XX000' ||
      error?.message?.includes('connection')) {
    console.error('⚠️  Uncaught database error (ignoring):', error?.message || error);
    // Не падаем при ошибках БД
    return;
  }
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

async function bootstrap() {
  try {
    // Создаем приложение с опцией не падать при ошибках подключения к БД
    const app = await NestFactory.create(AppModule, {
      abortOnError: false, // Не падаем при ошибках
      logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['error', 'warn', 'log'],
    });

    // Подключаем cookie-parser
    app.use(cookieParser());

    // Настройка CORS с поддержкой переменной окружения для продакшена
    const corsOrigin = process.env.CORS_ORIGIN;
    const isProduction = process.env.NODE_ENV === 'production';
    
    // В продакшене используем переменную окружения, в development разрешаем все
    const corsOptions = {
      origin: isProduction && corsOrigin 
        ? corsOrigin.split(',').map(origin => origin.trim())
        : true, // В development разрешаем все домены
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
    };
    
    console.log('🌐 CORS configuration:', {
      isProduction,
      corsOrigin: corsOrigin || 'not set (allowing all)',
      origin: corsOptions.origin,
    });
    
    app.enableCors(corsOptions);

  // Убираем глобальный префикс для совместимости с фронтендом
  // app.setGlobalPrefix('api');

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Глобальные фильтры и интерцепторы
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
    console.log(
      `✅ Your application is running on: http://localhost:${process.env.PORT ?? 3000}`,
    );
    console.log('⚠️  Note: Database connection may be unavailable, but app is running');
  } catch (error: any) {
    console.error('❌ Error starting application:', error);
    // Не падаем сразу, даем время на восстановление
    console.error('⚠️  Application failed to start, but this might be temporary');
    console.error('⚠️  Check database connection and try again');
    process.exit(1);
  }
}
bootstrap();
