import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfileFields1763024064000 implements MigrationInterface {
  name = 'AddProfileFields1763024064000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создаем enum для возрастных диапазонов
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type t
          JOIN pg_namespace n ON n.oid = t.typnamespace
          WHERE n.nspname = 'public' AND t.typname = 'age_range_enum'
        ) THEN
          CREATE TYPE "age_range_enum" AS ENUM('6-10', '11-15', '16-20', '21-25', '26-30', '30+');
        END IF;
      END $$;
    `);

    // Создаем enum для особенностей обучения
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type t
          JOIN pg_namespace n ON n.oid = t.typnamespace
          WHERE n.nspname = 'public' AND t.typname = 'learning_feature_enum'
        ) THEN
          CREATE TYPE "learning_feature_enum" AS ENUM('ADHD', 'DYSLEXIA', 'DYSCALCULIA', 'DYSGRAPHIA', 'AUDIO_LEARNER', 'VISUAL_LEARNER', 'TEXT_LEARNER');
        END IF;
      END $$;
    `);

    // Добавляем поле ageRange
    await queryRunner.query(`
      ALTER TABLE "profiles" 
      ADD COLUMN IF NOT EXISTS "ageRange" "age_range_enum" NULL
    `);

    // Добавляем поле interests (массив строк)
    await queryRunner.query(`
      ALTER TABLE "profiles" 
      ADD COLUMN IF NOT EXISTS "interests" text[] DEFAULT '{}' NULL
    `);

    // Добавляем поле learningFeatures (массив enum)
    await queryRunner.query(`
      ALTER TABLE "profiles" 
      ADD COLUMN IF NOT EXISTS "learningFeatures" "learning_feature_enum"[] DEFAULT '{}' NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем поля
    await queryRunner.query(`
      ALTER TABLE "profiles" 
      DROP COLUMN IF EXISTS "learningFeatures"
    `);

    await queryRunner.query(`
      ALTER TABLE "profiles" 
      DROP COLUMN IF EXISTS "interests"
    `);

    await queryRunner.query(`
      ALTER TABLE "profiles" 
      DROP COLUMN IF EXISTS "ageRange"
    `);

    // Удаляем enum типы
    await queryRunner.query(`DROP TYPE IF EXISTS "learning_feature_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "age_range_enum"`);
  }
}

