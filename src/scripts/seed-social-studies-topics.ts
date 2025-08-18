import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Обществознание" из seed-disciplines.ts: b9d8f7e6-2c5e-4f1a-8b4d-6e5f7a8b9c0d
const SOCIAL_STUDIES_DISCIPLINE_ID = 'b9d8f7e6-2c5e-4f1a-8b4d-6e5f7a8b9c0d';

const socialStudiesTopicsData = [
  {
    TopicID: 'f2f7f6d3-6d2d-4b85-bfe6-8be1e3a5a3f5',
    ID: 800,
    TopicName: 'Человек и общество: потребности, интересы, ценности',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a2f5e4d3-c1b2-4d5e-8f90-1a2b3c4d5e6f',
    ID: 801,
    TopicName: 'Мировоззрение, социализация и агенты социализации',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b3e6f5d4-d2c3-4e6f-9012-2b3c4d5e6f70',
    ID: 802,
    TopicName: 'Культура и духовная жизнь общества',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c4f7e6d5-e3d4-4f70-0123-3c4d5e6f7081',
    ID: 803,
    TopicName: 'Социальные нормы: мораль, обычаи, право',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd508f7e6-f4e5-4071-1234-4d5e6f708192',
    ID: 804,
    TopicName: 'Отклоняющееся поведение и социальный контроль',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e61908f7-05f6-4182-2345-5e6f708192a3',
    ID: 805,
    TopicName: 'Социальная структура: стратификация и мобильность',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f72a1908-16f7-4293-3456-6f708192a3b4',
    ID: 806,
    TopicName: 'Малая группа, семья и брак: функции и типы',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '083b2a19-27f8-43a4-4567-708192a3b4c5',
    ID: 807,
    TopicName: 'Этнос, нация и межкультурные взаимодействия',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '194c3b2a-38f9-44b5-5678-8192a3b4c5d6',
    ID: 808,
    TopicName: 'Глобализация: возможности и риски',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2a5d4c3b-49fa-45c6-6789-92a3b4c5d6e7',
    ID: 809,
    TopicName: 'Экономика как хозяйство и наука: ключевые понятия',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3b6e5d4c-5afb-46d7-789a-a3b4c5d6e7f8',
    ID: 810,
    TopicName: 'Производство, факторы и издержки',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4c7f6e5d-6b0c-47e8-89ab-b4c5d6e7f809',
    ID: 811,
    TopicName: 'Рынок и конкуренция. Спрос, предложение, цена',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5d807f6e-7c1d-48f9-9abc-c5d6e7f8091a',
    ID: 812,
    TopicName: 'Деньги, банки и финансовая система (базовый обзор)',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6e90807f-8d2e-490a-abcd-d6e7f8091a2b',
    ID: 813,
    TopicName: 'Государственные финансы: налоги и бюджет',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7fa19080-9e3f-4a1b-bcde-e7f8091a2b3c',
    ID: 814,
    TopicName: 'Инфляция, безработица и экономический рост (вводный)',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8032a191-af40-4b2c-cdef-f8091a2b3c4d',
    ID: 815,
    TopicName: 'Предпринимательство и бизнес-план (базовые основы)',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9143b2a1-b051-4c3d-def0-091a2b3c4d5e',
    ID: 816,
    TopicName: 'Потребитель и его права. Личные финансы и финансовая грамотность',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a254c3b2-c162-4d4e-ef01-11a2b3c4d5e6',
    ID: 817,
    TopicName: 'Политика как сфера общественной жизни',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b365d4c3-d273-4e5f-f012-21a2b3c4d5e6',
    ID: 818,
    TopicName: 'Политическая система: институты, функции, режимы',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c476e5d4-e384-4050-0123-31a2b3c4d5e6',
    ID: 819,
    TopicName: 'Государство и гражданское общество',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd587f6e5-f495-4161-1234-41a2b3c4d5e6',
    ID: 820,
    TopicName: 'Демократия, выборы, политические партии и движения',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e69807f6-05a6-4272-2345-51a2b3c4d5e6',
    ID: 821,
    TopicName: 'Публичная власть в РФ: Конституция, федерализм, органы власти',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f70918a7-16b7-4383-3456-61a2b3c4d5e6',
    ID: 822,
    TopicName: 'Международные отношения и геополитические организации (вводный)',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '081a29b8-27c8-4494-4567-71a2b3c4d5e6',
    ID: 823,
    TopicName: 'Право как регулятор общественных отношений',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '192a3ac9-38d9-45a5-5678-81a2b3c4d5e6',
    ID: 824,
    TopicName: 'Отрасли права: конституционное, гражданское, административное, уголовное (обзор)',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2a3b4bda-49ea-46b6-6789-91a2b3c4d5e6',
    ID: 825,
    TopicName: 'Правоспособность, дееспособность, юридическая ответственность',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3b4c5ceb-5afb-47c7-789a-a1a2b3c4d5e6',
    ID: 826,
    TopicName: 'Сделки, собственность и обязательства (базовый обзор)',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4c5d6dfc-6b0c-48d8-89ab-b1a2b3c4d5e6',
    ID: 827,
    TopicName: 'Трудовое право: трудовой договор, права работника и работодателя',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5d6e7e0d-7c1d-49e9-9abc-c1a2b3c4d5e6',
    ID: 828,
    TopicName: 'Семейное право: брак, права и обязанности членов семьи',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6e7f8f1e-8d2e-4af0-abcd-d1a2b3c4d5e6',
    ID: 829,
    TopicName: 'Защита прав человека: институты и механизмы',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7f80102f-9e3f-4b01-bcde-e1a2b3c4d5e6',
    ID: 830,
    TopicName: 'Коммуникация, СМИ и общественное мнение',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '80912130-af40-4c12-cdef-f1a2b3c4d5e6',
    ID: 831,
    TopicName: 'Наука, технологии и цифровое общество: этика и безопасность',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '91a23241-b051-4d23-def0-01a2b3c4d5e6',
    ID: 832,
    TopicName: 'Социальные изменения, модернизация и устойчивое развитие',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a2b34352-c162-4e34-ef01-11b2c3d4e5f6',
    ID: 833,
    TopicName: 'Экологические вызовы и социальная ответственность',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b3c45463-d273-4f45-f012-21c3d4e5f607',
    ID: 834,
    TopicName: 'Проектная деятельность и исследовательские методы в обществознании',
    DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('🏛️ Начинаю заполнение тем по обществознанию...');
    
    // Проверяем, есть ли уже темы по обществознанию в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID }
    });
    
    if (existingCount > 0) {
      console.log(`⚠️  В базе уже есть ${existingCount} тем по обществознанию. Очищаю темы для этой дисциплины...`);
      await topicRepository.delete({ DisciplineID: SOCIAL_STUDIES_DISCIPLINE_ID });
    }
    
    // Создаем темы по обществознанию
    const createdTopics = await topicRepository.save(socialStudiesTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по обществознанию:`);
    
    // Группируем темы по разделам обществознания для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Человек и общество': [],
      'Социальная сфера': [],
      'Экономическая сфера': [],
      'Политическая сфера': [],
      'Правовая сфера': [],
      'Духовная сфера': [],
      'Современные вызовы': []
    };
    
    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);
      
      // Категоризация тем
      if (topicName.includes('Человек и общество') || topicName.includes('Мировоззрение') || 
          topicName.includes('социализация') || topicName.includes('агенты') || 
          topicName.includes('Проектная деятельность') || topicName.includes('исследовательские')) {
        categorizedTopics['Человек и общество'].push(topicName);
      } else if (topicName.includes('Социальная структура') || topicName.includes('стратификация') || 
                 topicName.includes('мобильность') || topicName.includes('Малая группа') || 
                 topicName.includes('семья') || topicName.includes('брак') || 
                 topicName.includes('Этнос') || topicName.includes('нация') || 
                 topicName.includes('межкультурные') || topicName.includes('Глобализация') || 
                 topicName.includes('Отклоняющееся поведение') || topicName.includes('социальный контроль')) {
        categorizedTopics['Социальная сфера'].push(topicName);
      } else if (topicName.includes('Экономика') || topicName.includes('Производство') || 
                 topicName.includes('Рынок') || topicName.includes('конкуренция') || 
                 topicName.includes('Деньги') || topicName.includes('банки') || 
                 topicName.includes('финансовая система') || topicName.includes('налоги') || 
                 topicName.includes('бюджет') || topicName.includes('Инфляция') || 
                 topicName.includes('безработица') || topicName.includes('Предпринимательство') || 
                 topicName.includes('Потребитель') || topicName.includes('финансовая грамотность')) {
        categorizedTopics['Экономическая сфера'].push(topicName);
      } else if (topicName.includes('Политика') || topicName.includes('Политическая система') || 
                 topicName.includes('Государство') || topicName.includes('гражданское общество') || 
                 topicName.includes('Демократия') || topicName.includes('выборы') || 
                 topicName.includes('партии') || topicName.includes('РФ') || 
                 topicName.includes('Конституция') || topicName.includes('федерализм') || 
                 topicName.includes('Международные отношения')) {
        categorizedTopics['Политическая сфера'].push(topicName);
      } else if (topicName.includes('Право') || topicName.includes('Отрасли права') || 
                 topicName.includes('Правоспособность') || topicName.includes('дееспособность') || 
                 topicName.includes('ответственность') || topicName.includes('Сделки') || 
                 topicName.includes('собственность') || topicName.includes('Трудовое право') || 
                 topicName.includes('Семейное право') || topicName.includes('Защита прав')) {
        categorizedTopics['Правовая сфера'].push(topicName);
      } else if (topicName.includes('Культура') || topicName.includes('духовная жизнь') || 
                 topicName.includes('Социальные нормы') || topicName.includes('мораль') || 
                 topicName.includes('обычаи') || topicName.includes('Коммуникация') || 
                 topicName.includes('СМИ') || topicName.includes('общественное мнение')) {
        categorizedTopics['Духовная сфера'].push(topicName);
      } else if (topicName.includes('технологии') || topicName.includes('цифровое общество') || 
                 topicName.includes('Социальные изменения') || topicName.includes('модернизация') || 
                 topicName.includes('устойчивое развитие') || topicName.includes('Экологические') || 
                 topicName.includes('социальная ответственность')) {
        categorizedTopics['Современные вызовы'].push(topicName);
      }
    });
    
    console.log('\n📊 Распределение тем по разделам обществознания:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n🏛️ ${category} (${topics.length} тем):`);
        topics.forEach(topic => {
          console.log(`   - ${topic}`);
        });
      }
    });
    
    console.log('\n🎉 Заполнение тем по обществознанию завершено успешно!');
    console.log(`📈 Всего создано: ${createdTopics.length} тем`);
    console.log(`🔗 Привязано к дисциплине: "Обществознание" (${SOCIAL_STUDIES_DISCIPLINE_ID})`);
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по обществознанию:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
