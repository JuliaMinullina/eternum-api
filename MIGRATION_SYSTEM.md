# Система миграций базы данных

## 🎯 Обзор

Система настроена для **безопасного управления схемой базы данных** через миграции. Синхронизация полностью отключена.

## ⚙️ Конфигурация

### Основные настройки
```typescript
// src/config/database.config.ts
export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  // ... другие настройки
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true, // Всегда запускать миграции
  synchronize: false, // Синхронизация отключена
});
```

### TypeORM CLI конфигурация
```typescript
// src/config/typeorm.config.ts
export default new DataSource({
  // ... настройки подключения
  entities: [
    __dirname + '/../modules/**/*.entity{.ts,.js}',
    __dirname + '/../entities/*.entity{.ts,.js}'
  ],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false, // Всегда отключаем синхронизацию
});
```

## 📋 Команды

### Основные команды миграций
```bash
# Генерация новой миграции
npm run migration:create

# Запуск всех миграций
npm run migration:run

# Откат последней миграции
npm run migration:revert

# Показать статус миграций
npm run typeorm migration:show
```

### Управление базой данных
```bash
# Полный сброс базы данных
npm run db:reset

# Запуск сидов данных
npm run seed:disciplines
```

## 🔄 Рабочий процесс

### 1. Разработка новых функций
```bash
# 1. Измените entity файлы
# 2. Сгенерируйте миграцию
npm run migration:create

# 3. Проверьте сгенерированный SQL
# 4. Протестируйте миграцию
npm run migration:run

# 5. Закоммитьте изменения
git add .
git commit -m "Add new field to user table"
```

### 2. Production деплой
```bash
# Миграции запускаются автоматически при старте приложения
# Проверьте логи на наличие ошибок миграции
```

## 🚀 Автоматический запуск

### В Docker контейнере
```bash
# start.sh
#!/bin/sh
echo "Running migrations..."
npm run migration:run
echo "Starting application..."
exec npm run start:prod
```

### В CapRover
- Миграции запускаются автоматически при каждом деплое
- Проверьте логи приложения в CapRover Dashboard

## 🛡️ Безопасность

### Преимущества системы миграций
- ✅ **Безопасность данных** - нет риска потери данных
- ✅ **Контроль изменений** - все изменения документированы
- ✅ **Откат изменений** - возможность вернуться к предыдущему состоянию
- ✅ **Версионность** - история изменений схемы
- ✅ **Команда** - все разработчики видят изменения

### Что отключено
- ❌ `synchronize: true` - автоматическая синхронизация
- ❌ Автоматическое создание/удаление таблиц
- ❌ Непредсказуемые изменения схемы

## 📁 Структура файлов

```
src/
├── config/
│   ├── database.config.ts      # Конфигурация для приложения
│   └── typeorm.config.ts       # Конфигурация для CLI
├── migrations/
│   ├── 1700000000000-InitialMigration.ts
│   └── ...                     # Другие миграции
├── modules/
│   └── */entity.ts             # Entity файлы
└── entities/
    └── *.entity.ts             # Дополнительные entity
```

## 🐛 Troubleshooting

### Ошибка "relation already exists"
```bash
# Сбросите базу данных
npm run db:reset

# Запустите миграции заново
npm run migration:run
```

### Ошибка подключения к БД
```bash
# Проверьте переменные окружения
echo $DB_HOST $DB_PORT $DB_USERNAME $DB_NAME

# Проверьте доступность БД
psql -h $DB_HOST -U $DB_USERNAME -d $DB_NAME
```

### Миграция не применяется
```bash
# Проверьте статус миграций
npm run typeorm migration:show

# Принудительно запустите миграции
npm run migration:run
```

## 📊 Мониторинг

### Логи миграций
```bash
# В production
docker logs your-app-container | grep migration

# Локально
npm run migration:run
```

### Проверка состояния БД
```sql
-- Проверка таблиц
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Проверка миграций
SELECT * FROM migrations ORDER BY timestamp DESC;
```

## 🔧 Полезные команды

### Создание новой миграции
```bash
# Автоматическая генерация
npm run migration:create

# Ручная генерация
npm run migration:generate src/migrations/AddNewFeature
```

### Отладка миграций
```bash
# Показать SQL без выполнения
npm run typeorm migration:generate -- -d src/config/typeorm.config.ts --dry-run

# Проверить статус
npm run typeorm migration:show -- -d src/config/typeorm.config.ts
```

## 📝 Примеры миграций

### Добавление поля
```typescript
export class AddUserPhone1700000001000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }
}
```

### Создание индекса
```typescript
export class AddUserEmailIndex1700000002000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_user_email" ON "user" ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_user_email"`);
    }
}
```

## 🎉 Готово к production!

Система настроена для безопасного деплоя в production с автоматическим управлением схемой базы данных через миграции.
