import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

const PHILOSOPHY_DISCIPLINE_ID = 'f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b';
const PSYCHOLOGY_DISCIPLINE_ID = 'a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c';
const CULTUROLOGY_DISCIPLINE_ID = 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';
const FINE_ARTS_CULTURE_DISCIPLINE_ID = 'd6e5f4a3-9b2d-5028-1f3d-3a4b5c6d7e8f';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('\n=== ПРОВЕРКА ТЕМ В БАЗЕ ДАННЫХ ===\n');

    // Философия
    const philosophyTopics = await topicRepository.find({
      where: { DisciplineID: PHILOSOPHY_DISCIPLINE_ID },
    });
    console.log(`📚 ФИЛОСОФИЯ (${philosophyTopics.length} тем):`);
    philosophyTopics.slice(0, 5).forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.TopicName.substring(0, 60)}...`);
    });
    if (philosophyTopics.length > 5) {
      console.log(`   ... и ещё ${philosophyTopics.length - 5} тем`);
    }

    // Психология
    const psychologyTopics = await topicRepository.find({
      where: { DisciplineID: PSYCHOLOGY_DISCIPLINE_ID },
    });
    console.log(`\n🧠 ПСИХОЛОГИЯ (${psychologyTopics.length} тем):`);
    psychologyTopics.slice(0, 5).forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.TopicName.substring(0, 60)}...`);
    });
    if (psychologyTopics.length > 5) {
      console.log(`   ... и ещё ${psychologyTopics.length - 5} тем`);
    }

    // Культурология
    const culturologyTopics = await topicRepository.find({
      where: { DisciplineID: CULTUROLOGY_DISCIPLINE_ID },
    });
    console.log(`\n🎭 КУЛЬТУРОЛОГИЯ (${culturologyTopics.length} тем):`);
    culturologyTopics.slice(0, 5).forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.TopicName.substring(0, 60)}...`);
    });
    if (culturologyTopics.length > 5) {
      console.log(`   ... и ещё ${culturologyTopics.length - 5} тем`);
    }

    // МХК
    const fineArtsCultureTopics = await topicRepository.find({
      where: { DisciplineID: FINE_ARTS_CULTURE_DISCIPLINE_ID },
    });
    console.log(`\n🎨 МХК (${fineArtsCultureTopics.length} тем):`);
    fineArtsCultureTopics.slice(0, 5).forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.TopicName.substring(0, 60)}...`);
    });
    if (fineArtsCultureTopics.length > 5) {
      console.log(`   ... и ещё ${fineArtsCultureTopics.length - 5} тем`);
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

