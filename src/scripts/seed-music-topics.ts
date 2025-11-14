import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Музыка" из базы данных
const MUSIC_DISCIPLINE_ID = 'c6e5a4b3-9d2f-4028-9e1c-3f2a4b5c6d7e';

const musicTopicsData = [
  {
    TopicID: 'f724e92f-3824-485b-8490-e84e4b096e15',
    TopicName: 'Музыка как вид искусства, её роль в жизни человека и общества',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b6758cbc-f1b9-4eaf-8499-2b9ba16590ef',
    TopicName: 'Виды музыкальной деятельности: слушание, пение, игра на инструментах, движение под музыку, импровизация, сочинение',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '28264e94-64de-42be-a69c-93e21f0d1313',
    TopicName: 'Элементы музыкального языка: звук, высота, длительность, тембр, динамика, лад, мелодия, гармония, фактура, форма',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'da8ce9f7-9c69-4803-833b-690363791cd0',
    TopicName: 'Ритм и метр: пульс, размер, ритмические рисунки, смена темпа',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '50760176-39a0-4614-ae55-c4ba4af27707',
    TopicName: 'Нотная запись: нотоносец, ключи, длительности, паузы, размер, простейшие знаки альтерации',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '32b28bc7-99ed-4d06-a316-204eb2688441',
    TopicName: 'Музыкальная фраза, мотив, тема; развитие и повтор в музыке',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9a296b68-8ad3-4052-a090-dfe51262a153',
    TopicName: 'Музыкальная форма: период, простые формы (двух- и трёхчастная), вариации, рондо на школьном уровне',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9a641a8c-3b85-418c-8a2d-2d074df3471c',
    TopicName: 'Жанры музыки: песня, танец, марш, колыбельная, гимн, хоровод, пьеса, сюита, соната, концерт и др.',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '53ce76c6-3714-4cfe-8122-5ea9543d15bd',
    TopicName: 'Вокальная музыка: сольное и хоровое пение, ансамбль, хоры разных составов',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3127a282-01c0-4ec9-ac04-6632c71b9dba',
    TopicName: 'Инструментальная музыка: сольные инструменты, ансамбль, оркестр; группы инструментов и их тембры',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8b16aea6-2f3c-4994-a7fe-ca9a4475eadb',
    TopicName: 'Музыкальный фольклор России: обрядовые, трудовые, протяжные и плясовые песни, былины, частушки, народные инструменты',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f7510eca-2bff-4ed4-8be5-ddf36b991053',
    TopicName: 'Народная музыка народов России и мира, сходство и различия музыкальных традиций',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2ae81b2e-5986-4cbf-a124-f5ce2c980c70',
    TopicName: 'Русская классическая музыка: основные композиторы и их произведения (обзор, без «биографических зубрёжек»)',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2d678b68-d81a-45f7-99b1-84d4a8e7a27c',
    TopicName: 'Зарубежная классическая музыка: эпохи, стили, характерные образы (Средневековье, барокко, классицизм, романтизм, музыка XX века)',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd602b1b8-bfaf-483b-8dda-fc6264b5b8a5',
    TopicName: 'Духовная и религиозная музыка в культуре (обзор: церковное пение, хоровые традиции)',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f71aca03-c12f-4657-a0de-d3a3b549d776',
    TopicName: 'Музыка в театре и балете: музыкальная драматургия, роль оркестра, темы персонажей',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd5352405-93e8-4312-9ae7-2fd341ef5608',
    TopicName: 'Музыка в опере и других вокально-сценических жанрах',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5b96ccaf-8cee-4c4d-ba9c-9edf642177b9',
    TopicName: 'Музыка в кино, мультфильмах, телепередачах, компьютерных играх; саундтрек и звуковой дизайн',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a37a154c-63a7-489c-b4aa-c08ecc1ce9f3',
    TopicName: 'Современная популярная музыка: основные направления (поп, рок, джаз, рэп и др.), молодёжная музыкальная культура',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd51519c5-70b4-4d45-824b-d0e002fada6a',
    TopicName: 'Музыка и другие виды искусства: связь с литературой, изобразительным искусством, танцем, театром',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4b6ac721-d8ab-4acb-b41f-2a5a503c069b',
    TopicName: 'Музыкальная культура родного края: местные традиции, исполнители, коллективы, фестивали, музеи',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6913a72c-9958-4507-a57b-f38749c1ccd1',
    TopicName: 'Музыкально-пластическое движение, танцевальные элементы, передача характера музыки движением',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7ebdf2d0-b34c-4e3e-a6cf-6d0c6f7aaeb9',
    TopicName: 'Основы музыкального творчества: элементарная импровизация голосом и на инструментах, придумывание ритмов и мелодий',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '83298a52-9f60-4b0b-91fa-fb5bb8752e6c',
    TopicName: 'Использование цифровых технологий в музыке: запись и обработка звука, музыкальные приложения и редакторы, создание плейлистов и простых фонограмм',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4e750b3a-ea9d-4770-8c3a-1612e3178202',
    TopicName: 'Проектная деятельность в музыке: афиша и программа концерта, школьный музыкальный спектакль, виртуальный музей инструментов, «музыкальный портрет» класса или отдельного ученика',
    DisciplineID: MUSIC_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по музыке...');

    // Проверяем, есть ли уже темы по музыке в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: MUSIC_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по музыке. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: MUSIC_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = musicTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по музыке (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по музыке
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по музыке:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по музыке завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Музыка" (${MUSIC_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по музыке:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

