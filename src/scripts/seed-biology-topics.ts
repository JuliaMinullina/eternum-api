import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Биология" из seed-disciplines.ts: e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a
const BIOLOGY_DISCIPLINE_ID = 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a';

const biologyTopicsData = [
  {
    TopicID: '7b6f8c12-9e7d-4c2b-9b2d-9b1b9dcf3b61',
    ID: 400,
    TopicName: 'Биология как наука. Уровни организации живого',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b1d7a2b4-2c1a-4371-8c6a-0d6f3f8b2d10',
    ID: 401,
    TopicName: 'Биомолекулы: белки, липиды, углеводы, нуклеиновые кислоты',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a3e5f7c1-4c0c-4b3f-9c8c-1f2a3b4c5d6e',
    ID: 402,
    TopicName: 'Клетка: строение, органоиды и функции',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c4a2b1f9-8b7b-4206-86d1-7b6a9c3f1e55',
    ID: 403,
    TopicName: 'Обмен веществ и энергия. Ферменты и АТФ',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e5b4c3d2-6a1f-4b3a-8c7f-9d1e2f3a4b5c',
    ID: 404,
    TopicName: 'Фотосинтез: световая и темновая фазы',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f6c5d4e3-7b20-4c4b-9d80-0a1b2c3d4e5f',
    ID: 405,
    TopicName:
      'Клеточное дыхание: гликолиз, Кребс, окислительное фосфорилирование',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '08d7e6f5-8121-4d5c-8e91-1b2c3d4e5f60',
    ID: 406,
    TopicName: 'Деление клеток: митоз и мейоз',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '19e8f7a6-9232-4e6d-9fa2-2c3d4e5f6071',
    ID: 407,
    TopicName: 'Наследственность: законы Менделя и решётки Пеннета',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2af908b7-a343-4f7e-8ab3-3d4e5f607182',
    ID: 408,
    TopicName: 'Молекулярная генетика: ДНК, РНК, ген и экспрессия',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3b0a19c8-b454-408f-9bc4-4e5f60718293',
    ID: 409,
    TopicName: 'Изменчивость и мутации. Генетика человека (этика)',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4c1b2ad9-c565-4190-8cd5-5f60718293a4',
    ID: 410,
    TopicName: 'Эволюция: отбор, борьба за существование, СТЭ',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5d2c3bea-d676-42a1-9de6-60718293a4b5',
    ID: 411,
    TopicName: 'Систематика и многообразие живых организмов',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6e3d4cfb-e787-43b2-8ef7-718293a4b5c6',
    ID: 412,
    TopicName: 'Прокариоты: бактерии и археи. Роль в природе и технике',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7f4e5d0c-f898-44c3-9f08-8293a4b5c6d7',
    ID: 413,
    TopicName: 'Вирусы: строение, циклы, взаимодействие с клеткой',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '805f6e1d-0a09-45d4-8109-9394b5c6d7e8',
    ID: 414,
    TopicName: 'Грибы и лишайники: особенности организации и роль',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '91607f2e-1b1a-46e5-921a-a4b5c6d7e8f9',
    ID: 415,
    TopicName: 'Растения: ткани и органы. Жизненные формы',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a271803f-2c2b-47f6-a32b-b5c6d7e8f901',
    ID: 416,
    TopicName: 'Минеральное питание и транспорт веществ у растений',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b3829140-3d3c-48a7-b43c-c6d7e8f90112',
    ID: 417,
    TopicName: 'Размножение растений и онтогенез',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c493a251-4e4d-49b8-c54d-d7e8f9011223',
    ID: 418,
    TopicName: 'Животные: ткани и системы органов (обзор)',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd5a4b362-5f5e-4ac9-d65e-e8f901122334',
    ID: 419,
    TopicName: 'Человек: анатомия и физиология (общий обзор)',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e6b5c473-606f-4bda-e76f-f90112233445',
    ID: 420,
    TopicName: 'Пищеварительная система. Питание и обмен веществ',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f7c6d584-7170-4ceb-f880-091223344556',
    ID: 421,
    TopicName: 'Кровь, иммунитет и кровообращение',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '08d7e695-8281-40fc-8891-112233445567',
    ID: 422,
    TopicName: 'Дыхательная система и газообмен',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '19e8f7a6-9392-41fd-9aa2-223344556678',
    ID: 423,
    TopicName: 'Выделительная система и водно-солевой баланс',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2af908b7-a403-42f1-8ab3-334455667789',
    ID: 424,
    TopicName: 'Нервная система и органы чувств. Поведение',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3b0a19c8-b564-4b12-9bc4-44556677889a',
    ID: 425,
    TopicName: 'Эндокринная регуляция и гомеостаз',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4c1b2ad9-c675-4c23-8cd5-5566778899ab',
    ID: 426,
    TopicName: 'Размножение и развитие человека. Здоровье и профилактика',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5d2c3bea-d786-4d34-9de6-66778899aabb',
    ID: 427,
    TopicName: 'Экосистемы: структура, трофические уровни и потоки энергии',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6e3d4cfb-e897-4e45-8ef7-778899aabbcc',
    ID: 428,
    TopicName: 'Популяции и биоценозы. Экологические ниши',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7f4e5d0c-f9a8-4f56-9f08-8899aabbccdd',
    ID: 429,
    TopicName: 'Биогеохимические циклы и биосфера',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '805f6e1d-0b19-4067-8109-99aabbccdde0',
    ID: 430,
    TopicName: 'Биоразнообразие и охрана природы. Устойчивое развитие',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '91607f2e-1c2a-4178-921a-aabbccddeeff',
    ID: 431,
    TopicName: 'Биотехнологии и генная инженерия (обзор возможностей и рисков)',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a271803f-2d3a-4289-a32b-bbccddeeff00',
    ID: 432,
    TopicName: 'Методы биологии: микроскопия, ПЦР, секвенирование (обзор)',
    DisciplineID: BIOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('🧬 Начинаю заполнение тем по биологии...');

    // Проверяем, есть ли уже темы по биологии в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: BIOLOGY_DISCIPLINE_ID },
    });

    if (existingCount > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingCount} тем по биологии. Очищаю темы для этой дисциплины...`,
      );
      await topicRepository.delete({ DisciplineID: BIOLOGY_DISCIPLINE_ID });
    }

    // Создаем темы по биологии
    const createdTopics = await topicRepository.save(biologyTopicsData);

    console.log(`✅ Успешно создано ${createdTopics.length} тем по биологии:`);

    // Группируем темы по разделам биологии для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Введение в биологию': [],
      'Молекулярная биология': [],
      'Клеточная биология': [],
      Генетика: [],
      'Эволюция и систематика': [],
      Микробиология: [],
      Ботаника: [],
      'Зоология и анатомия человека': [],
      Экология: [],
      'Современная биология': [],
    };

    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);

      // Категоризация тем
      if (
        topicName.includes('Биология как наука') ||
        topicName.includes('Уровни организации')
      ) {
        categorizedTopics['Введение в биологию'].push(topicName);
      } else if (
        topicName.includes('Биомолекулы') ||
        topicName.includes('белки') ||
        topicName.includes('липиды') ||
        topicName.includes('углеводы') ||
        topicName.includes('нуклеиновые') ||
        topicName.includes('ДНК') ||
        topicName.includes('РНК') ||
        topicName.includes('ген') ||
        topicName.includes('экспрессия')
      ) {
        categorizedTopics['Молекулярная биология'].push(topicName);
      } else if (
        topicName.includes('Клетка') ||
        topicName.includes('органоиды') ||
        topicName.includes('Обмен веществ') ||
        topicName.includes('Ферменты') ||
        topicName.includes('АТФ') ||
        topicName.includes('Фотосинтез') ||
        topicName.includes('дыхание') ||
        topicName.includes('гликолиз') ||
        topicName.includes('Кребс') ||
        topicName.includes('Деление клеток') ||
        topicName.includes('митоз') ||
        topicName.includes('мейоз')
      ) {
        categorizedTopics['Клеточная биология'].push(topicName);
      } else if (
        topicName.includes('Наследственность') ||
        topicName.includes('Менделя') ||
        topicName.includes('Молекулярная генетика') ||
        topicName.includes('Изменчивость') ||
        topicName.includes('мутации') ||
        topicName.includes('Генетика человека')
      ) {
        categorizedTopics['Генетика'].push(topicName);
      } else if (
        topicName.includes('Эволюция') ||
        topicName.includes('отбор') ||
        topicName.includes('Систематика') ||
        topicName.includes('многообразие')
      ) {
        categorizedTopics['Эволюция и систематика'].push(topicName);
      } else if (
        topicName.includes('Прокариоты') ||
        topicName.includes('бактерии') ||
        topicName.includes('археи') ||
        topicName.includes('Вирусы') ||
        topicName.includes('Грибы') ||
        topicName.includes('лишайники')
      ) {
        categorizedTopics['Микробиология'].push(topicName);
      } else if (
        topicName.includes('Растения') ||
        topicName.includes('ткани и органы') ||
        topicName.includes('Минеральное питание') ||
        topicName.includes('транспорт веществ') ||
        topicName.includes('Размножение растений') ||
        topicName.includes('онтогенез')
      ) {
        categorizedTopics['Ботаника'].push(topicName);
      } else if (
        topicName.includes('Животные') ||
        topicName.includes('Человек') ||
        topicName.includes('анатомия') ||
        topicName.includes('физиология') ||
        topicName.includes('Пищеварительная') ||
        topicName.includes('Кровь') ||
        topicName.includes('иммунитет') ||
        topicName.includes('кровообращение') ||
        topicName.includes('Дыхательная') ||
        topicName.includes('газообмен') ||
        topicName.includes('Выделительная') ||
        topicName.includes('водно-солевой') ||
        topicName.includes('Нервная') ||
        topicName.includes('органы чувств') ||
        topicName.includes('Поведение') ||
        topicName.includes('Эндокринная') ||
        topicName.includes('гомеостаз') ||
        topicName.includes('Размножение и развитие') ||
        topicName.includes('Здоровье')
      ) {
        categorizedTopics['Зоология и анатомия человека'].push(topicName);
      } else if (
        topicName.includes('Экосистемы') ||
        topicName.includes('трофические') ||
        topicName.includes('Популяции') ||
        topicName.includes('биоценозы') ||
        topicName.includes('Экологические') ||
        topicName.includes('Биогеохимические') ||
        topicName.includes('биосфера') ||
        topicName.includes('Биоразнообразие') ||
        topicName.includes('охрана природы')
      ) {
        categorizedTopics['Экология'].push(topicName);
      } else if (
        topicName.includes('Биотехнологии') ||
        topicName.includes('генная инженерия') ||
        topicName.includes('Методы биологии') ||
        topicName.includes('микроскопия') ||
        topicName.includes('ПЦР') ||
        topicName.includes('секвенирование')
      ) {
        categorizedTopics['Современная биология'].push(topicName);
      }
    });

    console.log('\n📊 Распределение тем по разделам биологии:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n🧬 ${category} (${topics.length} тем):`);
        topics.forEach((topic) => {
          console.log(`   - ${topic}`);
        });
      }
    });

    console.log('\n🎉 Заполнение тем по биологии завершено успешно!');
    console.log(`📈 Всего создано: ${createdTopics.length} тем`);
    console.log(
      `🔗 Привязано к дисциплине: "Биология" (${BIOLOGY_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по биологии:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
