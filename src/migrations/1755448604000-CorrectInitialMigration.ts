import { MigrationInterface, QueryRunner } from "typeorm";

export class CorrectInitialMigration1755448604000 implements MigrationInterface {
    name = 'CorrectInitialMigration1755448604000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ПОЛНЫЙ СБРОС - удаляем все таблицы и типы
        await queryRunner.query(`DROP SCHEMA public CASCADE`);
        await queryRunner.query(`CREATE SCHEMA public`);
        await queryRunner.query(`GRANT ALL ON SCHEMA public TO postgres`);
        await queryRunner.query(`GRANT ALL ON SCHEMA public TO public`);

        // Установка расширения uuid
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        // Создание enum для ролей пользователей
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'user')`);

        // Создание enum для типов просмотров
        await queryRunner.query(`CREATE TYPE "view_type_enum" AS ENUM('discipline', 'topic', 'lesson')`);

        // Создание таблицы пользователей
        await queryRunner.query(`
            CREATE TABLE "users" (
                "UserID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "Role" "user_role_enum" NOT NULL DEFAULT 'user',
                "UserName" character varying(100) NOT NULL,
                "UserSurname" character varying(100) NOT NULL,
                "Email" character varying NOT NULL,
                "password" character varying,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_users_email" UNIQUE ("Email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("UserID")
            )
        `);

        // Создание таблицы дисциплин
        await queryRunner.query(`
            CREATE TABLE "disciplines" (
                "DisciplineID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "DisciplineName" character varying(255) NOT NULL,
                "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_disciplines" PRIMARY KEY ("DisciplineID")
            )
        `);

        // Создание таблицы мета-тегов
        await queryRunner.query(`
            CREATE TABLE "meta_tags" (
                "MetaTagCode" character varying(50) NOT NULL,
                "MetaTagName" character varying(100) NOT NULL,
                "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "UpdatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "PK_meta_tags" PRIMARY KEY ("MetaTagCode")
            )
        `);

        // Создание таблицы связи дисциплин и мета-тегов
        await queryRunner.query(`
            CREATE TABLE "discipline_meta_tags" (
                "DisciplineID" uuid NOT NULL,
                "MetaTagCode" character varying(50) NOT NULL,
                "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "PK_discipline_meta_tags" PRIMARY KEY ("DisciplineID", "MetaTagCode")
            )
        `);

        // Создание таблицы тем
        await queryRunner.query(`
            CREATE TABLE "topics" (
                "TopicID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "TopicName" character varying(255) NOT NULL,
                "DisciplineID" uuid NOT NULL,
                "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_topics" PRIMARY KEY ("TopicID")
            )
        `);

        // Создание таблицы уроков
        await queryRunner.query(`
            CREATE TABLE "lessons" (
                "LessonID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "LessonName" character varying(255) NOT NULL,
                "TopicID" uuid NOT NULL,
                "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_lessons" PRIMARY KEY ("LessonID")
            )
        `);

        // Создание таблицы истории просмотров
        await queryRunner.query(`
            CREATE TABLE "view_history" (
                "ViewHistoryID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "UserID" uuid NOT NULL,
                "ViewType" "view_type_enum" NOT NULL,
                "DisciplineID" uuid,
                "TopicID" uuid,
                "LessonID" uuid,
                "ViewedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_view_history" PRIMARY KEY ("ViewHistoryID")
            )
        `);

        // Создание таблицы refresh токенов
        await queryRunner.query(`
            CREATE TABLE "refresh_tokens" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "token" character varying NOT NULL,
                "userId" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "expiresAt" TIMESTAMP NOT NULL,
                "isRevoked" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_refresh_tokens" PRIMARY KEY ("id")
            )
        `);

        // Добавление внешних ключей
        await queryRunner.query(`
            ALTER TABLE "discipline_meta_tags" 
            ADD CONSTRAINT "FK_discipline_meta_tags_discipline" 
            FOREIGN KEY ("DisciplineID") REFERENCES "disciplines"("DisciplineID") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "discipline_meta_tags" 
            ADD CONSTRAINT "FK_discipline_meta_tags_meta_tag" 
            FOREIGN KEY ("MetaTagCode") REFERENCES "meta_tags"("MetaTagCode") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "topics" 
            ADD CONSTRAINT "FK_topics_discipline" 
            FOREIGN KEY ("DisciplineID") REFERENCES "disciplines"("DisciplineID") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "lessons" 
            ADD CONSTRAINT "FK_lessons_topic" 
            FOREIGN KEY ("TopicID") REFERENCES "topics"("TopicID") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "view_history" 
            ADD CONSTRAINT "FK_view_history_user" 
            FOREIGN KEY ("UserID") REFERENCES "users"("UserID") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "view_history" 
            ADD CONSTRAINT "FK_view_history_discipline" 
            FOREIGN KEY ("DisciplineID") REFERENCES "disciplines"("DisciplineID") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "view_history" 
            ADD CONSTRAINT "FK_view_history_topic" 
            FOREIGN KEY ("TopicID") REFERENCES "topics"("TopicID") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "view_history" 
            ADD CONSTRAINT "FK_view_history_lesson" 
            FOREIGN KEY ("LessonID") REFERENCES "lessons"("LessonID") ON DELETE CASCADE
        `);

        // Пересоздаем таблицу migrations для TypeORM
        await queryRunner.query(`
            CREATE TABLE "migrations" (
                "id" SERIAL NOT NULL,
                "timestamp" bigint NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаление внешних ключей
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT IF EXISTS "FK_view_history_lesson"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT IF EXISTS "FK_view_history_topic"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT IF EXISTS "FK_view_history_discipline"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT IF EXISTS "FK_view_history_user"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT IF EXISTS "FK_lessons_topic"`);
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT IF EXISTS "FK_topics_discipline"`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" DROP CONSTRAINT IF EXISTS "FK_discipline_meta_tags_meta_tag"`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" DROP CONSTRAINT IF EXISTS "FK_discipline_meta_tags_discipline"`);

        // Удаление таблиц
        await queryRunner.query(`DROP TABLE IF EXISTS "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "view_history"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "lessons"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "topics"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "discipline_meta_tags"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "meta_tags"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "disciplines"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }
}