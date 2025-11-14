# Используем официальный Node.js образ
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости (включая devDependencies для сборки)
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# ВАЖНО: После сборки копируем SQL файл в dist/migrations/ чтобы он был доступен при выполнении миграций
RUN mkdir -p dist/migrations && cp src/migrations/topics-insert.sql dist/migrations/topics-insert.sql || (echo "⚠️  Файл topics-insert.sql не найден, но продолжаем сборку" && exit 0)

# Удаляем devDependencies для уменьшения размера образа
RUN npm prune --production

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Меняем владельца файлов
RUN chown -R nestjs:nodejs /app
USER nestjs

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start:prod"]
