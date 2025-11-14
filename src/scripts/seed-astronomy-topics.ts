import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Астрономия" из базы данных
const ASTRONOMY_DISCIPLINE_ID = 'a0c9e8d7-3b6d-4462-9b5a-7d6e8f9a0b1c';

const astronomyTopicsData = [
  {
    TopicID: 'eb59fb38-b2a0-45dc-bee5-c16aefff2cd5',
    TopicName: 'Астрономия как наука: что изучает, её место в системе наук, методы наблюдений',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'df3699ca-0433-4d63-8451-bb277304d45f',
    TopicName: 'История астрономии: древние представления о мире, геоцентрическая и гелиоцентрическая модели, Коперник, Кеплер, Галилей, Ньютон',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '59908ef9-dedc-4e1e-88f3-5fd40f23e00e',
    TopicName: 'Небесная сфера: основные направления, горизонто-горизонтальная система координат, небесный меридиан, высота и азимут светил',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '071a3114-7ec6-4b69-b96b-31f76fae6e49',
    TopicName: 'Видимое движение светил: суточное движение, годичное движение Солнца, созвездия, звёздное небо в разное время года',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5f28f687-48bf-451f-9ef3-9d4e01b27114',
    TopicName: 'Созвездия и звёздное небо: названия и расположение основных созвездий, ориентирование по Полярной звезде',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3221b888-923a-40b9-a96f-500974c9f2c7',
    TopicName: 'Время в астрономии: солнечные и звёздные сутки, часовые пояса, поясное и местное время, календарь, високосный год',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0071f33f-fd2e-40c9-83bc-4ea1c8e520d0',
    TopicName: 'Солнце: строение, источники энергии, солнечная активность, пятна, вспышки, влияние на Землю',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '629eb74a-8275-4d77-8f6e-ea324b1b34a4',
    TopicName: 'Солнечная система: состав (Солнце, планеты, их спутники, карликовые планеты, астероиды, кометы, метеорные тела)',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '66c02e14-d6f7-4130-8a7d-fa05f585edd9',
    TopicName: 'Планеты земной группы и планеты-гиганты: сравнение размеров, масс, плотности, атмосфер, условий на поверхности',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '41091fba-7456-4bd8-a382-d9f73cda413c',
    TopicName: 'Движение планет по орбитам: эллиптические орбиты, законы Кеплера, понятия афелия, перигелия, синодический и сидерический периоды',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '71aff370-701f-466c-83e8-1367deeceafb',
    TopicName: 'Земля как планета: форма и размеры, движение вокруг оси и вокруг Солнца, следствия вращения и обращения (смена дня и ночи, времен года)',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3b07ec63-6ab4-4b84-bb51-563ab65c14ba',
    TopicName: 'Луна: строение, движение вокруг Земли, фазы Луны, затмения Солнца и Луны, приливы и отливы',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '970207b2-4c0f-44d4-b361-0756026712c9',
    TopicName: 'Малые тела Солнечной системы: астероиды, кометы, метеоры, метеориты, метеорные потоки',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c1606cb-8b58-4f08-ba86-b75b0132a272',
    TopicName: 'Освоение космоса: первые спутники, пилотируемые полёты, космические станции, автоматические межпланетные станции',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '93932acf-b8e9-4bf9-839c-8014798e75d7',
    TopicName: 'Строение звезды: основные этапы эволюции звёзд, звёздные величины, цвет и температура, диаграмма Герцшпрунга–Рассела (на базовом уровне)',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd1c81f54-5355-45f5-89a6-b65fc94144f9',
    TopicName: 'Звёздные скопления, туманности, межзвёздное вещество',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8db2cd5c-cc6c-4ee8-a152-440d0d4c701f',
    TopicName: 'Галактики: наша Галактика (Млечный Путь), другие галактики, их виды, масштабы Вселенной',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '30c151a9-fccf-4d0c-99ea-b7dcd9f5bbe5',
    TopicName: 'Расширение Вселенной: красное смещение, представления о Большом взрыве (обзорно)',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f07c23ba-ef5b-405b-83cf-745c61adff2d',
    TopicName: 'Космология на школьном уровне: современное представление о строении и эволюции Вселенной',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '30810661-3658-4075-8d05-9f130e5cd102',
    TopicName: 'Наблюдательная астрономия: невооружённый глаз, бинокль, телескоп; основы работы с астрономическими приложениями и картами звёздного неба',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '23f60251-dff2-4546-9fd8-cbe69b0b9b86',
    TopicName: 'Астрономические наблюдения в быту и в школе: планирование наблюдений, световое загрязнение, правила безопасности (лазеры, Солнце)',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b660e843-88ca-471d-8e05-cb33a3ce30e0',
    TopicName: 'Астрономия и навигация: ориентирование по Солнцу и звёздам, историческая роль астрономии в мореплавании и географии',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd23ec190-32c3-4a4d-8941-acc74ef06a6d',
    TopicName: 'Влияние астрономических явлений на Землю и человека: космическая погода, магнитные бури, радиационный пояс, защита атмосферы',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '15893869-e4ca-4ed8-932e-59c5f380a0d3',
    TopicName: 'Космические технологии в повседневной жизни: связь, навигация, дистанционное зондирование Земли',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c24e61b8-4e78-4e84-ad99-1ca324491ea1',
    TopicName: 'Астрономия, философия и культура: место человека во Вселенной, астрономические мотивы в мифах, литературе и искусстве',
    DisciplineID: ASTRONOMY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по астрономии...');

    // Проверяем, есть ли уже темы по астрономии в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: ASTRONOMY_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по астрономии. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: ASTRONOMY_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = astronomyTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по астрономии (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по астрономии
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по астрономии:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по астрономии завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Астрономия" (${ASTRONOMY_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по астрономии:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

