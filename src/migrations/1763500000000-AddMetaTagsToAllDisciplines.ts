import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMetaTagsToAllDisciplines1763500000000
  implements MigrationInterface
{
  name = 'AddMetaTagsToAllDisciplines1763500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Проверяем существование таблицы discipline_meta_tags
    const tableExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'discipline_meta_tags'
    `);

    if (!(Array.isArray(tableExists) && tableExists.length > 0)) {
      // Создаем таблицу, если её нет
      await queryRunner.query(`
        CREATE TABLE "discipline_meta_tags" (
          "DisciplineID" uuid NOT NULL,
          "MetaTagCode" character varying(50) NOT NULL,
          "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "PK_discipline_meta_tags" PRIMARY KEY ("DisciplineID", "MetaTagCode")
        )
      `);
    }

    // Проверяем и добавляем колонку ID, если её нет (даже если таблица уже существовала)
    const idColumnExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'discipline_meta_tags' 
      AND column_name = 'ID'
    `);

    if (!(Array.isArray(idColumnExists) && idColumnExists.length > 0)) {
      await queryRunner.query(
        `ALTER TABLE "discipline_meta_tags" ADD "ID" SERIAL NOT NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE "discipline_meta_tags" ADD CONSTRAINT "UQ_discipline_meta_tags_ID" UNIQUE ("ID")`,
      );
    }

    // Проверяем и добавляем внешний ключ на disciplines
    const fkDisciplineExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.table_constraints 
      WHERE table_schema = 'public' 
      AND table_name = 'discipline_meta_tags' 
      AND constraint_name = 'FK_discipline_meta_tags_discipline'
    `);

    if (!(Array.isArray(fkDisciplineExists) && fkDisciplineExists.length > 0)) {
      await queryRunner.query(`
        ALTER TABLE "discipline_meta_tags" 
        ADD CONSTRAINT "FK_discipline_meta_tags_discipline" 
        FOREIGN KEY ("DisciplineID") 
        REFERENCES "disciplines"("DisciplineID") 
        ON DELETE CASCADE 
        ON UPDATE NO ACTION
      `);
    }

    // Проверяем и добавляем внешний ключ на meta_tags
    const fkMetaTagExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.table_constraints 
      WHERE table_schema = 'public' 
      AND table_name = 'discipline_meta_tags' 
      AND constraint_name = 'FK_discipline_meta_tags_meta_tag'
    `);

    if (!(Array.isArray(fkMetaTagExists) && fkMetaTagExists.length > 0)) {
      await queryRunner.query(`
        ALTER TABLE "discipline_meta_tags" 
        ADD CONSTRAINT "FK_discipline_meta_tags_meta_tag" 
        FOREIGN KEY ("MetaTagCode") 
        REFERENCES "meta_tags"("MetaTagCode") 
        ON DELETE CASCADE 
        ON UPDATE NO ACTION
      `);
    }

    // Добавляем метатеги для всех дисциплин, у которых их нет
    // Используем INSERT с ON CONFLICT DO NOTHING для безопасности
    // И проверяем, что у дисциплины еще нет метатегов
    
    await queryRunner.query(`
      INSERT INTO "discipline_meta_tags" ("DisciplineID", "MetaTagCode", "CreatedAt")
      SELECT d."DisciplineID", mt."MetaTagCode", NOW()
      FROM "disciplines" d
      CROSS JOIN "meta_tags" mt
      WHERE 
        -- Добавляем только для дисциплин, у которых нет метатегов
        NOT EXISTS (
          SELECT 1 FROM "discipline_meta_tags" dmt 
          WHERE dmt."DisciplineID" = d."DisciplineID"
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
          -- Право (второй, ID 23) -> SOCIAL_SCIENCES
          (d."DisciplineName" = 'Право' AND d."ID" = 23 AND mt."MetaTagCode" = 'SOCIAL_SCIENCES')
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
          'Технология',
          'Изобразительное искусство',
          'Музыка',
          'Физическая культура',
          'Основы безопасности жизнедеятельности',
          'Экология',
          'Астрономия',
          'Экономика'
        )
        AND NOT EXISTS (
          SELECT 1 FROM "discipline_meta_tags" dmt2
          WHERE dmt2."DisciplineID" = d."DisciplineID"
            AND dmt2."CreatedAt" < dmt."CreatedAt"
        )
    `);

    // Удаляем метатеги для второго "Право" (ID 23), если они были добавлены этой миграцией
    await queryRunner.query(`
      DELETE FROM "discipline_meta_tags" dmt
      USING "disciplines" d
      WHERE dmt."DisciplineID" = d."DisciplineID"
        AND d."DisciplineName" = 'Право'
        AND d."ID" = 23
        AND dmt."MetaTagCode" = 'SOCIAL_SCIENCES'
        AND dmt."CreatedAt" >= NOW() - INTERVAL '1 minute'
    `);
  }
}

