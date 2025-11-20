import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMetaTagToSpanish1764490000000 implements MigrationInterface {
  name = 'AddMetaTagToSpanish1764490000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔧 Добавляю метатег "Языки и литература" к дисциплине "Иностранный язык — Испанский"...');

    // Добавляем метатег LANGUAGES_LITERATURE к дисциплине "Иностранный язык — Испанский"
    await queryRunner.query(`
      INSERT INTO "discipline_meta_tags" ("DisciplineID", "MetaTagCode", "CreatedAt")
      SELECT d."DisciplineID", 'LANGUAGES_LITERATURE', NOW()
      FROM "disciplines" d
      WHERE 
        (d."DisciplineName" LIKE '%Испанский%' OR d."DisciplineName" LIKE '%испанский%')
        AND NOT EXISTS (
          SELECT 1 FROM "discipline_meta_tags" dmt 
          WHERE dmt."DisciplineID" = d."DisciplineID"
          AND dmt."MetaTagCode" = 'LANGUAGES_LITERATURE'
        )
    `);

    console.log('✅ Метатег "Языки и литература" добавлен к дисциплине "Иностранный язык — Испанский"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('🔧 Удаляю метатег "Языки и литература" у дисциплины "Иностранный язык — Испанский"...');

    await queryRunner.query(`
      DELETE FROM "discipline_meta_tags" dmt
      USING "disciplines" d
      WHERE 
        dmt."DisciplineID" = d."DisciplineID"
        AND (d."DisciplineName" LIKE '%Испанский%' OR d."DisciplineName" LIKE '%испанский%')
        AND dmt."MetaTagCode" = 'LANGUAGES_LITERATURE'
    `);

    console.log('✅ Метатег удален');
  }
}

