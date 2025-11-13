import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtToChats1763031636000 implements MigrationInterface {
  name = 'AddDeletedAtToChats1763031636000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "chats" 
      ADD COLUMN "deletedAt" TIMESTAMP NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "chats" 
      DROP COLUMN IF EXISTS "deletedAt"
    `);
  }
}

