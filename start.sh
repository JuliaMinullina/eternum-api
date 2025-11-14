#!/bin/sh

# Запуск миграций в production
echo "🔄 Running migrations..."
npm run migration:run:prod || {
  echo "⚠️  Migration failed, but continuing startup..."
  echo "⚠️  Check logs above for migration errors"
  # Не падаем, если миграция уже выполнена или есть другие проблемы
  # Приложение все равно запустится
}

echo "✅ Migrations completed (or skipped)"
echo "🚀 Starting application..."
exec npm run start:prod
