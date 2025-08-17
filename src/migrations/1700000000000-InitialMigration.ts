import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1700000000000 implements MigrationInterface {
    name = 'InitialMigration1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Создание таблицы пользователей
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "firstName" character varying,
                "lastName" character varying,
                "role" character varying NOT NULL DEFAULT 'user',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);

        // Создание таблицы дисциплин
        await queryRunner.query(`
            CREATE TABLE "discipline" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_139512aefbb11a5b2fa92696828" PRIMARY KEY ("id")
            )
        `);

        // Создание таблицы мета-тегов
        await queryRunner.query(`
            CREATE TABLE "meta_tag" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_meta_tag_id" PRIMARY KEY ("id")
            )
        `);

        // Создание таблицы связи дисциплин и мета-тегов
        await queryRunner.query(`
            CREATE TABLE "discipline_meta_tag" (
                "disciplineId" integer NOT NULL,
                "metaTagId" integer NOT NULL,
                CONSTRAINT "PK_discipline_meta_tag" PRIMARY KEY ("disciplineId", "metaTagId")
            )
        `);

        // Создание таблицы тем
        await queryRunner.query(`
            CREATE TABLE "topic" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" text,
                "disciplineId" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_topic_id" PRIMARY KEY ("id")
            )
        `);

        // Создание таблицы уроков
        await queryRunner.query(`
            CREATE TABLE "lesson" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "content" text NOT NULL,
                "topicId" integer,
                "order" integer NOT NULL DEFAULT 0,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_lesson_id" PRIMARY KEY ("id")
            )
        `);

        // Создание таблицы истории просмотров
        await queryRunner.query(`
            CREATE TABLE "view_history" (
                "id" SERIAL NOT NULL,
                "userId" integer,
                "lessonId" integer,
                "viewedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_view_history_id" PRIMARY KEY ("id")
            )
        `);

        // Создание таблицы refresh токенов
        await queryRunner.query(`
            CREATE TABLE "refresh_token" (
                "id" SERIAL NOT NULL,
                "userId" integer,
                "token" character varying NOT NULL,
                "expiresAt" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_refresh_token_id" PRIMARY KEY ("id")
            )
        `);

        // Добавление внешних ключей
        await queryRunner.query(`
            ALTER TABLE "discipline_meta_tag" 
            ADD CONSTRAINT "FK_discipline_meta_tag_discipline" 
            FOREIGN KEY ("disciplineId") REFERENCES "discipline"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "discipline_meta_tag" 
            ADD CONSTRAINT "FK_discipline_meta_tag_meta_tag" 
            FOREIGN KEY ("metaTagId") REFERENCES "meta_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "topic" 
            ADD CONSTRAINT "FK_topic_discipline" 
            FOREIGN KEY ("disciplineId") REFERENCES "discipline"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "lesson" 
            ADD CONSTRAINT "FK_lesson_topic" 
            FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "view_history" 
            ADD CONSTRAINT "FK_view_history_user" 
            FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "view_history" 
            ADD CONSTRAINT "FK_view_history_lesson" 
            FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "refresh_token" 
            ADD CONSTRAINT "FK_refresh_token_user" 
            FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаление внешних ключей
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_refresh_token_user"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_view_history_lesson"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_view_history_user"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_lesson_topic"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_topic_discipline"`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tag" DROP CONSTRAINT "FK_discipline_meta_tag_meta_tag"`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tag" DROP CONSTRAINT "FK_discipline_meta_tag_discipline"`);

        // Удаление таблиц
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "view_history"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TABLE "topic"`);
        await queryRunner.query(`DROP TABLE "discipline_meta_tag"`);
        await queryRunner.query(`DROP TABLE "meta_tag"`);
        await queryRunner.query(`DROP TABLE "discipline"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
