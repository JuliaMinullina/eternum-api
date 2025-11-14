import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "История России" из базы данных
const RUSSIAN_HISTORY_DISCIPLINE_ID = '6ae0d6b5-5e59-41c6-b507-7e08c9ee156c';

const russianHistoryTopicsData = [
  {
    TopicID: '35ea9acd-5c91-428d-8ae7-ecefe9afc401',
    TopicName: 'История России: место России в мировой истории, периодизация, исторические источники',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1e5271f0-e1a9-4cca-9a2d-e8f03510434d',
    TopicName: 'Народы и государства на территории России в древности: первобытность, скифы, античные города Северного Причерноморья, кочевые народы Евразийской степи',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '28d5b326-1a98-448c-b9eb-c10815bddc4d',
    TopicName: 'Восточные славяне: расселение, хозяйство, общественный строй, традиционные верования',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e6b1881b-06f8-433d-a694-e27440f31b32',
    TopicName: 'Образование государства Русь, династия Рюриковичей, путь «из варяг в греки», принятие христианства и его последствия',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9554a88e-ad5e-4fb3-8cbb-fde22761550d',
    TopicName: 'Русь в X – начале XII века: устройство власти, социальный строй, Русская Правда, развитие городов и культуры',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e323342a-5412-40b1-8a0a-527144b7ae65',
    TopicName: 'Политическая раздробленность Руси в XII – начале XIII вв.: земли и княжества, региональные центры культуры',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0e497ea5-1bc2-4ce3-8db2-978bf1517c9a',
    TopicName: 'Монгольское нашествие и Золотая Орда: зависимость русских земель, борьба с ордынским доминированием',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c56ca7a9-1d82-4bb2-9ecb-45ca7e0a068c',
    TopicName: 'Подъём Москвы и собирание русских земель в XIV–XV вв., Куликовская битва, роль Православной церкви',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '365172a3-8966-4067-b450-b014adfc6296',
    TopicName: 'От Руси к Российскому государству: формирование централизованного государства, завершение объединения земель вокруг Москвы',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f474a254-6e50-4a37-a53e-7e94daf61713',
    TopicName: 'Россия в XVI веке: царствование Ивана IV, опричнина, внешняя политика, социально-экономическое развитие',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bc1efe0e-2113-413f-a697-1a62a0f4af8b',
    TopicName: 'Смута в начале XVII века: кризис государственности, интервенции, народное ополчение и восстановление династии',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '05350f19-dcfb-45f5-8674-85a39170dc29',
    TopicName: 'Россия в XVII веке: сословно-представительная монархия, развитие хозяйства, города, повседневная жизнь и культура',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2d99fbd0-9b52-4520-9734-355d64c1a498',
    TopicName: 'Россия в конце XVII – начале XVIII века: реформы Петра I, превращение Московского царства в Российскую империю',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c216aa27-d267-4f46-a031-0246ac122cf3',
    TopicName: 'Россия в XVIII веке после Петра I: дворцовые перевороты, укрепление империи, внешняя политика, присоединения территорий',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f6c7da1f-d5e9-4455-b8d3-9996b15a57d6',
    TopicName: 'Российская империя во второй половине XVIII века: развитие экономики, общества и культуры эпохи Просвещения',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e864a819-8e5d-4148-b216-42b6f5916f64',
    TopicName: 'Российская империя в первой половине XIX века: Отечественная война 1812 года, внутренние реформы и консерватизм, общественные движения и декабристы',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a7104e54-b052-4569-bd8a-4082481169c4',
    TopicName: 'Российская империя во второй половине XIX века: реформы Александра II, контрреформы, индустриализация, рабочее движение',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2ff136a4-e903-474c-998c-c7ea8f1a921e',
    TopicName: 'Российская империя в начале XX века: революция 1905–1907 гг., Государственная дума, реформы, курс на модернизацию',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c1aea633-d028-4fb1-a46e-819e7837b939',
    TopicName: 'Россия и СССР в 1914–1922 гг.: Первая мировая война, Февральская и Октябрьская революции, Гражданская война, образование СССР',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '17d0755f-f954-4384-ba26-f5a6024b7f9c',
    TopicName: 'СССР в 1920–1930-е годы: НЭП, индустриализация, коллективизация, политическая система и общество',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ff230ebe-192e-4e1e-8e14-c1a379f0ae3b',
    TopicName: 'СССР в годы Великой Отечественной войны 1941–1945 гг.: ключевые этапы, вклад СССР в победу, цена войны и послевоенные итоги',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '84ede36c-eeaf-4646-8c63-ef30dfce322f',
    TopicName: 'СССР в послевоенный период 1945–1953 гг.: восстановление страны, начало «холодной войны», внутренняя политика',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a74716cc-6d55-4a1c-a840-37c54450908f',
    TopicName: 'СССР в период «оттепели» 1953–1964 гг.: политические и социальные изменения, реформы, культура',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c66b5919-71d4-4c82-8d7e-083c6ccdc092',
    TopicName: 'СССР в 1964–1985 гг.: «застой», особенности экономики и политической системы, повседневная жизнь, культура',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd62acd8b-48d6-4ce9-81d9-8b6f638e95d4',
    TopicName: 'Перестройка и распад СССР: реформы второй половины 1980-х гг., социально-политический кризис, образование Российской Федерации',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '846c11e8-aba7-45c6-988e-fe4eaad7307c',
    TopicName: 'Российская Федерация в 1990-е годы: переход к рыночной экономике, политические преобразования, изменения в обществе',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '808f8f89-9418-45ff-b92d-73705f7b35bc',
    TopicName: 'Российская Федерация в начале XXI века: государственное устройство, внутреннее развитие, внешняя политика, место России в современном мире',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1b73cccb-a587-49ef-93b3-aeed3a7520c5',
    TopicName: 'Историческая память и гражданская идентичность: значение Победы в Великой Отечественной войне, государственные символы, история и память о XX веке',
    DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по истории России...');

    // Проверяем, есть ли уже темы по истории России в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по истории России. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: RUSSIAN_HISTORY_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = russianHistoryTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по истории России (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по истории России
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по истории России:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по истории России завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "История России" (${RUSSIAN_HISTORY_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по истории России:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

