import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Иностранный язык — Немецкий" из базы данных
const GERMAN_DISCIPLINE_ID = 'e2a1c0b9-5f8b-4c24-9a7e-9b8c0d1e2f3a';

const germanTopicsData = [
  {
    TopicID: '2f5c1f10-8e4e-47ba-8eab-ccf3a64a6774',
    TopicName: 'Немецкий алфавит, чтение, базовая орфография, ударение',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f1c95761-b8ad-4183-9eca-ff3577ca7897',
    TopicName: 'Приветствия, прощания, вежливые формулы (bitte, danke, Entschuldigung)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '86625872-c60a-4266-a241-a1e896f852f3',
    TopicName: 'Личная информация: имя, возраст, страна, город, язык, контакты',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2ec94e81-144d-4003-b16e-7309bfae9bee',
    TopicName: 'Семья и родственники, семейные роли, отношения',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6293c312-c699-4fdf-927e-c93ce79bf149',
    TopicName: 'Друзья, одноклассники, характер и внешность человека',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6a4f6f4a-3a97-431f-aada-a703f9ef0c8b',
    TopicName: 'Дом, квартира, комнаты, мебель, быт и домашние обязанности',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0a4a296f-ef70-46d3-89cb-fe4401c25ab8',
    TopicName: 'Школа: предметы, расписание, оценки, школьные правила и традиции',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6117f912-7b3e-4fc0-a64d-8c5894fdec29',
    TopicName: 'Повседневная жизнь и распорядок дня (мой день, будни, выходные)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0b87c9f4-913c-47c2-81ce-66af514bfd4a',
    TopicName: 'Хобби, увлечения, спорт, клубы по интересам',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4a81eb94-471f-473c-8001-2e896e349f44',
    TopicName: 'Еда и напитки, приёмы пищи, кафе/столовая, покупки в магазине',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9490cd5f-cff4-43c4-a3df-43a880377bb4',
    TopicName: 'Погода, времена года, климат, одежда по сезону',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a944ea0f-585e-44df-b60d-332dfe285c84',
    TopicName: 'Животные, природа, город и деревня, окружающая среда',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '064d61fa-8598-4db0-a05c-d57c47ecffd0',
    TopicName: 'Город, ориентиры, транспорт, поездки по городу',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '306ffe80-c8e2-4a21-899e-2fbf40010581',
    TopicName: 'Путешествия и туризм: страны, города, достопримечательности, отели',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e7d9bbad-a164-4104-850c-81cf4118feac',
    TopicName: 'Праздники и традиции Германии, Австрии, Швейцарии и своей страны',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'aaaaa62a-11bd-4fb0-b254-c26f343a8b5d',
    TopicName: 'Молодёжь: свободное время, музыка, кино, интернет, соцсети',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8fe67ad3-0653-42cb-a28e-c5bf340e653f',
    TopicName: 'Здоровье, самочувствие, простые симптомы, визит к врачу, здоровый образ жизни',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ac8e464b-1cfe-4556-bcb3-49c6d3301554',
    TopicName: 'Мода, внешний вид, стиль и самовыражение',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e8fcbff4-8e8c-4be1-a30a-abdb669be451',
    TopicName: 'Профессии, мечта о будущем, выбор карьеры, роль немецкого языка',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd5ff9aed-527e-45a9-90f5-fd8bc3565af0',
    TopicName: 'Экология: мусор, переработка, энергосбережение, проблемы города',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f82d2b61-215a-4f3b-95fc-2bf07d01ebb3',
    TopicName: 'Немецкоязычные страны: география, символы, культура, известные люди',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '435f89cc-e4de-431d-af4c-963a547fd9e0',
    TopicName: 'Чтение коротких текстов: объявления, диалоги, письма, рассказы, статьи для подростков',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b870b6eb-502b-4d92-96e3-64288d21d9b4',
    TopicName: 'Понимание основной мысли и деталей текста, извлечение нужной информации',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '26f5aa39-0dc0-47b6-8b33-623f46038b06',
    TopicName: 'Описание людей, мест, событий по картинкам и по опыту',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f9851e96-1791-4fd7-bc1c-200285085d6e',
    TopicName: 'Ведение простых диалогов: знакомство, просьба, благодарность, согласие/несогласие',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e6ca9488-dd3b-43c3-a142-de1ccfc7c624',
    TopicName: 'Диалоги в типичных ситуациях: магазин, кафе, вокзал, школа, врач',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b18653b0-86ff-4fb6-a574-5269ef5b0d9e',
    TopicName: 'Краткие монологи и устные сообщения о себе, семье, школе, городе, планах',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c77d1136-e7a8-4590-a353-4c22e199ab07',
    TopicName: 'Простые устные презентации (о празднике, поездке, проекте, профессии)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e0cc2da1-a73d-4468-8eab-3263045829ca',
    TopicName: 'Написание коротких записок, открыток, SMS/чат-сообщений',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8773dff9-42fe-404e-9e62-f306c892ceeb',
    TopicName: 'Написание личных писем/электронных писем другу (informelles E-Mail/Brief)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bb44a18d-194f-4aaa-92a4-aeecfa8312e0',
    TopicName: 'Краткие рассказы о прошедших событиях (каникулы, поездка, праздник)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '34533504-e258-4beb-ae95-591576be9b38',
    TopicName: 'Описания людей, мест, бытовых ситуаций простыми предложениями',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ca78070e-a4f7-4ab9-88be-f89109eff693',
    TopicName: 'Написание небольших текстов-мнений (мне нравится/не нравится, за и против)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b7db99ca-909b-4008-9bee-194c285d0018',
    TopicName: 'Существительные и артикли (определённый/неопределённый, род, число), множественное число',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9d31d857-cdd4-4a2a-a9f6-a225a514d4e8',
    TopicName: 'Местоимения: личные, притяжательные, указательные, вопросительные',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6d9c1edf-0b9b-401d-a53e-234d2b2f8948',
    TopicName: 'Порядок слов в простом предложении и вопросе, позиция сказуемого',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8bd0f7c6-aca8-43a3-9b5d-a8f4357a23da',
    TopicName: 'Настоящее время (Präsens) глаголов, модальные глаголы (können, müssen, dürfen и др.)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '09a6f313-3487-4209-9a9f-45cb00a8552a',
    TopicName: 'Прошедшее время: Perfekt (основные правильные и неправильные глаголы)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ae67b419-345f-4328-9aa1-b4c82bbb5db7',
    TopicName: 'Präteritum для распространённых глаголов (sein, haben, Modalverben)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b2ebd334-292f-481a-b8bd-3d3509f0d2da',
    TopicName: 'Будущее и выражение планов (Futur I, конструкции mit wollen/werden, планирующие выражения)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '574c4c44-304b-4538-9851-f18cab4059e9',
    TopicName: 'Степени сравнения прилагательных (Positiv, Komparativ, Superlativ)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'eb1d8cdd-df90-48d8-942e-528ffb895e7f',
    TopicName: 'Предлоги места и времени, управление с разными падежами (Akkusativ, Dativ)',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8a58c733-b6ce-4b19-a627-4e75450455ec',
    TopicName: 'Придаточные предложения с weil, dass, wenn и базовый порядок слов в них',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '189a1174-6bd9-40c8-9913-87dfc1f07b16',
    TopicName: 'Простые условные конструкции и выражение желаний/планов на будущее',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3ea5924b-5744-4224-8b4b-711e3e19f6dc',
    TopicName: 'Расширение словаря за счёт устойчивых выражений, типичных разговорных фраз и базовых идиом',
    DisciplineID: GERMAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по немецкому языку...');

    // Проверяем, есть ли уже темы по немецкому языку в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: GERMAN_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по немецкому языку. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: GERMAN_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = germanTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по немецкому языку (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по немецкому языку
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по немецкому языку:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по немецкому языку завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Иностранный язык — Немецкий" (${GERMAN_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по немецкому языку:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

