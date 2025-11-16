#!/bin/sh

# Запуск миграций
echo "Running migrations..."
npm run migration:run

echo "Starting application..."
exec npm run start:prod
