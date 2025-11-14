import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMetaTagsToNewDisciplines1763125000000
  implements MigrationInterface
{
  name = 'AddMetaTagsToNewDisciplines1763125000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавляем связи дисциплин с метатегами для новых дисциплин
    await queryRunner.query(`
      INSERT INTO "discipline_meta_tags" ("DisciplineID", "MetaTagCode", "CreatedAt")
      SELECT d."DisciplineID", mt."MetaTagCode", NOW()
      FROM "disciplines" d
      CROSS JOIN "meta_tags" mt
      WHERE 
        -- Иностранный язык — Китайский -> LANGUAGES_LITERATURE
        (d."DisciplineName" = 'Иностранный язык — Китайский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
        OR
        -- Иностранный язык — Арабский -> LANGUAGES_LITERATURE
        (d."DisciplineName" = 'Иностранный язык — Арабский' AND mt."MetaTagCode" = 'LANGUAGES_LITERATURE')
        OR
        -- Мировая художественная культура -> ARTS, HUMANITIES_HISTORY
        (d."DisciplineName" = 'Мировая художественная культура' AND mt."MetaTagCode" IN ('ARTS', 'HUMANITIES_HISTORY'))
        OR
        -- Культурология -> HUMANITIES_HISTORY, ARTS
        (d."DisciplineName" = 'Культурология' AND mt."MetaTagCode" IN ('HUMANITIES_HISTORY', 'ARTS'))
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
      ON CONFLICT DO NOTHING
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем связи для этих дисциплин
    await queryRunner.query(`
      DELETE FROM "discipline_meta_tags" dmt
      USING "disciplines" d
      WHERE dmt."DisciplineID" = d."DisciplineID"
        AND d."DisciplineName" IN (
          'Иностранный язык — Китайский',
          'Иностранный язык — Арабский',
          'Мировая художественная культура',
          'Культурология',
          'Философия',
          'Общая психология',
          'Математический анализ',
          'История России'
        )
    `);
  }
}

