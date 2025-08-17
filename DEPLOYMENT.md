# Деплой приложения через CapRover

## Подготовка к деплою

### 1. Настройка CapRover

1. Установите CapRover на ваш сервер
2. Создайте новое приложение в CapRover Dashboard
3. Настройте домен для приложения

### 2. Настройка GitHub Secrets

Добавьте следующие секреты в настройках вашего GitHub репозитория:

- `CAPROVER_WEBHOOK_URL` - URL вебхука CapRover (например: `https://captain.yourdomain.com/api/v2/user/apps/your-app-name/webhook`)

### 3. Настройка переменных окружения

В CapRover Dashboard добавьте следующие переменные окружения:

```bash
NODE_ENV=production
PORT=3000
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://yourdomain.com
```

### 4. Настройка базы данных

#### Вариант 1: Внешняя база данных
- Используйте внешний PostgreSQL сервер
- Укажите его параметры в переменных окружения

#### Вариант 2: База данных в CapRover
- Создайте отдельное приложение для PostgreSQL в CapRover
- Используйте `one-click-apps` для PostgreSQL
- Настройте переменные окружения для подключения

### 5. Настройка SSL

В CapRover Dashboard:
1. Перейдите в настройки приложения
2. Включите SSL
3. Настройте Let's Encrypt для автоматического получения сертификатов

## Процесс деплоя

### Автоматический деплой через GitHub Actions

1. При пуше в ветку `main` или `master` автоматически запускается GitHub Actions
2. Выполняются тесты и сборка приложения
3. Отправляется запрос на вебхук CapRover
4. CapRover автоматически деплоит новую версию

### Ручной деплой

```bash
# Клонируйте репозиторий на сервер
git clone https://github.com/your-username/your-repo.git

# Перейдите в директорию проекта
cd your-repo

# Создайте .env файл с production переменными
cp env.example .env
# Отредактируйте .env файл

# Запустите деплой через CapRover CLI
caprover deploy
```

## Мониторинг и логи

### Просмотр логов в CapRover

1. Откройте CapRover Dashboard
2. Перейдите в ваше приложение
3. Нажмите "App Logs" для просмотра логов

### Проверка статуса приложения

```bash
# Через CapRover CLI
caprover app status

# Или через API
curl -X GET https://captain.yourdomain.com/api/v2/user/apps/your-app-name
```

## Troubleshooting

### Проблемы с подключением к базе данных

1. Проверьте переменные окружения в CapRover
2. Убедитесь, что база данных доступна
3. Проверьте настройки SSL для базы данных

### Проблемы с CORS

1. Обновите `CORS_ORIGIN` в переменных окружения
2. Убедитесь, что фронтенд домен добавлен в список разрешенных

### Проблемы с JWT

1. Проверьте, что `JWT_SECRET` и `JWT_REFRESH_SECRET` установлены
2. Убедитесь, что секреты достаточно длинные и безопасные

## Безопасность

### Рекомендации по безопасности

1. Используйте сильные пароли для базы данных
2. Генерируйте криптографически стойкие JWT секреты
3. Ограничьте доступ к CapRover Dashboard
4. Регулярно обновляйте зависимости
5. Используйте HTTPS для всех соединений

### Генерация JWT секретов

```bash
# Генерация JWT секрета
openssl rand -base64 64

# Генерация refresh JWT секрета
openssl rand -base64 64
```
