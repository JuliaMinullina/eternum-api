import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Иностранный язык — Английский" из базы данных
const ENGLISH_DISCIPLINE_ID = 'd1f0b9c8-4e7a-4b13-8f6d-8a7b9c0d1e2f';

const englishTopicsData = [
  {
    TopicID: 'f50136ac-c09c-45dd-a19a-f4dc0ead6b86',
    TopicName: 'Алфавит, чтение, базовая орфография',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1842808c-86e5-4faf-8961-d346933660b0',
    TopicName: 'Приветствия, прощания, вежливые фразы (thank you, sorry, please)',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '815fa1a7-8036-4d9a-8a72-44c50d4d01ca',
    TopicName: 'Личная информация: имя, возраст, страна, язык, хобби',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7b9cdaf5-ca52-494b-8fa3-813ddf1b46f6',
    TopicName: 'Семья, родственники, друзья, отношения между людьми',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd6ac6c8a-76a8-4c15-b3b6-a0fa90ad6b13',
    TopicName: 'Внешность и характер человека',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5b233481-21d5-4c88-876b-1432e5b8e5e7',
    TopicName: 'Дом, комнаты, мебель, домашние обязанности',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bbed1804-ad45-470b-a57c-ab90384f6b4f',
    TopicName: 'Школа, уроки, расписание, школьные правила',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9502ed2e-5c4b-4cf0-9cb9-17ea690d2dab',
    TopicName: 'Повседневная жизнь и распорядок дня',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b6307f21-a4fd-4056-8026-fdf865d278fe',
    TopicName: 'Еда и напитки, магазин, кафе, заказы блюд',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f9b5fb7d-28d8-4bbd-8d4f-8662b36aa90a',
    TopicName: 'Хобби, свободное время, развлечения, соцсети',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8d0716a2-5d50-4b93-b21b-ff6780e9b752',
    TopicName: 'Спорт, активный образ жизни, соревнования',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'af84bef7-bb2b-4e08-982c-17ecdb96c901',
    TopicName: 'Здоровье, самочувствие, вредные привычки, визит к врачу',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2a7ddeb1-7a4a-4f4f-8b7e-84b35078c792',
    TopicName: 'Погода, времена года, климат',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '05a0c29b-1108-4f37-815f-3851ceba17d3',
    TopicName: 'Животные, растения, природные зоны',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ed6a4c26-21c2-4c97-9fc2-32be609d7196',
    TopicName: 'Город и деревня, ориентиры, транспорт, путешествия и туризм',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '47c8fb95-2537-4b8c-ac81-8a60958a1dba',
    TopicName: 'Праздники и традиции своей страны и англоязычных стран',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd971d829-c4a2-4cea-8958-54eaa429d1a4',
    TopicName: 'Страны и города, достопримечательности, культурные различия',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '16fc2cd4-2c78-4883-b38a-95aa722cd8f8',
    TopicName: 'Молодёжь и её проблемы: дружба, конфликты, буллинг',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '72e1dedf-3610-4aff-bc36-f0408d28747c',
    TopicName: 'Мода, стиль, самовыражение',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2d5409de-741b-4e27-9c7d-b0360e26c33f',
    TopicName: 'Наука и технологии: гаджеты, интернет, безопасность онлайн',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b79c0575-3860-48cc-88ed-1c09d0a3862b',
    TopicName: 'Экология: загрязнение, переработка, защита природы',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '32f306bd-b48e-4f25-aa26-1aa7fbac7356',
    TopicName: 'Профессии, выбор карьеры, роль английского в профессии',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2fc735ac-0412-4169-9587-c750d1fba793',
    TopicName: 'Биографии и истории известных людей',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4db8fb56-46c2-46ce-b0cf-ca4dbd95ed2a',
    TopicName: 'Чтение адаптированных текстов, рассказов, статей и поиск основной идеи',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '20136e19-61f4-43e3-9487-9beb2c15732e',
    TopicName: 'Описание людей, мест, событий по картинкам и из опыта',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b470837c-1ae5-4e22-a999-7fce5714d99b',
    TopicName: 'Ведение диалога: вопросы–ответы, согласие/несогласие, выражение мнения',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bc054203-5532-4ece-8246-5b9e97795f49',
    TopicName: 'Краткие монологи и устные презентации (о себе, городе, проблеме, проекте)',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '673d5c18-6ca9-42fe-a0f4-271566b35b6a',
    TopicName: 'Написание личных писем и электронных писем (informal e-mail)',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2a51cadf-dca9-4319-8eeb-6649e0bdfc06',
    TopicName: 'Написание коротких рассказов о событиях (story)',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a16a5ba7-48c3-45f8-a808-60127b57f538',
    TopicName: 'Написание описаний (человека, места, праздника)',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7f9aec35-f876-462d-87b8-bd9d4ee111ba',
    TopicName: 'Написание простых эссе: мнение, «за и против», решение проблемы',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '03e11abf-d1de-4ac6-aa18-79f2ad7a341d',
    TopicName: 'Существительные, местоимения, прилагательные, наречия, предлоги',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ffd6af18-163f-431d-92ec-a790e5ae7bb6',
    TopicName: 'Артикли a/an, the и нулевой артикль в основных случаях',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e508e512-963f-47c9-adb3-4032d3e60d20',
    TopicName: 'Основные времена глагола: Present, Past, Future Simple',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '61bef10a-db74-4514-8ee5-f3d202e042db',
    TopicName: 'Расширенные времена: Continuous и Perfect (Present, Past, Future)',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f2848aec-063b-4758-8287-fd3f620cc80b',
    TopicName: 'Модальные глаголы (can, must, have to, should, may, might и др.)',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '18d89812-8b28-4d47-8625-f6424aff24b3',
    TopicName: 'Степени сравнения прилагательных и наречий',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '65e956d8-99f3-47f8-ac10-444546dec8ee',
    TopicName: 'Условные предложения (if-sentences I–III, смешанные случаи на базовом уровне)',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '472086f4-f93a-425e-9dc6-c64640ecbe03',
    TopicName: 'Косвенная речь (reported speech) в основных моделях',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f5a1f930-9020-43a0-b8d9-5032aaa42313',
    TopicName: 'Пассивный залог в самых употребимых временах',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '51363501-ad1f-469c-9cff-786246a31972',
    TopicName: 'Фразовые глаголы и устойчивые выражения, популярные идиомы',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2bc96e31-ac8f-4293-9303-0e627d26b168',
    TopicName: 'Средства логической связи в речи и письме (and, but, however, because, on the one hand…)',
    DisciplineID: ENGLISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по английскому языку...');

    // Проверяем, есть ли уже темы по английскому языку в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: ENGLISH_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по английскому языку. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: ENGLISH_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = englishTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по английскому языку (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по английскому языку
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по английскому языку:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по английскому языку завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Иностранный язык — Английский" (${ENGLISH_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по английскому языку:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
