import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'password'),
  database: configService.get('DB_NAME', 'nestjs_db'),
  entities: [
    __dirname + '/../modules/**/*.entity{.ts,.js}',
    __dirname + '/../entities/*.entity{.ts,.js}'
  ],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true, // Всегда запускать миграции
  synchronize: false, // Отключаем синхронизацию для безопасности
  logging: configService.get('NODE_ENV') !== 'production',
  ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
  // Дополнительные настройки для Docker
  extra: {
    max: 20, // Максимальное количество соединений в пуле
    connectionTimeoutMillis: 30000, // Таймаут подключения 30 секунд
    idleTimeoutMillis: 30000, // Таймаут простоя соединения
  },
  // Настройки для переподключения
  retryAttempts: 10,
  retryDelay: 3000, // 3 секунды между попытками
  // Настройки для Docker Compose
  autoLoadEntities: true,
  // Дополнительные логи для отладки
  logger: configService.get('NODE_ENV') !== 'production' ? 'advanced-console' : 'simple-console',
});
