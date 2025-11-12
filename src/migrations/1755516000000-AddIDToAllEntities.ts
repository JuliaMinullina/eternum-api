import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIDToAllEntities1755516000000 implements MigrationInterface {
  name = 'AddIDToAllEntities1755516000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавляем ID поля во все таблицы (кроме disciplines, где уже есть)

    // Users table
    await queryRunner.query(`ALTER TABLE "users" ADD "ID" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_users_ID" UNIQUE ("ID")`,
    );

    // Topics table
    await queryRunner.query(`ALTER TABLE "topics" ADD "ID" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "topics" ADD CONSTRAINT "UQ_topics_ID" UNIQUE ("ID")`,
    );

    // Lessons table
    await queryRunner.query(`ALTER TABLE "lessons" ADD "ID" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "UQ_lessons_ID" UNIQUE ("ID")`,
    );

    // Meta tags table
    await queryRunner.query(`ALTER TABLE "meta_tags" ADD "ID" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "meta_tags" ADD CONSTRAINT "UQ_meta_tags_ID" UNIQUE ("ID")`,
    );

    // View history table
    await queryRunner.query(
      `ALTER TABLE "view_history" ADD "ID" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "view_history" ADD CONSTRAINT "UQ_view_history_ID" UNIQUE ("ID")`,
    );

    // Refresh tokens table
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD "ID" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "UQ_refresh_tokens_ID" UNIQUE ("ID")`,
    );

    // Discipline meta tags table (junction table)
    await queryRunner.query(
      `ALTER TABLE "discipline_meta_tags" ADD "ID" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "discipline_meta_tags" ADD CONSTRAINT "UQ_discipline_meta_tags_ID" UNIQUE ("ID")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат изменений

    // Remove ID fields from all tables
    await queryRunner.query(
      `ALTER TABLE "discipline_meta_tags" DROP CONSTRAINT "UQ_discipline_meta_tags_ID"`,
    );
    await queryRunner.query(
      `ALTER TABLE "discipline_meta_tags" DROP COLUMN "ID"`,
    );

    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" DROP CONSTRAINT "UQ_refresh_tokens_ID"`,
    );
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "ID"`);

    await queryRunner.query(
      `ALTER TABLE "view_history" DROP CONSTRAINT "UQ_view_history_ID"`,
    );
    await queryRunner.query(`ALTER TABLE "view_history" DROP COLUMN "ID"`);

    await queryRunner.query(
      `ALTER TABLE "meta_tags" DROP CONSTRAINT "UQ_meta_tags_ID"`,
    );
    await queryRunner.query(`ALTER TABLE "meta_tags" DROP COLUMN "ID"`);

    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "UQ_lessons_ID"`,
    );
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "ID"`);

    await queryRunner.query(
      `ALTER TABLE "topics" DROP CONSTRAINT "UQ_topics_ID"`,
    );
    await queryRunner.query(`ALTER TABLE "topics" DROP COLUMN "ID"`);

    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_users_ID"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ID"`);
  }
}
