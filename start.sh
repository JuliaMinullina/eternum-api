#!/bin/sh

# Запуск миграций
echo "Running migrations..."
npm run migration:run || {
  echo "⚠️  Migration failed, but continuing startup..."
  # Не падаем, если миграция уже выполнена или есть другие проблемы
  # Приложение все равно запустится
}

echo "Starting application..."
exec npm run start:prod
