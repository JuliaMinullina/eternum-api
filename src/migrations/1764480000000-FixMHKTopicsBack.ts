import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixMHKTopicsBack1764480000000 implements MigrationInterface {
  name = 'FixMHKTopicsBack1764480000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔧 Возвращаю темы МХК из Испанского в МХК...');

    // Получаем ID дисциплин
    const mhkDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Мировая художественная культура'
    `);
    const FINE_ARTS_CULTURE_DISCIPLINE_ID = mhkDisc[0]?.DisciplineID || 'd6e5f4a3-9b2d-5028-1f3d-3a4b5c6d7e8f';

    const spanishDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" 
      WHERE "DisciplineName" LIKE '%Испанский%' OR "DisciplineName" LIKE '%испанский%'
      LIMIT 1
    `);
    const SPANISH_DISCIPLINE_ID = spanishDisc[0]?.DisciplineID || 'a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c';

    // TopicID тем из МХК (сейчас в Испанском, должны быть в МХК)
    const mhkTopicIds = [
      '9e03da6b-dab6-4870-a1a2-ca62dcaf8518',
      'b6374058-ca1e-4ebb-a074-eb295c871800',
      '2205f257-fb5c-4e5d-96ad-0f6722f5839a',
      '8c9262d5-ee9d-481c-97ae-7b15a2e61653',
      '6d3cb9f5-31b0-4cca-8734-a375d60340a4',
      '46585f2e-bded-428e-888b-b52b62ddb922',
      'dae0450e-6da3-465a-8a1a-f0ea23ca759b',
      '8ce56f68-7d0c-40f9-8731-b239a682427e',
      'c56c0804-0dd5-400a-a549-e2293a024503',
      'c3d67004-6502-4f33-8a4f-c2cd6ccee83a',
      '12a80abc-b8d4-4843-9b1b-02c44dcd5e43',
      '21db22d0-ddc7-43b9-b204-2d0acfb0c55b',
      'ae3f6112-bd24-4e23-a4f7-942de751ab5b',
      'da621eb4-5437-41c5-8cdc-30333b4037e3',
      '390f54cb-c3d2-49f8-83d3-384fe3a78fc1',
      'b5de843e-9dae-4218-bf72-d7ffc0519e24',
      '8b6dc07c-2fcc-40c3-adb3-99f5cda7bca2',
      '2424c4b6-c334-4db2-8ee9-1b75a3e0f13c',
      '788b3dbc-626d-45f6-b5ce-5a6d3112e3e8',
      'd71edd24-742a-4c9c-9d2b-abc0b44c6b30',
      '11e44744-4444-4704-bc32-2bc1dae35fbe',
      '1eacf828-7a0d-44a6-b1ef-6eff539651d0',
      '1757b5cd-e4fb-4b2a-87b6-9ea812bc24cd',
      '160bbc73-f1ca-4ce9-86da-16ce848dca71',
      '2607cd08-b746-4275-8a84-6c2d2d5e5daf',
      '1436dbd3-8edc-4d32-965e-34b9c9a5daa3',
      'eed5e588-de02-4e6b-a989-f0ccde87131d',
      '18a651b9-f6bd-446e-8013-ac3e08b1cce0',
    ];

    // Перемещаем темы МХК из Испанского в МХК
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${FINE_ARTS_CULTURE_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${mhkTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${mhkTopicIds.length} тем из Испанского в МХК`);

    console.log('✅ Все темы перемещены правильно!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('⚠️  Откат миграции не реализован');
  }
}

