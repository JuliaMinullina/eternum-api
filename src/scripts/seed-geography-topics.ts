import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "География" из seed-disciplines.ts: f7b6d5c4-0a3c-4d9e-8b2f-4c3d5e6f7a8b
const GEOGRAPHY_DISCIPLINE_ID = 'f7b6d5c4-0a3c-4d9e-8b2f-4c3d5e6f7a8b';

const geographyTopicsData = [
  {
    TopicID: 'e5d4fef4-33c3-4d0f-b3a8-1b25e50a98b6',
    ID: 500,
    TopicName: 'География как наука: источники, методы, направления',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd6a1f4e1-9e65-4f2d-8e44-0a4d8e11f0c5',
    ID: 501,
    TopicName: 'Земля как планета: форма, движения, координаты и часовые пояса',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3a7a2ef0-9b77-4b8c-b32b-7b0f3c7a1c21',
    ID: 502,
    TopicName: 'Картография: масштаб, план местности, картографические проекции',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b4bf6b46-9b8d-4b5d-9f9f-3d5a2a6c4f2c',
    ID: 503,
    TopicName: 'ГИС и дистанционное зондирование (ДЗЗ): основы и применение',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f2b9fd1d-2a73-4f5f-8b7f-7d3a195a9a6d',
    ID: 504,
    TopicName: 'Литосфера: строение Земли, тектоника плит, рельеф материков и океанов',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0b2d0e1e-6e8a-4e6d-9c6b-2e8f2f6d6f6e',
    ID: 505,
    TopicName: 'Рельефообразующие процессы: внутренние и внешние',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8d2d54b9-2a7c-47a6-b6f3-4a8c3f2e9e2b',
    ID: 506,
    TopicName: 'Полезные ископаемые и минеральные ресурсы мира',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f34f3c59-3c40-4b4a-8f8b-2bde8f2c9a72',
    ID: 507,
    TopicName: 'Атмосфера: состав, строение, атмосферные процессы',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3b3e2a1f-5a21-4b27-b2f7-9d7f3c5e6e2f',
    ID: 508,
    TopicName: 'Погода и климат: факторы, типы климатов, климатические пояса',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a6a6e3a1-7f0d-4a1f-9b3f-3a7c4e2f1b5b',
    ID: 509,
    TopicName: 'Гидросфера: Мировой океан, океанические течения, ресурсы океана',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8b61a9a5-2f9d-4b49-a881-0f0cfc1f1b9e',
    ID: 510,
    TopicName: 'Внутренние воды: реки, озёра, болота, подземные воды, ледники',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5c7f3b0c-8d1e-4b19-86d9-0d3b1a0a4d54',
    ID: 511,
    TopicName: 'Биосфера и природные зоны: широтная зональность и высотная поясность',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0f49a8b0-9c32-4d12-8eab-a6c1e2b3f4d5',
    ID: 512,
    TopicName: 'Почвы и земельные ресурсы: факторы почвообразования',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd3a2a9b4-7f8c-4a7a-9f1b-2a3c4d5e6f7a',
    ID: 513,
    TopicName: 'Природные комплексы и ландшафты',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f1b2c3d4-5e6f-4a7b-8c9d-01a2b3c4d5e6',
    ID: 514,
    TopicName: 'Природные опасности и риски: землетрясения, вулканизм, наводнения, засухи',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0a1b2c3d-4e5f-4070-8a91-b2c3d4e5f607',
    ID: 515,
    TopicName: 'Население мира: численность, динамика, демографические процессы',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1b2c3d4e-5f60-4718-9ab2-c3d4e5f60718',
    ID: 516,
    TopicName: 'Миграции, урбанизация и расселение: города и агломерации',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2c3d4e5f-6071-4829-a3b4-d4e5f6071829',
    ID: 517,
    TopicName: 'Мировое хозяйство: структура, специализация, глобальные цепочки',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3d4e5f60-7182-493a-b4c5-e5f60718293a',
    ID: 518,
    TopicName: 'Промышленность: добыча, обрабатывающие отрасли, энергетика',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4e5f6071-8293-4a4b-c5d6-f60718293a4b',
    ID: 519,
    TopicName: 'Сельское хозяйство и продовольственные системы',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5f607182-93a4-4b5c-d6e7-0718293a4b5c',
    ID: 520,
    TopicName: 'Транспорт, логистика и мировая инфраструктура',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '60718293-a4b5-4c5d-e6f7-18293a4b5c6d',
    ID: 521,
    TopicName: 'География услуг, туризма и креативной экономики',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '718293a4-b5c6-4d5e-f708-8293a4b5c6d7',
    ID: 522,
    TopicName: 'Глобализация, международная торговля и интеграции',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8293a4b5-c6d7-4e5f-0819-93a4b5c6d7e8',
    ID: 523,
    TopicName: 'Регионы мира: материки, субрегионы и ключевые страны (обзор)',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '93a4b5c6-d7e8-4f60-192a-a4b5c6d7e8f9',
    ID: 524,
    TopicName: 'Россия: географическое положение, границы, физико-географические условия',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a4b5c6d7-e8f9-4061-a23b-b5c6d7e8f9a0',
    ID: 525,
    TopicName: 'Природные ресурсы и экологические проблемы России',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b5c6d7e8-f9a0-4172-b34c-c6d7e8f9a0b1',
    ID: 526,
    TopicName: 'Население и хозяйство России: экономические районы',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c6d7e8f9-a0b1-4283-c45d-d7e8f9a0b1c2',
    ID: 527,
    TopicName: 'Федеральные округа России: профиль и специализация регионов',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd7e8f9a0-b1c2-4394-d56e-e8f9a0b1c2d3',
    ID: 528,
    TopicName: 'Страны СНГ: экономико-географическая характеристика (обзор)',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e8f9a0b1-c2d3-44a5-e67f-f9a0b1c2d3e4',
    ID: 529,
    TopicName: 'Охраняемые природные территории и устойчивое природопользование',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f9a0b1c2-d3e4-45b6-f780-a0b1c2d3e4f5',
    ID: 530,
    TopicName: 'Полевые исследования и школьные геопроекты',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0a0b1c2d-3e4f-46c7-0891-b1c2d3e4f506',
    ID: 531,
    TopicName: 'Практикум по ГИС и картографированию в проектах',
    DisciplineID: GEOGRAPHY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('🌍 Начинаю заполнение тем по географии...');
    
    // Проверяем, есть ли уже темы по географии в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: GEOGRAPHY_DISCIPLINE_ID }
    });
    
    if (existingCount > 0) {
      console.log(`⚠️  В базе уже есть ${existingCount} тем по географии. Очищаю темы для этой дисциплины...`);
      await topicRepository.delete({ DisciplineID: GEOGRAPHY_DISCIPLINE_ID });
    }
    
    // Создаем темы по географии
    const createdTopics = await topicRepository.save(geographyTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по географии:`);
    
    // Группируем темы по разделам географии для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Введение в географию': [],
      'Картография и ГИС': [],
      'Физическая география': [],
      'Литосфера и рельеф': [],
      'Атмосфера и климат': [],
      'Гидросфера': [],
      'Биосфера и почвы': [],
      'Природные комплексы': [],
      'География населения': [],
      'Экономическая география': [],
      'Региональная география': [],
      'География России': [],
      'Экология и природопользование': [],
      'Практическая география': []
    };
    
    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);
      
      // Категоризация тем
      if (topicName.includes('География как наука') || topicName.includes('источники, методы')) {
        categorizedTopics['Введение в географию'].push(topicName);
      } else if (topicName.includes('Картография') || topicName.includes('ГИС') || 
                 topicName.includes('дистанционное зондирование') || topicName.includes('масштаб') || 
                 topicName.includes('проекции') || topicName.includes('картографированию')) {
        categorizedTopics['Картография и ГИС'].push(topicName);
      } else if (topicName.includes('Земля как планета') || topicName.includes('координаты') || 
                 topicName.includes('часовые пояса')) {
        categorizedTopics['Физическая география'].push(topicName);
      } else if (topicName.includes('Литосфера') || topicName.includes('тектоника') || 
                 topicName.includes('рельеф') || topicName.includes('Рельефообразующие') || 
                 topicName.includes('Полезные ископаемые') || topicName.includes('минеральные ресурсы')) {
        categorizedTopics['Литосфера и рельеф'].push(topicName);
      } else if (topicName.includes('Атмосфера') || topicName.includes('Погода') || 
                 topicName.includes('климат') || topicName.includes('атмосферные')) {
        categorizedTopics['Атмосфера и климат'].push(topicName);
      } else if (topicName.includes('Гидросфера') || topicName.includes('океан') || 
                 topicName.includes('течения') || topicName.includes('Внутренние воды') || 
                 topicName.includes('реки') || topicName.includes('озёра') || 
                 topicName.includes('ледники')) {
        categorizedTopics['Гидросфера'].push(topicName);
      } else if (topicName.includes('Биосфера') || topicName.includes('природные зоны') || 
                 topicName.includes('зональность') || topicName.includes('Почвы') || 
                 topicName.includes('земельные ресурсы')) {
        categorizedTopics['Биосфера и почвы'].push(topicName);
      } else if (topicName.includes('Природные комплексы') || topicName.includes('ландшафты') || 
                 topicName.includes('Природные опасности') || topicName.includes('риски')) {
        categorizedTopics['Природные комплексы'].push(topicName);
      } else if (topicName.includes('Население') || topicName.includes('демографические') || 
                 topicName.includes('Миграции') || topicName.includes('урбанизация') || 
                 topicName.includes('расселение')) {
        categorizedTopics['География населения'].push(topicName);
      } else if (topicName.includes('хозяйство') || topicName.includes('Промышленность') || 
                 topicName.includes('Сельское хозяйство') || topicName.includes('Транспорт') || 
                 topicName.includes('услуг') || topicName.includes('туризма') || 
                 topicName.includes('Глобализация') || topicName.includes('торговля')) {
        categorizedTopics['Экономическая география'].push(topicName);
      } else if (topicName.includes('Регионы мира') || topicName.includes('материки') || 
                 topicName.includes('Страны СНГ')) {
        categorizedTopics['Региональная география'].push(topicName);
      } else if (topicName.includes('Россия') || topicName.includes('России') || 
                 topicName.includes('Федеральные округа')) {
        categorizedTopics['География России'].push(topicName);
      } else if (topicName.includes('Охраняемые') || topicName.includes('природопользование') || 
                 topicName.includes('устойчивое')) {
        categorizedTopics['Экология и природопользование'].push(topicName);
      } else if (topicName.includes('Полевые') || topicName.includes('геопроекты') || 
                 topicName.includes('Практикум')) {
        categorizedTopics['Практическая география'].push(topicName);
      }
    });
    
    console.log('\n📊 Распределение тем по разделам географии:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n🌍 ${category} (${topics.length} тем):`);
        topics.forEach(topic => {
          console.log(`   - ${topic}`);
        });
      }
    });
    
    console.log('\n🎉 Заполнение тем по географии завершено успешно!');
    console.log(`📈 Всего создано: ${createdTopics.length} тем`);
    console.log(`🔗 Привязано к дисциплине: "География" (${GEOGRAPHY_DISCIPLINE_ID})`);
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по географии:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
