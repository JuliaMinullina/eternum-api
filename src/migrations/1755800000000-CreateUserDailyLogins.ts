import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserDailyLogins1755800000000 implements MigrationInterface {
  name = 'CreateUserDailyLogins1755800000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создание таблицы для отслеживания ежедневных входов пользователей
    await queryRunner.query(`
      CREATE TABLE "user_daily_logins" (
        "UserDailyLoginID" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "ID" SERIAL NOT NULL,
        "UserID" uuid NOT NULL,
        "LoginDate" date NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_user_daily_logins_ID" UNIQUE ("ID"),
        CONSTRAINT "UQ_user_daily_logins_UserID_LoginDate" UNIQUE ("UserID", "LoginDate"),
        CONSTRAINT "PK_user_daily_logins" PRIMARY KEY ("UserDailyLoginID"),
        CONSTRAINT "FK_user_daily_logins_UserID" FOREIGN KEY ("UserID") 
          REFERENCES "users"("UserID") ON DELETE CASCADE
      )
    `);

    // Создание индекса для быстрого поиска по UserID и LoginDate
    await queryRunner.query(`
      CREATE INDEX "IDX_user_daily_logins_UserID_LoginDate" 
      ON "user_daily_logins" ("UserID", "LoginDate")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаление индекса
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_user_daily_logins_UserID_LoginDate"
    `);

    // Удаление таблицы
    await queryRunner.query(`DROP TABLE IF EXISTS "user_daily_logins"`);
  }
}

