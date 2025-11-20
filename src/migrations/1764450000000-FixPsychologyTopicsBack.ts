import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixPsychologyTopicsBack1764450000000
  implements MigrationInterface
{
  name = 'FixPsychologyTopicsBack1764450000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔧 Перемещаю темы Психологии из Культурологии в Психологию...');

    // Получаем ID дисциплин
    const psychologyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Общая психология'
    `);
    const PSYCHOLOGY_DISCIPLINE_ID = psychologyDisc[0]?.DisciplineID || 'a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c';

    const culturologyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Культурология'
    `);
    const CULTUROLOGY_DISCIPLINE_ID = culturologyDisc[0]?.DisciplineID || 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';

    // TopicID тем из Психологии (сейчас в Культурологии, должны быть в Психологии)
    const psychologyTopicIds = [
      'aa319bad-30e9-4034-938f-93e4b3a434e6',
      '53d2e29b-cee5-4f8f-9644-597f5c82117c',
      'cad3afa2-9398-49b8-8b93-457d09e3e53f',
      '1de782fc-91ca-4b53-b374-552afd14c630',
      'b6e66a14-9b38-4a19-b712-59b421844b5f',
      'ecf8226c-facc-45f7-9c6d-5e85e5a83fe5',
      '8498d03d-4de5-4065-b944-ed315b0df8df',
      '2f3b105b-9855-4b84-b426-79766f274238',
      '31cb622f-df2f-4ade-aede-952e72cea538',
      'd5109f58-752f-4810-bb86-b96d6ffeba35',
      '33fe46dc-ea75-4f3c-ad94-470004b40e7b',
      'aaf4ef4d-085e-4af7-bdf4-1943406cfe0e',
      '535c5387-cfb9-4faf-b53c-3360490e7cbd',
      '9489bdcb-62c0-47f8-95eb-542dfffc2836',
      '74b064ef-6cbf-4981-b6fc-e93df7bea881',
      '136545b1-958e-4c79-842d-b435d33a0180',
      '8867afad-2369-4d3f-9ad2-3fcac51a9726',
      '8e38f7b9-dee1-4ab6-adf5-49ef1d41a8cf',
      '6c3df240-d93a-4071-b52d-74154762889b',
      '7c6c08f6-b550-419b-a17f-d79b3c968240',
      'd5ca2161-3b7a-4b8e-995a-0e4b87260f3e',
      '2adc4cf0-3cb4-4ceb-a383-067828e76e6f',
      '8a5d6eaa-c9f2-41c3-935d-6052b9940cc7',
      'ef380b77-c57a-41f9-920b-d471476a4740',
      '3700a045-b39a-48c6-bacf-7f45d9d87bbe',
      'c639bac7-e108-44b8-9541-ddf1af7504e3',
      'f9eff1b5-65a7-4039-be7a-7faabd33c5b3',
      'fbdff067-a06d-4236-9ba5-88d3119e8266',
      '761929d8-a0b5-41b9-a950-99ade48c937e',
      '452a0d4f-f3b7-4b9e-88ac-f6835fad93cb',
      'cf12eb29-3d58-4b1a-90cb-09c3117b82b0',
      '8b4cf60d-98e5-498f-855f-8db9885a7774',
      'be600faf-6635-48a5-af4a-00799a1f52bd',
      'c07b74a3-d682-4853-8750-16ed0a390066',
      '0460a852-e877-4448-8c50-c9d4b8dbd433',
    ];

    // Перемещаем темы Психологии из Культурологии в Психологию
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${PSYCHOLOGY_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${psychologyTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${psychologyTopicIds.length} тем из Культурологии в Психологию`);

    console.log('✅ Все темы перемещены правильно!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('⚠️  Откат миграции не реализован');
  }
}

