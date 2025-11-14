import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class SeedAllData1763115396000 implements MigrationInterface {
  name = 'SeedAllData1763115396000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Вставляем метатеги (если их еще нет) - ID будет сгенерирован автоматически
    await queryRunner.query(`
      INSERT INTO "meta_tags" ("MetaTagCode", "MetaTagName", "CreatedAt", "UpdatedAt")
      SELECT v."MetaTagCode", v."MetaTagName", v."CreatedAt", v."UpdatedAt"
      FROM (VALUES
        ('MATH_STATS', 'Математика и статистика', NOW(), NOW()),
        ('CS_AI', 'Компьютерные науки и ИИ', NOW(), NOW()),
        ('ENGINEERING_TECH', 'Инженерия и технологии', NOW(), NOW()),
        ('NATURAL_SCIENCES', 'Естественные науки', NOW(), NOW()),
        ('EARTH_SPACE_ENV', 'Науки о Земле и космосе', NOW(), NOW()),
        ('SOCIAL_SCIENCES', 'Социальные науки', NOW(), NOW()),
        ('HUMANITIES', 'Гуманитарные науки', NOW(), NOW()),
        ('HUMANITIES_HISTORY', 'Гуманитарные науки и история', NOW(), NOW()),
        ('LANGUAGES', 'Языки', NOW(), NOW()),
        ('LITERATURE', 'Литература', NOW(), NOW()),
        ('LANGUAGES_LITERATURE', 'Языки и литература', NOW(), NOW()),
        ('ARTS', 'Искусство', NOW(), NOW()),
        ('HEALTH_SAFETY_PE', 'Здоровье, физкультура и безопасность', NOW(), NOW())
      ) AS v("MetaTagCode", "MetaTagName", "CreatedAt", "UpdatedAt")
      WHERE NOT EXISTS (SELECT 1 FROM "meta_tags" WHERE "MetaTagCode" = v."MetaTagCode")
    `);

    // 2. Вставляем дисциплины (если их еще нет) - UUID нужно явно привести к типу uuid
    await queryRunner.query(`
      INSERT INTO "disciplines" ("DisciplineID", "ID", "DisciplineName", "CreatedAt", "UpdatedAt")
      SELECT v."DisciplineID"::uuid, v."ID", v."DisciplineName", v."CreatedAt"::timestamp, v."UpdatedAt"::timestamp
      FROM (VALUES
        ('6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d', 1, 'Русский язык', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f', 2, 'Литература', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d', 3, 'Математика', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d', 4, 'Физика', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('d5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e', 5, 'Химия', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a', 6, 'Биология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('f7b6d5c4-0a3c-4d9e-8b2f-4c3d5e6f7a8b', 7, 'География', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a8c7e6d5-1b4d-4e0f-9a3c-5d4e6f7a8b9c', 8, 'Мировая история', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b9d8f7e6-2c5e-4f1a-8b4d-6e5f7a8b9c0d', 9, 'Обществознание', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c0e9a8b7-3d6f-4a02-9e5c-7f6a8b9c0d1e', 10, 'Информатика и ИКТ', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('d1f0b9c8-4e7a-4b13-8f6d-8a7b9c0d1e2f', 11, 'Иностранный язык — Английский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('e2a1c0b9-5f8b-4c24-9a7e-9b8c0d1e2f3a', 12, 'Иностранный язык — Немецкий', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('f3b2d1c0-6a9c-4d35-8b8f-0c9d1e2f3a4b', 13, 'Иностранный язык — Французский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a4c3e2d1-7b0d-4e46-9c9a-1d0e2f3a4b5c', 14, 'Технология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b5d4f3e2-8c1e-4f57-8d0b-2e1f3a4b5c6d', 15, 'Изобразительное искусство', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c6e5a4b3-9d2f-4028-9e1c-3f2a4b5c6d7e', 16, 'Музыка', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('d7f6b5c4-0e3a-4139-8f2d-4a3b5c6d7e8f', 17, 'Физическая культура', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('e8a7c6b5-1f4b-4240-9a3e-5b4c6d7e8f9a', 18, 'Основы безопасности жизнедеятельности', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('f9b8d7c6-2a5c-4351-8b4f-6c5d7e8f9a0b', 19, 'Экология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a0c9e8d7-3b6d-4462-9b5a-7d6e8f9a0b1c', 20, 'Астрономия', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b1d0f9e8-4c7e-4573-8a6b-8e7f9a0b1c2d', 21, 'Экономика', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c2e1a0f9-5d8f-4684-9f7c-9f8a0b1c2d3e', 22, 'Право', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c', 23, 'Иностранный язык — Испанский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b4c3d2e1-7f0b-4806-9d1b-1e2f3a4b5c6d', 24, 'Иностранный язык — Китайский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c5d4e3f2-8a1c-4917-0e2c-2f3a4b5c6d7e', 25, 'Иностранный язык — Арабский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('d6e5f4a3-9b2d-5028-1f3d-3a4b5c6d7e8f', 26, 'Мировая художественная культура', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a', 27, 'Культурология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b', 28, 'Философия', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c', 29, 'Общая психология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b0c9d8e7-3f6b-5462-5d7b-7e8f9a0b1c2d', 30, 'Математический анализ', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('6ae0d6b5-5e59-41c6-b507-7e08c9ee156c', 32, 'История России', '2025-08-16 12:00:00', '2025-08-16 12:00:00')
      ) AS v("DisciplineID", "ID", "DisciplineName", "CreatedAt", "UpdatedAt")
      WHERE NOT EXISTS (SELECT 1 FROM "disciplines" WHERE "ID" = v."ID" OR "DisciplineName" = v."DisciplineName")
    `);

    // 3. Создаем связи дисциплин с метатегами (используем ON CONFLICT для избежания дубликатов)
    await queryRunner.query(`
      INSERT INTO "discipline_meta_tags" ("DisciplineID", "MetaTagCode", "CreatedAt")
      SELECT d."DisciplineID", mt."MetaTagCode", NOW()
      FROM "disciplines" d
      CROSS JOIN "meta_tags" mt
      WHERE (d."DisciplineName" = 'Математика' AND mt."MetaTagCode" = 'MATH_STATS')
         OR (d."DisciplineName" = 'Информатика и ИКТ' AND mt."MetaTagCode" = 'CS_AI')
         OR (d."DisciplineName" = 'Технология' AND mt."MetaTagCode" = 'ENGINEERING_TECH')
         OR (d."DisciplineName" = 'Физика' AND mt."MetaTagCode" = 'NATURAL_SCIENCES')
         OR (d."DisciplineName" = 'Химия' AND mt."MetaTagCode" = 'NATURAL_SCIENCES')
         OR (d."DisciplineName" = 'Биология' AND mt."MetaTagCode" = 'NATURAL_SCIENCES')
         OR (d."DisciplineName" = 'География' AND mt."MetaTagCode" = 'EARTH_SPACE_ENV')
         OR (d."DisciplineName" = 'Астрономия' AND mt."MetaTagCode" = 'EARTH_SPACE_ENV')
         OR (d."DisciplineName" = 'Экология' AND mt."MetaTagCode" = 'EARTH_SPACE_ENV')
         OR (d."DisciplineName" = 'Мировая история' AND mt."MetaTagCode" = 'HUMANITIES_HISTORY')
         OR (d."DisciplineName" = 'История России' AND mt."MetaTagCode" = 'HUMANITIES_HISTORY')
         OR (d."DisciplineName" = 'Обществознание' AND mt."MetaTagCode" = 'SOCIAL_SCIENCES')
         OR (d."DisciplineName" = 'Экономика' AND mt."MetaTagCode" = 'SOCIAL_SCIENCES')
         OR (d."DisciplineName" = 'Право' AND mt."MetaTagCode" = 'SOCIAL_SCIENCES')
         OR (d."DisciplineName" = 'Русский язык' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
         OR (d."DisciplineName" = 'Литература' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
         OR (d."DisciplineName" = 'Иностранный язык — Английский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
         OR (d."DisciplineName" = 'Иностранный язык — Немецкий' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
         OR (d."DisciplineName" = 'Иностранный язык — Французский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
         OR (d."DisciplineName" = 'Иностранный язык — Испанский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
         OR (d."DisciplineName" = 'Иностранный язык — Китайский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
         OR (d."DisciplineName" = 'Иностранный язык — Арабский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
         OR (d."DisciplineName" = 'Изобразительное искусство' AND mt."MetaTagCode" = 'ARTS')
         OR (d."DisciplineName" = 'Музыка' AND mt."MetaTagCode" = 'ARTS')
         OR (d."DisciplineName" = 'Мировая художественная культура' AND mt."MetaTagCode" = 'ARTS')
         OR (d."DisciplineName" = 'Физическая культура' AND mt."MetaTagCode" = 'HEALTH_SAFETY_PE')
         OR (d."DisciplineName" = 'Основы безопасности жизнедеятельности' AND mt."MetaTagCode" = 'HEALTH_SAFETY_PE')
         OR (d."DisciplineName" = 'Культурология' AND mt."MetaTagCode" = 'HUMANITIES_HISTORY')
         OR (d."DisciplineName" = 'Философия' AND mt."MetaTagCode" = 'HUMANITIES_HISTORY')
         OR (d."DisciplineName" = 'Общая психология' AND mt."MetaTagCode" = 'SOCIAL_SCIENCES')
         OR (d."DisciplineName" = 'Математический анализ' AND mt."MetaTagCode" = 'MATH_STATS')
      ON CONFLICT ON CONSTRAINT "PK_discipline_meta_tags" DO NOTHING
    `);

    // 4. Вставляем все темы из сгенерированного SQL файла
    // Пытаемся найти файл в разных местах (src и dist)
    // ВАЖНО: Файл ДОЛЖЕН быть найден, иначе миграция упадет с ошибкой
    const possiblePaths = [
      path.join(__dirname, 'topics-insert.sql'),
      path.join(__dirname, '../../src/migrations/topics-insert.sql'),
      path.join(process.cwd(), 'src/migrations/topics-insert.sql'),
      path.join(process.cwd(), 'dist/migrations/topics-insert.sql'),
      path.join(process.cwd(), 'migrations/topics-insert.sql'),
    ];
    
    let topicsSQL: string | null = null;
    let foundPath: string | null = null;
    
    for (const sqlPath of possiblePaths) {
      try {
        if (fs.existsSync(sqlPath)) {
          topicsSQL = fs.readFileSync(sqlPath, 'utf-8');
          foundPath = sqlPath;
          console.log(`✅ Найден файл topics-insert.sql по пути: ${sqlPath}`);
          break;
        }
      } catch (err) {
        // Продолжаем поиск
        continue;
      }
    }

    if (!topicsSQL) {
      const errorMsg = `❌ КРИТИЧЕСКАЯ ОШИБКА: Файл topics-insert.sql не найден ни по одному из путей:\n${possiblePaths.join('\n')}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Выполняем весь SQL файл целиком (он уже содержит ON CONFLICT DO NOTHING)
    // Удаляем комментарии и лишние пробелы
    const cleanedSQL = topicsSQL
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n')
      .trim();
    
    if (!cleanedSQL) {
      throw new Error('❌ SQL файл пуст после очистки комментариев');
    }

    try {
      await queryRunner.query(cleanedSQL);
      console.log('✅ Темы успешно добавлены через миграцию');
    } catch (error) {
      // Игнорируем ошибки дублирования (ON CONFLICT DO NOTHING уже обрабатывает это)
      if (error.message?.includes('duplicate key') || error.message?.includes('already exists')) {
        console.log('ℹ️  Некоторые темы уже существуют (это нормально при повторном запуске миграции)');
      } else {
        console.error(`❌ Ошибка при выполнении SQL тем: ${error.message}`);
        throw error; // Пробрасываем ошибку дальше, если это не дубликат
      }
    }

    // 5. Обновляем последовательности для ID полей (только если они существуют)
    // Проверяем существование последовательностей перед их обновлением
    const sequences = [
      { name: 'meta_tags_ID_seq', table: 'meta_tags' },
      { name: 'discipline_meta_tags_ID_seq', table: 'discipline_meta_tags' },
      { name: 'topics_ID_seq', table: 'topics' },
    ];

    for (const seq of sequences) {
      try {
        // Проверяем существование последовательности
        const exists = await queryRunner.query(`
          SELECT EXISTS (
            SELECT 1 FROM information_schema.sequences 
            WHERE sequence_schema = 'public' AND sequence_name = '${seq.name}'
          ) as exists
        `);

        if (exists[0]?.exists) {
          await queryRunner.query(`
            SELECT setval('"${seq.name}"', COALESCE((SELECT MAX("ID") FROM "${seq.table}"), 1), true)
          `);
        }
      } catch (error) {
        // Игнорируем ошибки при обновлении последовательностей
        console.warn(`⚠️  Не удалось обновить последовательность ${seq.name}: ${error.message}`);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем связи дисциплин с метатегами
    await queryRunner.query(`
      DELETE FROM "discipline_meta_tags" 
      WHERE "DisciplineID" IN (
        SELECT "DisciplineID" FROM "disciplines" 
        WHERE "DisciplineName" IN (
          'Математика', 'Информатика и ИКТ', 'Технология', 'Физика', 'Химия', 'Биология',
          'География', 'Астрономия', 'Экология', 'Мировая история', 'История России',
          'Обществознание', 'Экономика', 'Право', 'Русский язык', 'Литература',
          'Иностранный язык — Английский', 'Иностранный язык — Немецкий',
          'Иностранный язык — Французский', 'Иностранный язык — Испанский',
          'Иностранный язык — Китайский', 'Иностранный язык — Арабский',
          'Изобразительное искусство', 'Музыка', 'Мировая художественная культура',
          'Физическая культура', 'Основы безопасности жизнедеятельности',
          'Культурология', 'Философия', 'Общая психология', 'Математический анализ'
        )
      )
    `);

    // Удаляем дисциплины
    await queryRunner.query(`
      DELETE FROM "disciplines" 
      WHERE "DisciplineName" IN (
        'Русский язык', 'Литература', 'Математика', 'Физика', 'Химия', 'Биология',
        'География', 'Мировая история', 'Обществознание', 'Информатика и ИКТ',
        'Иностранный язык — Английский', 'Иностранный язык — Немецкий',
        'Иностранный язык — Французский', 'Технология', 'Изобразительное искусство',
        'Музыка', 'Физическая культура', 'Основы безопасности жизнедеятельности',
        'Экология', 'Астрономия', 'Экономика', 'Право', 'Иностранный язык — Испанский',
        'Иностранный язык — Китайский', 'Иностранный язык — Арабский',
        'Мировая художественная культура', 'Культурология', 'Философия',
        'Общая психология', 'Математический анализ', 'История России'
      )
    `);

    // Удаляем метатеги
    await queryRunner.query(`
      DELETE FROM "meta_tags" 
      WHERE "MetaTagCode" IN (
        'MATH_STATS', 'CS_AI', 'ENGINEERING_TECH', 'NATURAL_SCIENCES',
        'EARTH_SPACE_ENV', 'SOCIAL_SCIENCES', 'HUMANITIES', 'HUMANITIES_HISTORY',
        'LANGUAGES', 'LITERATURE', 'LANGUAGES_LITERATURE', 'ARTS', 'HEALTH_SAFETY_PE'
      )
    `);
  }
}

