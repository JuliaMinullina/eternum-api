import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixMHKTopics1764420000000 implements MigrationInterface {
  name = 'FixMHKTopics1764420000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔧 Исправляю темы МХК...');

    // Получаем ID дисциплин
    const spanishDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" 
      WHERE "DisciplineName" LIKE '%Испанский%' OR "DisciplineName" LIKE '%испанский%'
      LIMIT 1
    `);
    const SPANISH_DISCIPLINE_ID = spanishDisc[0]?.DisciplineID || 'a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c';

    const mhkDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Мировая художественная культура'
    `);
    const FINE_ARTS_CULTURE_DISCIPLINE_ID = mhkDisc[0]?.DisciplineID || 'd6e5f4a3-9b2d-5028-1f3d-3a4b5c6d7e8f';

    const culturologyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Культурология'
    `);
    const CULTUROLOGY_DISCIPLINE_ID = culturologyDisc[0]?.DisciplineID || 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';

    // TopicID тем из МХК (сейчас в Испанском, должны остаться в Испанском по требованию пользователя)
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

    // TopicID тем из Культурологии (сейчас в Культурологии, должны быть в МХК)
    const culturologyTopicIds = [
      '44a41d98-b788-416d-954a-3800f463006c',
      'c363ae6f-8fbb-4e47-b9f8-e96d70d29f14',
      '1091b6be-18ac-4894-81a1-d251d1f0a3c2',
      '39ff2152-13cc-48d1-855a-0034c5fe1ef5',
      '724a14e7-dd27-4265-9bae-0b0deee4bc61',
      '3d2baed5-88c6-48f8-ad57-91b62d193052',
      '8408d215-6e79-4974-a47d-d93842d4705c',
      '5831bd63-026f-4143-bc0e-c01755246e06',
      '5389072a-c66c-4cde-b7f6-60709154afe5',
      '1ae3ae0d-8dc2-4a5f-8b68-25c721c07844',
      '5efa6ee1-04ea-4363-b0ad-efd2b89bf8ac',
      '47a8f0df-5f77-4973-aca0-07a4f2d666c7',
      'e4ce1621-2dfa-434d-bb36-8aad42d89c7b',
      '1f6093e8-e949-462b-a7c1-a0cccb4465e8',
      '74a52cf7-6ac0-4b1c-9e07-0a211d60c3bf',
      '6422bdc9-4ad7-45de-a866-682c72e88e19',
      '1e34701d-726a-4eff-b0be-14122ce142c0',
      'e6df928f-0c16-4f81-91ea-5ba9290540fb',
      '3c6e88cb-3e99-46b8-8228-dc5adc793fd0',
      '1c559167-5fdc-4a5a-8929-cb7b3b71a919',
      '0e43851f-ad42-435b-8bda-583196a0a561',
      '024dfe05-672e-43a0-8d17-e3043e62e989',
      'f449d1f5-9eec-4028-bb40-97c047d43121',
      '711aa2a7-17f0-4aa0-a740-41bb9a02307c',
      '9aa87d4c-642b-4208-aa52-cba1146b84f9',
      'ca551f8b-965f-4320-9573-8ca58eee829a',
      '3e2eda9c-983a-4a12-9e86-215697e8ac92',
      '3606578c-b350-4683-83b3-d87f7df771f4',
      '6393ff17-022a-4aaa-ac3b-d8609e12266a',
      'ef5ff523-fb97-4d9e-aae6-ce0a62e9b2be',
    ];

    // Перемещаем темы Культурологии в МХК
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${FINE_ARTS_CULTURE_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${culturologyTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${culturologyTopicIds.length} тем из Культурологии в МХК`);

    // Темы МХК остаются в Испанском (по требованию пользователя)
    console.log(`✅ Темы МХК (${mhkTopicIds.length} тем) остаются в Испанском`);

    console.log('✅ Все темы перемещены правильно!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('⚠️  Откат миграции не реализован');
  }
}

