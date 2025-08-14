-- Инициализация базы данных для NestJS приложения

-- Создание расширений (если нужны)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создание дополнительных пользователей (опционально)
-- CREATE USER nestjs_user WITH PASSWORD 'nestjs_password';
-- GRANT ALL PRIVILEGES ON DATABASE nestjs_db TO nestjs_user;

-- Установка прав доступа
GRANT ALL PRIVILEGES ON DATABASE nestjs_db TO postgres;

-- Комментарий: Таблицы будут созданы автоматически TypeORM при запуске приложения
-- благодаря настройке synchronize: true в режиме разработки
