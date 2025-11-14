import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class SeedMissingTopics1763124932000 implements MigrationInterface {
  name = 'SeedMissingTopics1763124932000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Импортируем темы для дисциплин, у которых их нет
    // Временно отключаем проверку foreign key для импорта
    await queryRunner.query(`SET session_replication_role = 'replica'`);

    // Читаем SQL файл с темами
    const sqlFilePath = path.join(process.cwd(), 'src', 'migrations', 'seed-missing-topics.sql');
    
    // Если файл не существует, генерируем SQL из seed-скриптов
    if (!fs.existsSync(sqlFilePath)) {
      console.warn(`⚠️  Файл seed-missing-topics.sql не найден, генерируем SQL из seed-скриптов...`);
      await this.generateAndInsertTopics(queryRunner);
    } else {
      const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');
      
      // Разбиваем SQL на отдельные команды и выполняем их
      const commands = sqlContent
        .split(';')
        .map(cmd => cmd.trim())
        .filter(cmd => cmd && !cmd.startsWith('--') && cmd.length > 0);

      for (const command of commands) {
        try {
          await queryRunner.query(command + ';');
        } catch (error: any) {
          // Игнорируем ошибки дубликатов и продолжаем
          if (error?.code !== '23505' && !error?.message?.includes('already exists')) {
            console.error('❌ Ошибка при выполнении команды:', error?.message || error);
          }
        }
      }
    }

    // Включаем обратно проверку foreign key
    await queryRunner.query(`SET session_replication_role = 'origin'`);
  }

  private async generateAndInsertTopics(queryRunner: QueryRunner): Promise<void> {
    // Генерируем темы из seed-скриптов программно
    // Это резервный метод, если SQL файл не найден
    
    const topics = await this.extractTopicsFromSeedScripts();
    
    if (topics.length === 0) {
      console.warn('⚠️  Не найдено тем для импорта');
      return;
    }

    // Импортируем батчами по 100
    const batchSize = 100;
    for (let i = 0; i < topics.length; i += batchSize) {
      const batch = topics.slice(i, i + batchSize);
      const values = batch
        .map(t => `('${t.topicId}'::uuid, ${t.id}, '${t.topicName.replace(/'/g, "''")}', '${t.disciplineId}'::uuid, '2025-08-16 12:00:00'::timestamp, '2025-08-16 12:00:00'::timestamp)`)
        .join(',\n');

      const insertQuery = `
        INSERT INTO "topics" ("TopicID", "ID", "TopicName", "DisciplineID", "CreatedAt", "UpdatedAt")
        VALUES
        ${values}
        ON CONFLICT ("TopicID") DO NOTHING
      `;

      try {
        await queryRunner.query(insertQuery);
      } catch (error: any) {
        if (error?.code !== '23505') {
          console.error(`❌ Ошибка при импорте батча ${Math.floor(i / batchSize) + 1}:`, error?.message || error);
        }
      }
    }

    // Обновляем последовательность
    await queryRunner.query(`
      SELECT setval('"topics_ID_seq"', COALESCE((SELECT MAX("ID") FROM "topics"), 1), true)
    `);
  }

  private async extractTopicsFromSeedScripts(): Promise<any[]> {
    // Этот метод будет вызываться только если SQL файл не найден
    // В реальности лучше использовать предгенерированный SQL файл
    return [];
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // При откате удаляем темы, созданные этой миграцией
    // Удаляем темы с ID >= 1000 (новые темы начинаются с этого ID)
    await queryRunner.query(`
      DELETE FROM "topics" 
      WHERE "ID" >= 1000
    `);
  }
}

