import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesTable1763022824000 implements MigrationInterface {
  name = 'CreateProfilesTable1763022824000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создание таблицы профилей
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "profiles" (
        "ProfileID" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "ID" SERIAL NOT NULL,
        "UserID" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_profiles_ID" UNIQUE ("ID"),
        CONSTRAINT "UQ_profiles_UserID" UNIQUE ("UserID"),
        CONSTRAINT "PK_profiles" PRIMARY KEY ("ProfileID"),
        CONSTRAINT "FK_profiles_UserID" FOREIGN KEY ("UserID") 
          REFERENCES "users"("UserID") ON DELETE CASCADE
      )
    `);

    // Создание индекса для быстрого поиска по UserID
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_profiles_UserID" 
      ON "profiles" ("UserID")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаление индекса
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_profiles_UserID"
    `);

    // Удаление таблицы
    await queryRunner.query(`DROP TABLE IF EXISTS "profiles"`);
  }
}

