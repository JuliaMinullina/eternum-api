import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixMetaTagsForAllDisciplines1763482000000
  implements MigrationInterface
{
  name = 'FixMetaTagsForAllDisciplines1763482000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Удаляем дублирующую дисциплину "Право" без тем (ID 23)
    await queryRunner.query(`
      DELETE FROM "discipline_meta_tags"
      WHERE "DisciplineID" IN (
        SELECT "DisciplineID" FROM "disciplines"
        WHERE "DisciplineName" = 'Право' 
        AND "ID" = 23
        AND NOT EXISTS (
          SELECT 1 FROM "topics" t 
          WHERE t."DisciplineID" = "disciplines"."DisciplineID"
        )
      )
    `);
    
    await queryRunner.query(`
      DELETE FROM "disciplines"
      WHERE "DisciplineName" = 'Право' 
      AND "ID" = 23
      AND NOT EXISTS (
        SELECT 1 FROM "topics" t 
        WHERE t."DisciplineID" = "disciplines"."DisciplineID"
      )
    `);

    // Добавляем метатеги для всех дисциплин
    // Проверяем только отсутствие конкретного метатега
    await queryRunner.query(`
      INSERT INTO "discipline_meta_tags" ("DisciplineID", "MetaTagCode", "CreatedAt")
      SELECT d."DisciplineID", mt."MetaTagCode", NOW()
      FROM "disciplines" d
      CROSS JOIN "meta_tags" mt
      WHERE 
        -- Проверяем, что у дисциплины нет этого конкретного метатега
        NOT EXISTS (
          SELECT 1 FROM "discipline_meta_tags" dmt 
          WHERE dmt."DisciplineID" = d."DisciplineID"
          AND dmt."MetaTagCode" = mt."MetaTagCode"
        )
        AND (
          -- Русский язык -> LANGUAGES_LITERATURE
          (d."DisciplineName" = 'Русский язык' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
          OR
          -- Литература -> LANGUAGES_LITERATURE
          (d."DisciplineName" = 'Литература' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
          OR
          -- Математика -> MATH_STATS
          (d."DisciplineName" = 'Математика' AND mt."MetaTagCode" = 'MATH_STATS')
          OR
          -- Физика -> NATURAL_SCIENCES
          (d."DisciplineName" = 'Физика' AND mt."MetaTagCode" = 'NATURAL_SCIENCES')
          OR
          -- Химия -> NATURAL_SCIENCES
          (d."DisciplineName" = 'Химия' AND mt."MetaTagCode" = 'NATURAL_SCIENCES')
          OR
          -- Биология -> NATURAL_SCIENCES
          (d."DisciplineName" = 'Биология' AND mt."MetaTagCode" = 'NATURAL_SCIENCES')
          OR
          -- География -> EARTH_SPACE_ENV
          (d."DisciplineName" = 'География' AND mt."MetaTagCode" = 'EARTH_SPACE_ENV')
          OR
          -- История -> HUMANITIES_HISTORY
          (d."DisciplineName" = 'История' AND mt."MetaTagCode" = 'HUMANITIES_HISTORY')
          OR
          -- Обществознание -> SOCIAL_SCIENCES
          (d."DisciplineName" = 'Обществознание' AND mt."MetaTagCode" = 'SOCIAL_SCIENCES')
          OR
          -- Информатика и ИКТ -> CS_AI
          (d."DisciplineName" = 'Информатика и ИКТ' AND mt."MetaTagCode" = 'CS_AI')
          OR
          -- Иностранный язык — Английский -> LANGUAGES_LITERATURE
          (d."DisciplineName" = 'Иностранный язык — Английский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
          OR
          -- Иностранный язык — Немецкий -> LANGUAGES_LITERATURE
          (d."DisciplineName" = 'Иностранный язык — Немецкий' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
          OR
          -- Иностранный язык — Французский -> LANGUAGES_LITERATURE
          (d."DisciplineName" = 'Иностранный язык — Французский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
          OR
          -- Иностранный язык — Китайский -> LANGUAGES_LITERATURE
          (d."DisciplineName" = 'Иностранный язык — Китайский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
          OR
          -- Иностранный язык — Арабский -> LANGUAGES_LITERATURE
          (d."DisciplineName" = 'Иностранный язык — Арабский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
          OR
          -- Технология -> ENGINEERING_TECH
          (d."DisciplineName" = 'Технология' AND mt."MetaTagCode" = 'ENGINEERING_TECH')
          OR
          -- Изобразительное искусство -> ARTS
          (d."DisciplineName" = 'Изобразительное искусство' AND mt."MetaTagCode" = 'ARTS')
          OR
          -- Музыка -> ARTS
          (d."DisciplineName" = 'Музыка' AND mt."MetaTagCode" = 'ARTS')
          OR
          -- Физическая культура -> HEALTH_SAFETY_PE
          (d."DisciplineName" = 'Физическая культура' AND mt."MetaTagCode" = 'HEALTH_SAFETY_PE')
          OR
          -- Основы безопасности жизнедеятельности -> HEALTH_SAFETY_PE
          (d."DisciplineName" = 'Основы безопасности жизнедеятельности' AND mt."MetaTagCode" = 'HEALTH_SAFETY_PE')
          OR
          -- Экология -> EARTH_SPACE_ENV
          (d."DisciplineName" = 'Экология' AND mt."MetaTagCode" = 'EARTH_SPACE_ENV')
          OR
          -- Астрономия -> EARTH_SPACE_ENV
          (d."DisciplineName" = 'Астрономия' AND mt."MetaTagCode" = 'EARTH_SPACE_ENV')
          OR
          -- Экономика -> SOCIAL_SCIENCES
          (d."DisciplineName" = 'Экономика' AND mt."MetaTagCode" = 'SOCIAL_SCIENCES')
          OR
          -- Право (с темами, ID 22) -> SOCIAL_SCIENCES
          (d."DisciplineName" = 'Право' AND d."ID" = 22 AND mt."MetaTagCode" = 'SOCIAL_SCIENCES')
          OR
          -- Мировая художественная культура -> ARTS
          (d."DisciplineName" = 'Мировая художественная культура' AND mt."MetaTagCode" = 'ARTS')
          OR
          -- Мировая художественная культура -> HUMANITIES_HISTORY
          (d."DisciplineName" = 'Мировая художественная культура' AND mt."MetaTagCode" = 'HUMANITIES_HISTORY')
          OR
          -- Культурология -> HUMANITIES_HISTORY
          (d."DisciplineName" = 'Культурология' AND mt."MetaTagCode" = 'HUMANITIES_HISTORY')
          OR
          -- Культурология -> ARTS
          (d."DisciplineName" = 'Культурология' AND mt."MetaTagCode" = 'ARTS')
          OR
          -- Философия -> HUMANITIES_HISTORY
          (d."DisciplineName" = 'Философия' AND mt."MetaTagCode" = 'HUMANITIES_HISTORY')
          OR
          -- Общая психология -> SOCIAL_SCIENCES
          (d."DisciplineName" = 'Общая психология' AND mt."MetaTagCode" = 'SOCIAL_SCIENCES')
          OR
          -- Математический анализ -> MATH_STATS
          (d."DisciplineName" = 'Математический анализ' AND mt."MetaTagCode" = 'MATH_STATS')
          OR
          -- История России -> HUMANITIES_HISTORY
          (d."DisciplineName" = 'История России' AND mt."MetaTagCode" = 'HUMANITIES_HISTORY')
        )
      ON CONFLICT ("DisciplineID", "MetaTagCode") DO NOTHING
    `);

    // Обновляем последовательность для ID в discipline_meta_tags
    await queryRunner.query(`
      SELECT setval('"discipline_meta_tags_ID_seq"', 
        COALESCE((SELECT MAX("ID") FROM "discipline_meta_tags"), 1), true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем метатеги, добавленные этой миграцией
    await queryRunner.query(`
      DELETE FROM "discipline_meta_tags" dmt
      USING "disciplines" d
      WHERE dmt."DisciplineID" = d."DisciplineID"
        AND d."DisciplineName" IN (
          'Русский язык',
          'Литература',
          'Математика',
          'Физика',
          'Химия',
          'Биология',
          'География',
          'История',
          'Обществознание',
          'Информатика и ИКТ',
          'Иностранный язык — Английский',
          'Иностранный язык — Немецкий',
          'Иностранный язык — Французский',
          'Иностранный язык — Китайский',
          'Иностранный язык — Арабский',
          'Технология',
          'Изобразительное искусство',
          'Музыка',
          'Физическая культура',
          'Основы безопасности жизнедеятельности',
          'Экология',
          'Астрономия',
          'Экономика',
          'Мировая художественная культура',
          'Культурология',
          'Философия',
          'Общая психология',
          'Математический анализ',
          'История России',
          'Право'
        )
        AND dmt."CreatedAt" >= (
          SELECT MAX("CreatedAt") - INTERVAL '1 hour'
          FROM "discipline_meta_tags"
        )
    `);
  }
}

