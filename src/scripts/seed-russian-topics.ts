import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Русский язык" из seed-disciplines.ts: 6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d
const RUSSIAN_DISCIPLINE_ID = '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d';

const russianTopicsData = [
  {
    TopicID: '2c7a9e9a-b9d7-4f7a-9c0a-9e1b5b8b2f1d',
    ID: 600,
    TopicName: 'Язык и речь: функции и уровни',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0b1c2d3e-4f50-4612-8a9b-0c1d2e3f4a5b',
    ID: 601,
    TopicName: 'Нормы современного русского литературного языка',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1c2d3e4f-5061-4723-9b0c-1d2e3f4a5b6c',
    ID: 602,
    TopicName: 'Культура речи и речевой этикет',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2d3e4f50-6172-4834-a0b1-2e3f4a5b6c7d',
    ID: 603,
    TopicName: 'Фонетика и орфоэпия (обзор)',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3e4f5061-7283-4945-b1c2-3f4a5b6c7d8e',
    ID: 604,
    TopicName: 'Графика и алфавит. Орфографический минимум',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4f506172-8394-4a56-c2d3-4a5b6c7d8e9f',
    ID: 605,
    TopicName: 'Морфемика: строение слова',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '50617283-94a5-4b67-d3e4-5b6c7d8e9f0a',
    ID: 606,
    TopicName: 'Словообразование: способы и модели',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '61728394-a5b6-4c78-e4f5-6c7d8e9f0a1b',
    ID: 607,
    TopicName: 'Лексикология: значение слова и многозначность',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '728394a5-b6c7-4d89-f506-7d8e9f0a1b2c',
    ID: 608,
    TopicName: 'Синонимия, антонимия, омонимия, паронимия',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8394a5b6-c7d8-4e90-0617-8e9f0a1b2c3d',
    ID: 609,
    TopicName: 'Фразеология: устойчивые выражения и их употребление',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '94a5b6c7-d8e9-4f01-1728-9f0a1b2c3d4e',
    ID: 610,
    TopicName: 'Морфология: части речи и грамматические категории (обзор)',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a5b6c7d8-e9f0-4102-2839-0a1b2c3d4e5f',
    ID: 611,
    TopicName: 'Имя существительное: категории и формы',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b6c7d8e9-f001-4213-394a-1b2c3d4e5f60',
    ID: 612,
    TopicName: 'Имя прилагательное: разряды и формы',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c7d8e9f0-0123-4324-4a5b-2c3d4e5f6071',
    ID: 613,
    TopicName: 'Имя числительное: разряды и склонение',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd8e9f001-1234-4435-5b6c-3d4e5f607182',
    ID: 614,
    TopicName: 'Местоимение: разряды и употребление',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e9f00112-2345-4546-6c7d-4e5f60718293',
    ID: 615,
    TopicName: 'Глагол: вид, время, спряжение, наклонение',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f0011223-3456-4657-7d8e-5f60718293a4',
    ID: 616,
    TopicName: 'Причастие: признаки, образование, употребление',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '01122334-4567-4768-8e9f-60718293a4b5',
    ID: 617,
    TopicName: 'Деепричастие: признаки и употребление',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '12233445-5678-4879-9f00-718293a4b5c6',
    ID: 618,
    TopicName: 'Наречие: разряды и функции',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '23344556-6789-498a-a011-8293a4b5c6d7',
    ID: 619,
    TopicName: 'Служебные части речи: предлоги, союзы, частицы',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '34455667-789a-409b-b122-93a4b5c6d7e8',
    ID: 620,
    TopicName: 'Междометия и звукоизобразительные слова',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '45566778-89ab-41ac-c233-a4b5c6d7e8f9',
    ID: 621,
    TopicName: 'Орфография: принципы и виды орфограмм',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '56677889-9abc-42bd-d344-b5c6d7e8f901',
    ID: 622,
    TopicName: 'Правописание частей речи (обзор)',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6778899a-abcd-43ce-e455-c6d7e8f90112',
    ID: 623,
    TopicName: 'Синтаксис: слово, словосочетание, предложение (обзор)',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '78899aab-bcde-44df-f566-d7e8f9011223',
    ID: 624,
    TopicName: 'Простое предложение: главные и второстепенные члены',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '899aabbc-cdef-4500-0677-e8f901122334',
    ID: 625,
    TopicName: 'Однородные члены и обобщающие слова',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9aabbccd-def0-4611-1788-f90112233445',
    ID: 626,
    TopicName: 'Обособленные члены предложения',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'abbccdde-ef01-4722-2899-011223344556',
    ID: 627,
    TopicName: 'Вводные слова, обращения, вставные конструкции',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'bccddeef-f012-4833-39aa-112233445567',
    ID: 628,
    TopicName: 'Сложные предложения: классификация (ССП, СПП, БСП)',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ccddeeff-0012-4944-4abb-223344556678',
    ID: 629,
    TopicName: 'Сложносочинённое предложение',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ddeeff00-1234-4a55-5bcc-334455667789',
    ID: 630,
    TopicName: 'Сложноподчинённое предложение',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'eeff0011-2345-4b66-6cdd-44556677889a',
    ID: 631,
    TopicName: 'Бессоюзное сложное предложение',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ff001122-3456-4c77-7dee-5566778899ab',
    ID: 632,
    TopicName: 'Прямая речь, диалог, цитирование',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '00112233-4567-4d88-8eff-66778899aabb',
    ID: 633,
    TopicName: 'Пунктуация: смысл, структура, интонация',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '11223344-5678-4e99-9f00-778899aabbcc',
    ID: 634,
    TopicName: 'Текст: тема, идея, композиция, микротемы',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '22334455-6789-4faa-a011-8899aabbccdd',
    ID: 635,
    TopicName: 'Типы речи: повествование, описание, рассуждение',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '33445566-789a-400b-b122-99aabbccdde0',
    ID: 636,
    TopicName: 'Стили речи: разговорный, научный, публицистический, официально-деловой, художественный',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '44556677-89ab-410c-c233-aabbccddeeff',
    ID: 637,
    TopicName: 'Средства межфразной связи и связность текста',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '55667788-9abc-421d-d344-bbccddeeff00',
    ID: 638,
    TopicName: 'Редактирование текста и исправление речевых ошибок',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '66778899-abcd-432e-e455-ccddeeff0011',
    ID: 639,
    TopicName: 'Создание письменных высказываний: сочинение, эссе, аргументация',
    DisciplineID: RUSSIAN_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('📝 Начинаю заполнение тем по русскому языку...');
    
    // Проверяем, есть ли уже темы по русскому языку в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: RUSSIAN_DISCIPLINE_ID }
    });
    
    if (existingCount > 0) {
      console.log(`⚠️  В базе уже есть ${existingCount} тем по русскому языку. Очищаю темы для этой дисциплины...`);
      await topicRepository.delete({ DisciplineID: RUSSIAN_DISCIPLINE_ID });
    }
    
    // Создаем темы по русскому языку
    const createdTopics = await topicRepository.save(russianTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по русскому языку:`);
    
    // Группируем темы по разделам русского языка для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Введение в русский язык': [],
      'Фонетика и графика': [],
      'Лексикология и фразеология': [],
      'Морфемика и словообразование': [],
      'Морфология': [],
      'Орфография': [],
      'Синтаксис': [],
      'Пунктуация': [],
      'Стилистика и развитие речи': []
    };
    
    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);
      
      // Категоризация тем
      if (topicName.includes('Язык и речь') || topicName.includes('Нормы') || 
          topicName.includes('Культура речи')) {
        categorizedTopics['Введение в русский язык'].push(topicName);
      } else if (topicName.includes('Фонетика') || topicName.includes('орфоэпия') || 
                 topicName.includes('Графика') || topicName.includes('алфавит')) {
        categorizedTopics['Фонетика и графика'].push(topicName);
      } else if (topicName.includes('Лексикология') || topicName.includes('Синонимия') || 
                 topicName.includes('антонимия') || topicName.includes('омонимия') || 
                 topicName.includes('паронимия') || topicName.includes('Фразеология')) {
        categorizedTopics['Лексикология и фразеология'].push(topicName);
      } else if (topicName.includes('Морфемика') || topicName.includes('Словообразование')) {
        categorizedTopics['Морфемика и словообразование'].push(topicName);
      } else if (topicName.includes('Морфология') || topicName.includes('существительное') || 
                 topicName.includes('прилагательное') || topicName.includes('числительное') || 
                 topicName.includes('Местоимение') || topicName.includes('Глагол') || 
                 topicName.includes('Причастие') || topicName.includes('Деепричастие') || 
                 topicName.includes('Наречие') || topicName.includes('Служебные') || 
                 topicName.includes('Междометия')) {
        categorizedTopics['Морфология'].push(topicName);
      } else if (topicName.includes('Орфография') || topicName.includes('Правописание')) {
        categorizedTopics['Орфография'].push(topicName);
      } else if (topicName.includes('Синтаксис') || topicName.includes('предложение') || 
                 topicName.includes('члены') || topicName.includes('Однородные') || 
                 topicName.includes('Обособленные') || topicName.includes('Вводные') || 
                 topicName.includes('Сложные') || topicName.includes('Сложносочинённое') || 
                 topicName.includes('Сложноподчинённое') || topicName.includes('Бессоюзное') || 
                 topicName.includes('Прямая речь') || topicName.includes('диалог')) {
        categorizedTopics['Синтаксис'].push(topicName);
      } else if (topicName.includes('Пунктуация')) {
        categorizedTopics['Пунктуация'].push(topicName);
      } else if (topicName.includes('Текст') || topicName.includes('Типы речи') || 
                 topicName.includes('Стили речи') || topicName.includes('межфразной') || 
                 topicName.includes('Редактирование') || topicName.includes('Создание') || 
                 topicName.includes('сочинение') || topicName.includes('эссе')) {
        categorizedTopics['Стилистика и развитие речи'].push(topicName);
      }
    });
    
    console.log('\n📊 Распределение тем по разделам русского языка:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n📝 ${category} (${topics.length} тем):`);
        topics.forEach(topic => {
          console.log(`   - ${topic}`);
        });
      }
    });
    
    console.log('\n🎉 Заполнение тем по русскому языку завершено успешно!');
    console.log(`📈 Всего создано: ${createdTopics.length} тем`);
    console.log(`🔗 Привязано к дисциплине: "Русский язык" (${RUSSIAN_DISCIPLINE_ID})`);
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по русскому языку:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();