#!/bin/sh

# Запуск миграций
echo "=========================================="
echo "🔄 Running migrations..."
echo "=========================================="
set +e  # Не останавливаться при ошибках
npm run migration:run:prod:node 2>&1 || {
  echo "⚠️  Migration script failed, trying alternative method..."
  npm run migration:run:prod 2>&1 || {
    echo "❌ All migration methods failed, but continuing to start application..."
  }
}
set -e  # Включаем остановку при ошибках обратно

echo ""
echo "=========================================="
echo "🚀 Starting application..."
echo "=========================================="
exec npm run start:prod
