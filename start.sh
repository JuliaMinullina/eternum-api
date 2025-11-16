#!/bin/sh

# Запуск миграций
# echo "Running migrations..."
# npm run migration:run:prod

echo "Starting application..."
exec npm run start:prod
