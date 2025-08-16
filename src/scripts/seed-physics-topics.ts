import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Discipline } from '../modules/discipline/discipline.entity';
import { Topic } from '../modules/topic/topic.entity';

const physicsTopicsData = [
  {
    TopicID: '2d9b9b1c-1c2e-4c6a-9e8b-9a5a1b3c2e74',
    TopicName: 'Физика как наука. Метод, измерения и погрешности',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7a1d2b3c-4e5f-4a6b-8c9d-0e1f2a3b4c5d',
    TopicName: 'Системы единиц и векторы',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f6e5d4c3-b2a1-4f0e-9c8b-7a6f5e4d3c2b',
    TopicName: 'Кинематика: прямолинейное и криволинейное движение',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0a9b8c7d-6e5f-4d3c-8a1b-2c3d4e5f6a7b',
    TopicName: 'Динамика. Законы Ньютона',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1b2c3d4e-5f6a-4b7c-8d9e-0a1b2c3d4e5f',
    TopicName: 'Силы: тяжесть, упругость, трение',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '26d4e3b2-a1c0-4f9e-8d7c-6b5a4f3e2d1c',
    TopicName: 'Импульс и законы сохранения',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3c4d5e6f-7a8b-49c0-9d1e-2f3a4b5c6d7e',
    TopicName: 'Работа, мощность, энергия',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4d5e6f7a-8b9c-4a0b-9c1d-3e4f5a6b7c8d',
    TopicName: 'Статика и равновесие. Простые механизмы',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5e6f7a8b-9c0d-4b1c-8d2e-4f5a6b7c8d9e',
    TopicName: 'Давление, плотность, гидро- и аэростатика',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6f7a8b9c-0d1e-4c2d-8e3f-5a6b7c8d9e0f',
    TopicName: 'Механические колебания',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '70a8c9db-1e2f-43a0-9b1c-6c7d8e9f0a1b',
    TopicName: 'Механические волны и звук',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '81b9cad0-2f30-42b1-8c2d-7d8e9f0a1b2c',
    TopicName: 'Молекулярно-кинетическая теория',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '92cad1e2-3041-43c2-9d3e-8e0a1b2c3d4e',
    TopicName: 'Термодинамика: внутренняя энергия и теплообмен',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a3db12f3-4152-44d3-8e4f-9f0a1b2c3d4e',
    TopicName: 'Переходы между агрегатными состояниями',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b4ec2304-5263-45e4-9f50-a01b2c3d4e5f',
    TopicName: 'Электростатика: закон Кулона и электрическое поле',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c5fd3415-6374-46f5-8a61-b12c3d4e5f60',
    TopicName: 'Постоянный ток: закон Ома и электрические цепи',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd60e4526-7485-47f6-9b72-c23d4e5f6071',
    TopicName: 'Магнитное поле и магнетизм',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e71f5637-8596-48f7-8c83-d34e5f607182',
    TopicName: 'Электромагнитная индукция. Переменный ток',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f8206748-96a7-49f8-9d94-e45f60718293',
    TopicName: 'Электромагнитные колебания и волны',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '08317859-a7b8-4a09-8ea5-f560718293a4',
    TopicName: 'Геометрическая оптика: отражение, преломление, линзы',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1942896a-b8c9-4b1a-9fb6-06718293a4b5',
    TopicName: 'Волновая оптика: интерференция, дифракция, поляризация',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2a53a97b-c9da-4c2b-80c7-178293a4b5c6',
    TopicName: 'Фотоэффект и дуализм света',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3b64ba8c-daed-4d3c-91d8-28293a4b5c6d',
    TopicName: 'Атомная физика: модели атома и спектры',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4c75cb9d-eafe-4e4d-82e9-39293a4b5c6d',
    TopicName: 'Квантовая механика: базовые идеи',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5d86dcaf-fb10-4f5e-93fa-4a293a4b5c6d',
    TopicName: 'Физика твёрдого тела и полупроводники',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6e97edc0-0c21-406f-84ab-5b293a4b5c6d',
    TopicName: 'Ядерная физика и радиоактивность',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7fa8fed1-1d32-4170-95bc-6c293a4b5c6d',
    TopicName: 'Элементарные частицы: вводный обзор',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '80b910e2-2e43-4281-86cd-7d293a4b5c6d',
    TopicName: 'Специальная теория относительности: основы',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '91ca21f3-3f54-4392-97de-8e293a4b5c6d',
    TopicName: 'Астрофизика и космология (обзор)',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a2db3204-4065-44a3-88ef-9f293a4b5c6d',
    TopicName: 'Экспериментальные методы и обработка данных',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b3ec4315-5176-4bb4-9900-af293a4b5c6d',
    TopicName: 'Прикладная физика и современные технологии',
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const disciplineRepository = app.get(getRepositoryToken(Discipline));
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('🌱 Начинаю заполнение тем по физике...');
    
    // Проверяем, существует ли дисциплина "Физика"
    const physicsDiscipline = await disciplineRepository.findOne({
      where: { DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d' }
    });
    
    if (!physicsDiscipline) {
      console.log('⚠️  Дисциплина "Физика" не найдена. Сначала запустите скрипт заполнения дисциплин.');
      return;
    }
    
    console.log(`✅ Найдена дисциплина: ${physicsDiscipline.DisciplineName}`);
    
    // Проверяем, есть ли уже темы по физике
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d' }
    });
    
    if (existingTopics.length > 0) {
      console.log(`⚠️  В дисциплине "Физика" уже есть ${existingTopics.length} тем. Очищаю существующие темы...`);
      await topicRepository.remove(existingTopics);
    }
    
    // Создаем темы
    const createdTopics = await topicRepository.save(physicsTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по физике:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName} (${topic.TopicID})`);
    });
    
    console.log('\n🎉 Заполнение тем по физике завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по физике:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
