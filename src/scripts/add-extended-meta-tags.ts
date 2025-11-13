import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MetaTag } from '../modules/meta-tag/meta-tag.entity';

// Дополнительные метатеги для интересов
const additionalMetaTags = [
  { MetaTagCode: 'SPORTS', MetaTagName: 'Спорт' },
  { MetaTagCode: 'POLITICS', MetaTagName: 'Политика' },
  { MetaTagCode: 'PHILOSOPHY', MetaTagName: 'Философия' },
  { MetaTagCode: 'PSYCHOLOGY', MetaTagName: 'Психология' },
  { MetaTagCode: 'BUSINESS', MetaTagName: 'Бизнес и предпринимательство' },
  { MetaTagCode: 'MEDIA', MetaTagName: 'Медиа и журналистика' },
  { MetaTagCode: 'CULINARY', MetaTagName: 'Кулинария' },
  { MetaTagCode: 'TRAVEL', MetaTagName: 'Путешествия' },
  { MetaTagCode: 'GAMING', MetaTagName: 'Игры' },
  { MetaTagCode: 'MUSIC_INSTRUMENTS', MetaTagName: 'Музыкальные инструменты' },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const metaTagRepository = app.get(getRepositoryToken(MetaTag));

    console.log('🌱 Добавляю расширенные мета-теги...');

    // Получаем существующие метатеги
    const existingMetaTags = await metaTagRepository.find();
    const existingCodes = new Set(existingMetaTags.map(tag => tag.MetaTagCode));

    // Добавляем только новые метатеги
    const newMetaTags = additionalMetaTags.filter(
      tag => !existingCodes.has(tag.MetaTagCode)
    );

    if (newMetaTags.length === 0) {
      console.log('⚠️  Все мета-теги уже существуют. Пропускаю создание...');
    } else {
      // Находим максимальный ID
      const maxId = existingMetaTags.length > 0
        ? Math.max(...existingMetaTags.map(tag => tag.ID))
        : 0;

      // Создаем новые метатеги с правильными ID
      const metaTagsToCreate = newMetaTags.map((tag, index) => ({
        ...tag,
        ID: maxId + index + 1,
      }));

      const createdMetaTags = await metaTagRepository.save(metaTagsToCreate);
      console.log(`✅ Успешно добавлено ${createdMetaTags.length} новых мета-тегов:`);
      createdMetaTags.forEach((metaTag, index) => {
        console.log(
          `   ${index + 1}. ${metaTag.MetaTagName} (${metaTag.MetaTagCode})`,
        );
      });
    }
  } catch (error) {
    console.error('❌ Ошибка при добавлении мета-тегов:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

