import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOldChatsContext1763386700000 implements MigrationInterface {
  name = 'UpdateOldChatsContext1763386700000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Обновляем все старые чаты без context, устанавливая 'general'
    await queryRunner.query(`
      UPDATE "chats" 
      SET "context" = 'general' 
      WHERE "context" IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат не требуется, так как это просто обновление данных
  }
}

