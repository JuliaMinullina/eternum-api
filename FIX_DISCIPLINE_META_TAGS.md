# Исправление ошибки: таблица discipline_meta_tags не существует

## Проблема

На production при запросе `/disciplines/with-meta-tags` возникает ошибка:
```
relation "discipline_meta_tags" does not exist
```

## Причина

Таблица `discipline_meta_tags` не была создана на production, потому что:
1. Миграция `InitialMigration` пропускается, если уже существует таблица `users`
2. Миграция `CorrectInitialMigration` полностью пропускается в production

## Решение

Создана новая миграция `1763137000000-CreateDisciplineMetaTagsIfNotExists.ts`, которая:
- ✅ Безопасно проверяет существование таблицы
- ✅ Создает таблицу только если её нет
- ✅ Добавляет все необходимые поля и ограничения
- ✅ Идемпотентна (можно запускать несколько раз)

## Применение миграции на production

### Вариант 1: Автоматическое применение (рекомендуется)

Миграция будет применена автоматически при следующем деплое, так как:
- В `database.config.ts` установлено `migrationsRun: true`
- В `start.sh` есть команда `npm run migration:run`

**Действия:**
1. Закоммитьте новую миграцию в git
2. Запушьте изменения в репозиторий
3. Дождитесь автоматического деплоя через CapRover
4. Проверьте логи приложения на наличие ошибок миграции

### Вариант 2: Ручное применение через CapRover

Если нужно применить миграцию немедленно:

1. **Подключитесь к контейнеру приложения в CapRover:**
   ```bash
   # Через CapRover Dashboard -> App -> One-Click Actions -> Enable Terminal
   # Или через SSH на сервере
   docker exec -it <container-name> sh
   ```

2. **Запустите миграцию вручную:**
   ```bash
   cd /app
   npm run migration:run
   ```

3. **Проверьте результат:**
   ```bash
   # Проверьте статус миграций
   npm run typeorm migration:show
   ```

### Вариант 3: Прямое подключение к базе данных

Если у вас есть прямой доступ к PostgreSQL:

```sql
-- Проверьте существование таблицы
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'discipline_meta_tags';

-- Если таблицы нет, создайте её вручную:
CREATE TABLE IF NOT EXISTS "discipline_meta_tags" (
  "DisciplineID" uuid NOT NULL,
  "MetaTagCode" character varying(50) NOT NULL,
  "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PK_discipline_meta_tags" PRIMARY KEY ("DisciplineID", "MetaTagCode")
);

-- Добавьте поле ID, если его нет
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'discipline_meta_tags' 
    AND column_name = 'ID'
  ) THEN
    ALTER TABLE "discipline_meta_tags" ADD "ID" SERIAL NOT NULL;
    ALTER TABLE "discipline_meta_tags" ADD CONSTRAINT "UQ_discipline_meta_tags_ID" UNIQUE ("ID");
  END IF;
END $$;

-- Добавьте внешние ключи
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_schema = 'public' 
    AND table_name = 'discipline_meta_tags' 
    AND constraint_name = 'FK_discipline_meta_tags_discipline'
  ) THEN
    ALTER TABLE "discipline_meta_tags" 
    ADD CONSTRAINT "FK_discipline_meta_tags_discipline" 
    FOREIGN KEY ("DisciplineID") 
    REFERENCES "disciplines"("DisciplineID") 
    ON DELETE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_schema = 'public' 
    AND table_name = 'discipline_meta_tags' 
    AND constraint_name = 'FK_discipline_meta_tags_meta_tag'
  ) THEN
    ALTER TABLE "discipline_meta_tags" 
    ADD CONSTRAINT "FK_discipline_meta_tags_meta_tag" 
    FOREIGN KEY ("MetaTagCode") 
    REFERENCES "meta_tags"("MetaTagCode") 
    ON DELETE CASCADE;
  END IF;
END $$;
```

## Проверка после применения

1. **Проверьте, что таблица создана:**
   ```sql
   SELECT * FROM information_schema.tables 
   WHERE table_name = 'discipline_meta_tags';
   ```

2. **Проверьте структуру таблицы:**
   ```sql
   \d discipline_meta_tags
   ```

3. **Проверьте API:**
   ```bash
   curl https://et-api.mdbotdev.ru/disciplines/with-meta-tags
   ```

## Откат (если что-то пошло не так)

Если нужно откатить миграцию:

```bash
# В контейнере приложения
npm run migration:revert
```

Или вручную через SQL:
```sql
DROP TABLE IF EXISTS "discipline_meta_tags";
```

## Дополнительная информация

- Файл миграции: `src/migrations/1763137000000-CreateDisciplineMetaTagsIfNotExists.ts`
- Entity файл: `src/entities/discipline-meta-tag.entity.ts`
- Документация по миграциям: `MIGRATIONS.md`


