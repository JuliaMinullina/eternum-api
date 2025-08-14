# Настройка переменных окружения

## Создание файла .env

Создайте файл `.env` в корне проекта со следующим содержимым:

```env
# Database Configuration (Docker)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=nestjs_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development

# Docker specific settings
DOCKER_ENV=true
```

## Переменные для продакшена

Для продакшена используйте следующие настройки:

```env
# Database Configuration (Production)
DB_HOST=your-production-host
DB_PORT=5432
DB_USERNAME=your-production-user
DB_PASSWORD=your-secure-password
DB_NAME=your-production-db

# JWT Configuration
JWT_SECRET=your-very-secure-jwt-secret-key

# Environment
NODE_ENV=production

# SSL Configuration
DB_SSL=true
```

## Переменные для разных окружений

### Разработка (Development)
```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
```

### Тестирование (Testing)
```env
NODE_ENV=test
DB_HOST=localhost
DB_PORT=5433
DB_NAME=nestjs_test_db
```

### Продакшен (Production)
```env
NODE_ENV=production
DB_HOST=your-db-host
DB_PORT=5432
DB_SSL=true
```

## Безопасность

### Важные моменты:
1. **Никогда не коммитьте файл `.env` в Git**
2. **Используйте разные JWT_SECRET для разных окружений**
3. **В продакшене используйте сильные пароли**
4. **Включите SSL для продакшена**

### Пример .gitignore:
```
.env
.env.local
.env.production
.env.test
```

## Проверка настроек

После создания файла `.env` проверьте настройки:

```bash
# Проверить статус проекта
make status

# Проверить подключение к БД
make db-connect

# Запустить приложение
make dev
```
