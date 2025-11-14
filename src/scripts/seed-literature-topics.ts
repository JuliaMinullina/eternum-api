import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Литература" из базы данных: 9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f
const LITERATURE_DISCIPLINE_ID = '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f';

const literatureTopicsData = [
  {
    TopicID: 'b2a26c61-18d3-4e8b-9c1a-56a8f0a6107d',
    TopicName: 'Литература как искусство слова: функции, роды и жанры',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1ecb550a-2b18-4ed9-84de-3b7f5f51ed0b',
    TopicName: 'Методы анализа текста: тема, идея, проблематика, композиция',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b2a0b1f7-2cbf-4d5b-8d70-9d1a6c8364a1',
    TopicName: 'Сюжет, фабула, хронотоп. Типы повествователя и ракурса',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9c3a40f9-71a7-4d61-ae59-4dd9ecae3c7e',
    TopicName: 'Образная система: герой, автор, лирический герой, характер и тип',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '35f3ac16-6090-4b54-b59e-5a0a6d159a64',
    TopicName: 'Тропы и фигуры речи: метафора, метонимия, сравнение, гипербола и др.',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6a2874b9-63d9-4ba1-91c2-8fc9290a3d8f',
    TopicName: 'Стиховедение: размер, рифма, ритм, строфика',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e4cb4c73-c9e0-4baf-9d39-731e0604e576',
    TopicName: 'Роды литературы: эпос, лирика, драма (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ad2b9d51-7e9d-4a72-9b0d-3f96e2c7c7aa',
    TopicName: 'Литературные направления: классицизм, сентиментализм, романтизм, реализм',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e4f63e8b-1a3f-49a1-9af5-3fcae274d58a',
    TopicName: 'Модернизм и авангард: символизм, акмеизм, футуризм и др.',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e9a29e0e-40d0-401f-83e4-2e46fda7f3d3',
    TopicName: 'Фольклор и миф: жанры, мотивы, архетипы. Древнерусская литература',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '77a04f43-e94b-49a3-97fb-0d6e57d011f9',
    TopicName: 'Русская литература XVIII века: Карамзин и эпоха Просвещения (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ac6f85a4-2cda-40c5-88a0-4d1a5fdbb4a5',
    TopicName: 'Русская литература первой половины XIX века: Пушкин, Лермонтов, Гоголь (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '522aac72-6550-4dff-a0d3-3dfb3a7f84dd',
    TopicName: 'Русская литература второй половины XIX века: Тургенев, Достоевский, Толстой, Островский, Некрасов, Салтыков-Щедрин (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c2f5c6b-8a2c-4f53-bf9e-ade2e34c124c',
    TopicName: 'Серебряный век: Блок, Ахматова, Цветаева, Маяковский, Пастернак (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c3d61c62-ba1f-41a6-8b3e-9a2a3dfc7f4f',
    TopicName: 'Литература первой половины XX века: Булгаков, Шолохов, Платонов и др. (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1e2d3c4b-5a6f-4ad3-9c3e-0b7f1d13a82b',
    TopicName: 'Военная литература: Великая Отечественная война в поэзии и прозе',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7c99aaf1-c205-4a88-b30d-b10bf299916f',
    TopicName: 'Литература второй половины XX века: Твардовский, Солженицын, Распутин и др. (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bc7f2d0b-bf42-4a64-9efb-f4f73835b2b7',
    TopicName: 'Современная русская литература (1990-е — XXI век): тенденции и имена (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd61e0931-3126-4740-9606-28d3be88cd4d',
    TopicName: 'Мировая литература: античность и средневековье (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1ee1b1b0-0dcf-4b2b-9d1e-c2eb0b6ed38a',
    TopicName: 'Эпоха Возрождения и барокко: Данте, Сервантес, Шекспир (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '602c6c64-8e3f-4adb-9e31-6f1c6d4a02a1',
    TopicName: 'Эпоха Просвещения: классицизм и буржуазный роман (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9d41f32e-8fb7-4574-93fe-29bb738e5720',
    TopicName: 'Мировая литература XIX века: Байрон, Гюго, Бальзак, Диккенс, Флобер, Ибсен (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bc8f6d64-5c4a-4056-8a96-3d06f8ce27bf',
    TopicName: 'Мировая литература XX века: Джойс, Кафка, Хемингуэй, Ремарк, Маркес (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ec0de8bf-63f5-45c9-b7d2-02f1d7fb7b9e',
    TopicName: 'Детская и подростковая литература: жанры и традиции (обзор)',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cb88d5e6-dedc-451a-9e5c-05c73487bba0',
    TopicName: 'Драма и театр: пьеса, конфликт, сценический образ',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e148ab1a-3b5e-4c1c-9495-9be2407e3f7c',
    TopicName: 'Публицистика и эссеистика: позиция автора и аргументация',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cf9b46f4-4a6a-4e59-9e8e-4c2185582e97',
    TopicName: 'Литературная критика и литературоведение: школы и методы',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0a6a7b22-6b18-4d13-b65a-62c1f6b9a2c9',
    TopicName: 'Интертекстуальность и мифологические коды в литературе',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '52aec8cb-4eab-4afc-acdf-f8ac2f0432f4',
    TopicName: 'Темы и мотивы: путь героя, любовь и свобода, природа и цивилизация',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a03c9c1e-03a0-4ac2-8c7e-44c8bd71819a',
    TopicName: 'Литература и другие искусства: киноадаптации, иллюстрация, музыка',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ab9f2b5d-4e98-4ee7-8bf3-2b9f3d1df0c9',
    TopicName: 'Читательская грамотность и стратегии чтения. НФО и медийная экология',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b7dbf7e8-2fd9-4f73-80f7-47b8fbbb3691',
    TopicName: 'Академическая добросовестность: цитирование, переработка, антиплагиат',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3e2a6a37-3a9d-4662-8b2c-ae6d72d55d24',
    TopicName: 'Проектная деятельность по литературе: исследование, рецензия, творческая работа',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по литературе...');

    // Проверяем, есть ли уже темы по литературе в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: LITERATURE_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по литературе. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: LITERATURE_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = literatureTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по литературе (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по литературе
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по литературе:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по литературе завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Литература" (${LITERATURE_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по литературе:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
