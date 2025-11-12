import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Математика" из базы данных: b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d
const MATHEMATICS_DISCIPLINE_ID = 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d';

const mathematicsTopicsData = [
  {
    TopicID: 'a0a9d1e8-2c9f-4d3a-bc7a-8b8e6c0f3d3a',
    ID: 100,
    TopicName: 'Натуральные числа и действия',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b1c8f2a7-6e3d-4a1c-8c8e-2d2a0b7e9f4d',
    ID: 101,
    TopicName: 'Дроби: обыкновенные и десятичные',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c2d7e3b6-1f4a-4b2d-9a1e-3f5c8d7a0e1f',
    ID: 102,
    TopicName: 'Проценты и пропорции',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd3e6f4c5-2a5b-4c3e-8b2f-4a6d9e1c2b3a',
    ID: 103,
    TopicName: 'Степени и корни (обзор)',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e4f5a6d7-3b6c-4d4f-9c3a-5b7e0f2d3c4b',
    ID: 104,
    TopicName: 'Алгебраические выражения и преобразования',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f5a6b7c8-4c7d-4e50-8d4b-6c8f1a3e4d5c',
    ID: 105,
    TopicName: 'Линейные уравнения и неравенства',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '06b7c8d9-5d8e-4151-9e5c-7d9f2b4f5e6d',
    ID: 106,
    TopicName: 'Системы линейных уравнений',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '17c8d9ea-6e9f-4262-8f6d-8e0a3c5f6a7e',
    ID: 107,
    TopicName: 'Функция и график функции (обзор)',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '28d9ea0b-7faf-4373-9a7e-9f1b4d6a7b8c',
    ID: 108,
    TopicName: 'Линейная функция',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '39ea0b1c-80b0-4484-8b8f-a02c5e7b8c9d',
    ID: 109,
    TopicName: 'Квадратичная функция: свойства и график',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4afb1c2d-91c1-4595-9c0a-b13d6f8c9d0e',
    ID: 110,
    TopicName: 'Многочлены и разложение на множители',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5b0c2d3e-a2d2-46a6-8d1b-c24e709dae1f',
    ID: 111,
    TopicName: 'Рациональные дроби и преобразования выражений',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6c1d3e4f-b3e3-47b7-9e2c-d35f81aebf20',
    ID: 112,
    TopicName: 'Иррациональные выражения и радикалы',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7d2e4f50-c4f4-48c8-8f3d-e46092bf0c31',
    ID: 113,
    TopicName: 'Показательная и логарифмическая функции (вводный курс)',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8e3f5061-d505-4999-9a4e-f571a3c01d42',
    ID: 114,
    TopicName: 'Последовательности и прогрессии',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9f405172-e616-4aaa-8b5f-0682b4d12e53',
    ID: 115,
    TopicName: 'Элементы комбинаторики',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a0516283-f727-4bbb-9c60-1793c5e23f64',
    ID: 116,
    TopicName: 'Вероятность: элементарные события',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b1627394-0838-4ccc-8d71-28a4d6f34a75',
    ID: 117,
    TopicName: 'Статистика и представление данных',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c27384a5-1949-4ddd-9e82-39b5e8045b86',
    ID: 118,
    TopicName: 'Логика и доказательства. Методы решения',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd38495b6-2a5a-4eee-8f93-4ac6f9156c97',
    ID: 119,
    TopicName: 'Координатная плоскость и векторы (вводный курс)',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e495a6c7-3b6b-4fff-9aa4-5bd70a267da8',
    ID: 120,
    TopicName: 'Планиметрия: параллельные прямые и углы',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f5a6b7c8-4c7d-4000-8db5-6ce81b378eb9',
    ID: 121,
    TopicName: 'Треугольники: равенство и подобие',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '06b7c8d9-5d8e-4111-9ec6-7df92c489fca',
    ID: 122,
    TopicName: 'Многоугольники',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '17c8d9ea-6e9f-4222-8fd7-8e0a3c59afd0',
    ID: 123,
    TopicName: 'Окружность: углы, хорды, касательные',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '28d9ea0b-7faf-4333-9a08-9f1b4d6a7bd1',
    ID: 124,
    TopicName: 'Геометрические преобразования: симметрия, поворот, перенос',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '39ea0b1c-80b0-4444-8b19-a02c5e7b8c02',
    ID: 125,
    TopicName: 'Площадь фигур. Теорема Пифагора',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4afb1c2d-91c1-4555-9c2a-b13d6f8c9d13',
    ID: 126,
    TopicName: 'Стереометрия: призмы, пирамиды, цилиндр, конус, шар',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5b0c2d3e-a2d2-4666-8d3b-c24e709dae24',
    ID: 127,
    TopicName: 'Объёмы и площади поверхностей тел',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6c1d3e4f-b3e3-4777-9e4c-d35f81aebf35',
    ID: 128,
    TopicName: 'Тригонометрия: основные соотношения',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7d2e4f50-c4f4-4888-8f5d-e46092bf0c46',
    ID: 129,
    TopicName: 'Тригонометрические уравнения и преобразования',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8e3f5061-d505-4999-9a5e-f571a3c01d57',
    ID: 130,
    TopicName: 'Производная и её приложения (вводный курс)',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9f405172-e616-4aaa-8b6f-0682b4d12e68',
    ID: 131,
    TopicName: 'Первообразная и определённый интеграл (вводный курс)',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a0516283-f727-4bbb-9c70-1793c5e23f79',
    ID: 132,
    TopicName: 'Комплексные числа (вводный курс)',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b1627394-0838-4ccc-8d81-28a4d6f34a8a',
    ID: 133,
    TopicName: 'Уравнения и неравенства с параметрами (базовый курс)',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c27384a5-1949-4ddd-9e92-39b5e8045b9b',
    ID: 134,
    TopicName: 'Модуль и его свойства',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd38495b6-2a5a-4eee-8fa3-4ac6f9156ca0',
    ID: 135,
    TopicName: 'Теория чисел: делимость, простые числа',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e495a6c7-3b6b-4fff-9ab4-5bd70a267db1',
    ID: 136,
    TopicName: 'Алгоритмы и эвристики решения задач',
    DisciplineID: MATHEMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('🧮 Начинаю заполнение тем по математике...');

    // Проверяем, есть ли уже темы по математике в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: MATHEMATICS_DISCIPLINE_ID },
    });

    if (existingCount > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingCount} тем по математике. Очищаю темы для этой дисциплины...`,
      );
      await topicRepository.delete({ DisciplineID: MATHEMATICS_DISCIPLINE_ID });
    }

    // Создаем темы по математике
    const createdTopics = await topicRepository.save(mathematicsTopicsData);

    console.log(
      `✅ Успешно создано ${createdTopics.length} тем по математике:`,
    );

    // Группируем темы по категориям для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Арифметика и числа': [],
      Алгебра: [],
      Функции: [],
      Геометрия: [],
      Тригонометрия: [],
      'Математический анализ': [],
      'Вероятность и статистика': [],
      'Дополнительные темы': [],
    };

    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);

      // Категоризация тем
      if (
        topicName.includes('Натуральные числа') ||
        topicName.includes('Дроби') ||
        topicName.includes('Проценты') ||
        topicName.includes('Теория чисел')
      ) {
        categorizedTopics['Арифметика и числа'].push(topicName);
      } else if (
        topicName.includes('Алгебраические') ||
        topicName.includes('уравнения') ||
        topicName.includes('неравенства') ||
        topicName.includes('Многочлены') ||
        topicName.includes('Степени') ||
        topicName.includes('Системы') ||
        topicName.includes('Рациональные') ||
        topicName.includes('Иррациональные') ||
        topicName.includes('параметрами') ||
        topicName.includes('Модуль')
      ) {
        categorizedTopics['Алгебра'].push(topicName);
      } else if (
        topicName.includes('функци') ||
        topicName.includes('график') ||
        topicName.includes('Линейная') ||
        topicName.includes('Квадратичная') ||
        topicName.includes('Показательная') ||
        topicName.includes('логарифмическая') ||
        topicName.includes('Последовательности')
      ) {
        categorizedTopics['Функции'].push(topicName);
      } else if (
        topicName.includes('Планиметрия') ||
        topicName.includes('Треугольники') ||
        topicName.includes('Многоугольники') ||
        topicName.includes('Окружность') ||
        topicName.includes('преобразования') ||
        topicName.includes('Площадь') ||
        topicName.includes('Стереометрия') ||
        topicName.includes('Объёмы') ||
        topicName.includes('Координатная') ||
        topicName.includes('векторы') ||
        topicName.includes('Пифагора')
      ) {
        categorizedTopics['Геометрия'].push(topicName);
      } else if (topicName.includes('Тригонометр')) {
        categorizedTopics['Тригонометрия'].push(topicName);
      } else if (
        topicName.includes('Производная') ||
        topicName.includes('интеграл')
      ) {
        categorizedTopics['Математический анализ'].push(topicName);
      } else if (
        topicName.includes('комбинаторик') ||
        topicName.includes('Вероятность') ||
        topicName.includes('Статистика')
      ) {
        categorizedTopics['Вероятность и статистика'].push(topicName);
      } else {
        categorizedTopics['Дополнительные темы'].push(topicName);
      }
    });

    console.log('\n📊 Распределение тем по разделам математики:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n🧮 ${category} (${topics.length} тем):`);
        topics.forEach((topic) => {
          console.log(`   - ${topic}`);
        });
      }
    });

    console.log('\n🎉 Заполнение тем по математике завершено успешно!');
    console.log(`📈 Всего создано: ${createdTopics.length} тем`);
    console.log(
      `🔗 Привязано к дисциплине: "Математика" (${MATHEMATICS_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по математике:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
