import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Иностранный язык — Китайский" из базы данных
const CHINESE_DISCIPLINE_ID = 'b4c3d2e1-7f0b-4806-9d1b-1e2f3a4b5c6d';

const chineseTopicsData = [
  {
    TopicID: '5fbd7fd6-4965-4842-97f0-445a9c6ab056',
    TopicName: 'Китайский язык и иероглифическая письменность: чем отличается от алфавитных языков',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dfd39dc3-019a-4384-a274-7c7719228548',
    TopicName: 'Китайский алфавит пиньинь: слоги, начальные и конечные, слоговая структура',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2c9db263-37b5-4b38-b184-bae3a7eaceaa',
    TopicName: 'Тоны: 4 основных тона и нейтральный, различение на слух и в произношении',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ffb723f5-eae7-4521-b623-9aa02057b27b',
    TopicName: 'Базовые правила чтения по пиньинь, перенос слогов, интонация фраз',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '575844d2-a476-4887-8c3c-49734759f750',
    TopicName: 'Строение иероглифа: черты, ключи (радикалы), составные части, значимые элементы',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '83cd5477-68af-4bb1-874c-42cadaf9b654',
    TopicName: 'Порядок написания черт, основные типы черт, каллиграфическая сетка (田字格)',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd78d573a-6afe-493e-8da3-83593f4b39dd',
    TopicName: 'Частотные радикалы: «человек», «речь», «вода», «сердце», «рука», «рот» и др.',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fe98e70e-8580-439f-8a2c-9d8ae280ff17',
    TopicName: 'Упрощённые и традиционные иероглифы (обзорно, без углубления)',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3831e3c7-6841-4d0f-9082-8e125a3ce035',
    TopicName: 'Использование словаря и электронных инструментов: поиск по радикалу, по числу черт, по пиньинь',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9fb46b06-2e59-43b6-ad89-0a22f059202f',
    TopicName: 'Числа и счёт: от 0 до 1000 и дальше, составные числительные',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7920e1f4-2ea3-4059-800e-695dc7f46028',
    TopicName: 'Единицы времени: часы, минуты, дни недели, месяцы, даты',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c1fea1dd-3b2c-462d-9626-15439c20f350',
    TopicName: 'Основные местоимения: я, ты, он/она, мы, вы, они; вежливые формы обращения',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9ad4c159-9b2a-4791-a4aa-333fa1965303',
    TopicName: 'Базовая структура предложения SVO: подлежащее – сказуемое – дополнение',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '97bd3b76-5b85-4b03-9f95-ad56922b9e32',
    TopicName: 'Частица 吗 в общих вопросах, 呢 в уточняющих и возвратных вопросах',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd95e35ce-36bb-4c55-a8f4-c110b5d9006a',
    TopicName: 'Глагол 是, конструкция 有 (иметь, наличие)',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '58ff824c-177d-4c70-9f50-6522f512b50e',
    TopicName: 'Модальные и служебные слова: 也, 都, 很, 不, 没, 在 и др.',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b9f4da25-50df-4961-89e7-910fac1d7c78',
    TopicName: 'Счётные слова (классификаторы): 个, 本, 只, 张 и другие частотные',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5c354549-16d7-4c32-8621-f07714d136e6',
    TopicName: 'Прилагательные и описательные конструкции: 很 + прилагательное, сравнительные формы',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8669bbd6-d1ad-411c-95ed-0ffb28dfe4d4',
    TopicName: 'Простые аспекты и виды действия: 了, 过, 正在 (завершённость, опыт, процесс)',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '89963ad0-670b-467e-9447-2b563924b9df',
    TopicName: 'Отрицание с 不 и 没: различие по времени и типу глагола',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1fc71e28-7d27-4985-aa9e-dfb3edcc73ca',
    TopicName: 'Указательные слова: 这, 那, здесь/там и др.',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '76392d23-aedc-4db8-8af9-19d3c06d5f4a',
    TopicName: 'Простые конструкции направления и места: 在, 去, 来, 上, 下, 里, 外',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f5d1e5b8-0bfb-4cc5-ba75-deb46d611fa2',
    TopicName: 'Лексика по темам: «Я и моя семья» — имя, возраст, состав семьи, профессии родителей',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cae72a0c-9690-46bc-9893-52838419f6b6',
    TopicName: 'Лексика по теме «Школа»: предметы, класс, расписание, школьные принадлежности',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3bdb03c1-9baf-4614-b85c-279bbcb2c6a9',
    TopicName: 'Лексика по теме «Распорядок дня»: вставать, идти в школу, уроки, домашние задания, отдых',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '571e6703-009d-48a1-a3ed-373068c3c27c',
    TopicName: 'Лексика по теме «Хобби и увлечения»: спорт, музыка, игры, чтение, интернет',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'de241f8d-4860-4e96-9159-e1e79c90e3d5',
    TopicName: 'Лексика по теме «Город и транспорт»: улица, дом, магазин, автобус, метро, такси, маршрут',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bfe8b871-df2b-41d5-8d16-2ce51b95291d',
    TopicName: 'Лексика по теме «Покупки и деньги»: цены, виды товаров, размеры, цвета',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c28f737e-e8e9-4247-8af2-e7d8174ee9a6',
    TopicName: 'Лексика по теме «Еда и напитки»: блюда китайской кухни, напитки, столовые фразы',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7cad880c-4f2b-4300-85a5-abeb320f7f4a',
    TopicName: 'Лексика по теме «Погода и времена года»: жарко, холодно, дождь, снег, любимое время года',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2b0b8dfd-f14f-4dbf-8c9d-5fdb4672bc4a',
    TopicName: 'Лексика по теме «Здоровье»: простые симптомы, самочувствие, обращение к врачу базовом уровне',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a6651aca-8c9d-434f-9c3f-91c16f2743d7',
    TopicName: 'Лексика по теме «Характер и внешность»: высокий/низкий, дружелюбный, спокойный и т.д.',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b0d77f37-809d-48f2-b076-6d5d37065b7b',
    TopicName: 'Китайские праздники и культура: Праздник Весны, Праздник середины осени, День образования КНР и др.',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9be2c33f-30a1-4322-b275-8ca994adea88',
    TopicName: 'Этикет общения: приветствия, прощания, благодарность, извинения, вежливые формулы',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c5896232-190f-44c3-8f53-a5ff74ac13fb',
    TopicName: 'Простые диалоги-знакомства: имя, возраст, город, язык, интересы',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '29990798-b74c-4391-ab05-ee69d704650d',
    TopicName: 'Диалоги в типичных ситуациях: магазин, кафе, дорога, школа, приглашение в гости',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cc74cdd8-4490-49d1-8041-adf3b1ce96ba',
    TopicName: 'Краткие монологи о себе: семья, школа, хобби, планы на каникулы',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '54ce9b64-c8c6-498c-9050-7b1eb2dfa7a6',
    TopicName: 'Чтение простых текстов с пиньинь и без: мини-диалоги, объявления, короткие рассказы',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd72d5d04-3363-4c3a-abc2-27646f67db9f',
    TopicName: 'Выписывание иероглифов по образцу, списывание иероглифного текста',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '864cc53a-b452-4458-a1de-fda0436af751',
    TopicName: 'Краткие письменные сообщения: открытка, поздравление, короткое письмо/чат-сообщение другу',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '628d8840-2627-460c-93a1-08ab2dc8840a',
    TopicName: 'Заполнение простых анкет: имя, возраст, страна, контакты, хобби',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0664e5c2-6a83-49e8-b5f2-524142198d16',
    TopicName: 'Описание по картинке простыми предложениями: кто, где, что делает',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1c24c82b-3348-4a9a-8d85-bbc7415a1311',
    TopicName: 'Сравнение русской и китайской культурных норм: обращения, подарки, поведение за столом (на базовом уровне)',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b987cf67-d322-4a99-b1b6-79077ec29d09',
    TopicName: 'Основы работы с китайской раскладкой и вводом иероглифов по пиньинь на компьютере/телефоне',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e7937b19-f915-491b-af5c-b49c083505df',
    TopicName: 'Учебные проекты: мини-постер о празднике, «визитка» на китайском, мини-презентация о своём городе/школе',
    DisciplineID: CHINESE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по китайскому языку...');

    // Проверяем, есть ли уже темы по китайскому языку в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: CHINESE_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по китайскому языку. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: CHINESE_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = chineseTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по китайскому языку (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по китайскому языку
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по китайскому языку:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по китайскому языку завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Иностранный язык — Китайский" (${CHINESE_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по китайскому языку:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

