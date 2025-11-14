import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecommendedTrackTables1755700000000
  implements MigrationInterface
{
  name = 'CreateRecommendedTrackTables1755700000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создаем таблицу recommended_tracks, если она не существует
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "recommended_tracks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "chatId" uuid NOT NULL,
        "userId" uuid NOT NULL,
        "question" text,
        "description" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_recommended_tracks" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_recommended_tracks_chatId" UNIQUE ("chatId"),
        CONSTRAINT "FK_recommended_tracks_chat" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_recommended_tracks_user" FOREIGN KEY ("userId") REFERENCES "users"("UserID") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_recommended_tracks_chatId" ON "recommended_tracks" ("chatId")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_recommended_tracks_userId" ON "recommended_tracks" ("userId")
    `);

    // Создаем таблицу track_items, если она не существует
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "track_items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "trackId" uuid NOT NULL,
        "disciplineId" uuid NOT NULL,
        "topicId" uuid,
        "order" integer NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_track_items" PRIMARY KEY ("id"),
        CONSTRAINT "FK_track_items_track" FOREIGN KEY ("trackId") REFERENCES "recommended_tracks"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_track_items_discipline" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("DisciplineID") ON DELETE CASCADE,
        CONSTRAINT "FK_track_items_topic" FOREIGN KEY ("topicId") REFERENCES "topics"("TopicID") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_track_items_trackId" ON "track_items" ("trackId")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_track_items_disciplineId" ON "track_items" ("disciplineId")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_track_items_topicId" ON "track_items" ("topicId")
    `);

    // Создаем уникальный индекс для комбинации trackId, disciplineId, topicId
    // В PostgreSQL NULL значения в уникальном индексе обрабатываются корректно
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "IDX_track_items_unique" ON "track_items" ("trackId", "disciplineId", "topicId")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_track_items_unique"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_track_items_topicId"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_track_items_disciplineId"`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_track_items_trackId"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "track_items"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_recommended_tracks_userId"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_recommended_tracks_chatId"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "recommended_tracks"`);
  }
}

