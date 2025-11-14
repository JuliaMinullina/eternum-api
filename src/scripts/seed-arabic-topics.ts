import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Иностранный язык — Арабский" из базы данных
const ARABIC_DISCIPLINE_ID = 'c5d4e3f2-8a1c-4917-0e2c-2f3a4b5c6d7e';

const arabicTopicsData = [
  {
    TopicID: '77353900-0aaa-499d-95b1-f9ff8c733b16',
    TopicName: 'Арабский язык: где распространён, диалекты vs литературный язык (фусха)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f0f22e39-8333-4ea6-b461-57f6a8c0134d',
    TopicName: 'Арабский алфавит: буквы, варианты написания в начале/середине/конце слова',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f097b391-77de-46fc-8e21-37323f6b74f3',
    TopicName: 'Направление письма справа налево, особенности письма, соединение букв',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b910a019-fde9-46b9-913e-3d114c7a751a',
    TopicName: 'Краткие гласные (харакаты) и долгие гласные, сукун, танвин',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cd5666c5-d808-4a22-b544-500af7da05c3',
    TopicName: 'Правила чтения и слоговая структура, отличие печатного и рукописного письма',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e98bddab-c217-4878-9a58-69a6414b34d7',
    TopicName: 'Порядок написания элементов буквы, базовые навыки каллиграфии',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '26d10e0f-9d2f-459f-ae94-9bf4f01eb29f',
    TopicName: 'Алфавитное и корневое устройство слов: трёхсогласные корни, смысл корня',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '18406ea2-92ae-4fe1-b8ab-a2ec48912c57',
    TopicName: 'Личные местоимения (я, ты, он/она, мы, вы, они)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dc313cae-b5d5-494b-89cd-da1831a8ddf1',
    TopicName: 'Род и число: мужской/женский род, единственное, двойственное и множественное число',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ba4bf67e-3fb7-4565-8c0a-8f76ebfdfd25',
    TopicName: 'Основные указательные местоимения (этот, тот и т.п.)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1b2cfb76-a6df-49e4-8eb5-4b62620fc3f9',
    TopicName: 'Базовая структура фразы: именное предложение (без глагола), глагольное предложение (глагол–подлежащее–дополнение)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7d8dd72c-27f7-4336-90d5-01a4cd015a4a',
    TopicName: 'Глагол в настоящем времени: личные окончания, согласование по роду и числу',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '374e1308-3d2f-4503-a903-717f9f132bff',
    TopicName: 'Глагол в прошедшем времени: основные формы, согласование',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '97a702aa-9a89-42cd-b51f-9799986843f1',
    TopicName: 'Простые способы выражения будущего (частица «са»/«софа» и др.)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ff0f3cb5-63f5-46cd-b1cc-e852a83ae2ca',
    TopicName: 'Отрицание в именных и глагольных предложениях (ла, ма и др. на базовом уровне)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e8b22bda-6a6c-4436-b4f4-ddc35e77c09f',
    TopicName: 'Притяжательные конструкции: «дом мальчика», «книга ученика» (идафа)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9895059e-592e-4641-bcdc-03fc55cb0c76',
    TopicName: 'Определённость/неопределённость: артикль «аль-», отсутствие артикля',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'efef7232-0bee-430f-9fe2-e0b6e886e4de',
    TopicName: 'Простые предлоги места и времени (в, на, под, перед, после и т.д.)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7128097d-bd9c-46c1-bfec-e81a0a6c9f3c',
    TopicName: 'Порядок слов в вопросах, вопросительные слова (кто, что, где, когда, почему)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0eb625cb-5578-4c95-94d5-03a058e9681d',
    TopicName: 'Базовая лексика приветствий, прощаний, благодарностей и извинений',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '43a96a2d-88bb-4107-bd77-44512c6ce262',
    TopicName: 'Личная информация: имя, возраст, страна, язык, национальность, релевантные формулы вежливости',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ec24bcef-ad7c-43e3-9355-72a9fae24b5e',
    TopicName: 'Семья: члены семьи, профессии родителей, краткий рассказ о семье',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f8c34923-ab8c-402d-a271-fc43ab7f5e16',
    TopicName: 'Школа: предметы, класс, расписание, школьные принадлежности',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c0d4f167-acc4-40fd-82d2-06840988311a',
    TopicName: 'Распорядок дня: утро, школа, домашние задания, отдых, выходные',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'aac59059-dcae-4125-b46f-6306b2663559',
    TopicName: 'Хобби и свободное время: спорт, чтение, игры, интернет, музыка',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '234f169c-26ad-4ced-92a5-917374bfd972',
    TopicName: 'Город и транспорт: дом, улица, магазин, мечеть, школа, автобус, такси, как спросить дорогу',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e35f7007-e16f-4842-a7ab-dbbb0315650d',
    TopicName: 'Покупки: товары, еда, одежда, цвета, цена, простые диалоги «сколько стоит»',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6252608a-4e7b-42f3-8b27-422e35f76fbf',
    TopicName: 'Еда и напитки: названия распространённых блюд, приёмы пищи, этикет за столом',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cf42ad0b-c2f6-45a3-acb5-47cd6122de2e',
    TopicName: 'Погода и времена года: жарко, холодно, дождь, ветер, любимое время года',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd00640b5-a86a-4deb-b862-4fdf97647838',
    TopicName: 'Внешность и характер: высокий/низкий, красивый, спокойный, активный и т.п.',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '66654c91-6459-475d-8955-317a5193137d',
    TopicName: 'Здоровье и самочувствие: простые симптомы, «болит голова», «я устал», обращение за помощью',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4d0214f6-b02a-475b-b03b-af334a92690a',
    TopicName: 'Основные исламские и культурные праздники и традиции арабских стран (Рамадан, Ид и др. — на культурном уровне, без богословия)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f0301e90-08f7-42cd-9e15-04aaaffc403f',
    TopicName: 'Формулы этикета: приветствия, пожелания, ответы на них, вежливые обращения',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0c42d44a-fcbe-4dfb-9566-f9e1e72af513',
    TopicName: 'Простые диалоги-знакомства: имя, откуда, чем занимаешься, что любишь',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4af4d6bd-0ddf-4539-8b7c-817ec72923a5',
    TopicName: 'Диалоги в типичных ситуациях: в школе, в магазине, на улице, в гостях',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2e80fc67-0a51-42b3-8bc8-c025edf45541',
    TopicName: 'Краткие устные монологи: рассказ о себе, семье, школе, любимом занятии, планах на каникулы',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8cc4a9f4-072e-4f71-9ab2-757782054ea9',
    TopicName: 'Чтение простых текстов с огласовками: диалоги, короткие заметки, объявления',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e9bb835e-6638-42c2-9b95-d7ea7669e85c',
    TopicName: 'Постепенный переход к чтению текстов с минимумом огласовок',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6fff65e3-9e90-4073-abe2-4e26459bb054',
    TopicName: 'Списывание слов и предложений, аккуратное письмо иероглифического типа',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '34e4d3fa-668b-417c-b03f-c173e2699a1e',
    TopicName: 'Короткие письменные сообщения: поздравление, открытка, чат-сообщение, простое письмо другу',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '980ab36b-4a64-411f-865c-f2ff3607c992',
    TopicName: 'Заполнение простых анкет: имя, возраст, город, язык, контакты',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'da9a3c37-4074-45a9-842a-ef50de11c504',
    TopicName: 'Описание картинок простыми предложениями: кто, где, что делает',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '408f7c3b-ae5d-40d6-9389-7557771b44ee',
    TopicName: 'Сравнение норм поведения и этикета в русской и арабской культурах (приветствия, гости, подарки)',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6195841e-475b-4f6d-9446-f622447cd59d',
    TopicName: 'Основы набора арабского текста на компьютере и телефоне, использование онлайн-словарей',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '898d3b77-3978-4e3e-941c-ab891ee169bf',
    TopicName: 'Учебные мини-проекты: постер о празднике, «визитка» на арабском, мини-презентация о своей семье/школе/городе',
    DisciplineID: ARABIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по арабскому языку...');

    // Проверяем, есть ли уже темы по арабскому языку в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: ARABIC_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по арабскому языку. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: ARABIC_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = arabicTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по арабскому языку (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по арабскому языку
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по арабскому языку:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по арабскому языку завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Иностранный язык — Арабский" (${ARABIC_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по арабскому языку:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

