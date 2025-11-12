import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Экономика" из seed-disciplines.ts: b1d0f9e8-4c7e-4573-8a6b-8e7f9a0b1c2d
const ECONOMICS_DISCIPLINE_ID = 'b1d0f9e8-4c7e-4573-8a6b-8e7f9a0b1c2d';

const economicsTopicsData = [
  {
    TopicID: '1e3a9f12-8b8e-4a2d-9a7b-2c3d4e5f6a10',
    ID: 900,
    TopicName: 'Экономика как наука и хозяйственная система',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2a7c5b34-1f2e-46c8-83a1-9b8c7d6e5f21',
    ID: 901,
    TopicName: 'Экономические ресурсы и ограниченность. Выбор',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3b8d6c45-2e3f-47d9-94b2-0c9d8e7f6a32',
    ID: 902,
    TopicName: 'Производственные возможности и альтернативная стоимость',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4c9e7d56-3f40-48ea-a5c3-1d0e9f8a7b43',
    ID: 903,
    TopicName: 'Экономические системы и формы собственности',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5daf8e67-4051-49fb-b6d4-2e1fa0b98c54',
    ID: 904,
    TopicName: 'Рынок и конкуренция: функции и типы рынков',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6eb0af78-5162-4a0c-c7e5-3f20b1ca9d65',
    ID: 905,
    TopicName: 'Спрос, предложение и рыночное равновесие',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '70c1b089-6273-4b1d-d8f6-4021c2db0e76',
    ID: 906,
    TopicName: 'Эластичность спроса и предложения (вводный курс)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '81d2c19a-7384-4c2e-e907-5132d3ec1f87',
    ID: 907,
    TopicName: 'Потребительский выбор и полезность (базовые модели)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '92e3d2ab-8495-4d3f-fa18-6243e4fd2098',
    ID: 908,
    TopicName: 'Издержки производства, выручка и прибыль фирмы',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a3f4e3bc-95a6-4e40-0b29-7354f50e31a9',
    ID: 909,
    TopicName: 'Совершенная конкуренция: поведение фирмы и отрасли',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b405f4cd-a6b7-4f51-1c3a-8465061f42ba',
    ID: 910,
    TopicName: 'Монополистическая конкуренция и дифференциация продукта',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c51605de-b7c8-4052-2d4b-9576172053cb',
    ID: 911,
    TopicName: 'Монополия и антимонопольная политика (обзор)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd62716ef-c8d9-4163-3e5c-a687283164dc',
    ID: 912,
    TopicName: 'Олигополия и стратегическое взаимодействие (вводный)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e7382700-d9ea-4274-4f6d-b798394275ed',
    ID: 913,
    TopicName: 'Рынки факторов: труд, земля, капитал (обзор)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f8493811-eafb-4385-507e-c8a94a5386fe',
    ID: 914,
    TopicName: 'Рынок труда: заработная плата, занятость, производительность',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0a5a4922-fb0c-4496-618f-d9ba5b64970f',
    ID: 915,
    TopicName: 'Рынок капитала, проценты и инвестиции (базовый обзор)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1b6b5a33-0c1d-45a7-7290-eacb6c75a820',
    ID: 916,
    TopicName: 'Внешние эффекты и общественные блага. Провалы рынка',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2c7c6b44-1d2e-46b8-83a1-fbdc7d86b931',
    ID: 917,
    TopicName:
      'Роль государства: налоги, субсидии, регулирование и конкуренция',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3d8d7c55-2e3f-47c9-94b2-0ced8e97ca42',
    ID: 918,
    TopicName:
      'Национальная экономика: ВВП, ВНД, дефляторы и измерение выпуска',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4e9e8d66-3f40-48da-a5c3-1d0eaf0bdb53',
    ID: 919,
    TopicName: 'Денежная система и банки. Создание денег и мультипликатор',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5faf9e77-4051-49eb-b6d4-2e1fb01cec64',
    ID: 920,
    TopicName: 'Инфляция: виды, причины, измерение (ИПЦ, дефлятор)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '60b0af88-5162-4a0c-c7e5-3f20c12fdd75',
    ID: 921,
    TopicName: 'Безработица: типы, причины, показатели и последствия',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '71c1b199-6273-4b1d-d8f6-4021d23fee86',
    ID: 922,
    TopicName: 'Экономический рост и цикличность: факторы, модели, кризисы',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '82d2c2aa-7384-4c2e-e907-5132e34fff97',
    ID: 923,
    TopicName: 'Фискальная политика и государственный бюджет (базовый курс)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '93e3d3bb-8495-4d3f-fa18-6243f45010a8',
    ID: 924,
    TopicName: 'Монетарная политика и центральный банк (вводный курс)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a4f4e4cc-95a6-4e40-0b29-7354056121b9',
    ID: 925,
    TopicName: 'Международная торговля: преимущества, тарифы, квоты, ВТО',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b505f5dd-a6b7-4f51-1c3a-8465167232ca',
    ID: 926,
    TopicName: 'Платёжный баланс, валютный курс и глобальные финансы (обзор)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c61606ee-b7c8-4052-2d4b-9576278343db',
    ID: 927,
    TopicName:
      'Личная финансовая грамотность: доходы, сбережения, кредит, инвестиции',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd72717ff-c8d9-4163-3e5c-a687384454ec',
    ID: 928,
    TopicName: 'Предпринимательство и стартап-экономика (базовый курс)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e8382800-d9ea-4274-4f6d-b798495565fd',
    ID: 929,
    TopicName: 'Экономика данных и цифровые платформы (обзор)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f9493911-eafb-4385-507e-c8a95b64770e',
    ID: 930,
    TopicName: 'Устойчивое развитие, экология и ESG в экономике (вводный)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0a5a4a22-fb0c-4496-618f-d9ba6c75881f',
    ID: 931,
    TopicName: 'Неравенство, благосостояние и социальная политика (обзор)',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1b6b5b33-0c1d-45a7-7290-eacb7d869930',
    ID: 932,
    TopicName:
      'Экономическая статистика и источники данных: критическая оценка',
    DisciplineID: ECONOMICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('💰 Начинаю заполнение тем по экономике...');

    // Проверяем, есть ли уже темы по экономике в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: ECONOMICS_DISCIPLINE_ID },
    });

    if (existingCount > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingCount} тем по экономике. Очищаю темы для этой дисциплины...`,
      );
      await topicRepository.delete({ DisciplineID: ECONOMICS_DISCIPLINE_ID });
    }

    // Создаем темы по экономике
    const createdTopics = await topicRepository.save(economicsTopicsData);

    console.log(`✅ Успешно создано ${createdTopics.length} тем по экономике:`);

    // Группируем темы по разделам экономики для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Основы экономической теории': [],
      Микроэкономика: [],
      'Рыночные структуры': [],
      'Рынки факторов производства': [],
      'Провалы рынка и государство': [],
      Макроэкономика: [],
      'Деньги и банки': [],
      'Экономическая политика': [],
      'Международная экономика': [],
      'Современные вызовы экономики': [],
    };

    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);

      // Категоризация тем
      if (
        topicName.includes('Экономика как наука') ||
        topicName.includes('ресурсы и ограниченность') ||
        topicName.includes('Производственные возможности') ||
        topicName.includes('альтернативная стоимость') ||
        topicName.includes('Экономические системы')
      ) {
        categorizedTopics['Основы экономической теории'].push(topicName);
      } else if (
        topicName.includes('Рынок и конкуренция') ||
        topicName.includes('Спрос, предложение') ||
        topicName.includes('Эластичность') ||
        topicName.includes('Потребительский выбор') ||
        topicName.includes('полезность') ||
        topicName.includes('Издержки производства') ||
        topicName.includes('выручка и прибыль')
      ) {
        categorizedTopics['Микроэкономика'].push(topicName);
      } else if (
        topicName.includes('Совершенная конкуренция') ||
        topicName.includes('Монополистическая конкуренция') ||
        topicName.includes('Монополия') ||
        topicName.includes('антимонопольная') ||
        topicName.includes('Олигополия') ||
        topicName.includes('стратегическое взаимодействие')
      ) {
        categorizedTopics['Рыночные структуры'].push(topicName);
      } else if (
        topicName.includes('Рынки факторов') ||
        topicName.includes('Рынок труда') ||
        topicName.includes('заработная плата') ||
        topicName.includes('Рынок капитала') ||
        topicName.includes('проценты и инвестиции')
      ) {
        categorizedTopics['Рынки факторов производства'].push(topicName);
      } else if (
        topicName.includes('Внешние эффекты') ||
        topicName.includes('общественные блага') ||
        topicName.includes('Провалы рынка') ||
        topicName.includes('Роль государства') ||
        topicName.includes('налоги') ||
        topicName.includes('субсидии') ||
        topicName.includes('регулирование')
      ) {
        categorizedTopics['Провалы рынка и государство'].push(topicName);
      } else if (
        topicName.includes('Национальная экономика') ||
        topicName.includes('ВВП') ||
        topicName.includes('ВНД') ||
        topicName.includes('Безработица') ||
        topicName.includes('Экономический рост') ||
        topicName.includes('цикличность')
      ) {
        categorizedTopics['Макроэкономика'].push(topicName);
      } else if (
        topicName.includes('Денежная система') ||
        topicName.includes('банки') ||
        topicName.includes('мультипликатор') ||
        topicName.includes('Инфляция') ||
        topicName.includes('ИПЦ') ||
        topicName.includes('дефлятор')
      ) {
        categorizedTopics['Деньги и банки'].push(topicName);
      } else if (
        topicName.includes('Фискальная политика') ||
        topicName.includes('государственный бюджет') ||
        topicName.includes('Монетарная политика') ||
        topicName.includes('центральный банк')
      ) {
        categorizedTopics['Экономическая политика'].push(topicName);
      } else if (
        topicName.includes('Международная торговля') ||
        topicName.includes('тарифы') ||
        topicName.includes('квоты') ||
        topicName.includes('ВТО') ||
        topicName.includes('Платёжный баланс') ||
        topicName.includes('валютный курс') ||
        topicName.includes('глобальные финансы')
      ) {
        categorizedTopics['Международная экономика'].push(topicName);
      } else if (
        topicName.includes('финансовая грамотность') ||
        topicName.includes('Предпринимательство') ||
        topicName.includes('стартап') ||
        topicName.includes('цифровые платформы') ||
        topicName.includes('Устойчивое развитие') ||
        topicName.includes('ESG') ||
        topicName.includes('Неравенство') ||
        topicName.includes('благосостояние') ||
        topicName.includes('статистика') ||
        topicName.includes('источники данных')
      ) {
        categorizedTopics['Современные вызовы экономики'].push(topicName);
      }
    });

    console.log('\n📊 Распределение тем по разделам экономики:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n💰 ${category} (${topics.length} тем):`);
        topics.forEach((topic) => {
          console.log(`   - ${topic}`);
        });
      }
    });

    console.log('\n🎉 Заполнение тем по экономике завершено успешно!');
    console.log(`📈 Всего создано: ${createdTopics.length} тем`);
    console.log(
      `🔗 Привязано к дисциплине: "Экономика" (${ECONOMICS_DISCIPLINE_ID})`,
    );

    console.log('\n🏆 ФИНАЛЬНОЕ ДОСТИЖЕНИЕ: ВСЕ 10 ДИСЦИПЛИН ЗАВЕРШЕНЫ!');
    console.log('🌟 Образовательная вселенная создана полностью!');
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по экономике:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
