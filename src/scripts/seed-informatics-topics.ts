import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Информатика и ИКТ" из seed-disciplines.ts: c0e9a8b7-3d6f-4a02-9e5c-7f6a8b9c0d1e
const INFORMATICS_DISCIPLINE_ID = 'c0e9a8b7-3d6f-4a02-9e5c-7f6a8b9c0d1e';

const informaticsTopicsData = [
  {
    TopicID: '1d7aa291-dedc-49fb-94ad-02767ff2e978',
    ID: 700,
    TopicName: 'Информатика как наука. Информация и её представление',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e30385a3-3b29-4ca9-bcbb-f09c0cfe13eb',
    ID: 701,
    TopicName: 'Системы счисления и кодирование информации (обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f18c6e93-1a63-4d0a-b441-4b4bb5e9bf7b',
    ID: 702,
    TopicName: 'Архитектура компьютера: процессор, память, периферия',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c2d2d13f-9a3c-4304-b614-44df54c2519f',
    ID: 703,
    TopicName: 'Операционные системы и файловые системы',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b10e16bd-0a3f-4cea-b0f0-738cc0129161',
    ID: 704,
    TopicName: 'Компьютерные сети и Интернет: модели, протоколы, DNS, HTTP',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f1e2742f-bf60-4013-9059-22b8cfb9fb2a',
    ID: 705,
    TopicName: 'Информационная безопасность и кибергигиена',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '780da3ba-353d-4d60-9f1e-d5e1644ef7de',
    ID: 706,
    TopicName: 'Алгоритмы и исполнители. Алгоритмическое мышление',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3d89bfdd-53ae-4cf8-ade0-bc13c3309d5f',
    ID: 707,
    TopicName: 'Базовые структуры данных: массив, список, стек, очередь (обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd94cf0c6-cf96-4327-a593-ea49aad9bb9c',
    ID: 708,
    TopicName: 'Сложность алгоритмов: идея и оценка (базовый курс)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c34fbaa1-0f4c-4a11-8d50-522c811d6dd5',
    ID: 709,
    TopicName: 'Программирование: переменные, типы, ветвления, циклы',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e98eff90-ce11-4d5a-a6ca-a91b8edd3d77',
    ID: 710,
    TopicName: 'Функции и модули. Рекурсия (вводный курс)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a1ff9d7a-2a4b-4c89-bd27-5eed5df10fbd',
    ID: 711,
    TopicName: 'Объектно-ориентированное программирование (вводный курс)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f4b5434a-4cbf-4531-b2a0-888e0ab493b8',
    ID: 712,
    TopicName: 'Работа с файлами и вводом-выводом',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8be45453-cd34-470b-a57a-6425cd70e2ef',
    ID: 713,
    TopicName: 'Отладка, тестирование и качество кода',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '29b58309-0f2d-4da4-aa25-1fd1620c36d1',
    ID: 714,
    TopicName: 'Контроль версий: Git и основы командной работы',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a98ce67f-9063-49a8-81bf-dc4d3acb030b',
    ID: 715,
    TopicName: 'Базы данных: модели и SQL (вводный курс)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd4d6be47-564a-4c9c-a096-8c2a57c973d7',
    ID: 716,
    TopicName: 'Проектирование данных: таблицы, связи, нормализация (обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '05b512cd-231d-4b44-b7e4-0b1f124c8a5a',
    ID: 717,
    TopicName: 'Веб-разработка: HTML и CSS (основы доступности)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a4a61d7d-bb3a-4b4e-ae0d-084603be06f7',
    ID: 718,
    TopicName: 'Клиент—сервер и API: принципы, REST/GraphQL (обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ac4217ac-4dcf-4c49-8481-0a2914727fb7',
    ID: 719,
    TopicName: 'Скрипты и автоматизация повседневных задач',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '313f3400-d2ab-4de7-963d-5f0f826632ff',
    ID: 720,
    TopicName: 'Электронные таблицы и визуализация данных',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5d9adc66-0be1-44c9-8b1d-3804d89b3bb8',
    ID: 721,
    TopicName: 'Основы анализа данных: описательная статистика и графики',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd6450b28-57fe-4d08-854c-7e2e313c269e',
    ID: 722,
    TopicName: 'Искусственный интеллект и машинное обучение (обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4a3e2a8d-d764-4a5b-b05e-02bc9da7a2ab',
    ID: 723,
    TopicName: 'Генеративный ИИ: практики и этика использования',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '25e39fee-9913-4906-a331-51bafebf5e0f',
    ID: 724,
    TopicName: 'Численные методы и вычислительные эксперименты (вводный)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2934258f-4f3b-46b5-97fd-48206251d1a5',
    ID: 725,
    TopicName: 'Робототехника и сенсоры (обзор, симуляторы)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ef718340-cb4e-4be7-86b0-55063f2cdca9',
    ID: 726,
    TopicName: 'Человеко-компьютерное взаимодействие и UX (основы)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0d6f8885-385d-4d97-8ec6-43e941b02d1e',
    ID: 727,
    TopicName: 'Цифровая этика и право: персональные данные, авторское право',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '97230f47-bb57-4947-9a10-7b56aad6b74a',
    ID: 728,
    TopicName: 'Цифровые проекты: постановка задач, Agile/канбан, командная работа',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f8a084ec-ee80-4d2c-92bf-83c98b5a70aa',
    ID: 729,
    TopicName: 'Облачные вычисления: IaaS/PaaS/SaaS (обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd732c9df-13cb-40cf-94da-7894a5b30d59',
    ID: 730,
    TopicName: 'Мобильная разработка: платформы и инструменты (обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'dc4c581f-172d-4e55-b315-7d8d030cfb56',
    ID: 731,
    TopicName: 'Компьютерная графика и игровые движки (обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '565b8868-9ef0-467c-88bb-7d4d843a7a8d',
    ID: 732,
    TopicName: 'Обработка мультимедиа: изображение, звук, видео (базовый)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e6ef730e-3bce-422c-81a4-1d4e43ed18dc',
    ID: 733,
    TopicName: 'Интернет вещей (IoT): устройства и протоколы (обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0ca7c7e0-8d97-44e3-9b69-5c38d53ae612',
    ID: 734,
    TopicName: 'Квантовые вычисления (очень вводный обзор)',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ba2b88a0-647d-450c-87c1-95bff9004954',
    ID: 735,
    TopicName: 'Карьера в ИТ: роли, практики, портфолио',
    DisciplineID: INFORMATICS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('💻 Начинаю заполнение тем по информатике...');
    
    // Проверяем, есть ли уже темы по информатике в базе
    const existingCount = await topicRepository.count({
      where: { DisciplineID: INFORMATICS_DISCIPLINE_ID }
    });
    
    if (existingCount > 0) {
      console.log(`⚠️  В базе уже есть ${existingCount} тем по информатике. Очищаю темы для этой дисциплины...`);
      await topicRepository.delete({ DisciplineID: INFORMATICS_DISCIPLINE_ID });
    }
    
    // Создаем темы по информатике
    const createdTopics = await topicRepository.save(informaticsTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по информатике:`);
    
    // Группируем темы по разделам информатики для лучшего отображения
    const categorizedTopics: Record<string, string[]> = {
      'Введение в информатику': [],
      'Компьютерные системы': [],
      'Алгоритмы и структуры данных': [],
      'Программирование': [],
      'Базы данных': [],
      'Веб-технологии': [],
      'Анализ данных и ИИ': [],
      'Современные технологии': [],
      'Этика и профессия': [],
      'Специализированные области': []
    };
    
    createdTopics.forEach((topic, index) => {
      const topicName = topic.TopicName;
      console.log(`   ${index + 1}. ${topicName}`);
      
      // Категоризация тем
      if (topicName.includes('Информатика как наука') || topicName.includes('Системы счисления') || 
          topicName.includes('кодирование информации')) {
        categorizedTopics['Введение в информатику'].push(topicName);
      } else if (topicName.includes('Архитектура компьютера') || topicName.includes('Операционные системы') || 
                 topicName.includes('Компьютерные сети') || topicName.includes('Интернет') || 
                 topicName.includes('Информационная безопасность')) {
        categorizedTopics['Компьютерные системы'].push(topicName);
      } else if (topicName.includes('Алгоритмы') || topicName.includes('структуры данных') || 
                 topicName.includes('Сложность алгоритмов') || topicName.includes('исполнители')) {
        categorizedTopics['Алгоритмы и структуры данных'].push(topicName);
      } else if (topicName.includes('Программирование') || topicName.includes('переменные') || 
                 topicName.includes('Функции') || topicName.includes('модули') || 
                 topicName.includes('Объектно-ориентированное') || topicName.includes('файлами') || 
                 topicName.includes('Отладка') || topicName.includes('тестирование') || 
                 topicName.includes('Git') || topicName.includes('контроль версий')) {
        categorizedTopics['Программирование'].push(topicName);
      } else if (topicName.includes('Базы данных') || topicName.includes('SQL') || 
                 topicName.includes('Проектирование данных') || topicName.includes('нормализация')) {
        categorizedTopics['Базы данных'].push(topicName);
      } else if (topicName.includes('Веб-разработка') || topicName.includes('HTML') || 
                 topicName.includes('CSS') || topicName.includes('API') || 
                 topicName.includes('REST') || topicName.includes('GraphQL')) {
        categorizedTopics['Веб-технологии'].push(topicName);
      } else if (topicName.includes('анализа данных') || topicName.includes('таблицы') || 
                 topicName.includes('визуализация') || topicName.includes('статистика') || 
                 topicName.includes('интеллект') || topicName.includes('машинное обучение') || 
                 topicName.includes('Генеративный ИИ')) {
        categorizedTopics['Анализ данных и ИИ'].push(topicName);
      } else if (topicName.includes('Облачные') || topicName.includes('Мобильная') || 
                 topicName.includes('IoT') || topicName.includes('Квантовые') || 
                 topicName.includes('Численные методы')) {
        categorizedTopics['Современные технологии'].push(topicName);
      } else if (topicName.includes('этика') || topicName.includes('право') || 
                 topicName.includes('Карьера') || topicName.includes('портфолио') || 
                 topicName.includes('проекты') || topicName.includes('Agile')) {
        categorizedTopics['Этика и профессия'].push(topicName);
      } else if (topicName.includes('графика') || topicName.includes('игровые') || 
                 topicName.includes('мультимедиа') || topicName.includes('Робототехника') || 
                 topicName.includes('UX') || topicName.includes('автоматизация')) {
        categorizedTopics['Специализированные области'].push(topicName);
      }
    });
    
    console.log('\n📊 Распределение тем по разделам информатики:');
    Object.entries(categorizedTopics).forEach(([category, topics]) => {
      if (topics.length > 0) {
        console.log(`\n💻 ${category} (${topics.length} тем):`);
        topics.forEach(topic => {
          console.log(`   - ${topic}`);
        });
      }
    });
    
    console.log('\n🎉 Заполнение тем по информатике завершено успешно!');
    console.log(`📈 Всего создано: ${createdTopics.length} тем`);
    console.log(`🔗 Привязано к дисциплине: "Информатика" (${INFORMATICS_DISCIPLINE_ID})`);
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по информатике:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
