import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChatTables1755618000000 implements MigrationInterface {
  name = 'CreateChatTables1755618000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
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

    await queryRunner.query(`
            CREATE INDEX "IDX_chats_userId" ON "chats" ("userId")
        `);

    await queryRunner.query(`
            CREATE TYPE "messages_role_enum" AS ENUM('system', 'user', 'assistant')
        `);

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

    await queryRunner.query(`
            CREATE INDEX "IDX_messages_chatId" ON "messages" ("chatId")
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
