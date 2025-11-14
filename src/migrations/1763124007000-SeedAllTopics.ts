import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class SeedAllTopics1763124007000 implements MigrationInterface {
  name = 'SeedAllTopics1763124007000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Создаем все недостающие дисциплины
    await queryRunner.query(`
      INSERT INTO "disciplines" ("DisciplineID", "ID", "DisciplineName", "CreatedAt", "UpdatedAt")
      SELECT v."DisciplineID"::uuid, v."ID", v."DisciplineName", v."CreatedAt"::timestamp, v."UpdatedAt"::timestamp
      FROM (VALUES
        ('6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d', 1, 'Русский язык', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f', 2, 'Литература', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d', 3, 'Математика', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d', 4, 'Физика', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('d5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e', 5, 'Химия', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a', 6, 'Биология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('f7b6d5c4-0a3c-4d9e-8b2f-4c3d5e6f7a8b', 7, 'География', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a8c7e6d5-1b4d-4e0f-9a3c-5d4e6f7a8b9c', 8, 'Мировая история', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b9d8f7e6-2c5e-4f1a-8b4d-6e5f7a8b9c0d', 9, 'Обществознание', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c0e9a8b7-3d6f-4a02-9e5c-7f6a8b9c0d1e', 10, 'Информатика и ИКТ', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('d1f0b9c8-4e7a-4b13-8f6d-8a7b9c0d1e2f', 11, 'Иностранный язык — Английский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('e2a1c0b9-5f8b-4c24-9a7e-9b8c0d1e2f3a', 12, 'Иностранный язык — Немецкий', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('f3b2d1c0-6a9c-4d35-8b8f-0c9d1e2f3a4b', 13, 'Иностранный язык — Французский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a4c3e2d1-7b0d-4e46-9c9a-1d0e2f3a4b5c', 14, 'Технология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b5d4f3e2-8c1e-4f57-8d0b-2e1f3a4b5c6d', 15, 'Изобразительное искусство', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c6e5a4b3-9d2f-4028-9e1c-3f2a4b5c6d7e', 16, 'Музыка', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('d7f6b5c4-0e3a-4139-8f2d-4a3b5c6d7e8f', 17, 'Физическая культура', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('e8a7c6b5-1f4b-4240-9a3e-5b4c6d7e8f9a', 18, 'Основы безопасности жизнедеятельности', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('f9b8d7c6-2a5c-4351-8b4f-6c5d7e8f9a0b', 19, 'Экология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a0c9e8d7-3b6d-4462-9b5a-7d6e8f9a0b1c', 20, 'Астрономия', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b1d0f9e8-4c7e-4573-8a6b-8e7f9a0b1c2d', 21, 'Экономика', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c2e1a0f9-5d8f-4684-9f7c-9f8a0b1c2d3e', 22, 'Право', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c', 23, 'Иностранный язык — Испанский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b4c3d2e1-7f0b-4806-9d1b-1e2f3a4b5c6d', 24, 'Иностранный язык — Китайский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('c5d4e3f2-8a1c-4917-0e2c-2f3a4b5c6d7e', 25, 'Иностранный язык — Арабский', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('d6e5f4a3-9b2d-5028-1f3d-3a4b5c6d7e8f', 26, 'Мировая художественная культура', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a', 27, 'Культурология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b', 28, 'Философия', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c', 29, 'Общая психология', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('b0c9d8e7-3f6b-5462-5d7b-7e8f9a0b1c2d', 30, 'Математический анализ', '2025-08-16 12:00:00', '2025-08-16 12:00:00'),
        ('6ae0d6b5-5e59-41c6-b507-7e08c9ee156c', 32, 'История России', '2025-08-16 12:00:00', '2025-08-16 12:00:00')
      ) AS v("DisciplineID", "ID", "DisciplineName", "CreatedAt", "UpdatedAt")
      WHERE NOT EXISTS (SELECT 1 FROM "disciplines" WHERE "DisciplineID" = v."DisciplineID"::uuid)
    `);

    // 2. Импортируем темы из SQL файла
    // Временно отключаем проверку foreign key для импорта
    await queryRunner.query(`SET session_replication_role = 'replica'`);

    // Читаем SQL файл с темами
    // Пробуем разные пути: для разработки (src/) и для продакшена (dist/)
    let sqlFilePath = path.join(process.cwd(), 'src', 'migrations', 'topics-insert.sql');
    
    if (!fs.existsSync(sqlFilePath)) {
      // Пробуем путь для продакшена
      sqlFilePath = path.join(process.cwd(), 'dist', 'migrations', 'topics-insert.sql');
    }
    
    if (!fs.existsSync(sqlFilePath)) {
      // Пробуем относительный путь от текущего файла миграции
      sqlFilePath = path.join(__dirname, 'topics-insert.sql');
    }
    
    if (!fs.existsSync(sqlFilePath)) {
      console.warn(`⚠️  Файл topics-insert.sql не найден. Пробовал пути:
        - ${path.join(process.cwd(), 'src', 'migrations', 'topics-insert.sql')}
        - ${path.join(process.cwd(), 'dist', 'migrations', 'topics-insert.sql')}
        - ${path.join(__dirname, 'topics-insert.sql')}`);
      await queryRunner.query(`SET session_replication_role = 'origin'`);
      return;
    }

    const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');
    
    // Разбиваем SQL на отдельные команды и выполняем их
    // Удаляем комментарии и пустые строки
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

    // Включаем обратно проверку foreign key
    await queryRunner.query(`SET session_replication_role = 'origin'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // При откате удаляем все темы, созданные этой миграцией
    // Можно удалить все темы или только те, которые были созданы этой миграцией
    // Для безопасности удаляем только темы с определенными ID из диапазона
    await queryRunner.query(`
      DELETE FROM "topics" 
      WHERE "ID" BETWEEN 1 AND 1000
    `);
  }
}

