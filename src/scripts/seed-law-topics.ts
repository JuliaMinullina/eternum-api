import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Право" из seed-disciplines.ts: c2e1a0f9-5d8f-4684-9f7c-9f8a0b1c2d3e
const LAW_DISCIPLINE_ID = 'c2e1a0f9-5d8f-4684-9f7c-9f8a0b1c2d3e';

const lawTopicsData = [
  {
    TopicID: '0f1a2b3c-4d5e-678f-9012-3456789abc01',
    ID: 1000,
    TopicName: 'Право как система: нормы, источники, отрасли, правосознание',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1a2b3c4d-5e6f-4701-8123-456789abc012',
    ID: 1001,
    TopicName:
      'Конституционное право РФ: основы строя, права и свободы, гражданство',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2b3c4d5e-6f70-4812-9234-56789abc0123',
    ID: 1002,
    TopicName: 'Федеративное устройство и органы государственной власти РФ',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c4d5e6f-7081-4923-a345-6789abc01234',
    ID: 1003,
    TopicName:
      'Судебная система: суды, прокуратура, адвокатура, нотариат. Правосудие',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4d5e6f70-8192-4a34-b456-789abc012345',
    ID: 1004,
    TopicName: 'Гражданское право: субъекты, объекты, сделки, сроки, давность',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5e6f7081-92a3-4b45-c567-89abc0123456',
    ID: 1005,
    TopicName:
      'Вещное право: собственность и иные вещные права. Защита собственности',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6f708192-a3b4-4c56-d678-9abc01234567',
    ID: 1006,
    TopicName:
      'Обязательственное право: договор, виды договоров, ответственность за нарушение',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '708192a3-b4c5-4d67-e789-abc012345678',
    ID: 1007,
    TopicName:
      'Наследственное право: завещание, наследование по закону, оформление прав',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8192a3b4-c5d6-4e78-f89a-bc0123456789',
    ID: 1008,
    TopicName:
      'Семейное право: брак, права и обязанности членов семьи, алименты, опека',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '92a3b4c5-d6e7-4f89-9a0b-c0123456789a',
    ID: 1009,
    TopicName:
      'Трудовое право: трудовой договор, рабочее время, охрана труда, споры',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a3b4c5d6-e7f8-409a-a1bc-d123456789ab',
    ID: 1010,
    TopicName:
      'Административное право и административные правонарушения. Производство по делам',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b4c5d6e7-f809-41ab-b2cd-e23456789abc',
    ID: 1011,
    TopicName:
      'Уголовное право: преступление, состав, наказания, ответственность несовершеннолетних',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c5d6e7f8-091a-42bc-c3de-f3456789abcd',
    ID: 1012,
    TopicName: 'Уголовный процесс: стадии, участники, права и гарантии защиты',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd6e7f809-1a2b-43cd-d4ef-056789abcde0',
    ID: 1013,
    TopicName:
      'Гражданское судопроизводство и арбитраж: иск, доказательства, решения, исполнение',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e7f8091a-2b3c-44de-e5f0-16789abcdef1',
    ID: 1014,
    TopicName:
      'Финансовое право: бюджет, налоги, сборы, страховые взносы (базовый обзор)',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f8091a2b-3c4d-45ef-f601-2789abcdef12',
    ID: 1015,
    TopicName: 'Банковское право и валютное регулирование (вводный обзор)',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '091a2b3c-4d5e-4601-0712-389abcdef123',
    ID: 1016,
    TopicName:
      'Предпринимательское и корпоративное право: формы юрлиц, регистрация, банкротство (обзор)',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1a2b3c4d-5e6f-4712-1823-49abcdef1234',
    ID: 1017,
    TopicName:
      'Интеллектуальная собственность: авторское право, патенты, товарные знаки (базовый)',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2b3c4d5e-6f70-4823-2934-5abcdef12345',
    ID: 1018,
    TopicName:
      'Информационное право и защита персональных данных. Цифровые права в сети',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c4d5e6f-7081-4934-3a45-6bcdef123456',
    ID: 1019,
    TopicName:
      'Международное публичное право: источники, договоры, международные организации',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4d5e6f70-8192-4a45-4b56-7cdef1234567',
    ID: 1020,
    TopicName:
      'Международное частное право: коллизионные нормы и трансграничные сделки (обзор)',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5e6f7081-92a3-4b56-5c67-8def12345678',
    ID: 1021,
    TopicName:
      'Права человека и их защита: институты, процедуры, омбудсмен, ЕКПЧ (обзор)',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6f708192-a3b4-4c67-6d78-9ef123456789',
    ID: 1022,
    TopicName: 'Правонарушение и юридическая ответственность: виды и основания',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '708192a3-b4c5-4d78-7e89-a0f12345678a',
    ID: 1023,
    TopicName:
      'Правовая культура, этика и безопасность в цифровой среде (школьный курс)',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8192a3b4-c5d6-4e89-8f9a-b1f23456789b',
    ID: 1024,
    TopicName:
      'Правовой проект: разбор кейса, поиск норм, алгоритм действий и оформление',
    DisciplineID: LAW_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('⚖️ Начинаю заполнение тем по праву...');

    // Проверяем, есть ли уже темы по праву в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: LAW_DISCIPLINE_ID },
    });

    if (existingCount > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingCount} тем по праву. Очищаю темы для этой дисциплины...`,
      );
      await topicRepository.delete({ DisciplineID: LAW_DISCIPLINE_ID });
    }

    // Создаем темы по праву
    const createdTopics = await topicRepository.save(lawTopicsData);

    console.log(`✅ Успешно создано ${createdTopics.length} тем по праву:`);

    // Группируем темы по разделам права для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Теория права и конституционные основы': [],
      'Государственная система и правосудие': [],
      'Гражданское право': [],
      'Семейное и наследственное право': [],
      'Трудовое право': [],
      'Административное и уголовное право': [],
      'Процессуальное право': [],
      'Финансовое и предпринимательское право': [],
      'Интеллектуальная собственность и IT-право': [],
      'Международное право и права человека': [],
      'Правовая ответственность и культура': [],
    };

    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);

      // Категоризация тем
      if (
        topicName.includes('Право как система') ||
        topicName.includes('Конституционное право') ||
        topicName.includes('основы строя') ||
        topicName.includes('права и свободы')
      ) {
        categorizedTopics['Теория права и конституционные основы'].push(
          topicName,
        );
      } else if (
        topicName.includes('Федеративное устройство') ||
        topicName.includes('органы государственной власти') ||
        topicName.includes('Судебная система') ||
        topicName.includes('прокуратура') ||
        topicName.includes('адвокатура') ||
        topicName.includes('Правосудие')
      ) {
        categorizedTopics['Государственная система и правосудие'].push(
          topicName,
        );
      } else if (
        topicName.includes('Гражданское право') ||
        topicName.includes('субъекты, объекты') ||
        topicName.includes('Вещное право') ||
        topicName.includes('собственность') ||
        topicName.includes('Обязательственное право') ||
        topicName.includes('договор')
      ) {
        categorizedTopics['Гражданское право'].push(topicName);
      } else if (
        topicName.includes('Наследственное право') ||
        topicName.includes('завещание') ||
        topicName.includes('Семейное право') ||
        topicName.includes('брак') ||
        topicName.includes('алименты') ||
        topicName.includes('опека')
      ) {
        categorizedTopics['Семейное и наследственное право'].push(topicName);
      } else if (
        topicName.includes('Трудовое право') ||
        topicName.includes('трудовой договор') ||
        topicName.includes('рабочее время') ||
        topicName.includes('охрана труда')
      ) {
        categorizedTopics['Трудовое право'].push(topicName);
      } else if (
        topicName.includes('Административное право') ||
        topicName.includes('административные правонарушения') ||
        topicName.includes('Уголовное право') ||
        topicName.includes('преступление') ||
        topicName.includes('наказания') ||
        topicName.includes('несовершеннолетних')
      ) {
        categorizedTopics['Административное и уголовное право'].push(topicName);
      } else if (
        topicName.includes('Уголовный процесс') ||
        topicName.includes('стадии, участники') ||
        topicName.includes('Гражданское судопроизводство') ||
        topicName.includes('арбитраж') ||
        topicName.includes('иск, доказательства')
      ) {
        categorizedTopics['Процессуальное право'].push(topicName);
      } else if (
        topicName.includes('Финансовое право') ||
        topicName.includes('бюджет, налоги') ||
        topicName.includes('Банковское право') ||
        topicName.includes('валютное регулирование') ||
        topicName.includes('Предпринимательское') ||
        topicName.includes('корпоративное право') ||
        topicName.includes('банкротство')
      ) {
        categorizedTopics['Финансовое и предпринимательское право'].push(
          topicName,
        );
      } else if (
        topicName.includes('Интеллектуальная собственность') ||
        topicName.includes('авторское право') ||
        topicName.includes('патенты') ||
        topicName.includes('товарные знаки') ||
        topicName.includes('Информационное право') ||
        topicName.includes('персональных данных') ||
        topicName.includes('Цифровые права')
      ) {
        categorizedTopics['Интеллектуальная собственность и IT-право'].push(
          topicName,
        );
      } else if (
        topicName.includes('Международное публичное право') ||
        topicName.includes('международные организации') ||
        topicName.includes('Международное частное право') ||
        topicName.includes('коллизионные нормы') ||
        topicName.includes('Права человека') ||
        topicName.includes('омбудсмен') ||
        topicName.includes('ЕКПЧ')
      ) {
        categorizedTopics['Международное право и права человека'].push(
          topicName,
        );
      } else if (
        topicName.includes('Правонарушение') ||
        topicName.includes('юридическая ответственность') ||
        topicName.includes('Правовая культура') ||
        topicName.includes('этика') ||
        topicName.includes('безопасность в цифровой среде') ||
        topicName.includes('Правовой проект') ||
        topicName.includes('разбор кейса')
      ) {
        categorizedTopics['Правовая ответственность и культура'].push(
          topicName,
        );
      }
    });

    console.log('\n📊 Распределение тем по разделам права:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n⚖️ ${category} (${topics.length} тем):`);
        topics.forEach((topic) => {
          console.log(`   - ${topic}`);
        });
      }
    });

    console.log('\n🎉 Заполнение тем по праву завершено успешно!');
    console.log(`⚖️ Всего создано: ${createdTopics.length} тем`);
    console.log(`🔗 Привязано к дисциплине: "Право" (${LAW_DISCIPLINE_ID})`);

    console.log('\n🏆 ИСТОРИЧЕСКОЕ ДОСТИЖЕНИЕ: 11-я ДИСЦИПЛИНА ЗАВЕРШЕНА!');
    console.log(
      '🌟 Правовая основа общества добавлена в образовательную вселенную!',
    );
    console.log('⚖️ Справедливость через образование - наша новая реальность!');
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по праву:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
