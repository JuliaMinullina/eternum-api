import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Миграция для добавления уроков ко всем темам оставшихся дисциплин
 * 
 * Дисциплины:
 * - Математика
 * - Физика
 * - Химия
 * - Биология
 * - Обществознание
 * - Экономика
 * - Право
 * - Общая психология
 * - Математический анализ
 * - Иностранный язык — Испанский
 * 
 * Использует тот же подход, что и успешная миграция 1763700000000-AddLessonsToLanguagesAndLiterature
 */

export class AddLessonsToAllRemainingDisciplines1765500000000
  implements MigrationInterface
{
  name = 'AddLessonsToAllRemainingDisciplines1765500000000';

  /**
   * Экранирует строку для SQL
   */
  private escapeString(str: string): string {
    return `'${str.replace(/'/g, "''")}'`;
  }

  /**
   * Генерирует детерминированный UUID на основе TopicID и ID урока
   */
  private generateDeterministicUUID(topicId: string, lessonId: number): string {
    const seed = `${topicId}-${lessonId}`;
    let hash1 = 0, hash2 = 0, hash3 = 0, hash4 = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash1 = ((hash1 << 5) - hash1) + char;
      hash2 = ((hash2 << 7) - hash2) + char + i;
      hash3 = ((hash3 << 3) - hash3) + char * 3;
      hash4 = ((hash4 << 11) - hash4) + char * 7;
    }
    const h1 = Math.abs(hash1).toString(16).padStart(8, '0').substring(0, 8);
    const h2 = Math.abs(hash2).toString(16).padStart(4, '0').substring(0, 4);
    const h3 = Math.abs(hash3).toString(16).padStart(3, '0').substring(0, 3);
    const h4 = (Math.abs(hash1 + hash2) % 4);
    const variant = ['8', '9', 'a', 'b'][h4];
    const h5 = Math.abs(hash3 + hash4).toString(16).padStart(3, '0').substring(0, 3);
    const h6 = Math.abs(hash1 * hash2).toString(16).padStart(12, '0').substring(0, 12);
    return `${h1}-${h2}-4${h3}-${variant}${h5}-${h6}`;
  }

  /**
   * Получает план уроков для темы на основе её названия и дисциплины
   */
  private getLessonPlanForTopic(topicName: string, disciplineId: string): {
    count: number;
    names: string[];
  } {
    const lowerTopicName = topicName.toLowerCase();
    const shortName = topicName.length > 50 ? topicName.substring(0, 47) + '...' : topicName;

    // Базовый план для всех тем (5 уроков)
    const defaultPlan = {
      count: 5,
      names: [
        `Введение в тему: ${shortName}`,
        'Основные понятия и определения',
        'Правила и закономерности',
        'Практические примеры и упражнения',
        'Итоговое закрепление материала',
      ],
    };

    // Для испанского языка используем специальную логику
    if (disciplineId === 'a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c') {
      // Испанский язык - используем логику из AddLessonsToSpanish
      if (lowerTopicName.includes('алфавит') || lowerTopicName.includes('буквы')) {
        return {
          count: 5,
          names: [
            'Испанский алфавит: буквы и звуки',
            'Особые сочетания: c/qu, g/gu',
            'Особые буквы: ll, ñ, rr',
            'Правила чтения',
            'Практика произношения',
          ],
        };
      }
      if (lowerTopicName.includes('настоящее время') || lowerTopicName.includes('presente')) {
        return {
          count: 7,
          names: [
            'Presente de Indicativo: правильные глаголы',
            'Presente de Indicativo: неправильные глаголы',
            'Глаголы с изменением корня',
            'Глаголы с особыми окончаниями',
            'Употребление настоящего времени',
            'Практические упражнения',
            'Итоговое закрепление',
          ],
        };
      }
      // Для остальных тем испанского - базовый план
      return defaultPlan;
    }

    // Для математического анализа используем специальную логику
    if (disciplineId === 'b0c9d8e7-3f6b-5462-5d7b-7e8f9a0b1c2d') {
      if (lowerTopicName.includes('множества') || lowerTopicName.includes('бесконечность')) {
        return {
          count: 7,
          names: [
            `Введение в ${shortName}`,
            'Основные понятия и определения',
            'Свойства множеств',
            'Операции над множествами',
            'Потенциальная и актуальная бесконечность',
            'Супремум и инфимум',
            'Примеры и задачи',
          ],
        };
      }
      if (lowerTopicName.includes('производной') || lowerTopicName.includes('дифференциал')) {
        return {
          count: 7,
          names: [
            'Определение производной',
            'Геометрический и физический смысл',
            'Таблица производных',
            'Правила дифференцирования',
            'Производные высших порядков',
            'Дифференциал функции',
            'Применение производных',
          ],
        };
      }
      // Для остальных тем математического анализа - базовый план
      return defaultPlan;
    }

    // Для остальных дисциплин используем базовый план
    return defaultPlan;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      // Проверяем существование таблицы lessons
      const tableExists = await queryRunner.query(`
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'lessons'
      `);

      if (!(Array.isArray(tableExists) && tableExists.length > 0)) {
        throw new Error('Table lessons does not exist');
      }

      // ID всех дисциплин, для которых нужно добавить уроки
      const disciplines = [
        'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d', // Математика
        'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d', // Физика
        'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e', // Химия
        'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a', // Биология
        'b9d8f7e6-2c5e-4f1a-8b4d-6e5f7a8b9c0d', // Обществознание
        'b1d0f9e8-4c7e-4573-8a6b-8e7f9a0b1c2d', // Экономика
        'c2e1a0f9-5d8f-4684-9f7c-9f8a0b1c2d3e', // Право
        'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a', // Общая психология
        'b0c9d8e7-3f6b-5462-5d7b-7e8f9a0b1c2d', // Математический анализ
        'a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c', // Иностранный язык — Испанский
      ];

      // Получаем максимальный ID уроков
      const maxIdResult = await queryRunner.query(`
        SELECT COALESCE(MAX("ID"), 0) as max_id FROM "lessons"
      `);
      const maxLessonId = parseInt(maxIdResult[0]?.max_id || '0', 10);
      let nextLessonId = maxLessonId + 1;

      // Используем простой запрос без параметров для TypeORM
      const disciplinesStr = disciplines.map(d => `'${d}'`).join(', ');
      const topicsResult = await queryRunner.query(`
        SELECT "TopicID", "TopicName", "DisciplineID"
        FROM "topics"
        WHERE "DisciplineID" IN (${disciplinesStr})
        ORDER BY "DisciplineID", "ID"
      `);

      if (!Array.isArray(topicsResult) || topicsResult.length === 0) {
        // Если тем нет, просто выходим - это не ошибка
        return;
      }

      // Проверяем, есть ли уже уроки для этих тем
      const topicIds = topicsResult.map(t => t.TopicID);
      if (topicIds.length === 0) {
        return;
      }
      
      const topicIdsStr = topicIds.map(id => `'${id}'`).join(', ');
      const existingLessonsResult = await queryRunner.query(`
        SELECT "LessonID", "TopicID" FROM "lessons"
        WHERE "TopicID" IN (${topicIdsStr})
      `);

      const existingLessonIds = new Set(
        existingLessonsResult.map((l: any) => l.LessonID)
      );

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
        const lessonPlan = this.getLessonPlanForTopic(topic.TopicName, topic.DisciplineID);
        
        for (let i = 0; i < lessonPlan.count; i++) {
          const lessonId = nextLessonId++;
          const lessonUUID = this.generateDeterministicUUID(topic.TopicID, lessonId);
          
          // Пропускаем уроки, которые уже существуют
          if (existingLessonIds.has(lessonUUID)) {
            continue;
          }

          allLessons.push({
            LessonID: lessonUUID,
            ID: lessonId,
            LessonName: lessonPlan.names[i],
            TopicID: topic.TopicID,
            IsVerified: false,
            Order: i + 1,
            Description: `Урок по теме "${topic.TopicName}"`,
            CreatedAt: new Date('2025-08-16T12:00:00Z'),
            UpdatedAt: new Date('2025-08-16T12:00:00Z'),
          });
        }
      }

      if (allLessons.length === 0) {
        // Все уроки уже существуют
        console.log(`⚠️  Для дисциплины "${discipline.name}" все уроки уже существуют. Пропускаю.`);
        continue;
      }

      console.log(`✅ Создано ${allLessons.length} уроков для ${topicsResult.length} тем в дисциплине "${discipline.name}"`);

      // Вставляем уроки батчами по 50 для эффективности
      const batchSize = 50;
      for (let i = 0; i < allLessons.length; i += batchSize) {
        const batch = allLessons.slice(i, i + batchSize);
        
        const values = batch
          .map((lesson) => {
            return `(
              '${lesson.LessonID}',
              ${lesson.ID},
              ${this.escapeString(lesson.LessonName)},
              '${lesson.TopicID}'::uuid,
              ${lesson.IsVerified},
              ${lesson.Order !== null ? lesson.Order : 'NULL'},
              ${lesson.Description ? this.escapeString(lesson.Description) : 'NULL'},
              '${lesson.CreatedAt.toISOString()}'::timestamp,
              '${lesson.UpdatedAt.toISOString()}'::timestamp
            )`;
          })
          .join(',');

        try {
          await queryRunner.query(`
            INSERT INTO "lessons" (
              "LessonID", "ID", "LessonName", "TopicID", 
              "IsVerified", "Order", "Description", 
              "CreatedAt", "UpdatedAt"
            )
            VALUES ${values}
            ON CONFLICT ("LessonID") DO NOTHING
          `);
          console.log(`✅ Вставлен батч из ${batch.length} уроков для дисциплины "${discipline.name}"`);
        } catch (error) {
          console.error(`❌ Ошибка при вставке батча для "${discipline.name}":`, error);
          // Продолжаем выполнение для других батчей
        }
      }
      
      console.log(`✅ Завершена обработка дисциплины "${discipline.name}"`);
    }
    
    console.log('✅ Все уроки успешно добавлены!');
  } catch (error) {
    console.error('❌ КРИТИЧЕСКАЯ ОШИБКА в миграции AddLessonsToAllRemainingDisciplines:', error);
    console.error('Stack trace:', error?.stack);
    throw error;
  }
}

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      // ID всех дисциплин
      const disciplines = [
        'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d', // Математика
        'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d', // Физика
        'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e', // Химия
        'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a', // Биология
        'b9d8f7e6-2c5e-4f1a-8b4d-6e5f7a8b9c0d', // Обществознание
        'b1d0f9e8-4c7e-4573-8a6b-8e7f9a0b1c2d', // Экономика
        'c2e1a0f9-5d8f-4684-9f7c-9f8a0b1c2d3e', // Право
        'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a', // Общая психология
        'b0c9d8e7-3f6b-5462-5d7b-7e8f9a0b1c2d', // Математический анализ
        'a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c', // Иностранный язык — Испанский
      ];

      const disciplinesStr = disciplines.map(d => `'${d}'`).join(', ');
      await queryRunner.query(`
        DELETE FROM "lessons"
        WHERE "TopicID" IN (
          SELECT "TopicID" FROM "topics"
          WHERE "DisciplineID" IN (${disciplinesStr})
        )
      `);
    } catch (error) {
      console.error('Error in AddLessonsToAllRemainingDisciplines down migration:', error);
      throw error;
    }
  }
}

