import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Мировая история" из базы данных: a8c7e6d5-1b4d-4e0f-9a3c-5d4e6f7a8b9c
const WORLD_HISTORY_DISCIPLINE_ID = 'a8c7e6d5-1b4d-4e0f-9a3c-5d4e6f7a8b9c';

const worldHistoryTopicsData = [
  {
    TopicID: '62c6cb2d-f83b-4f8e-83ac-109eb79df7f4',
    TopicName: 'Историческое знание: источники, критика, хронология, работа с картами и данными',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cc60969e-ed86-43c1-811f-726747e28249',
    TopicName: 'Древнейшие цивилизации: Месопотамия, Египет, Долина Инда, Китай, Америки (обзор)',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c9105123-9c5a-4eb8-8a26-a9b67e7772dc',
    TopicName: 'Древняя Греция: полисное устройство, культура, наука, эпоха эллинизма',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ba0b4c11-31e0-4a63-b8ba-bb6708cf0c7e',
    TopicName: 'Древний Рим: республика, империя, римское право и наследие',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8b2d79a7-749b-49a6-af70-2ca5b5e7bfec',
    TopicName: 'Мировые религии: истоки и раннее распространение (буддизм, иудаизм, христианство, ислам)',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9046fa0d-6e31-4639-b5d0-e28d346f0b87',
    TopicName: 'Раннее Средневековье: Великое переселение народов, Византия, становление исламского мира',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bd585459-0b3e-4fa7-b3dd-22a3e268b240',
    TopicName: 'Средневековая Европа: феодальные отношения, города и ремёсла, крестовые походы, университетская культура',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8b32d95c-29c9-42eb-ab66-1445083f81e5',
    TopicName: 'Средневековый мир вне Европы: Китай Тан—Сун, государства Индии, Африки и Америки',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f39d32c2-6a3a-4306-8c3e-df8f1b9400fd',
    TopicName: 'Позднее Средневековье: кризисы XIV века, Столетняя война, общественные изменения',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2105d281-ded7-46c6-a8b5-048d56524ed5',
    TopicName: 'Возрождение и гуманизм: изменения в искусстве, науке и мировоззрении',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '01054a50-fc65-4662-8a41-a3e2c1bcc5ca',
    TopicName: 'Реформация и Контрреформация: религиозные и политические изменения в Европе',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e06f187b-c7c2-4269-9acc-8cd2ff5f9d00',
    TopicName: 'Великие географические открытия и формирование колониальных империй',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '49dbe8c4-6bbe-4f88-beba-46e3381b1602',
    TopicName: 'Европейские государства Нового времени: абсолютизм, парламентаризм, ранний национализм',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5fdc6cf0-9372-4add-a47d-e744da7ca35a',
    TopicName: 'Научная революция и Просвещение: новые методы познания и общественные идеи',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b83d6e64-d2f6-455f-8b39-350c9d3d48f5',
    TopicName: 'Революции Нового времени: США, Франция, Латинская Америка — предпосылки и последствия',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3a4a503f-8679-4b9b-9288-aa3cc0639f40',
    TopicName: 'Индустриализация XIX века: технологии, фабричное производство, реформы и социальные движения',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'af08cafa-86d4-4f4a-b10e-9e4950e94169',
    TopicName: 'Нации и государственные объединения XIX века: Италия, Германия, Япония; колониальная система',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7d08ed9e-1e3e-4f9d-93e1-d8b19a1af19b',
    TopicName: 'Культура и наука XIX века: художественные направления, массовое образование, научные открытия',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f789f628-8ead-458e-b215-54fade5c6388',
    TopicName: 'Первая мировая война: причины, ход военных действий, Версальская система',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5de432e6-1e54-4b94-a8ae-fca70947bf01',
    TopicName: 'Межвоенный период: экономические и политические кризисы, режимы и международные отношения',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fa718761-3d4d-4211-bb9a-9f4651fd6ad1',
    TopicName: 'Вторая мировая война: основные кампании, оккупационная политика, итоги и послевоенное устройство',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3d48f5c6-34d6-478a-905d-242dde2d49df',
    TopicName: 'Послевоенный мир и «холодная война»: блоки, конфликты, международные кризисы',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '103bcda2-4466-474f-aa3b-c445b2462b66',
    TopicName: 'Распад колониальной системы: новые государства Азии и Африки, движение неприсоединения',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c86d6dc-726f-41c8-82a4-fc59e12df882',
    TopicName: 'Европейская интеграция и международные организации: ООН, ЕС, ВТО (обзор)',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a29eccb4-2f43-4e84-bf39-41b26c8f2241',
    TopicName: 'Научно-техническая революция и информационное общество во второй половине XX века',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '69762f5b-ab02-4fe7-88c1-476cb7d75737',
    TopicName: 'Региональные процессы конца XX — начала XXI века: Восточная Азия, Южная Азия, Ближний Восток, Африка, Латинская Америка',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2a3280dc-b92e-491b-90ea-f29eee2d1401',
    TopicName: 'Глобализация и современные вызовы: международная безопасность, миграция, климат, здравоохранение',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd46ea499-3fae-45d4-b1d2-dec10861e67d',
    TopicName: 'История повседневности и культурная история: методы и источники',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c840e927-3422-40f3-a2bd-ae5406ef1cd4',
    TopicName: 'История науки и технологий: от античности до цифровой эпохи',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'afb6b6f0-f1f6-46f7-befa-71bd575fe44b',
    TopicName: 'История идей и общественно-политических течений (обзор)',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cf3f317d-3d29-407e-a474-8e321cad5397',
    TopicName: 'Исследовательская практика школьника: вопрос, гипотеза, источник, презентация результатов',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'db204769-30e8-469d-9b76-0a66d73c115d',
    TopicName: 'Итоговый проект: локальная история в мировом контексте (портфолио, публичная защита)',
    DisciplineID: WORLD_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по мировой истории...');

    // Проверяем, есть ли уже темы по мировой истории в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: WORLD_HISTORY_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по мировой истории. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: WORLD_HISTORY_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = worldHistoryTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по мировой истории (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по мировой истории
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по мировой истории:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по мировой истории завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Мировая история" (${WORLD_HISTORY_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по мировой истории:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

