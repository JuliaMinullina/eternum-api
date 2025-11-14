import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Discipline } from '../modules/discipline/discipline.entity';
import { MetaTag } from '../modules/meta-tag/meta-tag.entity';
import { DisciplineMetaTag } from '../entities/discipline-meta-tag.entity';

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
  { DisciplineName: 'Мировая история', MetaTagCode: 'HUMANITIES_HISTORY' },
  { DisciplineName: 'История России', MetaTagCode: 'HUMANITIES_HISTORY' },
  { DisciplineName: 'Обществознание', MetaTagCode: 'SOCIAL_SCIENCES' },
  { DisciplineName: 'Экономика', MetaTagCode: 'SOCIAL_SCIENCES' },
  { DisciplineName: 'Право', MetaTagCode: 'SOCIAL_SCIENCES' },
  { DisciplineName: 'Русский язык', MetaTagCode: 'LANGUAGES_LITERATURE' },
  { DisciplineName: 'Литература', MetaTagCode: 'LANGUAGES_LITERATURE' },
  {
    DisciplineName: 'Иностранный язык — Английский',
    MetaTagCode: 'LANGUAGES_LITERATURE',
  },
  {
    DisciplineName: 'Иностранный язык — Немецкий',
    MetaTagCode: 'LANGUAGES_LITERATURE',
  },
  {
    DisciplineName: 'Иностранный язык — Французский',
    MetaTagCode: 'LANGUAGES_LITERATURE',
  },
  {
    DisciplineName: 'Иностранный язык — Испанский',
    MetaTagCode: 'LANGUAGES_LITERATURE',
  },
  {
    DisciplineName: 'Иностранный язык — Китайский',
    MetaTagCode: 'LANGUAGES_LITERATURE',
  },
  {
    DisciplineName: 'Иностранный язык — Арабский',
    MetaTagCode: 'LANGUAGES_LITERATURE',
  },
  { DisciplineName: 'Изобразительное искусство', MetaTagCode: 'ARTS' },
  { DisciplineName: 'Музыка', MetaTagCode: 'ARTS' },
  {
    DisciplineName: 'Мировая художественная культура',
    MetaTagCode: 'ARTS',
  },
  { DisciplineName: 'Физическая культура', MetaTagCode: 'HEALTH_SAFETY_PE' },
  {
    DisciplineName: 'Основы безопасности жизнедеятельности',
    MetaTagCode: 'HEALTH_SAFETY_PE',
  },
  { DisciplineName: 'Культурология', MetaTagCode: 'HUMANITIES_HISTORY' },
  { DisciplineName: 'Философия', MetaTagCode: 'HUMANITIES_HISTORY' },
  { DisciplineName: 'Общая психология', MetaTagCode: 'SOCIAL_SCIENCES' },
  { DisciplineName: 'Математический анализ', MetaTagCode: 'MATH_STATS' },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const disciplineRepository = app.get(getRepositoryToken(Discipline));
    const metaTagRepository = app.get(getRepositoryToken(MetaTag));
    const disciplineMetaTagRepository = app.get(
      getRepositoryToken(DisciplineMetaTag),
    );

    console.log('🏷️  Начинаю связывание дисциплин с метатегами...');

    // Получаем существующие связи
    const existingRelations = await disciplineMetaTagRepository.find();
    const existingRelationKeys = new Set(
      existingRelations.map(r => `${r.DisciplineID}-${r.MetaTagCode}`)
    );

    const createdRelations: Array<{
      disciplineName: string;
      metaTagCode: string;
      metaTagName: string;
    }> = [];

    const skippedRelations: Array<{
      disciplineName: string;
      metaTagCode: string;
    }> = [];

    for (const relation of disciplineToMetaTagData) {
      // Находим дисциплину по названию
      const discipline = await disciplineRepository.findOne({
        where: { DisciplineName: relation.DisciplineName },
      });

      if (!discipline) {
        console.log(`❌ Дисциплина "${relation.DisciplineName}" не найдена`);
        continue;
      }

      // Проверяем существование метатега
      const metaTag = await metaTagRepository.findOne({
        where: { MetaTagCode: relation.MetaTagCode },
      });

      if (!metaTag) {
        console.log(`❌ Метатег "${relation.MetaTagCode}" не найден`);
        continue;
      }

      // Проверяем, существует ли уже такая связь
      const relationKey = `${discipline.DisciplineID}-${relation.MetaTagCode}`;
      if (existingRelationKeys.has(relationKey)) {
        skippedRelations.push({
          disciplineName: relation.DisciplineName,
          metaTagCode: relation.MetaTagCode,
        });
        continue;
      }

      // Создаем связь
      const disciplineMetaTag = disciplineMetaTagRepository.create({
        DisciplineID: discipline.DisciplineID,
        MetaTagCode: relation.MetaTagCode,
        CreatedAt: new Date(),
      });

      const saved = await disciplineMetaTagRepository.save(disciplineMetaTag);
      createdRelations.push({
        disciplineName: relation.DisciplineName,
        metaTagCode: relation.MetaTagCode,
        metaTagName: metaTag.MetaTagName,
      });

      console.log(
        `✅ Связал: "${relation.DisciplineName}" → "${metaTag.MetaTagName}"`,
      );
    }

    if (skippedRelations.length > 0) {
      console.log(`\n⏭️  Пропущено ${skippedRelations.length} существующих связей`);
    }

    console.log(
      `\n🎉 Успешно создано ${createdRelations.length} связей между дисциплинами и метатегами!`,
    );

    // Группируем по метатегам для отчета
    const groupedByMetaTag = createdRelations.reduce(
      (acc, rel) => {
        if (!acc[rel.metaTagCode]) {
          acc[rel.metaTagCode] = {
            name: rel.metaTagName,
            disciplines: [],
          };
        }
        acc[rel.metaTagCode].disciplines.push(rel.disciplineName);
        return acc;
      },
      {} as Record<string, { name: string; disciplines: string[] }>,
    );

    console.log('\n📊 Распределение дисциплин по метатегам:');
    Object.entries(groupedByMetaTag).forEach(([code, data]) => {
      console.log(`\n🏷️  ${data.name} (${code}):`);
      data.disciplines.forEach((discipline) => {
        console.log(`   - ${discipline}`);
      });
    });
  } catch (error) {
    console.error('❌ Ошибка при связывании дисциплин с метатегами:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
