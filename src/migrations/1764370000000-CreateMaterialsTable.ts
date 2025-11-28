import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMaterialsTable1764370000000 implements MigrationInterface {
  name = 'CreateMaterialsTable1764370000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создание enum для типов материалов (идемпотентно)
    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1
                    FROM pg_type t
                    JOIN pg_namespace n ON n.oid = t.typnamespace
                    WHERE n.nspname = 'public' AND t.typname = 'material_type_enum'
                ) THEN
                    CREATE TYPE "material_type_enum" AS ENUM('text', 'video', 'image', 'audio', 'file');
                END IF;
            END $$;
        `);

    // Создание enum для типов источников материалов (идемпотентно)
    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1
                    FROM pg_type t
                    JOIN pg_namespace n ON n.oid = t.typnamespace
                    WHERE n.nspname = 'public' AND t.typname = 'material_source_type_enum'
                ) THEN
                    CREATE TYPE "material_source_type_enum" AS ENUM('original', 'adapted');
                END IF;
            END $$;
        `);

    // Создание таблицы материалов
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "materials" (
                "MaterialID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "ID" SERIAL NOT NULL,
                "LessonID" uuid NOT NULL,
                "MaterialType" "material_type_enum" NOT NULL,
                "SourceType" "material_source_type_enum" NOT NULL DEFAULT 'original',
                "Content" text NOT NULL,
                "FileName" character varying(255),
                "FileSize" integer,
                "MimeType" character varying(100),
                "Order" integer,
                "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_materials" PRIMARY KEY ("MaterialID"),
                CONSTRAINT "UQ_materials_ID" UNIQUE ("ID")
            )
        `);

    // Создание внешнего ключа для связи с уроками
    await queryRunner.query(`
            ALTER TABLE "materials"
            ADD CONSTRAINT "FK_materials_lessons"
            FOREIGN KEY ("LessonID")
            REFERENCES "lessons"("LessonID")
            ON DELETE CASCADE
            ON UPDATE NO ACTION
        `);

    // Создание индекса для быстрого поиска материалов по уроку
    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_materials_lesson_id"
            ON "materials"("LessonID")
        `);

    // Создание индекса для сортировки по порядку
    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_materials_order"
            ON "materials"("LessonID", "Order")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаление индексов
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_materials_order"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_materials_lesson_id"`);

    // Удаление внешнего ключа
    await queryRunner.query(
      `ALTER TABLE "materials" DROP CONSTRAINT IF EXISTS "FK_materials_lessons"`,
    );

    // Удаление таблицы
    await queryRunner.query(`DROP TABLE IF EXISTS "materials"`);

    // Удаление enum типов
    await queryRunner.query(`DROP TYPE IF EXISTS "material_source_type_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "material_type_enum"`);
  }
}

