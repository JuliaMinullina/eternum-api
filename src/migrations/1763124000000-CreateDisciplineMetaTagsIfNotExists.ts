import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDisciplineMetaTagsIfNotExists1763124000000
  implements MigrationInterface
{
  name = 'CreateDisciplineMetaTagsIfNotExists1763124000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'discipline_meta_tags'
    `);

    if (Array.isArray(tableExists) && tableExists.length > 0) {
      console.log('✅ Таблица discipline_meta_tags уже существует, пропускаем создание');
      return;
    }

    console.log('📦 Создание таблицы discipline_meta_tags...');

    await queryRunner.query(`
      CREATE TABLE "discipline_meta_tags" (
        "DisciplineID" uuid NOT NULL,
        "MetaTagCode" character varying(50) NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "PK_discipline_meta_tags" PRIMARY KEY ("DisciplineID", "MetaTagCode")
      )
    `);

    const idColumnExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'discipline_meta_tags' 
      AND column_name = 'ID'
    `);

    if (!(Array.isArray(idColumnExists) && idColumnExists.length > 0)) {
      console.log('📦 Добавление поля ID в таблицу discipline_meta_tags...');
      await queryRunner.query(
        `ALTER TABLE "discipline_meta_tags" ADD "ID" SERIAL NOT NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE "discipline_meta_tags" ADD CONSTRAINT "UQ_discipline_meta_tags_ID" UNIQUE ("ID")`,
      );
    }

    const fkDisciplineExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.table_constraints 
      WHERE table_schema = 'public' 
      AND table_name = 'discipline_meta_tags' 
      AND constraint_name = 'FK_discipline_meta_tags_discipline'
    `);

    if (!(Array.isArray(fkDisciplineExists) && fkDisciplineExists.length > 0)) {
      console.log('📦 Добавление внешнего ключа FK_discipline_meta_tags_discipline...');
      await queryRunner.query(`
        ALTER TABLE "discipline_meta_tags" 
        ADD CONSTRAINT "FK_discipline_meta_tags_discipline" 
        FOREIGN KEY ("DisciplineID") 
        REFERENCES "disciplines"("DisciplineID") 
        ON DELETE CASCADE 
        ON UPDATE NO ACTION
      `);
    }

    const fkMetaTagExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.table_constraints 
      WHERE table_schema = 'public' 
      AND table_name = 'discipline_meta_tags' 
      AND constraint_name = 'FK_discipline_meta_tags_meta_tag'
    `);

    if (!(Array.isArray(fkMetaTagExists) && fkMetaTagExists.length > 0)) {
      console.log('📦 Добавление внешнего ключа FK_discipline_meta_tags_meta_tag...');
      await queryRunner.query(`
        ALTER TABLE "discipline_meta_tags" 
        ADD CONSTRAINT "FK_discipline_meta_tags_meta_tag" 
        FOREIGN KEY ("MetaTagCode") 
        REFERENCES "meta_tags"("MetaTagCode") 
        ON DELETE CASCADE 
        ON UPDATE NO ACTION
      `);
    }

    console.log('✅ Таблица discipline_meta_tags успешно создана');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "discipline_meta_tags" 
      DROP CONSTRAINT IF EXISTS "FK_discipline_meta_tags_meta_tag"
    `);
    await queryRunner.query(`
      ALTER TABLE "discipline_meta_tags" 
      DROP CONSTRAINT IF EXISTS "FK_discipline_meta_tags_discipline"
    `);

    await queryRunner.query(`DROP TABLE IF EXISTS "discipline_meta_tags"`);
  }
}



