import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  let app;
  try {
    // Создаем приложение с опцией не падать при ошибках подключения к БД
    try {
      app = await NestFactory.create(AppModule, {
        abortOnError: false, // Не падаем при ошибках
        logger: ['error', 'warn', 'log'], // Логируем только важное
      });
    } catch (dbError: any) {
      // Если ошибка связана с БД, логируем и продолжаем
      if (dbError?.message?.includes('could not write init file') || 
          dbError?.message?.includes('connection') ||
          dbError?.code === 'XX000') {
        console.error('⚠️  Database connection error during app creation, but continuing...', dbError.message);
        // Пытаемся создать приложение еще раз, игнорируя ошибки БД
        app = await NestFactory.create(AppModule, {
          abortOnError: false,
          logger: false, // Отключаем логирование для избежания повторных ошибок
        });
      } else {
        throw dbError;
      }
    }

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
