import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Культурология" из базы данных
const CULTUROLOGY_DISCIPLINE_ID = 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';

const culturologyTopicsData = [
  {
    TopicID: '44a41d98-b788-416d-954a-3800f463006c',
    TopicName: 'Предмет, объект и методы культурологии',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c363ae6f-8fbb-4e47-b9f8-e96d70d29f14',
    TopicName: 'Понятие культуры: основные подходы и определения',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1091b6be-18ac-4894-81a1-d251d1f0a3c2',
    TopicName: 'Структура культуры: материальная, духовная, символическая',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '39ff2152-13cc-48d1-855a-0034c5fe1ef5',
    TopicName: 'Культура и природа. Культура и цивилизация',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '724a14e7-dd27-4265-9bae-0b0deee4bc61',
    TopicName: 'Функции культуры',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3d2baed5-88c6-48f8-ad57-91b62d193052',
    TopicName: 'История культурологической мысли: от античности до постмодерна',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8408d215-6e79-4974-a47d-d93842d4705c',
    TopicName: 'Основные культурологические школы и теории (эволюционизм, культурно-историческая школа, структурализм, символическая антропология и др.)',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5831bd63-026f-4143-bc0e-c01755246e06',
    TopicName: 'Социокультурная динамика и культурные изменения',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5389072a-c66c-4cde-b7f6-60709154afe5',
    TopicName: 'Социализация, инкультурация, аккультурация',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1ae3ae0d-8dc2-4a5f-8b68-25c721c07844',
    TopicName: 'Личность и культура. Культурная идентичность и её кризисы',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5efa6ee1-04ea-4363-b0ad-efd2b89bf8ac',
    TopicName: 'Ценности, нормы, традиции, обряды и ритуалы',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '47a8f0df-5f77-4973-aca0-07a4f2d666c7',
    TopicName: 'Культурные коды, символы и знаки. Семиотика культуры',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e4ce1621-2dfa-434d-bb36-8aad42d89c7b',
    TopicName: 'Язык, текст и дискурс в культурологии',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1f6093e8-e949-462b-a7c1-a0cccb4465e8',
    TopicName: 'Типология культур: народная, элитарная, массовая; субкультуры и контркультуры',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '74a52cf7-6ac0-4b1c-9e07-0a211d60c3bf',
    TopicName: 'Исторические типы и эпохи культуры (традиционная, индустриальная, постиндустриальная; модерн и постмодерн)',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6422bdc9-4ad7-45de-a866-682c72e88e19',
    TopicName: 'Национальные и цивилизационные модели культур',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1e34701d-726a-4eff-b0be-14122ce142c0',
    TopicName: 'Культура России: цивилизационные особенности и исторические этапы',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e6df928f-0c16-4f81-91ea-5ba9290540fb',
    TopicName: 'Религия и миф в структуре культуры',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c6e88cb-3e99-46b8-8228-dc5adc793fd0',
    TopicName: 'Художественная культура и эстетическое сознание',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1c559167-5fdc-4a5a-8929-cb7b3b71a919',
    TopicName: 'Нравственная, правовая и политическая культура',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0e43851f-ad42-435b-8bda-583196a0a561',
    TopicName: 'Городская и повседневная культура',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '024dfe05-672e-43a0-8d17-e3043e62e989',
    TopicName: 'Массовая культура, медиа и культурные индустрии',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f449d1f5-9eec-4028-bb40-97c047d43121',
    TopicName: 'Цифровая культура и сетевые сообщества',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '711aa2a7-17f0-4aa0-a740-41bb9a02307c',
    TopicName: 'Культурная память и культурное наследие',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9aa87d4c-642b-4208-aa52-cba1146b84f9',
    TopicName: 'Культурная политика и управление культурой',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ca551f8b-965f-4320-9573-8ca58eee829a',
    TopicName: 'Межкультурная коммуникация и диалог культур',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3e2eda9c-983a-4a12-9e86-215697e8ac92',
    TopicName: 'Глобализация и локализация (глокализация) в культуре',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3606578c-b350-4683-83b3-d87f7df771f4',
    TopicName: 'Культура и технологии: техногенная цивилизация, биотехнологии, ИИ',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6393ff17-022a-4aaa-ac3b-d8609e12266a',
    TopicName: 'Культура, идентичность и власть: идеология, гегемония, культурный капитал',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ef5ff523-fb97-4d9e-aae6-ce0a62e9b2be',
    TopicName: 'Глобальные вызовы и возможные сценарии развития культуры в будущем',
    DisciplineID: CULTUROLOGY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по культурологии...');

    // Проверяем, есть ли уже темы по культурологии в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: CULTUROLOGY_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по культурологии. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: CULTUROLOGY_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = culturologyTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по культурологии (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по культурологии
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по культурологии:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по культурологии завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Культурология" (${CULTUROLOGY_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по культурологии:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

