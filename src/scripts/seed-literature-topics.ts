import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Литература" из базы данных: 9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f
const LITERATURE_DISCIPLINE_ID = '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f';

const literatureTopicsData = [
  {
    TopicID: '4fbbd3e6-1a42-4b84-9c53-2a7a2bff0a9e',
    TopicName: 'Литература как искусство слова: роды и жанры',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b4d9c6a1-4d9a-4b8f-9c2e-5f02ebc7d9d8',
    TopicName: 'Фольклор: миф, сказка, былина',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f1b5b2a6-2a7f-41e6-a2a4-3b6a2a1d8c8d',
    TopicName: 'Древнерусская литература: летопись и житие',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1e1c3b5a-0d64-4b1f-8b3c-8a79a2c3b1d2',
    TopicName: 'Литература XVIII века: классицизм и сентиментализм',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8a2f9e1b-2b75-4e1a-9d7d-2f1e0c9b2a34',
    TopicName: 'Романтизм в русской литературе',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3b9a1d7e-4c6f-4933-9a33-1a6b3a4f8c5d',
    TopicName: 'Реализм XIX века: поэтика и проблематика',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e0d3a2c9-6f3e-43e3-9b2b-1d7e3c5a2f1b',
    TopicName: 'Пушкин: лирика, поэма, роман в стихах',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a6b2c3d4-5e7f-48a1-9f0a-2b3c4d5e6f70',
    TopicName: 'Лермонтов: поэзия и романтический герой',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0f9e8d7c-6b5a-4a3f-92e1-7c6b5a4f3e2d',
    TopicName: 'Гоголь: гротеск и сатирическое изображение',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9e7d6c5b-4a3f-2e1d-8c7b-6a5f4e3d2c1b',
    TopicName: 'Тургенев: герой и социальная проблематика',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7c6b5a4f-3e2d-1c0b-9a8f-7e6d5c4b3a2f',
    TopicName: 'Толстой: эпопея, роман и нравственный выбор',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5a4f3e2d-1c0b-9a8f-7e6d-5c4b3a2f1e0d',
    TopicName: 'Достоевский: полифонизм и проблематика личности',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3e2d1c0b-9a8f-7e6d-5c4b-3a2f1e0d9c8b',
    TopicName: 'Чехов: рассказ и драма, подтекст',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1c0b9a8f-7e6d-5c4b-3a2f-1e0d9c8b7a6f',
    TopicName: 'Серебряный век: символизм, акмеизм, футуризм',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9a8f7e6d-5c4b-3a2f-1e0d-9c8b7a6f5e4d',
    TopicName: 'Поэзия Серебряного века: Блок, Ахматова, Маяковский, Пастернак',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8f7e6d5c-4b3a-2f1e-0d9c-8b7a6f5e4d3c',
    TopicName: 'Литература о войне: 1914–1945 и послевоенные годы',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7e6d5c4b-3a2f-1e0d-9c8b-7a6f5e4d3c2b',
    TopicName: 'Советская литература: социалистический реализм и альтернативы',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6d5c4b3a-2f1e-0d9c-8b7a-6f5e4d3c2b1a',
    TopicName: 'Проза 1960–1980-х: «деревенская» и городская проза',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5c4b3a2f-1e0d-9c8b-7a6f-5e4d3c2b1a0f',
    TopicName: 'Русская литература конца XX — начала XXI века',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4b3a2f1e-0d9c-8b7a-6f5e-4d3c2b1a0f9e',
    TopicName: 'Зарубежная литература: ключевые эпохи и авторы',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3a2f1e0d-9c8b-7a6f-5e4d-3c2b1a0f9e8d',
    TopicName: 'Сюжет, композиция, конфликт',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2f1e0d9c-8b7a-6f5e-4d3c-2b1a0f9e8d7c',
    TopicName: 'Образ автора, рассказчик и точка зрения',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1e0d9c8b-7a6f-5e4d-3c2b-1a0f9e8d7c6b',
    TopicName: 'Художественные средства: тропы и фигуры',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0d9c8b7a-6f5e-4d3c-2b1a-0f9e8d7c6b5a',
    TopicName: 'Стиховедение: размер, рифма, строфа',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9c8b7a6f-5e4d-3c2b-1a0f-9e8d7c6b5a4f',
    TopicName: 'Лирика: методы анализа и интерпретации',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8b7a6f5e-4d3c-2b1a-0f9e-8d7c6b5a4f3e',
    TopicName: 'Эпос: рассказ, повесть, роман — методы анализа',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7a6f5e4d-3c2b-1a0f-9e8d-7c6b5a4f3e2d',
    TopicName: 'Драма: конфликт, ремарка, диалог — методы анализа',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6f5e4d3c-2b1a-0f9e-8d7c-6b5a4f3e2d1c',
    TopicName: 'Интертекстуальность и реминисценции',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5e4d3c2b-1a0f-9e8d-7c6b-5a4f3e2d1c0b',
    TopicName: 'Сатира, ирония, гротеск',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4d3c2b1a-0f9e-8d7c-6b5a-4f3e2d1c0b9a',
    TopicName: 'Типы героев и характер: типизация и индивидуализация',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3c2b1a0f-9e8d-7c6b-5a4f-3e2d1c0b9a8f',
    TopicName: 'Литературные направления и школы',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2b1a0f9e-8d7c-6b5a-4f3e-2d1c0b9a8f7e',
    TopicName: 'Литературная критика: рецензия, эссе, отзыв',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1a0f9e8d-7c6b-5a4f-3e2d-1c0b9a8f7e6d',
    TopicName: 'Экранизация и литературная адаптация',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0f9e8d7c-6b5a-4f3e-2d1c-0b9a8f7e6d5c',
    TopicName: 'Документальная проза и нон-фикшн',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9e8d7c6b-5a4f-3e2d-1c0b-9a8f7e6d5c4b',
    TopicName: 'Детская и подростковая литература',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8d7c6b5a-4f3e-2d1c-0b9a-8f7e6d5c4b3a',
    TopicName: 'Фантастика и фэнтези: миры и концепты',
    DisciplineID: LITERATURE_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('📚 Начинаю заполнение тем по литературе...');
    
    // Проверяем, есть ли уже темы по литературе в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: LITERATURE_DISCIPLINE_ID }
    });
    
    if (existingCount > 0) {
      console.log(`⚠️  В базе уже есть ${existingCount} тем по литературе. Очищаю темы для этой дисциплины...`);
      await topicRepository.delete({ DisciplineID: LITERATURE_DISCIPLINE_ID });
    }
    
    // Создаем темы по литературе
    const createdTopics = await topicRepository.save(literatureTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по литературе:`);
    
    // Группируем темы по категориям для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Основы и теория': [],
      'История русской литературы': [],
      'Классики и авторы': [],
      'Литературоведение': [],
      'Современность и жанры': []
    };
    
    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);
      
      // Категоризация тем
      if (topicName.includes('искусство слова') || topicName.includes('роды и жанры') || 
          topicName.includes('направления') || topicName.includes('фольклор')) {
        categorizedTopics['Основы и теория'].push(topicName);
      } else if (topicName.includes('век') || topicName.includes('русская') || 
                 topicName.includes('советская') || topicName.includes('древнерусская')) {
        categorizedTopics['История русской литературы'].push(topicName);
      } else if (topicName.includes('Пушкин') || topicName.includes('Лермонтов') || 
                 topicName.includes('Гоголь') || topicName.includes('Тургенев') || 
                 topicName.includes('Толстой') || topicName.includes('Достоевский') || 
                 topicName.includes('Чехов') || topicName.includes('Блок') || 
                 topicName.includes('Ахматова') || topicName.includes('Маяковский')) {
        categorizedTopics['Классики и авторы'].push(topicName);
      } else if (topicName.includes('анализ') || topicName.includes('методы') || 
                 topicName.includes('стиховедение') || topicName.includes('тропы') || 
                 topicName.includes('композиция') || topicName.includes('интертекстуальность')) {
        categorizedTopics['Литературоведение'].push(topicName);
      } else {
        categorizedTopics['Современность и жанры'].push(topicName);
      }
    });
    
    console.log('\n📊 Распределение тем по категориям:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n📖 ${category} (${topics.length} тем):`);
        topics.forEach(topic => {
          console.log(`   - ${topic}`);
        });
      }
    });
    
    console.log('\n🎉 Заполнение тем по литературе завершено успешно!');
    console.log(`📈 Всего создано: ${createdTopics.length} тем`);
    console.log(`🔗 Привязано к дисциплине: "Литература" (${LITERATURE_DISCIPLINE_ID})`);
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по литературе:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();