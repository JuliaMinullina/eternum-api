import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Экология" из базы данных
const ECOLOGY_DISCIPLINE_ID = 'f9b8d7c6-2a5c-4351-8b4f-6c5d7e8f9a0b';

const ecologyTopicsData = [
  {
    TopicID: '981fdb3b-2cc2-4c6f-9206-ed4bc43de340',
    TopicName: 'Экология как наука: объект, предмет, методы, уровни организации живого',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '992747d4-1e13-44ae-8d44-f42a41b7936b',
    TopicName: 'Биосфера и её границы: живое вещество, круговороты веществ, потоки энергии',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9c59bf3c-f1fd-4da2-afc8-fa8eec5eac77',
    TopicName: 'Экосистема: компоненты, пищевая цепь, трофические уровни, пирамиды энергии и биомассы',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '99c63baf-9a44-43eb-94f0-467525f9cb15',
    TopicName: 'Популяция и биоценоз: численность, плотность, видовые взаимоотношения (конкуренция, симбиоз, хищник–жертва)',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a21fca21-da4d-46d4-a709-ce579288f7e2',
    TopicName: 'Биомы Земли: леса, степи, пустыни, тундра, горные экосистемы, водные экосистемы',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '635d5105-0b64-474c-b94a-cd57bbb3a657',
    TopicName: 'Природные ресурсы: возобновимые и невозобновимые, рациональное природопользование',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '025c3baf-3092-4d38-a88d-a3c8e617413b',
    TopicName: 'Антропогенное воздействие на окружающую среду: виды и масштабы влияния',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '33963973-172e-418f-b1d9-749f094e53ad',
    TopicName: 'Загрязнение атмосферы: источники, смоги, кислотные дожди, озоновый слой',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9955261c-5e9f-4870-94ce-8a9d342c358e',
    TopicName: 'Загрязнение гидросферы: сточные воды, нефть, эвтрофикация, пластиковый мусор в океанах',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e6adccdb-12ee-4e9a-b34f-2b43647905c8',
    TopicName: 'Загрязнение литосферы и почв: свалки, агрохимикаты, тяжёлые металлы',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '352dff3d-843c-4383-9769-df9a28a557b8',
    TopicName: 'Промышленные и бытовые отходы: классификация, переработка, раздельный сбор, обращение с опасными отходами',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4d9371e0-cb75-48bb-b917-72a1a1dc028c',
    TopicName: 'Радиационное загрязнение и его последствия для живых организмов',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '29f52321-f7b4-4939-b67e-27c8316eef66',
    TopicName: 'Глобальные экологические проблемы: изменение климата, парниковый эффект, вырубка лесов, опустынивание, потеря биоразнообразия',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b13fc6c4-9f68-4847-be7e-ba77a092e54c',
    TopicName: 'Красная книга: редкие и исчезающие виды, причины исчезновения, меры охраны',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd3680f90-2651-4cb9-a83e-bdc3d7d006f5',
    TopicName: 'Особо охраняемые природные территории: заповедники, национальные парки, заказники',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7d2658cd-5607-4465-b9ea-223baef44b17',
    TopicName: 'Урбанизация и городская среда: городские экосистемы, зелёные зоны, шум и световое загрязнение',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '45e80ec6-a67e-40ba-9a5c-f8012b349a3d',
    TopicName: 'Экология человека: влияние факторов среды на здоровье, экологически обусловленные заболевания',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '154f9e70-1b9e-4d60-9c6c-d87026d16608',
    TopicName: 'Экологическая безопасность: оценка риска, аварии и катастрофы, правила поведения при загрязнении среды',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bfe2eb39-036b-4f7b-939d-1f7eb3a62964',
    TopicName: 'Экологическая политика и законодательство: основные принципы охраны окружающей среды, права и обязанности граждан',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fca13c8e-daa3-4a2a-a88d-943d1c852bf7',
    TopicName: 'Международное сотрудничество в области экологии: глобальные соглашения, экологические организации',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c5a444d5-8b4f-4838-a0ad-5000699a1bf8',
    TopicName: 'Концепция устойчивого развития: баланс экономики, общества и природы',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '99f1141a-349f-463c-8820-bbc619bc1b53',
    TopicName: 'Экологическая культура и этика: отношение к животным, растениям, природным объектам',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0096b354-b2ff-4549-b53e-b0b84bfbf216',
    TopicName: 'Экологичный образ жизни: энерго- и ресурсосбережение, ответственное потребление, «зелёный» быт',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4a6f5d6f-3f76-4dcc-b71e-5ec2c43161db',
    TopicName: 'Экопросвещение и экодобровольчество: акции, волонтёрство, экологические проекты',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '60bb9cea-c6dd-4803-a98d-867b2ec8d24e',
    TopicName: 'Экологический мониторинг: наблюдение, измерения, анализ состояния окружающей среды',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a8b7c6d5-3e4f-4a5b-9c6d-7e8f9a0b1c2d',
    TopicName: 'Исследовательские и учебные проекты по экологии: локальные экологические проблемы, школьный «экологический аудит», создание памяток и рекомендаций',
    DisciplineID: ECOLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по экологии...');

    // Проверяем, есть ли уже темы по экологии в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: ECOLOGY_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по экологии. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: ECOLOGY_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = ecologyTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по экологии (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по экологии
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по экологии:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по экологии завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Экология" (${ECOLOGY_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по экологии:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

