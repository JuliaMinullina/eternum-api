import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Философия" из базы данных
const PHILOSOPHY_DISCIPLINE_ID = 'f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b';

const philosophyTopicsData = [
  {
    TopicID: 'a009c922-2b15-45db-a419-c5dad1bf4098',
    TopicName: 'Предмет и специфика философии. Философия и миф, религия, наука, искусство',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0cd27dc1-a8b8-4c39-9ed0-6238dc63f235',
    TopicName: 'Структура философского знания: онтология, гносеология, аксиология, социальная философия, антропология, этика, эстетика, философия науки и др.',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '52897591-7292-4188-a0ea-6fbf6947803a',
    TopicName: 'Возникновение философии: Древняя Индия, Китай, Греция. Мифологическое и философское мышление',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '30b7b820-779a-4e97-bf4a-50241c0d0957',
    TopicName: 'Досократики: натурфилософия, элеаты, атомисты. Проблема первоначала',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'db2da59a-8cb7-4323-8b0e-aa185b374d91',
    TopicName: 'Сократ, Платон, Аристотель: этика, идеи, формы, сущность и причины, логика',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '03faee71-0666-4c9d-aef0-26844e3176ff',
    TopicName: 'Эллинистическая философия: стоицизм, эпикуреизм, скептицизм',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3150d6f7-5c05-4797-a3e2-563bf5b7d973',
    TopicName: 'Средневековая философия: патристика и схоластика, проблема веры и разума, аргументы бытия Бога',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2deb7f27-4496-4e6f-85cc-bacd906c5fea',
    TopicName: 'Философия Возрождения: гуманизм, натурфилософия, новый образ человека и мира',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3f26e80d-264a-4a0b-ab13-9ab18cadaad1',
    TopicName: 'Философия Нового времени: рационализм (Декарт, Спиноза, Лейбниц) и эмпиризм (Бэкон, Локк, Юм)',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9fc6494f-9bde-4113-99b5-94536af80357',
    TopicName: 'Немецкая классическая философия: Кант (критика разума), Фихте, Шеллинг, Гегель (диалектика, абсолютный дух)',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2f5879f0-7a88-4d9c-9682-a38eb25735f3',
    TopicName: 'Марксизм: исторический материализм, диалектика, понятие отчуждения, формационный подход к обществу',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '61802eed-96a0-4d82-b2c0-a3de3e6835f8',
    TopicName: 'Неклассическая философия XIX–XX вв.: Ницше, философия жизни, феноменология, экзистенциализм, прагматизм',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2534671e-a024-4c54-ac94-0ce4027e1f66',
    TopicName: 'Аналитическая философия: логический позитивизм, философия языка, философия сознания, теория аргументации',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ebc29730-a435-470b-976e-20849711cad0',
    TopicName: 'Структурализм и постструктурализм: язык, власть, дискурс, деконструкция',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0a93f0ee-12a5-4db3-b2ae-4fe7a0199c35',
    TopicName: 'Восточные философские традиции (обзор): индийская (веданта, буддизм), китайская (конфуцианство, даосизм), исламская философия',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ef7a1863-da9e-4d40-b9e4-509ac35dba8b',
    TopicName: 'Философская антропология: человек как биосоциальное и духовное существо, свобода, ответственность, смысл жизни, смерть',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b416f7b1-4c60-494b-a751-0d1feacb5e27',
    TopicName: 'Сознание и бессознательное: философские и психоаналитические интерпретации',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '172030ae-e96f-4742-b76a-385a86303de1',
    TopicName: 'Онтология: бытие и небытие, материя и сознание, пространство и время, движение и развитие, детерминизм и индетерминизм',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '24e4a3ed-f7a5-4425-ab20-0fa92e2fc38c',
    TopicName: 'Диалектика, метафизика и системный подход. Принципы развития, противоречия, переход количественных изменений в качественные',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4901d42a-8f48-45db-b212-c4712120c101',
    TopicName: 'Гносеология: чувственное и рациональное познание, истина, критерии истины, скептицизм и догматизм',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dc2b7bcb-15e7-42ff-9301-4667c0dae50b',
    TopicName: 'Язык и мышление: знаки, значения, интерпретация, роль языка в построении реальности',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '930faa21-3487-4dd6-ae4c-72e9a6bae55c',
    TopicName: 'Философия науки: структура научного знания, научная картина мира, парадигмы, фальсификационизм, проблема демаркации науки и ненауки',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9c31790b-1038-4faa-abf3-199140d6fb3e',
    TopicName: 'Этика: добро и зло, долг и счастье, утилитаризм, деонтология, этика добродетели, современные этические вызовы (биотехнологии, ИИ и др.)',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1b4c868f-7090-4697-8bdb-b472fab32bd0',
    TopicName: 'Эстетика и философия искусства: прекрасное, возвышенное, вкус, искусство и реальность, искусство в эпоху массмедиа',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b7426bad-d152-43ac-b94d-9f16952349f2',
    TopicName: 'Аксиология: ценности, смысл, идеалы, нормативные системы и культурный релятивизм',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '398042e1-1cc0-40bd-a8ba-a40059d2d9cd',
    TopicName: 'Социальная философия: общество как система, социальная структура, свобода и власть, отчуждение, общественный прогресс и регресс',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd3939649-0a16-4a75-824d-8d638947926b',
    TopicName: 'Политическая философия: государство, справедливость, власть, право, социальный контракт, либерализм, социализм, коммунитаризм, критика идеологий',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c2fb6ec7-0245-4d3e-985c-85a0011bab49',
    TopicName: 'Философия истории: линейные и циклические модели истории, прогресс, судьба, историзм, цивилизационный подход',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3ece606d-e8a3-4939-933f-03626754f619',
    TopicName: 'Философия религии: религиозный опыт, аргументы за и против существования Бога, секуляризация, религия в современном мире',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2d828b5e-bea3-492e-97f6-e66ad5ac68d5',
    TopicName: 'Философия техники и технологии: техногенная цивилизация, риски и возможности, цифровизация, искусственный интеллект',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c41a4ef2-cc2b-4b7c-ba8e-d5b3bb1cbebc',
    TopicName: 'Философия культуры и цивилизации: массовая культура, глобализация, идентичность, диалог культур',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '37781e20-2c13-4936-b417-c598ce61e6c2',
    TopicName: 'Философия будущего: трансгуманизм, постгуманизм, сценарии развития человека и общества, пределы философского мышления',
    DisciplineID: PHILOSOPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по философии...');

    // Проверяем, есть ли уже темы по философии в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: PHILOSOPHY_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по философии. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: PHILOSOPHY_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = philosophyTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по философии (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по философии
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по философии:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по философии завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Философия" (${PHILOSOPHY_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по философии:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

