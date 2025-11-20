import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';
import { Lesson } from '../modules/lesson/lesson.entity';

const PHILOSOPHY_DISCIPLINE_ID = 'f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b';
const PSYCHOLOGY_DISCIPLINE_ID = 'a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c';
const CULTUROLOGY_DISCIPLINE_ID = 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));
    const lessonRepository = app.get(getRepositoryToken(Lesson));

    console.log('\n=== ПРОВЕРКА УРОКОВ ===\n');

    // Философия
    const philosophyTopics = await topicRepository.find({
      where: { DisciplineID: PHILOSOPHY_DISCIPLINE_ID },
    });
    const philosophyTopicIds = philosophyTopics.map(t => t.TopicID);
    
    const philosophyLessons = await lessonRepository
      .createQueryBuilder('lesson')
      .where('lesson.TopicID IN (:...ids)', { ids: philosophyTopicIds })
      .getMany();
    
    console.log(`📚 ФИЛОСОФИЯ:`);
    console.log(`   Тем: ${philosophyTopics.length}`);
    console.log(`   Уроков: ${philosophyLessons.length}`);
    
    // Проверяем первые несколько уроков
    if (philosophyLessons.length > 0) {
      const firstTopic = philosophyTopics[0];
      const lessonsForFirstTopic = philosophyLessons.filter(l => l.TopicID === firstTopic.TopicID);
      console.log(`   Первая тема: "${firstTopic.TopicName.substring(0, 50)}..."`);
      console.log(`   Уроков для первой темы: ${lessonsForFirstTopic.length}`);
      if (lessonsForFirstTopic.length > 0) {
        console.log(`   Первый урок: "${lessonsForFirstTopic[0].LessonName.substring(0, 50)}..."`);
      }
    }

    // Психология
    const psychologyTopics = await topicRepository.find({
      where: { DisciplineID: PSYCHOLOGY_DISCIPLINE_ID },
    });
    const psychologyTopicIds = psychologyTopics.map(t => t.TopicID);
    
    const psychologyLessons = await lessonRepository
      .createQueryBuilder('lesson')
      .where('lesson.TopicID IN (:...ids)', { ids: psychologyTopicIds })
      .getMany();
    
    console.log(`\n🧠 ПСИХОЛОГИЯ:`);
    console.log(`   Тем: ${psychologyTopics.length}`);
    console.log(`   Уроков: ${psychologyLessons.length}`);
    
    if (psychologyLessons.length > 0) {
      const firstTopic = psychologyTopics[0];
      const lessonsForFirstTopic = psychologyLessons.filter(l => l.TopicID === firstTopic.TopicID);
      console.log(`   Первая тема: "${firstTopic.TopicName.substring(0, 50)}..."`);
      console.log(`   Уроков для первой темы: ${lessonsForFirstTopic.length}`);
      if (lessonsForFirstTopic.length > 0) {
        console.log(`   Первый урок: "${lessonsForFirstTopic[0].LessonName.substring(0, 50)}..."`);
      }
    }

    // Культурология
    const culturologyTopics = await topicRepository.find({
      where: { DisciplineID: CULTUROLOGY_DISCIPLINE_ID },
    });
    const culturologyTopicIds = culturologyTopics.map(t => t.TopicID);
    
    const culturologyLessons = await lessonRepository
      .createQueryBuilder('lesson')
      .where('lesson.TopicID IN (:...ids)', { ids: culturologyTopicIds })
      .getMany();
    
    console.log(`\n🎭 КУЛЬТУРОЛОГИЯ:`);
    console.log(`   Тем: ${culturologyTopics.length}`);
    console.log(`   Уроков: ${culturologyLessons.length}`);
    
    if (culturologyLessons.length > 0) {
      const firstTopic = culturologyTopics[0];
      const lessonsForFirstTopic = culturologyLessons.filter(l => l.TopicID === firstTopic.TopicID);
      console.log(`   Первая тема: "${firstTopic.TopicName.substring(0, 50)}..."`);
      console.log(`   Уроков для первой темы: ${lessonsForFirstTopic.length}`);
      if (lessonsForFirstTopic.length > 0) {
        console.log(`   Первый урок: "${lessonsForFirstTopic[0].LessonName.substring(0, 50)}..."`);
      }
    }

    // Проверяем, есть ли уроки с неправильными названиями (из других дисциплин)
    console.log(`\n🔍 ПРОВЕРКА НЕПРАВИЛЬНЫХ УРОКОВ:`);
    
    // В философии не должно быть уроков про психологию
    const wrongLessonsInPhilosophy = philosophyLessons.filter(l => 
      l.LessonName.toLowerCase().includes('психология') ||
      l.LessonName.toLowerCase().includes('психика') ||
      l.LessonName.toLowerCase().includes('сознание и бессознательное')
    );
    if (wrongLessonsInPhilosophy.length > 0) {
      console.log(`   ❌ В ФИЛОСОФИИ НАЙДЕНЫ УРОКИ ИЗ ПСИХОЛОГИИ (${wrongLessonsInPhilosophy.length}):`);
      wrongLessonsInPhilosophy.slice(0, 5).forEach(l => {
        console.log(`      - ${l.LessonName}`);
      });
    }

    // В психологии не должно быть уроков про культурологию
    const wrongLessonsInPsychology = psychologyLessons.filter(l => 
      l.LessonName.toLowerCase().includes('культурология') ||
      l.LessonName.toLowerCase().includes('культура и цивилизация')
    );
    if (wrongLessonsInPsychology.length > 0) {
      console.log(`   ❌ В ПСИХОЛОГИИ НАЙДЕНЫ УРОКИ ИЗ КУЛЬТУРОЛОГИИ (${wrongLessonsInPsychology.length}):`);
      wrongLessonsInPsychology.slice(0, 5).forEach(l => {
        console.log(`      - ${l.LessonName}`);
      });
    }

    console.log('\n=== ПРОВЕРКА ЗАВЕРШЕНА ===\n');
  } catch (error) {
    console.error('❌ Ошибка:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

