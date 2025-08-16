import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Discipline } from '../modules/discipline/discipline.entity';
import { Topic } from '../modules/topic/topic.entity';

const mathematicsTopicsData = [
  {
    TopicID: 'a0a9d1e8-2c9f-4d3a-bc7a-8b8e6c0f3d3a',
    TopicName: 'Натуральные числа и действия',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b1c8f2a7-6e3d-4a1c-8c8e-2d2a0b7e9f4d',
    TopicName: 'Дроби: обыкновенные и десятичные',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c2d7e3b6-1f4a-4b2d-9a1e-3f5c8d7a0e1f',
    TopicName: 'Проценты и пропорции',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd3e6f4c5-2a5b-4c3e-8b2f-4a6d9e1c2b3a',
    TopicName: 'Степени и корни (обзор)',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e4f5a6d7-3b6c-4d4f-9c3a-5b7e0f2d3c4b',
    TopicName: 'Алгебраические выражения и преобразования',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f5a6b7c8-4c7d-4e50-8d4b-6c8f1a3e4d5c',
    TopicName: 'Линейные уравнения и неравенства',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '06b7c8d9-5d8e-4151-9e5c-7d9f2b4f5e6d',
    TopicName: 'Системы линейных уравнений',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '17c8d9ea-6e9f-4262-8f6d-8e0a3c5f6a7e',
    TopicName: 'Функция и график функции (обзор)',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '28d9ea0b-7faf-4373-9a7e-9f1b4d6a7b8c',
    TopicName: 'Линейная функция',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '39ea0b1c-80b0-4484-8b8f-a02c5e7b8c9d',
    TopicName: 'Квадратичная функция: свойства и график',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4afb1c2d-91c1-4595-9c0a-b13d6f8c9d0e',
    TopicName: 'Многочлены и разложение на множители',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5b0c2d3e-a2d2-46a6-8d1b-c24e709dae1f',
    TopicName: 'Рациональные дроби и преобразования выражений',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6c1d3e4f-b3e3-47b7-9e2c-d35f81aebf20',
    TopicName: 'Иррациональные выражения и радикалы',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7d2e4f50-c4f4-48c8-8f3d-e46092bf0c31',
    TopicName: 'Показательная и логарифмическая функции (вводный курс)',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8e3f5061-d505-4999-9a4e-f571a3c01d42',
    TopicName: 'Последовательности и прогрессии',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9f405172-e616-4aaa-8b5f-0682b4d12e53',
    TopicName: 'Элементы комбинаторики',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a0516283-f727-4bbb-9c60-1793c5e23f64',
    TopicName: 'Вероятность: элементарные события',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b1627394-0838-4ccc-8d71-28a4d6f34a75',
    TopicName: 'Статистика и представление данных',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c27384a5-1949-4ddd-9e82-39b5e8045b86',
    TopicName: 'Логика и доказательства. Методы решения',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd38495b6-2a5a-4eee-8f93-4ac6f9156c97',
    TopicName: 'Координатная плоскость и векторы (вводный курс)',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e495a6c7-3b6b-4fff-9fa4-5bd70a267da8',
    TopicName: 'Планиметрия: параллельные прямые и углы',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f5a6b7c8-4c7d-4000-8db5-6ce81b378eb9',
    TopicName: 'Треугольники: равенство и подобие',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '06b7c8d9-5d8e-4111-9ec6-7df92c489fca',
    TopicName: 'Многоугольники',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '17c8d9ea-6e9f-4222-8fd7-8e0a3c59afd0',
    TopicName: 'Окружность: углы, хорды, касательные',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '28d9ea0b-7faf-4333-9a08-9f1b4d6a7bd1',
    TopicName: 'Геометрические преобразования: симметрия, поворот, перенос',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '39ea0b1c-80b0-4444-8b19-a02c5e7b8c02',
    TopicName: 'Площадь фигур. Теорема Пифагора',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4afb1c2d-91c1-4555-9c2a-b13d6f8c9d13',
    TopicName: 'Стереометрия: призмы, пирамиды, цилиндр, конус, шар',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5b0c2d3e-a2d2-4666-8d3b-c24e709dae24',
    TopicName: 'Объёмы и площади поверхностей тел',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6c1d3e4f-b3e3-4777-9e4c-d35f81aebf35',
    TopicName: 'Тригонометрия: основные соотношения',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7d2e4f50-c4f4-4888-8f5d-e46092bf0c46',
    TopicName: 'Тригонометрические уравнения и преобразования',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8e3f5061-d505-4999-9a5e-f571a3c01d57',
    TopicName: 'Производная и её приложения (вводный курс)',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9f405172-e616-4aaa-8b6f-0682b4d12e68',
    TopicName: 'Первообразная и определённый интеграл (вводный курс)',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a0516283-f727-4bbb-9c70-1793c5e23f79',
    TopicName: 'Комплексные числа (вводный курс)',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b1627394-0838-4ccc-8d81-28a4d6f34a8a',
    TopicName: 'Уравнения и неравенства с параметрами (базовый курс)',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c27384a5-1949-4ddd-9e92-39b5e8045b9b',
    TopicName: 'Модуль и его свойства',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd38495b6-2a5a-4eee-8fa3-4ac6f9156ca0',
    TopicName: 'Теория чисел: делимость, простые числа',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e495a6c7-3b6b-4fff-9ab4-5bd70a267db1',
    TopicName: 'Алгоритмы и эвристики решения задач',
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const disciplineRepository = app.get(getRepositoryToken(Discipline));
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('🌱 Начинаю заполнение тем по математике...');
    
    // Проверяем, существует ли дисциплина "Математика"
    const mathematicsDiscipline = await disciplineRepository.findOne({
      where: { DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d' }
    });
    
    if (!mathematicsDiscipline) {
      console.log('⚠️  Дисциплина "Математика" не найдена. Сначала запустите скрипт заполнения дисциплин.');
      return;
    }
    
    console.log(`✅ Найдена дисциплина: ${mathematicsDiscipline.DisciplineName}`);
    
    // Проверяем, есть ли уже темы по математике
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d' }
    });
    
    if (existingTopics.length > 0) {
      console.log(`⚠️  В дисциплине "Математика" уже есть ${existingTopics.length} тем. Очищаю существующие темы...`);
      await topicRepository.remove(existingTopics);
    }
    
    // Создаем темы
    const createdTopics = await topicRepository.save(mathematicsTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по математике:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName} (${topic.TopicID})`);
    });
    
    console.log('\n🎉 Заполнение тем по математике завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по математике:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
