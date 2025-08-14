# Настройка Docker с PostgreSQL

## Быстрый старт с Makefile

### 1. Создайте файл .env в корне проекта:

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
```

### 2. Полная настройка одной командой:

```bash
make setup
```

Эта команда:
- Установит npm зависимости
- Запустит Docker контейнеры
- Покажет информацию о доступных сервисах

### 3. Запуск в режиме разработки:

```bash
make dev
```

## Команды Makefile

### Основные команды:
```bash
make help          # Показать справку по всем командам
make setup         # Полная настройка проекта
make dev           # Запуск в режиме разработки
make start         # Запуск в продакшн режиме
make stop          # Остановка приложения и контейнеров
make restart       # Перезапуск
```

### Управление Docker:
```bash
make up            # Запустить только Docker контейнеры
make down          # Остановить Docker контейнеры
make logs          # Показать логи контейнеров
make ps            # Показать статус контейнеров
```

### База данных:
```bash
make db-connect    # Подключиться к PostgreSQL
make db-reset      # Сбросить базу данных
```

### Разработка:
```bash
make build         # Собрать приложение
make test          # Запустить тесты
make clean         # Очистить node_modules и Docker данные
```

### Мониторинг:
```bash
make status        # Показать статус проекта
make debug         # Показать версии всех компонентов
```

## Ручной запуск (без Makefile)

### Запуск PostgreSQL и pgAdmin:
```bash
# Запуск PostgreSQL и pgAdmin
docker-compose up -d

# Проверка статуса контейнеров
docker-compose ps

# Просмотр логов
docker-compose logs postgres
```

### Запуск приложения:
```bash
npm run start:dev
```

## Доступ к сервисам

### PostgreSQL
- **Хост**: localhost
- **Порт**: 5432
- **База данных**: nestjs_db
- **Пользователь**: postgres
- **Пароль**: password

### pgAdmin (веб-интерфейс для управления БД)
- **URL**: http://localhost:5050
- **Email**: admin@admin.com
- **Пароль**: admin

## Полезные команды

```bash
# Остановить контейнеры
docker-compose down

# Остановить и удалить данные
docker-compose down -v

# Перезапустить контейнеры
docker-compose restart

# Подключиться к PostgreSQL через psql
docker exec -it nestjs_postgres psql -U postgres -d nestjs_db

# Просмотр логов
docker-compose logs -f postgres
```

## Структура проекта

```
project-name/
├── Makefile                # Команды для управления проектом
├── docker-compose.yml      # Конфигурация Docker
├── init.sql               # Инициализация БД
├── .env                   # Переменные окружения (создать самостоятельно)
├── DOCKER_SETUP.md        # Эта инструкция
└── src/                   # Код приложения
```

## Устранение проблем

### Если порт 5432 занят:
Измените порт в `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Внешний порт 5433
```

И обновите `.env`:
```env
DB_PORT=5433
```

### Если контейнер не запускается:
```bash
# Проверьте логи
make logs

# Или
docker-compose logs postgres

# Удалите и пересоздайте контейнеры
make clean
make setup
```

### Подключение к базе данных из приложения:
Убедитесь, что в `.env` указаны правильные настройки:
- `DB_HOST=localhost` (или IP Docker контейнера)
- `DB_PORT=5432` (или измененный порт)
- `DB_USERNAME=postgres`
- `DB_PASSWORD=password`
- `DB_NAME=nestjs_db`
