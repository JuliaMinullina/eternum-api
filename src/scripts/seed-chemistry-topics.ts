import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Discipline } from '../modules/discipline/discipline.entity';
import { Topic } from '../modules/topic/topic.entity';

const chemistryTopicsData = [
  {
    TopicID: 'a1b2c3d4-e5f6-4a7b-8c9d-01a2b3c4d5e6',
    TopicName: 'Химия как наука. Вещество и химические явления',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b2c3d4e5-f6a7-4b8c-9dae-12b3c4d5e6f7',
    TopicName: 'Техника безопасности и лабораторные приёмы',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c3d4e5f6-a7b8-4c9d-8eaf-23c4d5e6f7a8',
    TopicName: 'Строение атома. Электронные конфигурации',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd4e5f6a7-b8c9-4dae-9fb0-34d5e6f7a8b9',
    TopicName: 'Периодический закон и периодическая система',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e5f6a7b8-c9d0-4ebf-8a01-45e6f7a8b9c0',
    TopicName: 'Химическая связь и строение вещества. ММВ',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f6a7b8c9-d0e1-4f01-9b12-56f7a8b9c0d1',
    TopicName: 'Кристаллические и аморфные вещества. Типы кристаллов',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a7b8c9d0-e1f2-4a12-8c23-67a8b9c0d1e2',
    TopicName: 'Количественные отношения: моль, молярная масса, число Авогадро',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b8c9d0e1-f203-4b23-9d34-78b9c0d1e2f3',
    TopicName: 'Стехиометрия: уравнивание и расчёты по уравнениям реакций',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c9d0e1f2-0345-4c34-8e45-89c0d1e2f3a4',
    TopicName: 'Классификация химических реакций. Признаки и условия протекания',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd0e1f203-4567-4d45-9f56-9ad1e2f3a4b5',
    TopicName: 'Термохимия: тепловой эффект, закон Гесса',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e1f20345-6789-4e56-8a67-abd2f3a4b5c6',
    TopicName: 'Окислительно-восстановительные реакции. Степени окисления',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f2034567-89ab-4f67-9b78-bce3a4b5c6d7',
    TopicName: 'Растворы: концентрации, растворимость, коллигативные свойства',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '03456789-abcd-4068-8c89-cdf4b5c6d7e8',
    TopicName: 'Электролиты и неэлектролиты. Ионные уравнения реакций',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1456789a-bcde-4169-9d9a-def5c6d7e8f9',
    TopicName: 'Кислоты, основания, соли. pH, нейтрализация, гидролиз',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '256789ab-cdef-427a-8eab-ef06d7e8f9a0',
    TopicName: 'Оксиды и пероксиды: получение и свойства',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '36789abc-def0-438b-9fbc-f017e8f9a0b1',
    TopicName: 'Неметаллы: водород, кислород, сера и их соединения',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4789abcd-ef01-449c-8acd-0128f9a0b1c2',
    TopicName: 'Галогены и их соединения',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '589abcde-f012-45ad-9bde-1239a0b1c2d3',
    TopicName: 'Азот и фосфор: аммиак, азотная кислота, фосфаты',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '69abcdef-0123-46be-8cef-234ab0c1d2e3',
    TopicName: 'Углерод и кремний: оксиды, карбонаты, силикаты',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7abcdef0-1234-47cf-9def-345bc1d2e3f4',
    TopicName: 'Металлы: строение, сплавы, коррозия',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8bcdef01-2345-480d-8a01-456cd2e3f4a5',
    TopicName: 'Ряд активности металлов. Получение и извлечение',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9cdef012-3456-491e-9b12-567de3f4a5b6',
    TopicName: 'Электрохимия: гальванические элементы и электролиз',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'acdef012-3456-4a2f-8c23-678ef4a5b6c7',
    TopicName: 'Введение в органическую химию: валентность, изомерия, номенклатура',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'bcdef012-3456-4b30-9d34-789fa5b6c7d8',
    TopicName: 'Алканы: строение, изомерия, реакции',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'cdef0123-4567-4c41-8e45-89a0b6c7d8e9',
    TopicName: 'Алкены и алкины: реакции присоединения',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'def01234-5678-4d52-9f56-9ab1c7d8e9f0',
    TopicName: 'Ароматические углеводороды: бензол и производные',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ef012345-6789-4e63-8a67-abc2d8e9f001',
    TopicName: 'Спирты и фенолы',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f0123456-789a-4f74-9b78-bcd3e9f00112',
    TopicName: 'Альдегиды и кетоны',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '01234567-89ab-4085-8c89-cde4f0011223',
    TopicName: 'Карбоновые кислоты и сложные эфиры',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '12345678-9abc-4196-9d9a-def5f1122334',
    TopicName: 'Углеводы: моно-, ди- и полисахариды',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '23456789-abcd-42a7-8eab-ef06f2233445',
    TopicName: 'Амины, аминокислоты и белки',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3456789a-bcde-43b8-9fbc-f017f3344556',
    TopicName: 'Жиры, мыла и поверхностно-активные вещества',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '456789ab-cdef-44c9-8acd-0128f4455667',
    TopicName: 'Полимеры и современные материалы',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '56789abc-def0-45da-9bde-1239f5566778',
    TopicName: 'Химическая кинетика и химическое равновесие',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6789abcd-ef01-46eb-8cef-234a06678889',
    TopicName: 'Коллоидные системы. Экологическая и «зелёная» химия',
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const disciplineRepository = app.get(getRepositoryToken(Discipline));
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('🌱 Начинаю заполнение тем по химии...');
    
    // Проверяем, существует ли дисциплина "Химия"
    const chemistryDiscipline = await disciplineRepository.findOne({
      where: { DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e' }
    });
    
    if (!chemistryDiscipline) {
      console.log('⚠️  Дисциплина "Химия" не найдена. Сначала запустите скрипт заполнения дисциплин.');
      return;
    }
    
    console.log(`✅ Найдена дисциплина: ${chemistryDiscipline.DisciplineName}`);
    
    // Проверяем, есть ли уже темы по химии
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e' }
    });
    
    if (existingTopics.length > 0) {
      console.log(`⚠️  В дисциплине "Химия" уже есть ${existingTopics.length} тем. Очищаю существующие темы...`);
      await topicRepository.remove(existingTopics);
    }
    
    // Создаем темы
    const createdTopics = await topicRepository.save(chemistryTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по химии:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName} (${topic.TopicID})`);
    });
    
    console.log('\n🎉 Заполнение тем по химии завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по химии:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
