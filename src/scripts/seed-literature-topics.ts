import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Discipline } from '../modules/discipline/discipline.entity';
import { Topic } from '../modules/topic/topic.entity';

const literatureTopicsData = [
  {
    TopicID: '4fbbd3e6-1a42-4b84-9c53-2a7a2bff0a9e',
    TopicName: 'Литература как искусство слова: роды и жанры',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b4d9c6a1-4d9a-4b8f-9c2e-5f02ebc7d9d8',
    TopicName: 'Фольклор: миф, сказка, былина',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f1b5b2a6-2a7f-41e6-a2a4-3b6a2a1d8c8d',
    TopicName: 'Древнерусская литература: летопись и житие',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1e1c3b5a-0d64-4b1f-8b3c-8a79a2c3b1d2',
    TopicName: 'Литература XVIII века: классицизм и сентиментализм',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8a2f9e1b-2b75-4e1a-9d7d-2f1e0c9b2a34',
    TopicName: 'Романтизм в русской литературе',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3b9a1d7e-4c6f-4933-9a33-1a6b3a4f8c5d',
    TopicName: 'Реализм XIX века: поэтика и проблематика',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e0d3a2c9-6f3e-43e3-9b2b-1d7e3c5a2f1b',
    TopicName: 'Пушкин: лирика, поэма, роман в стихах',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a6b2c3d4-5e7f-48a1-9f0a-2b3c4d5e6f70',
    TopicName: 'Лермонтов: поэзия и романтический герой',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0f9e8d7c-6b5a-4a3f-92e1-7c6b5a4f3e2d',
    TopicName: 'Гоголь: гротеск и сатирическое изображение',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9e7d6c5b-4a3f-2e1d-8c7b-6a5f4e3d2c1b',
    TopicName: 'Тургенев: герой и социальная проблематика',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7c6b5a4f-3e2d-1c0b-9a8f-7e6d5c4b3a2f',
    TopicName: 'Толстой: эпопея, роман и нравственный выбор',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5a4f3e2d-1c0b-9a8f-7e6d-5c4b3a2f1e0d',
    TopicName: 'Достоевский: полифонизм и проблематика личности',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3e2d1c0b-9a8f-7e6d-5c4b-3a2f1e0d9c8b',
    TopicName: 'Чехов: рассказ и драма, подтекст',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1c0b9a8f-7e6d-5c4b-3a2f-1e0d9c8b7a6f',
    TopicName: 'Серебряный век: символизм, акмеизм, футуризм',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9a8f7e6d-5c4b-3a2f-1e0d-9c8b7a6f5e4d',
    TopicName: 'Поэзия Серебряного века: Блок, Ахматова, Маяковский, Пастернак',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8f7e6d5c-4b3a-2f1e-0d9c-8b7a6f5e4d3c',
    TopicName: 'Литература о войне: 1914–1945 и послевоенные годы',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7e6d5c4b-3a2f-1e0d-9c8b-7a6f5e4d3c2b',
    TopicName: 'Советская литература: социалистический реализм и альтернативы',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6d5c4b3a-2f1e-0d9c-8b7a-6f5e4d3c2b1a',
    TopicName: 'Проза 1960–1980-х: «деревенская» и городская проза',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5c4b3a2f-1e0d-9c8b-7a6f-5e4d3c2b1a0f',
    TopicName: 'Русская литература конца XX — начала XXI века',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4b3a2f1e-0d9c-8b7a-6f5e-4d3c2b1a0f9e',
    TopicName: 'Зарубежная литература: ключевые эпохи и авторы',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3a2f1e0d-9c8b-7a6f-5e4d-3c2b1a0f9e8d',
    TopicName: 'Сюжет, композиция, конфликт',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2f1e0d9c-8b7a-6f5e-4d3c-2b1a0f9e8d7c',
    TopicName: 'Образ автора, рассказчик и точка зрения',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1e0d9c8b-7a6f-5e4d-3c2b-1a0f9e8d7c6b',
    TopicName: 'Художественные средства: тропы и фигуры',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0d9c8b7a-6f5e-4d3c-2b1a-0f9e8d7c6b5a',
    TopicName: 'Стиховедение: размер, рифма, строфа',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9c8b7a6f-5e4d-3c2b-1a0f-9e8d7c6b5a4f',
    TopicName: 'Лирика: методы анализа и интерпретации',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8b7a6f5e-4d3c-2b1a-0f9e-8d7c6b5a4f3e',
    TopicName: 'Эпос: рассказ, повесть, роман — методы анализа',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7a6f5e4d-3c2b-1a0f-9e8d-7c6b5a4f3e2d',
    TopicName: 'Драма: конфликт, ремарка, диалог — методы анализа',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6f5e4d3c-2b1a-0f9e-8d7c-6b5a4f3e2d1c',
    TopicName: 'Интертекстуальность и реминисценции',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5e4d3c2b-1a0f-9e8d-7c6b-5a4f3e2d1c0b',
    TopicName: 'Сатира, ирония, гротеск',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4d3c2b1a-0f9e-8d7c-6b5a-4f3e2d1c0b9a',
    TopicName: 'Типы героев и характер: типизация и индивидуализация',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3c2b1a0f-9e8d-7c6b-5a4f-3e2d1c0b9a8f',
    TopicName: 'Литературные направления и школы',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2b1a0f9e-8d7c-6b5a-4f3e-2d1c0b9a8f7e',
    TopicName: 'Литературная критика: рецензия, эссе, отзыв',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1a0f9e8d-7c6b-5a4f-3e2d-1c0b9a8f7e6d',
    TopicName: 'Экранизация и литературная адаптация',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0f9e8d7c-6b5a-4f3e-2d1c-0b9a8f7e6d5c',
    TopicName: 'Документальная проза и нон-фикшн',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9e8d7c6b-5a4f-3e2d-1c0b-9a8f7e6d5c4b',
    TopicName: 'Детская и подростковая литература',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8d7c6b5a-4f3e-2d1c-0b9a-8f7e6d5c4b3a',
    TopicName: 'Фантастика и фэнтези: миры и концепты',
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const disciplineRepository = app.get(getRepositoryToken(Discipline));
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('🌱 Начинаю заполнение тем по литературе...');
    
    // Проверяем, существует ли дисциплина "Литература"
    const literatureDiscipline = await disciplineRepository.findOne({
      where: { DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f' }
    });
    
    if (!literatureDiscipline) {
      console.log('⚠️  Дисциплина "Литература" не найдена. Сначала запустите скрипт заполнения дисциплин.');
      return;
    }
    
    console.log(`✅ Найдена дисциплина: ${literatureDiscipline.DisciplineName}`);
    
    // Проверяем, есть ли уже темы по литературе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f' }
    });
    
    if (existingTopics.length > 0) {
      console.log(`⚠️  В дисциплине "Литература" уже есть ${existingTopics.length} тем. Очищаю существующие темы...`);
      await topicRepository.remove(existingTopics);
    }
    
    // Создаем темы
    const createdTopics = await topicRepository.save(literatureTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по литературе:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName} (${topic.TopicID})`);
    });
    
    console.log('\n🎉 Заполнение тем по литературе завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по литературе:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
