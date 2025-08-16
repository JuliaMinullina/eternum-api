import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Discipline } from '../modules/discipline/discipline.entity';
import { Topic } from '../modules/topic/topic.entity';

const biologyTopicsData = [
  {
    TopicID: '7b6f8c12-9e7d-4c2b-9b2d-9b1b9dcf3b61',
    TopicName: 'Биология как наука. Уровни организации живого',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b1d7a2b4-2c1a-4371-8c6a-0d6f3f8b2d10',
    TopicName: 'Биомолекулы: белки, липиды, углеводы, нуклеиновые кислоты',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a3e5f7c1-4c0c-4b3f-9c8c-1f2a3b4c5d6e',
    TopicName: 'Клетка: строение, органоиды и функции',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c4a2b1f9-8b7b-4206-86d1-7b6a9c3f1e55',
    TopicName: 'Обмен веществ и энергия. Ферменты и АТФ',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e5b4c3d2-6a1f-4b3a-8c7f-9d1e2f3a4b5c',
    TopicName: 'Фотосинтез: световая и темновая фазы',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f6c5d4e3-7b20-4c4b-9d80-0a1b2c3d4e5f',
    TopicName: 'Клеточное дыхание: гликолиз, Кребс, окислительное фосфорилирование',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '08d7e6f5-8121-4d5c-8e91-1b2c3d4e5f60',
    TopicName: 'Деление клеток: митоз и мейоз',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '19e8f7a6-9232-4e6d-9fa2-2c3d4e5f6071',
    TopicName: 'Наследственность: законы Менделя и решётки Пеннета',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2af908b7-a343-4f7e-8ab3-3d4e5f607182',
    TopicName: 'Молекулярная генетика: ДНК, РНК, ген и экспрессия',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3b0a19c8-b454-408f-9bc4-4e5f60718293',
    TopicName: 'Изменчивость и мутации. Генетика человека (этика)',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4c1b2ad9-c565-4190-8cd5-5f60718293a4',
    TopicName: 'Эволюция: отбор, борьба за существование, СТЭ',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5d2c3bea-d676-42a1-9de6-60718293a4b5',
    TopicName: 'Систематика и многообразие живых организмов',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6e3d4cfb-e787-43b2-8ef7-718293a4b5c6',
    TopicName: 'Прокариоты: бактерии и археи. Роль в природе и технике',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7f4e5d0c-f898-44c3-9f08-8293a4b5c6d7',
    TopicName: 'Вирусы: строение, циклы, взаимодействие с клеткой',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '805f6e1d-0a09-45d4-8109-9394b5c6d7e8',
    TopicName: 'Грибы и лишайники: особенности организации и роль',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '91607f2e-1b1a-46e5-921a-a4b5c6d7e8f9',
    TopicName: 'Растения: ткани и органы. Жизненные формы',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a271803f-2c2b-47f6-a32b-b5c6d7e8f901',
    TopicName: 'Минеральное питание и транспорт веществ у растений',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b3829140-3d3c-48a7-b43c-c6d7e8f90112',
    TopicName: 'Размножение растений и онтогенез',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c493a251-4e4d-49b8-c54d-d7e8f9011223',
    TopicName: 'Животные: ткани и системы органов (обзор)',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd5a4b362-5f5e-4ac9-d65e-e8f901122334',
    TopicName: 'Человек: анатомия и физиология (общий обзор)',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e6b5c473-606f-4bda-e76f-f90112233445',
    TopicName: 'Пищеварительная система. Питание и обмен веществ',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f7c6d584-7170-4ceb-f880-091223344556',
    TopicName: 'Кровь, иммунитет и кровообращение',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '08d7e695-8281-40fc-8891-112233445567',
    TopicName: 'Дыхательная система и газообмен',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '19e8f7a6-9392-41fd-9aa2-223344556678',
    TopicName: 'Выделительная система и водно-солевой баланс',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2af908b7-a403-42f1-8ab3-334455667789',
    TopicName: 'Нервная система и органы чувств. Поведение',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3b0a19c8-b564-4b12-9bc4-44556677889a',
    TopicName: 'Эндокринная регуляция и гомеостаз',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4c1b2ad9-c675-4c23-8cd5-5566778899ab',
    TopicName: 'Размножение и развитие человека. Здоровье и профилактика',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5d2c3bea-d786-4d34-9de6-66778899aabb',
    TopicName: 'Экосистемы: структура, трофические уровни и потоки энергии',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6e3d4cfb-e897-4e45-8ef7-778899aabbcc',
    TopicName: 'Популяции и биоценозы. Экологические ниши',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '7f4e5d0c-f9a8-4f56-9f08-8899aabbccdd',
    TopicName: 'Биогеохимические циклы и биосфера',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '805f6e1d-0b19-4067-8109-99aabbccdde0',
    TopicName: 'Биоразнообразие и охрана природы. Устойчивое развитие',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '91607f2e-1c2a-4178-921a-aabbccddeeff',
    TopicName: 'Биотехнологии и генная инженерия (обзор возможностей и рисков)',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a271803f-2d3a-4289-a32b-bbccddeeff00',
    TopicName: 'Методы биологии: микроскопия, ПЦР, секвенирование (обзор)',
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const disciplineRepository = app.get(getRepositoryToken(Discipline));
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('🌱 Начинаю заполнение тем по биологии...');
    
    // Проверяем, существует ли дисциплина "Биология"
    const biologyDiscipline = await disciplineRepository.findOne({
      where: { DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a' }
    });
    
    if (!biologyDiscipline) {
      console.log('⚠️  Дисциплина "Биология" не найдена. Сначала запустите скрипт заполнения дисциплин.');
      return;
    }
    
    console.log(`✅ Найдена дисциплина: ${biologyDiscipline.DisciplineName}`);
    
    // Проверяем, есть ли уже темы по биологии
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a' }
    });
    
    if (existingTopics.length > 0) {
      console.log(`⚠️  В дисциплине "Биология" уже есть ${existingTopics.length} тем. Очищаю существующие темы...`);
      await topicRepository.remove(existingTopics);
    }
    
    // Создаем темы
    const createdTopics = await topicRepository.save(biologyTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по биологии:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName} (${topic.TopicID})`);
    });
    
    console.log('\n🎉 Заполнение тем по биологии завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по биологии:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
