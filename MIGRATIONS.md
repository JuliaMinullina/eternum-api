# Миграции базы данных

## 🚨 Важно для Production

В production окружении **НЕ используйте** `synchronize: true`! Это может привести к потере данных.

## 📋 Команды для работы с миграциями

### Генерация миграции
```bash
# Автоматическая генерация на основе изменений в сущностях
npm run migration:create

# Ручная генерация с указанием имени
npm run migration:generate src/migrations/AddNewField
```

### Запуск миграций
```bash
# Запуск всех невыполненных миграций
npm run migration:run

# Откат последней миграции
npm run migration:revert
```

## 🔄 Процесс работы с миграциями

### 1. Разработка
1. Внесите изменения в entity файлы
2. Сгенерируйте миграцию: `npm run migration:create`
3. Проверьте сгенерированный SQL код
4. Протестируйте миграцию локально: `npm run migration:run`
5. Закоммитьте миграцию в git

### 2. Production деплой
1. При деплое миграции запускаются автоматически
2. Проверьте логи приложения на наличие ошибок миграции
3. При необходимости откатите миграцию: `npm run migration:revert`

## 📁 Структура миграций

```
src/migrations/
├── 1700000000000-InitialMigration.ts    # Первая миграция
├── 1700000001000-AddNewField.ts         # Последующие миграции
└── ...
```

## 🔧 Настройка миграций

### В database.config.ts
```typescript
export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  // ... другие настройки
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: configService.get('NODE_ENV') === 'production', // Автоматический запуск в production
  synchronize: configService.get('NODE_ENV') !== 'production', // Только для разработки
});
```

### В Dockerfile.prod
```dockerfile
# Автоматический запуск миграций при старте приложения
CMD ["/app/start.sh"]
```

## ⚠️ Важные моменты

### 1. Безопасность
- Всегда проверяйте SQL код перед выполнением
- Делайте бэкап базы данных перед миграциями
- Тестируйте миграции на staging окружении

### 2. Производительность
- Большие миграции могут заблокировать таблицы
- Используйте индексы для ускорения запросов
- Разбивайте большие миграции на несколько

### 3. Совместимость
- Миграции должны быть идемпотентными
- Всегда проверяйте обратную совместимость
- Документируйте изменения схемы

## 🐛 Troubleshooting

### Ошибка "Migration already exists"
```bash
# Удалите дублирующиеся миграции
rm src/migrations/duplicate-migration.ts
```

### Ошибка подключения к БД
```bash
# Проверьте переменные окружения
echo $DB_HOST $DB_PORT $DB_USERNAME $DB_NAME
```

### Откат миграции
```bash
# Откатите последнюю миграцию
npm run migration:revert

# Проверьте статус миграций
npm run typeorm migration:show
```

## 📊 Мониторинг миграций

### Проверка статуса
```bash
# Показать все миграции и их статус
npm run typeorm migration:show
```

### Логи миграций
```bash
# В production проверьте логи приложения
docker logs your-app-container
```

## 🔄 Примеры миграций

### Добавление нового поля
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
