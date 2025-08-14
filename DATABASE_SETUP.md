# Настройка PostgreSQL базы данных с JWT аутентификацией

## Установка PostgreSQL

### macOS (с помощью Homebrew)
```bash
brew install postgresql
brew services start postgresql
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Windows
Скачайте и установите PostgreSQL с официального сайта: https://www.postgresql.org/download/windows/

## Создание базы данных

1. Подключитесь к PostgreSQL:
```bash
psql -U postgres
```

2. Создайте базу данных:
```sql
CREATE DATABASE nestjs_db;
```

3. Создайте пользователя (опционально):
```sql
CREATE USER nestjs_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE nestjs_db TO nestjs_user;
```

## Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=nestjs_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Environment
NODE_ENV=development
```

## Запуск приложения

1. Установите зависимости:
```bash
npm install
```

2. Запустите приложение:
```bash
npm run start:dev
```

## API Endpoints

### Аутентификация

- `POST /auth/register` - регистрация нового пользователя
- `POST /auth/login` - вход в систему
- `GET /auth/profile` - получить профиль текущего пользователя (требует JWT токен)

### Пользователи (требуют JWT токен)

- `GET /users` - получить всех пользователей
- `GET /users/:id` - получить пользователя по ID
- `POST /users` - создать нового пользователя (без токена)
- `PUT /users/:id` - обновить пользователя
- `DELETE /users/:id` - удалить пользователя
- `GET /users/profile/me` - получить профиль текущего пользователя

### Примеры использования

#### Регистрация пользователя:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Вход в систему:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Использование защищенных эндпоинтов:
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Структура проекта

```
src/
├── config/
│   └── database.config.ts           # Конфигурация базы данных
├── modules/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts         # DTO для входа
│   │   │   └── register.dto.ts      # DTO для регистрации
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts    # JWT guard
│   │   │   └── local-auth.guard.ts  # Local guard
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts      # JWT стратегия
│   │   │   └── local.strategy.ts    # Local стратегия
│   │   ├── auth.controller.ts       # Контроллер аутентификации
│   │   ├── auth.service.ts          # Сервис аутентификации
│   │   └── auth.module.ts           # Модуль аутентификации
│   └── user/
│       ├── dto/
│       │   ├── create-user.dto.ts   # DTO для создания пользователя
│       │   └── update-user.dto.ts   # DTO для обновления пользователя
│       ├── user.entity.ts           # Сущность пользователя
│       ├── user.controller.ts       # Контроллер пользователей
│       ├── user.service.ts          # Сервис пользователей
│       └── user.module.ts           # Модуль пользователей
└── app.module.ts                    # Главный модуль приложения
```

## Безопасность

- Пароли хешируются с помощью bcrypt
- JWT токены имеют срок действия 24 часа
- Все эндпоинты пользователей (кроме создания) защищены JWT аутентификацией
- Валидация данных с помощью class-validator
