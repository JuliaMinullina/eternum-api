import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MetaTag } from '../modules/meta-tag/meta-tag.entity';
import { Discipline } from '../modules/discipline/discipline.entity';
import { DisciplineMetaTag } from '../entities/discipline-meta-tag.entity';

const metaTagsData = [
  { MetaTagCode: 'MATH_STATS', MetaTagName: 'Математика и статистика' },
  { MetaTagCode: 'CS_AI', MetaTagName: 'Компьютерные науки и ИИ' },
  { MetaTagCode: 'ENGINEERING_TECH', MetaTagName: 'Инженерия и технологии' },
  { MetaTagCode: 'NATURAL_SCIENCES', MetaTagName: 'Естественные науки' },
  { MetaTagCode: 'EARTH_SPACE_ENV', MetaTagName: 'Науки о Земле и космосе' },
  { MetaTagCode: 'SOCIAL_SCIENCES', MetaTagName: 'Социальные науки' },
  { MetaTagCode: 'HUMANITIES', MetaTagName: 'Гуманитарные науки' },
  {
    MetaTagCode: 'HUMANITIES_HISTORY',
    MetaTagName: 'Гуманитарные науки и история',
  },
  { MetaTagCode: 'LANGUAGES', MetaTagName: 'Языки' },
  { MetaTagCode: 'LITERATURE', MetaTagName: 'Литература' },
  {
    MetaTagCode: 'LANGUAGES_LITERATURE',
    MetaTagName: 'Языки и литература',
  },
  { MetaTagCode: 'ARTS', MetaTagName: 'Искусство' },
  {
    MetaTagCode: 'HEALTH_SAFETY_PE',
    MetaTagName: 'Здоровье, физкультура и безопасность',
  },
];

const disciplineToMetaTagData = [
  { DisciplineName: 'Математика', MetaTagCode: 'MATH_STATS' },
  { DisciplineName: 'Информатика и ИКТ', MetaTagCode: 'CS_AI' },
  { DisciplineName: 'Технология', MetaTagCode: 'ENGINEERING_TECH' },
  { DisciplineName: 'Физика', MetaTagCode: 'NATURAL_SCIENCES' },
  { DisciplineName: 'Химия', MetaTagCode: 'NATURAL_SCIENCES' },
  { DisciplineName: 'Биология', MetaTagCode: 'NATURAL_SCIENCES' },
  { DisciplineName: 'География', MetaTagCode: 'EARTH_SPACE_ENV' },
  { DisciplineName: 'Астрономия', MetaTagCode: 'EARTH_SPACE_ENV' },
  { DisciplineName: 'Экология', MetaTagCode: 'EARTH_SPACE_ENV' },
  { DisciplineName: 'Обществознание', MetaTagCode: 'SOCIAL_SCIENCES' },
  { DisciplineName: 'Экономика', MetaTagCode: 'SOCIAL_SCIENCES' },
  { DisciplineName: 'Право', MetaTagCode: 'SOCIAL_SCIENCES' },
  { DisciplineName: 'История', MetaTagCode: 'HUMANITIES' },
  { DisciplineName: 'Русский язык', MetaTagCode: 'LANGUAGES' },
  { DisciplineName: 'Иностранный язык — Английский', MetaTagCode: 'LANGUAGES' },
  { DisciplineName: 'Иностранный язык — Немецкий', MetaTagCode: 'LANGUAGES' },
  {
    DisciplineName: 'Иностранный язык — Французский',
    MetaTagCode: 'LANGUAGES',
  },
  { DisciplineName: 'Литература', MetaTagCode: 'LITERATURE' },
  { DisciplineName: 'Изобразительное искусство', MetaTagCode: 'ARTS' },
  { DisciplineName: 'Музыка', MetaTagCode: 'ARTS' },
  { DisciplineName: 'Физическая культура', MetaTagCode: 'HEALTH_SAFETY_PE' },
  {
    DisciplineName: 'Основы безопасности жизнедеятельности',
    MetaTagCode: 'HEALTH_SAFETY_PE',
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const metaTagRepository = app.get(getRepositoryToken(MetaTag));
    const disciplineRepository = app.get(getRepositoryToken(Discipline));
    const disciplineMetaTagRepository = app.get(
      getRepositoryToken(DisciplineMetaTag),
    );

    console.log('🌱 Начинаю заполнение мета-тегов...');

    // Проверяем, какие мета-теги уже существуют
    const existingMetaTags = await metaTagRepository.find();
    const existingCodes = new Set(existingMetaTags.map(mt => mt.MetaTagCode));
    
    // Фильтруем только новые мета-теги
    const newMetaTags = metaTagsData.filter(
      mt => !existingCodes.has(mt.MetaTagCode)
    );

    if (newMetaTags.length > 0) {
      console.log(`📝 Найдено ${newMetaTags.length} новых мета-тегов для добавления:`);
      newMetaTags.forEach((mt) => {
        console.log(`   - ${mt.MetaTagName} (${mt.MetaTagCode})`);
      });
      
      // Создаем только новые мета-теги
      const createdMetaTags = await metaTagRepository.save(newMetaTags);
      console.log(`✅ Успешно создано ${createdMetaTags.length} новых мета-тегов`);
    } else {
      console.log('✅ Все мета-теги уже существуют в базе данных.');
    }

    console.log('\n🔗 Создаю связи дисциплин с мета-тегами...');

    // Очищаем существующие связи
    await disciplineMetaTagRepository.clear();

    // Создаем связи дисциплин с мета-тегами
    const createdLinks: DisciplineMetaTag[] = [];
    for (const linkData of disciplineToMetaTagData) {
      const discipline = await disciplineRepository.findOne({
        where: { DisciplineName: linkData.DisciplineName },
      });

      if (discipline) {
        const disciplineMetaTag = disciplineMetaTagRepository.create({
          DisciplineID: discipline.DisciplineID,
          MetaTagCode: linkData.MetaTagCode,
        });
        const savedLink =
          await disciplineMetaTagRepository.save(disciplineMetaTag);
        createdLinks.push(savedLink);
        console.log(
          `   ✅ ${linkData.DisciplineName} → ${linkData.MetaTagCode}`,
        );
      } else {
        console.log(
          `   ⚠️  Дисциплина "${linkData.DisciplineName}" не найдена`,
        );
      }
    }

    console.log(
      `\n🎉 Успешно создано ${createdLinks.length} связей дисциплин с мета-тегами!`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении мета-тегов:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
