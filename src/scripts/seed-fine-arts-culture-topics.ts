import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Мировая художественная культура" из базы данных
const FINE_ARTS_CULTURE_DISCIPLINE_ID = 'd6e5f4a3-9b2d-5028-1f3d-3a4b5c6d7e8f';

const fineArtsCultureTopicsData = [
  {
    TopicID: '9e03da6b-dab6-4870-a1a2-ca62dcaf8518',
    TopicName: 'Понятие художественной культуры: культура, искусство, стиль, жанр, художественный образ',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b6374058-ca1e-4ebb-a074-eb295c871800',
    TopicName: 'Виды искусств: архитектура, изобразительное искусство, скульптура, декоративно-прикладное искусство, литература, музыка, театр, кино, балет, фотография, медиа-арт',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2205f257-fb5c-4e5d-96ad-0f6722f5839a',
    TopicName: 'Первобытное искусство: наскальные росписи, статуэтки, мегалиты, магико-ритуальная функция',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8c9262d5-ee9d-481c-97ae-7b15a2e61653',
    TopicName: 'Искусство древнейших цивилизаций: Египет, Месопотамия, Индия, Китай (храм, пирамида, рельеф, культовые образы)',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6d3cb9f5-31b0-4cca-8734-a375d60340a4',
    TopicName: 'Художественная культура Древней Греции: храм, ордер, скульптура, вазопись, театр',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '46585f2e-bded-428e-888b-b52b62ddb922',
    TopicName: 'Искусство Древнего Рима: архитектура (форум, амфитеатр, термы), скульптура, мозаика, роль Рима в распространении античной традиции',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dae0450e-6da3-465a-8a1a-f0ea23ca759b',
    TopicName: 'Художественная культура Средневековой Европы: романика и готика, собор, витраж, икона, книжная миниатюра',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8ce56f68-7d0c-40f9-8731-b239a682427e',
    TopicName: 'Византия и Древняя Русь: храм, икона, фреска, мозаика, синтез веры и искусства',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c56c0804-0dd5-400a-a549-e2293a024503',
    TopicName: 'Художественная культура средневекового Востока: исламская архитектура, каллиграфия, орнамент, миниатюра, буддийское искусство',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c3d67004-6502-4f33-8a4f-c2cd6ccee83a',
    TopicName: 'Ренессанс в Италии и Северной Европе: человек как мера вещей, перспектива, портрет, монументальная живопись, шедевры Леонардо, Микеланджело, Рафаэля',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '12a80abc-b8d4-4843-9b1b-02c44dcd5e43',
    TopicName: 'Искусство барокко и классицизма в Европе и России: дворец, парк, театр, парадный портрет, мифологический и исторический сюжет',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '21db22d0-ddc7-43b9-b204-2d0acfb0c55b',
    TopicName: 'Искусство XVIII века в России: Петербург как художественный центр, архитектура, живопись, скульптура',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ae3f6112-bd24-4e23-a4f7-942de751ab5b',
    TopicName: 'Искусство XIX века в Европе: романтизм, реализм, импрессионизм, постимпрессионизм',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'da621eb4-5437-41c5-8cdc-30333b4037e3',
    TopicName: 'Русское искусство XIX века: от классицизма к реализму, передвижники, национальные мотивы',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '390f54cb-c3d2-49f8-83d3-384fe3a78fc1',
    TopicName: 'Архитектура и градостроительство XIX – начала XX века: эклектика, модерн, новые материалы и технологии',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b5de843e-9dae-4218-bf72-d7ffc0519e24',
    TopicName: 'Искусство первой половины XX века: авангард, кубизм, футуризм, абстракция, Баухауз, новые формы в архитектуре и дизайне',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8b6dc07c-2fcc-40c3-adb3-99f5cda7bca2',
    TopicName: 'Русский и советский авангард: Малевич, Кандинский, конструктивизм, дизайн и плакат',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2424c4b6-c334-4db2-8ee9-1b75a3e0f13c',
    TopicName: 'Искусство второй половины XX – начала XXI века: поп-арт, концептуализм, перформанс, инсталляция, стрит-арт, цифровое искусство',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '788b3dbc-626d-45f6-b5ce-5a6d3112e3e8',
    TopicName: 'Музыка в системе МХК: народная, классическая, джаз, рок, академическая и массовая музыка в контексте эпох',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd71edd24-742a-4c9c-9d2b-abc0b44c6b30',
    TopicName: 'Театр, опера и балет: драматический театр, музыкальный театр, роль режиссёра, артиста, сценографии',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '11e44744-4444-4704-bc32-2bc1dae35fbe',
    TopicName: 'Кино и анимация как виды художественной культуры: язык кино, монтаж, режиссура, основные направления и шедевры мирового и отечественного кино',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1eacf828-7a0d-44a6-b1ef-6eff539651d0',
    TopicName: 'Декоративно-прикладное искусство и дизайн: национальные традиции, орнамент, художественные промыслы, современный промышленный дизайн',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1757b5cd-e4fb-4b2a-87b6-9ea812bc24cd',
    TopicName: 'Религия и искусство: христианская, мусульманская, буддийская и другие художественные традиции (на уровне культурных образов, а не богословия)',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '160bbc73-f1ca-4ce9-86da-16ce848dca71',
    TopicName: 'Национальные художественные школы мира: Европа, Россия, Восток, Америка, Африка, Латинская Америка (обзор, диалог культур)',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2607cd08-b746-4275-8a84-6c2d2d5e5daf',
    TopicName: 'Художественная культура родного края: архитектура, музеи, памятники, локальные художники и коллективы',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1436dbd3-8edc-4d32-965e-34b9c9a5daa3',
    TopicName: 'Анализ произведения искусства: тема, сюжет, композиция, цвет, свет, пространство, символика, авторская позиция',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'eed5e588-de02-4e6b-a989-f0ccde87131d',
    TopicName: 'Музей, выставка, театр, филармония, кинотеатр как культурное пространство; правила поведения и навыки «культурного потребления»',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '18a651b9-f6bd-446e-8013-ac3e08b1cce0',
    TopicName: 'Современное искусство и медиа: реклама, клипы, компьютерные игры, соцсети — граница между массовой культурой и искусством',
    DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по мировой художественной культуре...');

    // Проверяем, есть ли уже темы по МХК в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по МХК. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = fineArtsCultureTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по МХК (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по МХК
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по МХК:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по мировой художественной культуре завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Мировая художественная культура" (${FINE_ARTS_CULTURE_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по МХК:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

