import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Иностранный язык — Французский" из базы данных
const FRENCH_DISCIPLINE_ID = 'f3b2d1c0-6a9c-4d35-8b8f-0c9d1e2f3a4b';

const frenchTopicsData = [
  {
    TopicID: '35a2b8de-4499-41d6-aeae-42da68d70837',
    TopicName: 'Французский алфавит, чтение, базовые правила чтения и ударения',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e198e3d1-9440-44d9-a41b-0a7cee671851',
    TopicName: 'Приветствия, прощания, вежливые формулы (bonjour, au revoir, s\'il vous plaît, merci, pardon)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9b7a2a00-6f26-45d9-bc03-719919550f61',
    TopicName: 'Личная информация: имя, возраст, национальность, город, язык, контакты',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '85ac51a3-4ae2-42fa-b262-ebce0266ec8c',
    TopicName: 'Семья и родственники, отношения в семье',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '212afac1-73fa-428e-af26-28f28edc3cbf',
    TopicName: 'Друзья, одноклассники, внешность и характер человека',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3f41f9eb-5de4-4bd8-b01c-167e93f4ef07',
    TopicName: 'Дом, квартира, комнаты, мебель, домашние обязанности',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '43dc980d-fd8d-431c-9ed0-5f20046a792a',
    TopicName: 'Школа: предметы, расписание, оценки, школьные правила и традиции во Франции',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c0ba321-c2e3-49a9-8cbc-871d786d16da',
    TopicName: 'Повседневная жизнь и распорядок дня (будни, выходные, каникулы)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8bf324e9-745b-41ab-97e8-3b5c167ae219',
    TopicName: 'Хобби, увлечения, спорт, кружки и клубы по интересам',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '951b35e5-8993-4229-95b4-067456e61a63',
    TopicName: 'Еда и напитки, приёмы пищи, французская кухня, кафе и ресторан, покупки продуктов',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2870ae9b-19b7-4720-a400-49b2959d6b22',
    TopicName: 'Погода, времена года, климат, соответствующая одежда',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6a2fcee7-cbfd-404f-bce1-57e9a3c84e96',
    TopicName: 'Животные, природа, город и деревня, окружающая среда',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '029f50b7-c2dc-4778-ae26-fc9965163854',
    TopicName: 'Город: улицы, магазины, достопримечательности, транспорт, ориентирование',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9c5765d6-d5f5-4790-9980-e6d37368dbce',
    TopicName: 'Путешествия и туризм: страны и города, отели, экскурсии',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7a22b2a8-2057-4d68-8254-a627e4111132',
    TopicName: 'Праздники и традиции Франции и франкоязычных стран; сопоставление с родной страной',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '983d4ddc-683b-4e41-8e01-df3cbf518536',
    TopicName: 'Молодёжь: свободное время, музыка, кино, интернет, соцсети во франкоязычном мире',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '924dc083-ef51-4851-9f2c-698b099b02a4',
    TopicName: 'Здоровье, самочувствие, простые симптомы, визит к врачу, здоровый образ жизни',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '98451e24-142d-4e59-80fc-9b843e0c96f4',
    TopicName: 'Мода, внешний вид, самопрезентация и стиль',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9e6cab2a-958c-4ce8-8537-57e3d06ac26d',
    TopicName: 'Профессии, мечты о будущем, выбор карьеры, роль французского языка',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c4f027e2-901e-4925-9768-70216d3565ab',
    TopicName: 'Экология: мусор, переработка, экономия ресурсов, проблемы города/планеты',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '13150cbc-7544-4bc1-b8fb-7c44178b0d43',
    TopicName: 'Франкоязычные страны: география, символы, культура, известные люди',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cf0bbc67-e206-4ea7-aa9b-7247c17032ab',
    TopicName: 'Чтение коротких и адаптированных текстов: диалоги, объявления, письма, рассказы, статьи для подростков',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1e48bf95-f8e2-4dff-9184-6f1dbedb899d',
    TopicName: 'Понимание основной мысли текста и извлечение нужной информации (кто? где? когда? почему?)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b9699f1d-fb49-4a38-a7b6-c386518d0d60',
    TopicName: 'Описание людей, мест, событий по картинкам и жизненным ситуациям',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6f69c1db-7e05-4e54-a072-69f087334593',
    TopicName: 'Простые диалоги: знакомство, просьба, благодарность, согласие/несогласие',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '481e0f45-25bf-4fa1-b2bf-7b59981e47a0',
    TopicName: 'Диалоги в типичных ситуациях: магазин, кафе, вокзал/аэропорт, школа, врач',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '94ed24ee-07ea-4fbd-a9c7-fb37d9fceb43',
    TopicName: 'Краткие монологи и устные сообщения о себе, семье, школе, городе, планах',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cf74219b-656d-40fb-bc76-c7a92d5c9e4d',
    TopicName: 'Устные мини-презентации (о празднике, поездке, культурном явлении, проекте)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e1bccd15-2cf1-4165-802c-cdde0fc37950',
    TopicName: 'Написание коротких записок, открыток, SMS/чат-сообщений на французском',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fe99a34c-49d9-4722-8fce-966bbdbb4349',
    TopicName: 'Написание личных писем/электронных писем другу (e-mail / lettre personnelle)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '800456cd-0029-4ab0-bf90-e0680e8c8fe1',
    TopicName: 'Краткие рассказы о прошедших событиях (каникулы, поездка, праздник, школьное мероприятие)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7ea27310-d88d-49ab-9a4d-bad3d065b4e3',
    TopicName: 'Описания людей, мест, бытовых ситуаций простыми предложениями',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4393640f-9297-42ba-b4da-a88352de65e1',
    TopicName: 'Небольшие тексты-мнения (мне нравится/не нравится, «за и против» простым языком)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9f35ef7f-5beb-49f4-a7a0-e5f1038eb43e',
    TopicName: 'Существительные и артикли (определённый/неопределённый/частичный, род и число), образование множественного числа',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5aaf8b63-8fae-4027-9a8f-e3229f8ed596',
    TopicName: 'Личные, притяжательные, указательные и вопросительные местоимения',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '094c8267-4b81-44e3-92b6-1ac9ccd2d174',
    TopicName: 'Порядок слов в утвердительном предложении, общем и специальном вопросе, отрицании (ne…pas)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9fa978c3-3556-4716-990e-13cd7d4e661c',
    TopicName: 'Настоящее время (Présent) правильных и основных неправильных глаголов, глаголы être, avoir, aller, faire',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c647e8c-a764-405b-a9ff-2899f00f8c3d',
    TopicName: 'Сложные конструкции с глаголами aller + infinitif (ближайшее будущее) и venir de + infinitif (недавнее прошлое)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '01aa2b18-7358-48f6-9aa5-8b9e03c40c29',
    TopicName: 'Прошедшее время: Passé composé с avoir и être (движение, возвратные глаголы)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '49c7b0b3-2838-4e94-a709-860ca2d4395b',
    TopicName: 'Основы Imperfait и различие с Passé composé на простых примерах',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dcbada2e-1e64-49ee-9812-8a3b95539bd5',
    TopicName: 'Будущее время Futur proche / Futur simple (на уровне школьной программы)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd6e963e2-cdd8-426c-9967-93ffe2a145ae',
    TopicName: 'Степени сравнения прилагательных (plus… que, moins… que, aussi… que; le plus / le moins)',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd01c668f-f1c3-4fc0-9430-9151d549ada7',
    TopicName: 'Основные предлоги места и времени и устойчивые обороты с ними',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1a0e1d9a-d145-4523-bb82-53e3b71336b5',
    TopicName: 'Простые придаточные предложения с parce que, quand, si и базовый порядок слов',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f2f2b191-9af1-4f28-a16b-1fab0a0f121a',
    TopicName: 'Расширение словаря за счёт устойчивых выражений, типичных разговорных фраз и базовых идиом французской речи',
    DisciplineID: FRENCH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по французскому языку...');

    // Проверяем, есть ли уже темы по французскому языку в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: FRENCH_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по французскому языку. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: FRENCH_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = frenchTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по французскому языку (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по французскому языку
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по французскому языку:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по французскому языку завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Иностранный язык — Французский" (${FRENCH_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по французскому языку:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

