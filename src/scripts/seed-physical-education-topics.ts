import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Физическая культура" из базы данных
const PHYSICAL_EDUCATION_DISCIPLINE_ID = 'd7f6b5c4-0e3a-4139-8f2d-4a3b5c6d7e8f';

const physicalEducationTopicsData = [
  {
    TopicID: 'e8bd1a6d-c0d1-4dc6-a890-f39cb640a8e2',
    TopicName: 'Физическая культура как часть общей культуры человека, ценности ЗОЖ',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4d62f079-f39d-45cc-8c1d-9aea739b7299',
    TopicName: 'Режим дня, двигательная активность, личная гигиена, профилактика вредных привычек',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'adb8de78-53d3-4e36-ac95-661423cd6cc9',
    TopicName: 'Безопасность на уроках физкультуры и при самостоятельных занятиях спортом',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'de9077aa-6281-4f6d-a4df-cc8c7ecacb51',
    TopicName: 'Разминка и заминка: структура, задачи, базовые упражнения',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '79fece48-2223-4b6b-9cb6-768cc6631fcf',
    TopicName: 'Освоение основных видов двигательных действий: ходьба, бег, прыжки, метания, лазание, равновесие',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '37b00597-3345-45e1-a018-3b5df94c4c71',
    TopicName: 'Лёгкая атлетика: бег на короткие и средние дистанции, эстафеты, прыжки в длину и высоту, метание',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '773324b3-f112-489a-ab35-da202d4b377b',
    TopicName: 'Гимнастика: строевые и общеразвивающие упражнения, акробатические элементы, упражнения на снарядах',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c84a084-bbd3-49e6-8023-cc6c17bd963d',
    TopicName: 'Игровые виды спорта: правила, техника и тактика (футбол, баскетбол, волейбол, гандбол и др. по выбору школы)',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '165ccc76-ff39-460a-8467-0c1ed6f08cc6',
    TopicName: 'Подвижные и спортивные игры: развитие быстроты, ловкости, выносливости, умения действовать в команде',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '460ebff3-a69d-43b8-9992-545b896adba0',
    TopicName: 'Лыжная подготовка: техника передвижения, подъемы и спуски, правила безопасности (в регионах без снега — альтернативные модули)',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd6dd4950-c925-4c54-80e4-46d68590d940',
    TopicName: 'Плавание и безопасность на воде (где есть условия): элементы техники, правила поведения у воды',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '33945f90-627e-41cf-b0e6-fa25913c449a',
    TopicName: 'Общая физическая подготовка (ОФП): упражнения на силу, выносливость, быстроту, гибкость, координацию',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8c96a90c-7426-44bc-aec7-3e1f2ffff2f4',
    TopicName: 'Самоконтроль и оценка физического состояния: ЧСС, самонаблюдение, дневник физической активности',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dd34363f-ec97-4c58-9a0f-9983985445d6',
    TopicName: 'Нормативы физической подготовленности (школьные тесты, ГТО как ориентир)',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7b031fd3-6389-4b15-b215-86fdf36eaab9',
    TopicName: 'Особенности занятий при утомлении, недомогании, в «спецгруппе», адаптация нагрузки',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1804d3b9-c22f-4847-9df4-c0defa317f55',
    TopicName: 'Освоение базовых комплексов упражнений для самостоятельных занятий дома и на улице',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4c2c4682-ccc9-4a85-8608-6eae1f64a0a7',
    TopicName: 'Туризм и ориентирование: элементы техники похода, передвижение по местности, правила поведения на природе',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e3176327-a459-4f65-b155-94cc9761d79e',
    TopicName: 'Зимние и летние виды активности: катание на коньках, велопрогулки, походы и др. (по региональным условиям)',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c1372b9-489e-40c7-91f6-e4a0b3ceaec3',
    TopicName: 'История физической культуры и олимпийского движения, спортивные традиции России и мира',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '54d27031-5837-4365-82dd-c0e55ea13b11',
    TopicName: 'Физическая культура и профессиональное самоопределение: роль здоровья и двигательной активности в разных профессиях',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '428c2518-68ee-48fc-805f-dee97e3cc22b',
    TopicName: 'Планирование индивидуальной программы физического развития и поддержания здоровья',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6fb2ba56-e221-4f8f-ba23-1682c3adf0b8',
    TopicName: 'Проектная и исследовательская деятельность: мини-проекты о видах спорта, режиме дня, влиянии движения на здоровье',
    DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по физической культуре...');

    // Проверяем, есть ли уже темы по физической культуре в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по физической культуре. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: PHYSICAL_EDUCATION_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = physicalEducationTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по физической культуре (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по физической культуре
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по физической культуре:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по физической культуре завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Физическая культура" (${PHYSICAL_EDUCATION_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по физической культуре:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

