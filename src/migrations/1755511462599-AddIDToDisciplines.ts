import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIDToDisciplines1755511462599 implements MigrationInterface {
    name = 'AddIDToDisciplines1755511462599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" DROP CONSTRAINT "FK_discipline_meta_tags_discipline"`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" DROP CONSTRAINT "FK_discipline_meta_tags_meta_tag"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_lessons_topic"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_view_history_user"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_view_history_discipline"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_view_history_topic"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_view_history_lesson"`);
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "FK_topics_discipline"`);
        await queryRunner.query(`ALTER TABLE "disciplines" ADD "ID" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "disciplines" ADD CONSTRAINT "UQ_abe3f5fe5554bcdcd41e0e963be" UNIQUE ("ID")`);
        await queryRunner.query(`ALTER TABLE "meta_tags" ALTER COLUMN "CreatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "meta_tags" ALTER COLUMN "UpdatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" ALTER COLUMN "CreatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TYPE "public"."view_type_enum" RENAME TO "view_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."view_history_viewtype_enum" AS ENUM('discipline', 'topic', 'lesson')`);
        await queryRunner.query(`ALTER TABLE "view_history" ALTER COLUMN "ViewType" TYPE "public"."view_history_viewtype_enum" USING "ViewType"::"text"::"public"."view_history_viewtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."view_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "Role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "Role" TYPE "public"."users_role_enum" USING "Role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "Role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" ADD CONSTRAINT "FK_4222a25f6082546bf9725b67bd2" FOREIGN KEY ("DisciplineID") REFERENCES "disciplines"("DisciplineID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" ADD CONSTRAINT "FK_7375028c6152995ae6dbb1871d7" FOREIGN KEY ("MetaTagCode") REFERENCES "meta_tags"("MetaTagCode") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_84a8b3fba542baa05e054d31a39" FOREIGN KEY ("TopicID") REFERENCES "topics"("TopicID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "view_history" ADD CONSTRAINT "FK_c1ccec968e3cd83d8138d8b715c" FOREIGN KEY ("UserID") REFERENCES "users"("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "view_history" ADD CONSTRAINT "FK_bbd3d1888f22e29243d07c4ff14" FOREIGN KEY ("DisciplineID") REFERENCES "disciplines"("DisciplineID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "view_history" ADD CONSTRAINT "FK_dfde6e7469836ca78b16e395928" FOREIGN KEY ("TopicID") REFERENCES "topics"("TopicID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "view_history" ADD CONSTRAINT "FK_78d66087bd125a31a56aeb2ebdb" FOREIGN KEY ("LessonID") REFERENCES "lessons"("LessonID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "FK_c5fbcb92c48759f93eb40086cf2" FOREIGN KEY ("DisciplineID") REFERENCES "disciplines"("DisciplineID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("UserID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "FK_c5fbcb92c48759f93eb40086cf2"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_78d66087bd125a31a56aeb2ebdb"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_dfde6e7469836ca78b16e395928"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_bbd3d1888f22e29243d07c4ff14"`);
        await queryRunner.query(`ALTER TABLE "view_history" DROP CONSTRAINT "FK_c1ccec968e3cd83d8138d8b715c"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_84a8b3fba542baa05e054d31a39"`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" DROP CONSTRAINT "FK_7375028c6152995ae6dbb1871d7"`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" DROP CONSTRAINT "FK_4222a25f6082546bf9725b67bd2"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "Role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "Role" TYPE "public"."user_role_enum_old" USING "Role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "Role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."view_type_enum_old" AS ENUM('discipline', 'topic', 'lesson')`);
        await queryRunner.query(`ALTER TABLE "view_history" ALTER COLUMN "ViewType" TYPE "public"."view_type_enum_old" USING "ViewType"::"text"::"public"."view_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."view_history_viewtype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."view_type_enum_old" RENAME TO "view_type_enum"`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" ALTER COLUMN "CreatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "meta_tags" ALTER COLUMN "UpdatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "meta_tags" ALTER COLUMN "CreatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "disciplines" DROP CONSTRAINT "UQ_abe3f5fe5554bcdcd41e0e963be"`);
        await queryRunner.query(`ALTER TABLE "disciplines" DROP COLUMN "ID"`);
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "FK_topics_discipline" FOREIGN KEY ("DisciplineID") REFERENCES "disciplines"("DisciplineID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "view_history" ADD CONSTRAINT "FK_view_history_lesson" FOREIGN KEY ("LessonID") REFERENCES "lessons"("LessonID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "view_history" ADD CONSTRAINT "FK_view_history_topic" FOREIGN KEY ("TopicID") REFERENCES "topics"("TopicID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "view_history" ADD CONSTRAINT "FK_view_history_discipline" FOREIGN KEY ("DisciplineID") REFERENCES "disciplines"("DisciplineID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "view_history" ADD CONSTRAINT "FK_view_history_user" FOREIGN KEY ("UserID") REFERENCES "users"("UserID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_lessons_topic" FOREIGN KEY ("TopicID") REFERENCES "topics"("TopicID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" ADD CONSTRAINT "FK_discipline_meta_tags_meta_tag" FOREIGN KEY ("MetaTagCode") REFERENCES "meta_tags"("MetaTagCode") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline_meta_tags" ADD CONSTRAINT "FK_discipline_meta_tags_discipline" FOREIGN KEY ("DisciplineID") REFERENCES "disciplines"("DisciplineID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
