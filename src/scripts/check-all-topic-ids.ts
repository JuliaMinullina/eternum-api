import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';
import * as philosophyTopics from '../scripts/seed-philosophy-topics';
import * as psychologyTopics from '../scripts/seed-general-psychology-topics';
import * as culturologyTopics from '../scripts/seed-culturology-topics';

const PHILOSOPHY_DISCIPLINE_ID = 'f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b';
const PSYCHOLOGY_DISCIPLINE_ID = 'a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c';
const CULTUROLOGY_DISCIPLINE_ID = 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('\n=== ПРОВЕРКА ВСЕХ TOPICID ===\n');

    // Философия
    const philosophyTopicsInDb = await topicRepository.find({
      where: { DisciplineID: PHILOSOPHY_DISCIPLINE_ID },
      order: { ID: 'ASC' },
    });
    
    // Читаем правильные темы из файла
    const fs = require('fs');
    const philosophyFile = fs.readFileSync('src/scripts/seed-philosophy-topics.ts', 'utf8');
    const philosophyTopicIds = philosophyFile.match(/TopicID: '([a-f0-9-]+)'/g)?.map((m: string) => m.match(/'([a-f0-9-]+)'/)?.[1]) || [];
    
    console.log(`📚 ФИЛОСОФИЯ:`);
    console.log(`   В базе: ${philosophyTopicsInDb.length} тем`);
    console.log(`   Должно быть: ${philosophyTopicIds.length} тем`);
    
    const philosophyInDbIds = philosophyTopicsInDb.map(t => t.TopicID);
    const missingInDb = philosophyTopicIds.filter((id: string) => !philosophyInDbIds.includes(id));
    const extraInDb = philosophyInDbIds.filter(id => !philosophyTopicIds.includes(id));
    
    if (missingInDb.length > 0) {
      console.log(`   ❌ ОТСУТСТВУЮТ В БАЗЕ (${missingInDb.length}):`);
      missingInDb.forEach(id => console.log(`      - ${id}`));
    }
    if (extraInDb.length > 0) {
      console.log(`   ❌ ЛИШНИЕ В БАЗЕ (${extraInDb.length}):`);
      extraInDb.forEach(id => {
        const topic = philosophyTopicsInDb.find(t => t.TopicID === id);
        console.log(`      - ${id}: ${topic?.TopicName.substring(0, 50)}...`);
      });
    }
    if (missingInDb.length === 0 && extraInDb.length === 0) {
      console.log(`   ✅ Все темы на месте!`);
    }

    // Психология
    const psychologyTopicsInDb = await topicRepository.find({
      where: { DisciplineID: PSYCHOLOGY_DISCIPLINE_ID },
      order: { ID: 'ASC' },
    });
    
    const psychologyFile = fs.readFileSync('src/scripts/seed-general-psychology-topics.ts', 'utf8');
    const psychologyTopicIds = psychologyFile.match(/TopicID: '([a-f0-9-]+)'/g)?.map((m: string) => m.match(/'([a-f0-9-]+)'/)?.[1]) || [];
    
    console.log(`\n🧠 ПСИХОЛОГИЯ:`);
    console.log(`   В базе: ${psychologyTopicsInDb.length} тем`);
    console.log(`   Должно быть: ${psychologyTopicIds.length} тем`);
    
    const psychologyInDbIds = psychologyTopicsInDb.map(t => t.TopicID);
    const missingInDbPsych = psychologyTopicIds.filter((id: string) => !psychologyInDbIds.includes(id));
    const extraInDbPsych = psychologyInDbIds.filter(id => !psychologyTopicIds.includes(id));
    
    if (missingInDbPsych.length > 0) {
      console.log(`   ❌ ОТСУТСТВУЮТ В БАЗЕ (${missingInDbPsych.length}):`);
      missingInDbPsych.forEach(id => console.log(`      - ${id}`));
    }
    if (extraInDbPsych.length > 0) {
      console.log(`   ❌ ЛИШНИЕ В БАЗЕ (${extraInDbPsych.length}):`);
      extraInDbPsych.forEach(id => {
        const topic = psychologyTopicsInDb.find(t => t.TopicID === id);
        console.log(`      - ${id}: ${topic?.TopicName.substring(0, 50)}...`);
      });
    }
    if (missingInDbPsych.length === 0 && extraInDbPsych.length === 0) {
      console.log(`   ✅ Все темы на месте!`);
    }

    // Культурология
    const culturologyTopicsInDb = await topicRepository.find({
      where: { DisciplineID: CULTUROLOGY_DISCIPLINE_ID },
      order: { ID: 'ASC' },
    });
    
    const culturologyFile = fs.readFileSync('src/scripts/seed-culturology-topics.ts', 'utf8');
    const culturologyTopicIds = culturologyFile.match(/TopicID: '([a-f0-9-]+)'/g)?.map((m: string) => m.match(/'([a-f0-9-]+)'/)?.[1]) || [];
    
    console.log(`\n🎭 КУЛЬТУРОЛОГИЯ:`);
    console.log(`   В базе: ${culturologyTopicsInDb.length} тем`);
    console.log(`   Должно быть: ${culturologyTopicIds.length} тем`);
    
    const culturologyInDbIds = culturologyTopicsInDb.map(t => t.TopicID);
    const missingInDbCult = culturologyTopicIds.filter((id: string) => !culturologyInDbIds.includes(id));
    const extraInDbCult = culturologyInDbIds.filter(id => !culturologyTopicIds.includes(id));
    
    if (missingInDbCult.length > 0) {
      console.log(`   ❌ ОТСУТСТВУЮТ В БАЗЕ (${missingInDbCult.length}):`);
      missingInDbCult.forEach(id => console.log(`      - ${id}`));
    }
    if (extraInDbCult.length > 0) {
      console.log(`   ❌ ЛИШНИЕ В БАЗЕ (${extraInDbCult.length}):`);
      extraInDbCult.forEach(id => {
        const topic = culturologyTopicsInDb.find(t => t.TopicID === id);
        console.log(`      - ${id}: ${topic?.TopicName.substring(0, 50)}...`);
      });
    }
    if (missingInDbCult.length === 0 && extraInDbCult.length === 0) {
      console.log(`   ✅ Все темы на месте!`);
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

