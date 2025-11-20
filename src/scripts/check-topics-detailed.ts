import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

const PHILOSOPHY_DISCIPLINE_ID = 'f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b';
const PSYCHOLOGY_DISCIPLINE_ID = 'a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c';
const CULTUROLOGY_DISCIPLINE_ID = 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';

// Правильные TopicID для Философии
const correctPhilosophyTopicIDs = [
  'a009c922-2b15-45db-a419-c5dad1bf4098', // Предмет и специфика философии
  '0cd27dc1-a8b8-4c39-9ed0-6238dc63f235', // Структура философского знания
  '52897591-7292-4188-a0ea-6fbf6947803a', // Возникновение философии
];

// Правильные TopicID для Психологии
const correctPsychologyTopicIDs = [
  'aa319bad-30e9-4034-938f-93e4b3a434e6', // Предмет, задачи и методы психологии
  '53d2e29b-cee5-4f8f-9644-597f5c82117c', // История психологии
  'cad3afa2-9398-49b8-8b93-457d09e3e53f', // Основные направления
];

// Правильные TopicID для Культурологии
const correctCulturologyTopicIDs = [
  '44a41d98-b788-416d-954a-3800f463006c', // Предмет, объект и методы культурологии
  'c363ae6f-8fbb-4e47-b9f8-e96d70d29f14', // Понятие культуры
  '1091b6be-18ac-4894-81a1-d251d1f0a3c2', // Структура культуры
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('\n=== ДЕТАЛЬНАЯ ПРОВЕРКА ===\n');

    // Философия
    const philosophyTopics = await topicRepository.find({
      where: { DisciplineID: PHILOSOPHY_DISCIPLINE_ID },
    });
    console.log(`📚 ФИЛОСОФИЯ (${philosophyTopics.length} тем):`);
    const philosophyFirstTopic = philosophyTopics.find(t => t.TopicID === correctPhilosophyTopicIDs[0]);
    if (philosophyFirstTopic) {
      console.log(`   ✅ Первая тема правильная: ${philosophyFirstTopic.TopicName.substring(0, 60)}...`);
    } else {
      console.log(`   ❌ Первая тема НЕПРАВИЛЬНАЯ!`);
      console.log(`   Первая тема в базе: ${philosophyTopics[0]?.TopicName}`);
    }
    
    // Проверяем, есть ли темы из психологии в философии
    const wrongTopicsInPhilosophy = philosophyTopics.filter(t => 
      t.TopicName.includes('психологии') || 
      t.TopicName.includes('психика') ||
      t.TopicName.includes('сознание и бессознательное')
    );
    if (wrongTopicsInPhilosophy.length > 0) {
      console.log(`   ❌ НАЙДЕНЫ ТЕМЫ ИЗ ПСИХОЛОГИИ В ФИЛОСОФИИ:`);
      wrongTopicsInPhilosophy.forEach(t => {
        console.log(`      - ${t.TopicName}`);
      });
    }

    // Психология
    const psychologyTopics = await topicRepository.find({
      where: { DisciplineID: PSYCHOLOGY_DISCIPLINE_ID },
    });
    console.log(`\n🧠 ПСИХОЛОГИЯ (${psychologyTopics.length} тем):`);
    const psychologyFirstTopic = psychologyTopics.find(t => t.TopicID === correctPsychologyTopicIDs[0]);
    if (psychologyFirstTopic) {
      console.log(`   ✅ Первая тема правильная: ${psychologyFirstTopic.TopicName.substring(0, 60)}...`);
    } else {
      console.log(`   ❌ Первая тема НЕПРАВИЛЬНАЯ!`);
      console.log(`   Первая тема в базе: ${psychologyTopics[0]?.TopicName}`);
    }
    
    // Проверяем, есть ли темы из культурологии в психологии
    const wrongTopicsInPsychology = psychologyTopics.filter(t => 
      t.TopicName.includes('культурология') || 
      t.TopicName.includes('культура и цивилизация') ||
      t.TopicName.includes('культурные коды')
    );
    if (wrongTopicsInPsychology.length > 0) {
      console.log(`   ❌ НАЙДЕНЫ ТЕМЫ ИЗ КУЛЬТУРОЛОГИИ В ПСИХОЛОГИИ:`);
      wrongTopicsInPsychology.forEach(t => {
        console.log(`      - ${t.TopicName}`);
      });
    }

    // Культурология
    const culturologyTopics = await topicRepository.find({
      where: { DisciplineID: CULTUROLOGY_DISCIPLINE_ID },
    });
    console.log(`\n🎭 КУЛЬТУРОЛОГИЯ (${culturologyTopics.length} тем):`);
    const culturologyFirstTopic = culturologyTopics.find(t => t.TopicID === correctCulturologyTopicIDs[0]);
    if (culturologyFirstTopic) {
      console.log(`   ✅ Первая тема правильная: ${culturologyFirstTopic.TopicName.substring(0, 60)}...`);
    } else {
      console.log(`   ❌ Первая тема НЕПРАВИЛЬНАЯ!`);
      console.log(`   Первая тема в базе: ${culturologyTopics[0]?.TopicName}`);
    }
    
    // Проверяем, есть ли темы из МХК в культурологии
    const wrongTopicsInCulturology = culturologyTopics.filter(t => 
      t.TopicName.includes('художественная культура') && !t.TopicName.includes('Художественная культура и эстетическое сознание') ||
      t.TopicName.includes('виды искусств') ||
      t.TopicName.includes('первобытное искусство')
    );
    if (wrongTopicsInCulturology.length > 0) {
      console.log(`   ❌ НАЙДЕНЫ ТЕМЫ ИЗ МХК В КУЛЬТУРОЛОГИИ:`);
      wrongTopicsInCulturology.forEach(t => {
        console.log(`      - ${t.TopicName}`);
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

