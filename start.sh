#!/bin/sh

# Запуск миграций
echo "=========================================="
echo "🔄 Running migrations..."
echo "=========================================="
npm run migration:run:prod:node || {
  echo "⚠️  Migration script failed, trying alternative method..."
  npm run migration:run:prod || {
    echo "❌ All migration methods failed, but continuing..."
  }
}

echo ""
echo "=========================================="
echo "🚀 Starting application..."
echo "=========================================="
exec npm run start:prod
