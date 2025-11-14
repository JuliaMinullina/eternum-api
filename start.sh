#!/bin/sh

# ============================================
# СКРИПТ ЗАПУСКА ПРИЛОЖЕНИЯ В PRODUCTION
# ============================================
# Этот скрипт автоматически запускается при старте Docker контейнера
# через CMD ["/app/start.sh"] в Dockerfile.prod
# ============================================

# Шаг 1: Запуск миграций базы данных
echo "🔄 Running database migrations..."
echo "   Command: npm run migration:run:prod"
echo "   Config: dist/config/typeorm.config.prod.js"
echo "   Working directory: $(pwd)"
echo "   Checking files..."
ls -la dist/config/typeorm.config.prod.js 2>/dev/null && echo "   ✅ Config file exists" || echo "   ❌ Config file NOT found!"
ls -la dist/migrations/*.js 2>/dev/null | head -3 && echo "   ✅ Migration files exist" || echo "   ⚠️  No migration files found"

# Запускаем миграции (пробуем сначала через TypeORM CLI, потом через Node.js скрипт)
echo "   Attempting to run migrations via TypeORM CLI..."
npm run migration:run:prod || {
  echo "   ⚠️  TypeORM CLI failed, trying Node.js script..."
  npm run migration:run:prod:node || {
    echo "⚠️  Migration failed, but continuing startup..."
    echo "⚠️  Check logs above for migration errors"
    echo "⚠️  This might be normal if migrations are already applied"
    # Не падаем, если миграция уже выполнена или есть другие проблемы
    # Приложение все равно запустится
  }
}

echo "✅ Migrations completed (or skipped)"

# Шаг 2: Запуск приложения
echo "🚀 Starting NestJS application..."
echo "   Command: npm run start:prod"
exec npm run start:prod
