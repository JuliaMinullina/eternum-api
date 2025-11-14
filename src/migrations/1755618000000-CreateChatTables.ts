import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChatTables1755618000000 implements MigrationInterface {
  name = 'CreateChatTables1755618000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Проверяем существование типа enum перед созданием
    await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE "messages_role_enum" AS ENUM('system', 'user', 'assistant');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

    // Проверяем существование таблицы chats перед созданием
    const chatsTableExists = await queryRunner.query(`
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'chats'
        `);

    if (!Array.isArray(chatsTableExists) || chatsTableExists.length === 0) {
      // Создаем таблицу chats только если она не существует
      await queryRunner.query(`
                CREATE TABLE "chats" (
                    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                    "userId" uuid NOT NULL,
                    "title" character varying(255),
                    "externalConversationId" character varying(255),
                    "lastMessageAt" TIMESTAMP,
                    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                    CONSTRAINT "PK_chats" PRIMARY KEY ("id"),
                    CONSTRAINT "UQ_chats_externalConversationId" UNIQUE ("externalConversationId"),
                    CONSTRAINT "FK_chats_user" FOREIGN KEY ("userId") REFERENCES "users"("UserID") ON DELETE CASCADE
                )
            `);
    }

    // Создаем индекс, если он не существует
    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_chats_userId" ON "chats" ("userId")
        `);

    // Проверяем существование таблицы messages перед созданием
    const messagesTableExists = await queryRunner.query(`
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'messages'
        `);

    if (!Array.isArray(messagesTableExists) || messagesTableExists.length === 0) {
      // Создаем таблицу messages только если она не существует
      await queryRunner.query(`
                CREATE TABLE "messages" (
                    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                    "role" "messages_role_enum" NOT NULL,
                    "content" text NOT NULL,
                    "chatId" uuid NOT NULL,
                    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                    CONSTRAINT "PK_messages" PRIMARY KEY ("id"),
                    CONSTRAINT "FK_messages_chat" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE
                )
            `);
    }

    // Создаем индекс, если он не существует
    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_messages_chatId" ON "messages" ("chatId")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_messages_chatId"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "messages"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "messages_role_enum"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_chats_userId"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "chats"`);
  }
}
