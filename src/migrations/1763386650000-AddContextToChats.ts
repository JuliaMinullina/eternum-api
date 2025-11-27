import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContextToChats1763386650000 implements MigrationInterface {
  name = 'AddContextToChats1763386650000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Проверяем существование колонки перед добавлением
    const columnExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'chats' 
      AND column_name = 'context'
    `);

    if (!Array.isArray(columnExists) || columnExists.length === 0) {
      await queryRunner.query(`
        ALTER TABLE "chats" 
        ADD COLUMN "context" character varying(50) NULL DEFAULT 'general'
      `);
      
      // Обновляем существующие записи, устанавливая 'general' для NULL значений
      await queryRunner.query(`
        UPDATE "chats" 
        SET "context" = 'general' 
        WHERE "context" IS NULL
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "chats" 
      DROP COLUMN IF EXISTS "context"
    `);
  }
}


