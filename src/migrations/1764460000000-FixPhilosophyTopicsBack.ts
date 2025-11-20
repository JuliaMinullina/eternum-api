import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixPhilosophyTopicsBack1764460000000
  implements MigrationInterface
{
  name = 'FixPhilosophyTopicsBack1764460000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔧 Возвращаю темы Философии из Психологии в Философию...');

    // Получаем ID дисциплин
    const philosophyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Философия'
    `);
    const PHILOSOPHY_DISCIPLINE_ID = philosophyDisc[0]?.DisciplineID || 'f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b';

    const psychologyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Общая психология'
    `);
    const PSYCHOLOGY_DISCIPLINE_ID = psychologyDisc[0]?.DisciplineID || 'a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c';

    // TopicID тем из Философии (сейчас в Психологии, должны быть в Философии)
    const philosophyTopicIds = [
      'a009c922-2b15-45db-a419-c5dad1bf4098',
      '0cd27dc1-a8b8-4c39-9ed0-6238dc63f235',
      '52897591-7292-4188-a0ea-6fbf6947803a',
      '30b7b820-779a-4e97-bf4a-50241c0d0957',
      'db2da59a-8cb7-4323-8b0e-aa185b374d91',
      '03faee71-0666-4c9d-aef0-26844e3176ff',
      '3150d6f7-5c05-4797-a3e2-563bf5b7d973',
      '2deb7f27-4496-4e6f-85cc-bacd906c5fea',
      '3f26e80d-264a-4a0b-ab13-9ab18cadaad1',
      '9fc6494f-9bde-4113-99b5-94536af80357',
      '2f5879f0-7a88-4d9c-9682-a38eb25735f3',
      '61802eed-96a0-4d82-b2c0-a3de3e6835f8',
      '2534671e-a024-4c54-ac94-0ce4027e1f66',
      'ebc29730-a435-470b-976e-20849711cad0',
      '0a93f0ee-12a5-4db3-b2ae-4fe7a0199c35',
      'ef7a1863-da9e-4d40-b9e4-509ac35dba8b',
      'b416f7b1-4c60-494b-a751-0d1feacb5e27',
      '172030ae-e96f-4742-b76a-385a86303de1',
      '24e4a3ed-f7a5-4425-ab20-0fa92e2fc38c',
      '4901d42a-8f48-45db-b212-c4712120c101',
      'dc2b7bcb-15e7-42ff-9301-4667c0dae50b',
      '930faa21-3487-4dd6-ae4c-72e9a6bae55c',
      '9c31790b-1038-4faa-abf3-199140d6fb3e',
      '1b4c868f-7090-4697-8bdb-b472fab32bd0',
      'b7426bad-d152-43ac-b94d-9f16952349f2',
      '398042e1-1cc0-40bd-a8ba-a40059d2d9cd',
      'd3939649-0a16-4a75-824d-8d638947926b',
      'c2fb6ec7-0245-4d3e-985c-85a0011bab49',
      '3ece606d-e8a3-4939-933f-03626754f619',
      '2d828b5e-bea3-492e-97f6-e66ad5ac68d5',
      'c41a4ef2-cc2b-4b7c-ba8e-d5b3bb1cbebc',
      '37781e20-2c13-4936-b417-c598ce61e6c2',
    ];

    // Перемещаем темы Философии из Психологии в Философию
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${PHILOSOPHY_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${philosophyTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${philosophyTopicIds.length} тем из Психологии в Философию`);

    console.log('✅ Все темы перемещены правильно!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('⚠️  Откат миграции не реализован');
  }
}

