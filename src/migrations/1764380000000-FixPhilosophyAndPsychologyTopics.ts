import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixPhilosophyAndPsychologyTopics1764380000000
  implements MigrationInterface
{
  name = 'FixPhilosophyAndPsychologyTopics1764380000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔧 Исправляю темы Философии и Психологии...');

    // Получаем ID дисциплин
    const philosophyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Философия'
    `);
    const PHILOSOPHY_DISCIPLINE_ID = philosophyDisc[0]?.DisciplineID;

    const psychologyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Общая психология'
    `);
    const PSYCHOLOGY_DISCIPLINE_ID = psychologyDisc[0]?.DisciplineID;

    console.log(`Философия ID: ${PHILOSOPHY_DISCIPLINE_ID}`);
    console.log(`Психология ID: ${PSYCHOLOGY_DISCIPLINE_ID}`);

    // TopicID тем из Философии (должны быть в Философии, но сейчас в Психологии)
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

    // TopicID тем из Психологии (должны быть в Психологии, но сейчас в Культурологии)
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

    // TopicID тем из Испанского (сейчас в Философии, должны вернуться в Испанский)
    const spanishTopicIds = [
      'd3ad514b-1476-4627-a7ff-728524f3877d',
      '59d96c47-c9ed-472a-acf8-b8d232c23242',
      '3cbbe5e2-477e-49d9-a773-59b62a810493',
      'fcd469b3-bad0-4ade-9684-15e3c9a925dd',
      '8fa5a125-8557-4aa9-982c-13fa9bdf9631',
      '55c26c7e-8761-49e1-a190-56afc2bb9efa',
      '6ae0e6ff-50de-4f71-8f13-e12a87541452',
      '6b1d3ca1-b656-41af-9324-58239a57309a',
      'f9bb9c81-a128-41ba-b824-13e0424f2ed0',
      '1fa72304-a3d4-48f6-9f37-1ae777ef3f4c',
      '7a24b75e-0542-43eb-a53a-22c2f580f51d',
      'd0e67c75-9166-4106-b088-8cfe38534cfe',
      '390c2686-7131-4058-9bf8-c40c598ee3a7',
      '1aa17e45-baee-4f36-9026-21158b4f26b9',
      'df31efb7-722f-482d-b405-629af3958597',
      '33c34e50-526a-45ac-ab92-f1817bd7c088',
      'c509ed64-15f3-4ee1-9038-5f13ae810406',
      '6b8f4345-786d-401f-b816-d9f55013b1f3',
      '7b82467e-56b6-4744-bee6-b8c293989c8c',
      '9bd8ce29-2ccd-4a7c-8810-b30f1e4c582f',
      'd469e757-8427-4d3f-989a-833d260491f3',
      '247335fb-c353-431a-901f-70b370ecfc69',
      '31ab7913-1151-4abe-887c-d143ea2f556f',
      'fb94c521-2946-4cb6-b406-ed0c9fe8778e',
      '8e230ad5-7c4d-45bd-a2b1-06f1ac188152',
      '733c4c0d-e203-4990-8208-8f4c298d2834',
      '30547cbd-3eb8-4c30-a849-065a44ab9e33',
      '50f0791f-417b-4c25-ad88-fa56b625ad04',
      'f0de667d-1519-4e2f-91ad-1f8bb0406d8b',
      'b93f9cc5-271a-4568-b637-f840f2bba24d',
      '5b43004b-5895-4b85-a111-1814d95fbea1',
      'e081d452-2509-48bb-b050-acb5e9e89123',
      '59f5867c-955d-4271-b860-1c2363d68d86',
      'ea27ac5e-af90-4b8a-b166-19a6588be56e',
      '8c6c33a7-53ff-4137-8eac-1cad13f58bdc',
      '93c1e336-49d6-4f76-ae89-cb713105c087',
      '6625b289-71c6-4da0-87bd-f7579970ac03',
      '0d1eeb58-c2c0-46ae-b68b-d008edd2da59',
      '176ceb07-ad89-4618-8ea4-0c09b66d034f',
      'ef57fb98-a3e6-43d4-90d4-107f25204a45',
      '2d145b6f-33ee-45eb-a937-dc9e03be7bf4',
      '8366a727-ac35-4ee7-a5cc-21262b5ba01b',
      '07823040-4426-445d-81c7-96c509ad9009',
      '8f888767-9e8c-4c55-8f39-249a22dd16b1',
      '483cf3e4-d48a-4adc-896e-bdfea002ec4b',
      'c002204d-e1bd-4120-abe5-379664304218',
      '7f072891-e3b7-4f8b-9222-485002dc0d1c',
      'a80438c4-e34c-4ed8-ba5f-e39298f10432',
      '9ed746b3-277e-412d-bda4-b30aca7bf80a',
      'efe5b4ac-512e-434d-8b67-05c85f4de735',
      '2d8bb270-cd32-4b52-abb7-7a3b5a9063cd',
      '6758d38f-8705-48af-9934-1d153028ed0b',
      '3d4a6ebd-56cc-464a-b3ad-9aa2615f8077',
      'fa97622b-e878-4b40-b2e7-a5f28d0548e0',
      'a10e8b13-e40e-4c21-ab32-053c505a08a9',
      '0f2950a7-8c91-40c1-90e7-ca22b63995f9',
      '5ab21e67-e852-4265-a4a7-37bc8de496f6',
      'c91899ea-958e-4ef7-a2c9-a25382fbe2c9',
      '067bf23e-b30e-454e-adba-fe7d72207aac',
    ];

    // Находим ID Испанского языка
    const spanishDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" 
      WHERE "DisciplineName" LIKE '%Испанский%' OR "DisciplineName" LIKE '%испанский%'
      LIMIT 1
    `);
    const SPANISH_DISCIPLINE_ID = spanishDisc[0]?.DisciplineID || 'a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c';

    // 1. Перемещаем темы философии из Психологии в Философию
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${PHILOSOPHY_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${philosophyTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${philosophyTopicIds.length} тем из Психологии в Философию`);

    // 2. Перемещаем темы испанского из Философии в Испанский
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${SPANISH_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${spanishTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${spanishTopicIds.length} тем из Философии в Испанский`);

    // 3. Перемещаем темы психологии из Культурологии в Психологию
    const culturologyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Культурология'
    `);
    const CULTUROLOGY_DISCIPLINE_ID = culturologyDisc[0]?.DisciplineID;

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

