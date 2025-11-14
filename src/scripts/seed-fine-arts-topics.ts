import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Изобразительное искусство" из базы данных
const FINE_ARTS_DISCIPLINE_ID = 'b5d4f3e2-8c1e-4f57-8d0b-2e1f3a4b5c6d';

const fineArtsTopicsData = [
  {
    TopicID: 'c0e5e0a0-e223-4c06-b567-f462cf290d8b',
    TopicName: 'Изобразительное искусство в жизни человека, роль художественного труда',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ed0be470-9982-4cd8-8a42-acba7465df74',
    TopicName: 'Виды изобразительного искусства: живопись, графика, скульптура, декоративно-прикладное искусство, дизайн, архитектура, экранные визуальные искусства',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e3b04d72-cf0d-4bc5-a19b-6a16cc3c443b',
    TopicName: 'Художественный образ и язык искусства: точка, линия, пятно, силуэт, форма, объём, пространство, ритм, пропорции, композиция',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '641a8f9d-f565-433d-a9d5-72e63025f483',
    TopicName: 'Цвет и свет: цветовой круг, тёплые/холодные цвета, контрасты, тон, колорит, светотень',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '81e9f555-0c6c-40f0-add9-bbeab5cb8622',
    TopicName: 'Материалы и техники: карандаш, тушь, уголь, пастель, акварель, гуашь, смешанные техники; правила работы и техника безопасности',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a9321819-7177-488a-a883-9996e095a4ce',
    TopicName: 'Рисунок с натуры: геометрические тела, бытовые предметы, учебный натюрморт; пропорции, конструкция формы, передача объёма',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '97828e6f-401b-443b-81c2-d2aa259d6f05',
    TopicName: 'Натюрморт: композиция, фактура предметов, материал, освещение и настроение',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dc392fc5-936c-46e9-aaca-44bc5edde751',
    TopicName: 'Пейзаж: природа и городской пейзаж, плановость, воздушная перспектива, состояние погоды',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fbe7adc7-ab9b-40d6-bae6-775514d846e2',
    TopicName: 'Портрет и фигура человека: пропорции головы и тела, характер, мимика, поза',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f7f5ee4f-b0e8-44f3-a45e-58f05abfe077',
    TopicName: 'Анималистика: изображение животных, передача движения и пластики',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '77c31bc7-78fc-4369-813d-714ae16611d3',
    TopicName: 'Жанровая композиция: люди в быту и труде, выбор сюжета и момента действия',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ded67bc1-d656-430c-b620-c2b3f1a12802',
    TopicName: 'Основы перспективы: линия горизонта, точка схода, уменьшение предметов вдаль, перекрытие форм',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '42093e44-8805-44b7-a981-517ce32a9ec6',
    TopicName: 'Декоративная композиция: стилизация формы, орнамент, ритм, симметрия и асимметрия, декоративный цвет',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '81abf316-5f40-4992-b87e-9a55b2b2427c',
    TopicName: 'Народное и декоративно-прикладное искусство народов России: росписи, резьба, вышивка, игрушка, костюм; использование мотивов в своих работах',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b6843089-32e2-425f-aa07-0a87dca8a592',
    TopicName: 'Символ и знак в изобразительном искусстве: гербы, эмблемы, условные изображения',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fc389c9a-404c-478a-9794-979a50705a84',
    TopicName: 'Архитектура и предметно-пространственная среда: форма здания, силуэт города, интерьер, садово-парковое искусство',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5725661c-5821-4d26-ad9b-30a0433e1e13',
    TopicName: 'Основы дизайна: дизайн предметов и одежды, графический дизайн (плакат, реклама, логотип, упаковка)',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5f3c762a-3019-4f76-b948-579ca67874ec',
    TopicName: 'Книжная иллюстрация и шрифт: иллюстрирование текста, титульный лист, макет страницы, декоративный шрифт',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c0392e01-06f3-4cfc-8457-377b9a34d034',
    TopicName: 'Театр, кино, телевидение как сферы применения ИЗО: декорации, костюм, грим, афиша, кадр',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '811e863c-13d4-4939-b53b-482311508715',
    TopicName: 'Восприятие и анализ произведений искусства: тема, сюжет, композиция, цвет, свет, настроение, собственное мнение',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7c1f429d-c618-4992-8ae0-5a8f5f156500',
    TopicName: 'Искусство родного края: местные художники, архитектура, музеи и выставки региона',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '030f9e29-7ba9-413e-a0a7-ba0bb0148759',
    TopicName: 'Современные визуальные практики: фотография, плакат, комикс, цифровая графика и анимация',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '70889722-b9da-4a59-ba41-ddf1c0bd7b6c',
    TopicName: 'Организация художественной деятельности: эскиз, выбор материалов, выполнение, оформление, участие в выставке/проектах',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '90f8aa7b-a74c-429b-97ba-971229f5904a',
    TopicName: 'Личная творческая практика и портфолио: серия работ, развитие авторского стиля, самооценка и рефлексия',
    DisciplineID: FINE_ARTS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по изобразительному искусству...');

    // Проверяем, есть ли уже темы по изобразительному искусству в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: FINE_ARTS_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по изобразительному искусству. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: FINE_ARTS_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = fineArtsTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по изобразительному искусству (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по изобразительному искусству
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по изобразительному искусству:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по изобразительному искусству завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Изобразительное искусство" (${FINE_ARTS_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по изобразительному искусству:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

