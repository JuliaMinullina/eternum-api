# Исправления проблем с деплоем

## 🐛 Проблемы и их решения

### 1. Проблема с версией Node.js
**Ошибка:** `Unsupported engine` для NestJS 11
**Решение:** Обновили Dockerfile с Node.js 18 на Node.js 20

### 2. Проблема с установкой зависимостей
**Ошибка:** `nest: not found` при сборке
**Решение:** Установка всех зависимостей (включая devDependencies) для сборки

### 3. Проблема с правами на файл start.sh
**Ошибка:** `chmod: /app/start.sh: Operation not permitted`
**Решение:** Изменили порядок операций в Dockerfile

## 🔧 Исправления в Dockerfile.prod

### До исправления:
```dockerfile
# Неправильный порядок
USER nestjs
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh  # ❌ Ошибка прав
```

### После исправления:
```dockerfile
# Правильный порядок
COPY start.sh /app/start.sh
RUN chown -R nestjs:nodejs /app
RUN chmod +x /app/start.sh  # ✅ Успешно
USER nestjs
```

## 📋 Финальная конфигурация

### Dockerfile.prod
```dockerfile
# Multi-stage build для оптимизации размера образа
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем собранное приложение из builder stage
COPY --from=builder /app/dist ./dist

# Копируем скрипт запуска
COPY start.sh /app/start.sh

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Меняем владельца файлов и права
RUN chown -R nestjs:nodejs /app
RUN chmod +x /app/start.sh
USER nestjs

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["/app/start.sh"]
```

### start.sh
```bash
#!/bin/sh

# Запуск миграций
echo "Running migrations..."
npm run migration:run

echo "Starting application..."
exec npm run start:prod
```

## ✅ Проверка готовности

### Локальная проверка
```bash
# Проверка прав на файл
ls -la start.sh

# Сборка образа
docker build -f Dockerfile.prod -t test-app .

# Запуск контейнера
docker run -p 3000:3000 test-app
```

### Проверка в CapRover
1. Убедитесь, что все переменные окружения установлены
2. Проверьте логи приложения на наличие ошибок
3. Убедитесь, что миграции выполняются успешно

## 🚀 Процесс деплоя

### 1. Подготовка
```bash
# Убедитесь, что все файлы закоммичены
git add .
git commit -m "Fix deployment issues: Node.js 20, proper file permissions"
git push origin main
```

### 2. Автоматический деплой
- GitHub Actions запускается при пуше в main
- CapRover получает webhook
- Собирается Docker образ
- Запускаются миграции
- Запускается приложение

### 3. Проверка
- Проверьте логи в CapRover Dashboard
- Убедитесь, что приложение отвечает
- Проверьте, что миграции выполнились

## 🛡️ Безопасность

### Преимущества исправлений
- ✅ Использование актуальной версии Node.js
- ✅ Правильные права доступа к файлам
- ✅ Безопасный пользователь в контейнере
- ✅ Автоматические миграции
- ✅ Оптимизированный размер образа

### Рекомендации
- Регулярно обновляйте зависимости
- Мониторьте логи приложения
- Делайте бэкапы базы данных перед миграциями
- Тестируйте изменения на staging окружении

## 🎉 Результат

Теперь деплой должен проходить успешно без ошибок:
- ✅ Сборка Docker образа
- ✅ Запуск миграций
- ✅ Запуск приложения
- ✅ Правильные права доступа
