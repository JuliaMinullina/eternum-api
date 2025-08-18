import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Химия" из seed-disciplines.ts: d5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e
const CHEMISTRY_DISCIPLINE_ID = 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e';

const chemistryTopicsData = [
  {
    TopicID: 'a1b2c3d4-e5f6-4a7b-8c9d-01a2b3c4d5e6',
    ID: 300,
    TopicName: 'Химия как наука. Вещество и химические явления',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b2c3d4e5-f6a7-4b8c-9dae-12b3c4d5e6f7',
    ID: 301,
    TopicName: 'Техника безопасности и лабораторные приёмы',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c3d4e5f6-a7b8-4c9d-8eaf-23c4d5e6f7a8',
    ID: 302,
    TopicName: 'Строение атома. Электронные конфигурации',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd4e5f6a7-b8c9-4dae-9fb0-34d5e6f7a8b9',
    ID: 303,
    TopicName: 'Периодический закон и периодическая система',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e5f6a7b8-c9d0-4ebf-8a01-45e6f7a8b9c0',
    ID: 304,
    TopicName: 'Химическая связь и строение вещества. ММВ',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f6a7b8c9-d0e1-4f01-9b12-56f7a8b9c0d1',
    ID: 305,
    TopicName: 'Кристаллические и аморфные вещества. Типы кристаллов',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a7b8c9d0-e1f2-4a12-8c23-67a8b9c0d1e2',
    ID: 306,
    TopicName: 'Количественные отношения: моль, молярная масса, число Авогадро',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b8c9d0e1-f203-4b23-9d34-78b9c0d1e2f3',
    ID: 307,
    TopicName: 'Стехиометрия: уравнивание и расчёты по уравнениям реакций',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c9d0e1f2-0345-4c34-8e45-89c0d1e2f3a4',
    ID: 308,
    TopicName: 'Классификация химических реакций. Признаки и условия протекания',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd0e1f203-4567-4d45-9f56-9ad1e2f3a4b5',
    ID: 309,
    TopicName: 'Термохимия: тепловой эффект, закон Гесса',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e1f20345-6789-4e56-8a67-abd2f3a4b5c6',
    ID: 310,
    TopicName: 'Окислительно-восстановительные реакции. Степени окисления',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f2034567-89ab-4f67-9b78-bce3a4b5c6d7',
    ID: 311,
    TopicName: 'Растворы: концентрации, растворимость, коллигативные свойства',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '03456789-abcd-4068-8c89-cdf4b5c6d7e8',
    ID: 312,
    TopicName: 'Электролиты и неэлектролиты. Ионные уравнения реакций',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1456789a-bcde-4169-9d9a-def5c6d7e8f9',
    ID: 313,
    TopicName: 'Кислоты, основания, соли. pH, нейтрализация, гидролиз',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '256789ab-cdef-427a-8eab-ef06d7e8f9a0',
    ID: 314,
    TopicName: 'Оксиды и пероксиды: получение и свойства',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '36789abc-def0-438b-9fbc-f017e8f9a0b1',
    ID: 315,
    TopicName: 'Неметаллы: водород, кислород, сера и их соединения',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4789abcd-ef01-449c-8acd-0128f9a0b1c2',
    ID: 316,
    TopicName: 'Галогены и их соединения',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '589abcde-f012-45ad-9bde-1239a0b1c2d3',
    ID: 317,
    TopicName: 'Азот и фосфор: аммиак, азотная кислота, фосфаты',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '69abcdef-0123-46be-8cef-234ab0c1d2e3',
    ID: 318,
    TopicName: 'Углерод и кремний: оксиды, карбонаты, силикаты',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7abcdef0-1234-47cf-9def-345bc1d2e3f4',
    ID: 319,
    TopicName: 'Металлы: строение, сплавы, коррозия',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8bcdef01-2345-480d-8a01-456cd2e3f4a5',
    ID: 320,
    TopicName: 'Ряд активности металлов. Получение и извлечение',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9cdef012-3456-491e-9b12-567de3f4a5b6',
    ID: 321,
    TopicName: 'Электрохимия: гальванические элементы и электролиз',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'acdef012-3456-4a2f-8c23-678ef4a5b6c7',
    ID: 322,
    TopicName: 'Введение в органическую химию: валентность, изомерия, номенклатура',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'bcdef012-3456-4b30-9d34-789fa5b6c7d8',
    ID: 323,
    TopicName: 'Алканы: строение, изомерия, реакции',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'cdef0123-4567-4c41-8e45-89a0b6c7d8e9',
    ID: 324,
    TopicName: 'Алкены и алкины: реакции присоединения',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'def01234-5678-4d52-9f56-9ab1c7d8e9f0',
    ID: 325,
    TopicName: 'Ароматические углеводороды: бензол и производные',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ef012345-6789-4e63-8a67-abc2d8e9f001',
    ID: 326,
    TopicName: 'Спирты и фенолы',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f0123456-789a-4f74-9b78-bcd3e9f00112',
    ID: 327,
    TopicName: 'Альдегиды и кетоны',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '01234567-89ab-4085-8c89-cde4f0011223',
    ID: 328,
    TopicName: 'Карбоновые кислоты и сложные эфиры',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '12345678-9abc-4196-9d9a-def5f1122334',
    ID: 329,
    TopicName: 'Углеводы: моно-, ди- и полисахариды',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '23456789-abcd-42a7-8eab-ef06f2233445',
    ID: 330,
    TopicName: 'Амины, аминокислоты и белки',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3456789a-bcde-43b8-9fbc-f017f3344556',
    ID: 331,
    TopicName: 'Жиры, мыла и поверхностно-активные вещества',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '456789ab-cdef-44c9-8acd-0128f4455667',
    ID: 332,
    TopicName: 'Полимеры и современные материалы',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '56789abc-def0-45da-9bde-1239f5566778',
    ID: 333,
    TopicName: 'Химическая кинетика и химическое равновесие',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6789abcd-ef01-46eb-8cef-234a06678889',
    ID: 334,
    TopicName: 'Коллоидные системы. Экологическая и «зелёная» химия',
    DisciplineID: CHEMISTRY_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('🧪 Начинаю заполнение тем по химии...');
    
    // Проверяем, есть ли уже темы по химии в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: CHEMISTRY_DISCIPLINE_ID }
    });
    
    if (existingCount > 0) {
      console.log(`⚠️  В базе уже есть ${existingCount} тем по химии. Очищаю темы для этой дисциплины...`);
      await topicRepository.delete({ DisciplineID: CHEMISTRY_DISCIPLINE_ID });
    }
    
    // Создаем темы по химии
    const createdTopics = await topicRepository.save(chemistryTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по химии:`);
    
    // Группируем темы по разделам химии для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Введение в химию': [],
      'Атомно-молекулярное учение': [],
      'Химическая связь и строение вещества': [],
      'Количественные отношения': [],
      'Химические реакции': [],
      'Растворы и электролиты': [],
      'Неорганическая химия': [],
      'Органическая химия': [],
      'Физическая химия': [],
      'Прикладная химия': []
    };
    
    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);
      
      // Категоризация тем
      if (topicName.includes('Химия как наука') || topicName.includes('Техника безопасности')) {
        categorizedTopics['Введение в химию'].push(topicName);
      } else if (topicName.includes('Строение атома') || topicName.includes('Периодический') || 
                 topicName.includes('Количественные') || topicName.includes('моль') || 
                 topicName.includes('Авогадро')) {
        categorizedTopics['Атомно-молекулярное учение'].push(topicName);
      } else if (topicName.includes('Химическая связь') || topicName.includes('строение вещества') || 
                 topicName.includes('Кристаллические') || topicName.includes('аморфные') || 
                 topicName.includes('ММВ')) {
        categorizedTopics['Химическая связь и строение вещества'].push(topicName);
      } else if (topicName.includes('Стехиометрия') || topicName.includes('уравнениям реакций')) {
        categorizedTopics['Количественные отношения'].push(topicName);
      } else if (topicName.includes('реакций') && !topicName.includes('уравнениям') || 
                 topicName.includes('Термохимия') || topicName.includes('Окислительно') || 
                 topicName.includes('кинетика') || topicName.includes('равновесие')) {
        categorizedTopics['Химические реакции'].push(topicName);
      } else if (topicName.includes('Растворы') || topicName.includes('Электролиты') || 
                 topicName.includes('Кислоты') || topicName.includes('основания') || 
                 topicName.includes('соли') || topicName.includes('pH') || 
                 topicName.includes('гидролиз') || topicName.includes('нейтрализация')) {
        categorizedTopics['Растворы и электролиты'].push(topicName);
      } else if (topicName.includes('Оксиды') || topicName.includes('Неметаллы') || 
                 topicName.includes('Галогены') || topicName.includes('Азот и фосфор') || 
                 topicName.includes('Углерод и кремний') || topicName.includes('Металлы') || 
                 topicName.includes('активности') || topicName.includes('Электрохимия')) {
        categorizedTopics['Неорганическая химия'].push(topicName);
      } else if (topicName.includes('органическую') || topicName.includes('Алканы') || 
                 topicName.includes('Алкены') || topicName.includes('алкины') || 
                 topicName.includes('Ароматические') || topicName.includes('Спирты') || 
                 topicName.includes('фенолы') || topicName.includes('Альдегиды') || 
                 topicName.includes('кетоны') || topicName.includes('Карбоновые') || 
                 topicName.includes('эфиры') || topicName.includes('Углеводы') || 
                 topicName.includes('Амины') || topicName.includes('белки') || 
                 topicName.includes('Жиры') || topicName.includes('мыла') || 
                 topicName.includes('Полимеры')) {
        categorizedTopics['Органическая химия'].push(topicName);
      } else if (topicName.includes('кинетика') || topicName.includes('равновесие')) {
        categorizedTopics['Физическая химия'].push(topicName);
      } else if (topicName.includes('Коллоидные') || topicName.includes('Экологическая') || 
                 topicName.includes('зелёная') || topicName.includes('современные материалы')) {
        categorizedTopics['Прикладная химия'].push(topicName);
      }
    });
    
    console.log('\n📊 Распределение тем по разделам химии:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n🧪 ${category} (${topics.length} тем):`);
        topics.forEach(topic => {
          console.log(`   - ${topic}`);
        });
      }
    });
    
    console.log('\n🎉 Заполнение тем по химии завершено успешно!');
    console.log(`📈 Всего создано: ${createdTopics.length} тем`);
    console.log(`🔗 Привязано к дисциплине: "Химия" (${CHEMISTRY_DISCIPLINE_ID})`);
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по химии:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();