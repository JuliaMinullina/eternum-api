import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Миграция для добавления уроков ко всем темам дисциплин "Языки и литература"
 * 
 * Дисциплины:
 * - Русский язык
 * - Литература
 * - Иностранный язык — Английский
 * - Иностранный язык — Немецкий
 * - Иностранный язык — Французский
 * - Иностранный язык — Китайский
 * - Иностранный язык — Арабский
 * 
 * Для каждой темы создается от 3 до 10 уроков в зависимости от сложности темы.
 */

export class AddLessonsToLanguagesAndLiterature1763700000000
  implements MigrationInterface
{
  name = 'AddLessonsToLanguagesAndLiterature1763700000000';

  /**
   * Экранирует строку для SQL
   */
  private escapeString(str: string): string {
    return `'${str.replace(/'/g, "''")}'`;
  }

  /**
   * Генерирует уроки для темы
   */
  private generateLessonsForTopic(
    topicId: string,
    topicName: string,
    lessonCount: number,
    lessonNames: string[],
    startLessonId: number,
  ): Array<{
    LessonID: string;
    ID: number;
    LessonName: string;
    TopicID: string;
    IsVerified: boolean;
    Order: number;
    Description: string | null;
    CreatedAt: Date;
    UpdatedAt: Date;
  }> {
    const lessons: Array<{
      LessonID: string;
      ID: number;
      LessonName: string;
      TopicID: string;
      IsVerified: boolean;
      Order: number;
      Description: string | null;
      CreatedAt: Date;
      UpdatedAt: Date;
    }> = [];
    const baseDate = new Date('2025-08-16T12:00:00Z');

    for (let i = 0; i < lessonCount; i++) {
      // UUID будет сгенерирован в SQL запросе на основе topicId и ID
      // Здесь используем временный ID, который будет заменен при вставке
      const tempId = `temp-${topicId}-${startLessonId + i}`;
      lessons.push({
        LessonID: tempId, // Временный ID, будет заменен при вставке
        ID: startLessonId + i,
        LessonName: lessonNames[i] || `Урок ${i + 1}: ${topicName}`,
        TopicID: topicId,
        IsVerified: false,
        Order: i + 1,
        Description: null,
        CreatedAt: baseDate,
        UpdatedAt: baseDate,
      });
    }

    return lessons;
  }

  /**
   * Получает план уроков для темы на основе её названия
   */
  private getLessonPlanForTopic(topicName: string): {
    count: number;
    names: string[];
  } {
    const lowerTopicName = topicName.toLowerCase();
    const shortName = topicName.length > 50 ? topicName.substring(0, 47) + '...' : topicName;

    // Очень простые темы (3 урока) - базовые навыки
    if (
      lowerTopicName.includes('алфавит') ||
      lowerTopicName.includes('приветствия') ||
      lowerTopicName.includes('прощания') ||
      lowerTopicName.includes('числа и счёт') ||
      lowerTopicName.includes('единицы времени')
    ) {
      return {
        count: 3,
        names: [
          `Введение: основы ${shortName}`,
          `Практика и применение`,
          `Закрепление навыков`,
        ],
      };
    }

    // Простые темы (4 урока) - базовые понятия
    if (
      lowerTopicName.includes('личная информация') ||
      lowerTopicName.includes('семья') ||
      lowerTopicName.includes('друзья') ||
      lowerTopicName.includes('дом') ||
      lowerTopicName.includes('школа') ||
      lowerTopicName.includes('хобби') ||
      lowerTopicName.includes('еда') ||
      lowerTopicName.includes('погода')
    ) {
      return {
        count: 4,
        names: [
          `Введение в тему: ${shortName}`,
          `Основная лексика и выражения`,
          `Практика в диалогах`,
          `Закрепление и применение`,
        ],
      };
    }

    // Средние темы (5-6 уроков) - грамматические темы
    if (
      lowerTopicName.includes('времена глагола') ||
      lowerTopicName.includes('present') ||
      lowerTopicName.includes('past') ||
      lowerTopicName.includes('future') ||
      lowerTopicName.includes('артикли') ||
      lowerTopicName.includes('местоимения') ||
      lowerTopicName.includes('предлоги') ||
      lowerTopicName.includes('степени сравнения')
    ) {
      return {
        count: 6,
        names: [
          `Введение: что такое ${shortName}`,
          `Правила и структура`,
          `Исключения и особые случаи`,
          `Практические упражнения`,
          `Типичные ошибки и их исправление`,
          `Итоговое закрепление`,
        ],
      };
    }

    // Средне-сложные темы (6-7 уроков) - части речи
    if (
      lowerTopicName.includes('существительное') ||
      lowerTopicName.includes('прилагательное') ||
      lowerTopicName.includes('глагол') ||
      lowerTopicName.includes('числительное') ||
      lowerTopicName.includes('наречие') ||
      lowerTopicName.includes('причастие') ||
      lowerTopicName.includes('деепричастие')
    ) {
      return {
        count: 7,
        names: [
          `Введение: ${shortName} в системе языка`,
          `Грамматические категории`,
          `Формы и склонения`,
          `Правила употребления`,
          `Практические примеры`,
          `Орфографические правила`,
          `Итоговое закрепление`,
        ],
      };
    }

    // Сложные темы (7-8 уроков) - синтаксис, пунктуация
    if (
      lowerTopicName.includes('синтаксис') ||
      lowerTopicName.includes('предложение') ||
      lowerTopicName.includes('пунктуация') ||
      lowerTopicName.includes('сложные предложения') ||
      lowerTopicName.includes('словосочетание') ||
      lowerTopicName.includes('члены предложения')
    ) {
      return {
        count: 8,
        names: [
          `Введение: основы ${shortName}`,
          `Структура и типы`,
          `Правила построения`,
          `Знаки препинания`,
          `Практический разбор`,
          `Сложные случаи`,
          `Типичные ошибки`,
          `Итоговое закрепление`,
        ],
      };
    }

    // Очень сложные темы (8-9 уроков) - литературоведение
    if (
      lowerTopicName.includes('литература как искусство') ||
      lowerTopicName.includes('методы анализа') ||
      lowerTopicName.includes('сюжет') ||
      lowerTopicName.includes('образная система') ||
      lowerTopicName.includes('тропы') ||
      lowerTopicName.includes('стиховедение') ||
      lowerTopicName.includes('роды литературы') ||
      lowerTopicName.includes('литературные направления')
    ) {
      return {
        count: 9,
        names: [
          `Введение: ${shortName}`,
          `Теоретические основы`,
          `Ключевые понятия и термины`,
          `Историческое развитие`,
          `Анализ примеров`,
          `Практические задания`,
          `Сравнительный анализ`,
          `Сложные случаи и нюансы`,
          `Итоговое закрепление`,
        ],
      };
    }

    // Историко-литературные темы (10 уроков)
    if (
      lowerTopicName.includes('русская литература') ||
      lowerTopicName.includes('мировая литература') ||
      lowerTopicName.includes('эпоха') ||
      lowerTopicName.includes('век') ||
      lowerTopicName.includes('серебряный век') ||
      lowerTopicName.includes('просвещение') ||
      lowerTopicName.includes('возрождение')
    ) {
      return {
        count: 10,
        names: [
          `Введение: исторический контекст эпохи`,
          `Основные литературные направления`,
          `Ключевые авторы и их биографии`,
          `Характерные произведения`,
          `Анализ ключевых текстов`,
          `Литературные жанры и стили`,
          `Влияние на культуру`,
          `Сравнение с другими эпохами`,
          `Современное прочтение`,
          `Итоговое обобщение`,
        ],
      };
    }

    // Тематические лексические темы (5 уроков)
    if (
      lowerTopicName.includes('лексика по теме') ||
      lowerTopicName.includes('диалоги') ||
      lowerTopicName.includes('чтение') ||
      lowerTopicName.includes('написание') ||
      lowerTopicName.includes('монологи')
    ) {
      return {
        count: 5,
        names: [
          `Введение: ${shortName}`,
          `Основная лексика и фразы`,
          `Грамматические конструкции`,
          `Практика: диалоги и тексты`,
          `Закрепление навыков`,
        ],
      };
    }

    // По умолчанию для остальных тем (5 уроков)
    return {
      count: 5,
      names: [
        `Введение в тему: ${shortName}`,
        `Основные понятия и определения`,
        `Правила и закономерности`,
        `Практические примеры и упражнения`,
        `Итоговое закрепление материала`,
      ],
    };
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('📚 Начинаю добавление уроков для дисциплин "Языки и литература"...');

    // Проверяем существование таблицы lessons
    const tableExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'lessons'
    `);

    if (!(Array.isArray(tableExists) && tableExists.length > 0)) {
      throw new Error('Table lessons does not exist');
    }

    // Проверяем существование колонок
    const isVerifiedExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons' 
      AND column_name = 'IsVerified'
    `);

    if (!(Array.isArray(isVerifiedExists) && isVerifiedExists.length > 0)) {
      throw new Error('Column IsVerified does not exist. Please run migration 1763600000000-AddFieldsToLessons first.');
    }

    // Получаем максимальный ID уроков
    const maxIdResult = await queryRunner.query(`
      SELECT COALESCE(MAX("ID"), 0) as max_id FROM "lessons"
    `);
    const maxLessonId = parseInt(maxIdResult[0]?.max_id || '0', 10);
    let nextLessonId = maxLessonId + 1;

    // Получаем все темы для дисциплин "Языки и литература"
    const disciplines = [
      '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d', // Русский язык
      '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f', // Литература
      'd1f0b9c8-4e7a-4b13-8f6d-8a7b9c0d1e2f', // Иностранный язык — Английский
      'e2a1c0b9-5f8b-4c24-9a7e-9b8c0d1e2f3a', // Иностранный язык — Немецкий
      'f3b2d1c0-6a9c-4d35-8b8f-0c9d1e2f3a4b', // Иностранный язык — Французский
      'b4c3d2e1-7f0b-4806-9d1b-1e2f3a4b5c6d', // Иностранный язык — Китайский
      'c5d4e3f2-8a1c-4917-0e2c-2f3a4b5c6d7e', // Иностранный язык — Арабский
    ];

    // Используем простой запрос без параметров для TypeORM
    const disciplinesStr = disciplines.map(d => `'${d}'`).join(', ');
    const topicsResult = await queryRunner.query(`
      SELECT "TopicID", "TopicName", "DisciplineID"
      FROM "topics"
      WHERE "DisciplineID" IN (${disciplinesStr})
      ORDER BY "DisciplineID", "ID"
    `);

    if (!Array.isArray(topicsResult) || topicsResult.length === 0) {
      console.log('⚠️  Темы для дисциплин "Языки и литература" не найдены');
      return;
    }

    console.log(`📝 Найдено ${topicsResult.length} тем для обработки`);

    // Проверяем, есть ли уже уроки для этих тем
    const topicIds = topicsResult.map(t => t.TopicID);
    if (topicIds.length === 0) {
      console.log('⚠️  Темы не найдены');
      return;
    }
    
    const topicIdsStr = topicIds.map(id => `'${id}'`).join(', ');
    const existingLessons = await queryRunner.query(`
      SELECT COUNT(*) as count FROM "lessons"
      WHERE "TopicID" IN (${topicIdsStr})
    `);

    const existingCount = parseInt(existingLessons[0]?.count || '0', 10);
    if (existingCount > 0) {
      console.log(`⚠️  Для некоторых тем уже существуют ${existingCount} уроков. Пропускаем создание дубликатов (используется ON CONFLICT DO NOTHING).`);
      // Продолжаем выполнение - ON CONFLICT DO NOTHING пропустит существующие уроки
    }

    // Генерируем уроки для каждой темы
    const allLessons: Array<{
      LessonID: string;
      ID: number;
      LessonName: string;
      TopicID: string;
      IsVerified: boolean;
      Order: number;
      Description: string | null;
      CreatedAt: Date;
      UpdatedAt: Date;
    }> = [];

    for (const topic of topicsResult) {
      const lessonPlan = this.getLessonPlanForTopic(topic.TopicName);
      const lessons = this.generateLessonsForTopic(
        topic.TopicID,
        topic.TopicName,
        lessonPlan.count,
        lessonPlan.names,
        nextLessonId,
      );
      allLessons.push(...lessons);
      nextLessonId += lessonPlan.count;
    }

    console.log(`📚 Создано ${allLessons.length} уроков для ${topicsResult.length} тем`);

    // Вставляем уроки батчами по 50 для эффективности
    const batchSize = 50;
    for (let i = 0; i < allLessons.length; i += batchSize) {
      const batch = allLessons.slice(i, i + batchSize);
      
      // Создаем значения для INSERT, используя uuid_generate_v4() для LessonID
      const values = batch
        .map(
          (lesson, idx) => {
            // Генерируем детерминированный UUID на основе TopicID и ID урока
            // Формат UUID v4: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (36 символов)
            const seed = `${lesson.TopicID}-${lesson.ID}`;
            let hash1 = 0, hash2 = 0, hash3 = 0, hash4 = 0;
            for (let i = 0; i < seed.length; i++) {
              const char = seed.charCodeAt(i);
              hash1 = ((hash1 << 5) - hash1) + char;
              hash2 = ((hash2 << 7) - hash2) + char + i;
              hash3 = ((hash3 << 3) - hash3) + char * 3;
              hash4 = ((hash4 << 11) - hash4) + char * 7;
            }
            // Генерируем части UUID (8-4-4-4-12 символов)
            // Формат UUID v4: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
            // где y - одна из 8, 9, a, b
            const h1 = Math.abs(hash1).toString(16).padStart(8, '0').substring(0, 8);
            const h2 = Math.abs(hash2).toString(16).padStart(4, '0').substring(0, 4);
            const h3 = Math.abs(hash3).toString(16).padStart(3, '0').substring(0, 3);
            const h4 = (Math.abs(hash1 + hash2) % 4); // 0-3 для выбора 8,9,a,b
            const variant = ['8', '9', 'a', 'b'][h4];
            const h5 = Math.abs(hash3 + hash4).toString(16).padStart(3, '0').substring(0, 3);
            const h6 = Math.abs(hash1 * hash2).toString(16).padStart(12, '0').substring(0, 12);
            const lessonId = `${h1}-${h2}-4${h3}-${variant}${h5}-${h6}`;
            
            return `(
              '${lessonId}',
              ${lesson.ID},
              ${this.escapeString(lesson.LessonName)},
              '${lesson.TopicID}'::uuid,
              ${lesson.IsVerified},
              ${lesson.Order !== null ? lesson.Order : 'NULL'},
              ${lesson.Description ? this.escapeString(lesson.Description) : 'NULL'},
              '${lesson.CreatedAt.toISOString()}'::timestamp,
              '${lesson.UpdatedAt.toISOString()}'::timestamp
            )`;
          }
        )
        .join(',');

      await queryRunner.query(`
        INSERT INTO "lessons" (
          "LessonID", "ID", "LessonName", "TopicID", 
          "IsVerified", "Order", "Description", 
          "CreatedAt", "UpdatedAt"
        )
        VALUES ${values}
        ON CONFLICT ("LessonID") DO NOTHING
      `);
    }

    console.log('✅ Уроки успешно добавлены!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('🔄 Откатываю добавление уроков...');

    // Удаляем уроки для тем дисциплин "Языки и литература"
    const disciplines = [
      '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d', // Русский язык
      '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f', // Литература
      'd1f0b9c8-4e7a-4b13-8f6d-8a7b9c0d1e2f', // Иностранный язык — Английский
      'e2a1c0b9-5f8b-4c24-9a7e-9b8c0d1e2f3a', // Иностранный язык — Немецкий
      'f3b2d1c0-6a9c-4d35-8b8f-0c9d1e2f3a4b', // Иностранный язык — Французский
      'b4c3d2e1-7f0b-4806-9d1b-1e2f3a4b5c6d', // Иностранный язык — Китайский
      'c5d4e3f2-8a1c-4917-0e2c-2f3a4b5c6d7e', // Иностранный язык — Арабский
    ];

    const disciplinesStr = disciplines.map(d => `'${d}'`).join(', ');
    await queryRunner.query(`
      DELETE FROM "lessons"
      WHERE "TopicID" IN (
        SELECT "TopicID" FROM "topics"
        WHERE "DisciplineID" IN (${disciplinesStr})
      )
    `);

    console.log('✅ Откат завершен');
  }
}

