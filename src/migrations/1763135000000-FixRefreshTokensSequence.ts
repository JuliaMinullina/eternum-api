import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRefreshTokensSequence1763135000000
  implements MigrationInterface
{
  name = 'FixRefreshTokensSequence1763135000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Исправляем последовательность для refresh_tokens.ID
    // Проверяем существование таблицы
    const tableExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'refresh_tokens'
    `);

    if (!Array.isArray(tableExists) || tableExists.length === 0) {
      console.warn('⚠️  Таблица refresh_tokens не найдена. Пропускаем синхронизацию.');
      return;
    }

    // Находим последовательность (PostgreSQL создает её автоматически для SERIAL)
    // Используем ILIKE для поиска независимо от регистра
    const sequenceResult = await queryRunner.query(`
      SELECT sequence_name 
      FROM information_schema.sequences 
      WHERE sequence_schema = 'public' 
      AND sequence_name ILIKE 'refresh_tokens%id%seq'
      LIMIT 1
    `);

    if (Array.isArray(sequenceResult) && sequenceResult.length > 0) {
      const sequenceName = sequenceResult[0].sequence_name;
      // Устанавливаем значение последовательности на максимальное значение ID + 1
      await queryRunner.query(`
        SELECT setval(
          '"${sequenceName}"',
          COALESCE((SELECT MAX("ID") FROM "refresh_tokens"), 0) + 1,
          false
        );
      `);
    } else {
      // Если последовательность не найдена, возможно колонка ID еще не создана
      console.warn('⚠️  Последовательность для refresh_tokens.ID не найдена. Пропускаем синхронизацию.');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат не требуется, так как это исправление данных
    // Последовательность останется на текущем значении
  }
}

