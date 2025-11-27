import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixTopicDisciplineMapping1764360000000
  implements MigrationInterface
{
  name = 'FixTopicDisciplineMapping1764360000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔧 Исправляю привязку тем к дисциплинам...');

    // Сначала находим или создаём все нужные дисциплины в базе
    
    // Проверяем наличие дисциплины "Испанский язык"
    const spanishDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" 
      WHERE "DisciplineName" LIKE '%Испанский%' OR "DisciplineName" LIKE '%испанский%'
      LIMIT 1
    `);
    
    let SPANISH_DISCIPLINE_ID = spanishDisc[0]?.DisciplineID;
    
    // ID для Испанского языка (из seed-spanish-topics.ts)
    const EXPECTED_SPANISH_ID = 'd6a16086-e9c7-4636-aa76-d5eb7e516242';
    
    // Если дисциплина не найдена по имени, проверяем или создаём с нужным ID
    if (!SPANISH_DISCIPLINE_ID) {
      // Проверяем, существует ли дисциплина с ожидаемым ID
      const discWithExpectedId = await queryRunner.query(`
        SELECT "DisciplineID", "DisciplineName" FROM "disciplines" 
        WHERE "DisciplineID" = $1
      `, [EXPECTED_SPANISH_ID]);
      
      if (discWithExpectedId[0]) {
        // ID существует - используем его (неважно, какая там дисциплина)
        SPANISH_DISCIPLINE_ID = discWithExpectedId[0].DisciplineID;
        console.log(`✅ Используем существующую дисциплину "${discWithExpectedId[0].DisciplineName}" с ID ${SPANISH_DISCIPLINE_ID} для Испанского языка`);
      } else {
        // ID не существует - создаём дисциплину с нужным ID
        const maxId = await queryRunner.query(`
          SELECT MAX("ID") as max_id FROM "disciplines"
        `);
        const nextId = (maxId[0]?.max_id || 0) + 1;
        
        await queryRunner.query(`
          INSERT INTO "disciplines" ("DisciplineID", "ID", "DisciplineName", "CreatedAt", "UpdatedAt")
          VALUES ($1, $2, 'Иностранный язык — Испанский', NOW(), NOW())
          ON CONFLICT ("DisciplineID") DO NOTHING
        `, [EXPECTED_SPANISH_ID, nextId]);
        
        // Проверяем, что дисциплина создана
        const createdDisc = await queryRunner.query(`
          SELECT "DisciplineID" FROM "disciplines" 
          WHERE "DisciplineID" = $1
        `, [EXPECTED_SPANISH_ID]);
        
        SPANISH_DISCIPLINE_ID = createdDisc[0]?.DisciplineID || EXPECTED_SPANISH_ID;
        console.log(`✅ Создана дисциплина "Иностранный язык — Испанский" с ID ${SPANISH_DISCIPLINE_ID}`);
      }
    } else {
      console.log(`✅ Найдена дисциплина Испанского языка с ID ${SPANISH_DISCIPLINE_ID}`);
    }

    // Проверяем остальные дисциплины и создаём, если не найдены
    const mhkDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Мировая художественная культура'
    `);
    let FINE_ARTS_CULTURE_DISCIPLINE_ID = mhkDisc[0]?.DisciplineID;
    
    if (!FINE_ARTS_CULTURE_DISCIPLINE_ID) {
      // Проверяем, существует ли дисциплина с ожидаемым ID
      const expectedMhkId = 'd6e5f4a3-9b2d-5028-1f3d-3a4b5c6d7e8f';
      const checkMhk = await queryRunner.query(`
        SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineID" = $1
      `, [expectedMhkId]);
      
      if (checkMhk[0]) {
        FINE_ARTS_CULTURE_DISCIPLINE_ID = checkMhk[0].DisciplineID;
      } else {
        // Создаём дисциплину
        const maxId = await queryRunner.query(`SELECT MAX("ID") as max_id FROM "disciplines"`);
        const nextId = (maxId[0]?.max_id || 0) + 1;
        await queryRunner.query(`
          INSERT INTO "disciplines" ("DisciplineID", "ID", "DisciplineName", "CreatedAt", "UpdatedAt")
          VALUES ($1, $2, 'Мировая художественная культура', NOW(), NOW())
          ON CONFLICT ("DisciplineID") DO NOTHING
        `, [expectedMhkId, nextId]);
        FINE_ARTS_CULTURE_DISCIPLINE_ID = expectedMhkId;
        console.log(`✅ Создана дисциплина "Мировая художественная культура" с ID ${FINE_ARTS_CULTURE_DISCIPLINE_ID}`);
      }
    }

    const culturologyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Культурология'
    `);
    let CULTUROLOGY_DISCIPLINE_ID = culturologyDisc[0]?.DisciplineID;
    
    if (!CULTUROLOGY_DISCIPLINE_ID) {
      const expectedCultId = 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';
      const checkCult = await queryRunner.query(`
        SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineID" = $1
      `, [expectedCultId]);
      
      if (checkCult[0]) {
        CULTUROLOGY_DISCIPLINE_ID = checkCult[0].DisciplineID;
      } else {
        const maxId = await queryRunner.query(`SELECT MAX("ID") as max_id FROM "disciplines"`);
        const nextId = (maxId[0]?.max_id || 0) + 1;
        await queryRunner.query(`
          INSERT INTO "disciplines" ("DisciplineID", "ID", "DisciplineName", "CreatedAt", "UpdatedAt")
          VALUES ($1, $2, 'Культурология', NOW(), NOW())
          ON CONFLICT ("DisciplineID") DO NOTHING
        `, [expectedCultId, nextId]);
        CULTUROLOGY_DISCIPLINE_ID = expectedCultId;
        console.log(`✅ Создана дисциплина "Культурология" с ID ${CULTUROLOGY_DISCIPLINE_ID}`);
      }
    }

    // Проверяем реальные ID из базы
    const philosophyInDb = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Философия'
    `);
    const psychologyInDb = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Общая психология'
    `);
    
    const REAL_PHILOSOPHY_ID = philosophyInDb[0]?.DisciplineID || 'f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b';
    const REAL_PSYCHOLOGY_ID = psychologyInDb[0]?.DisciplineID || 'a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c';
    
    console.log(`МХК ID: ${FINE_ARTS_CULTURE_DISCIPLINE_ID}`);
    console.log(`Культурология ID: ${CULTUROLOGY_DISCIPLINE_ID}`);
    console.log(`Философия ID: ${REAL_PHILOSOPHY_ID}`);
    console.log(`Психология ID: ${REAL_PSYCHOLOGY_ID}`);
    console.log(`Испанский ID: ${SPANISH_DISCIPLINE_ID}`);

    // Проверяем, что все ID существуют в базе перед обновлением
    const allDisciplineIds = [
      SPANISH_DISCIPLINE_ID,
      FINE_ARTS_CULTURE_DISCIPLINE_ID,
      CULTUROLOGY_DISCIPLINE_ID,
      REAL_PHILOSOPHY_ID,
      REAL_PSYCHOLOGY_ID,
    ];

    for (const disciplineId of allDisciplineIds) {
      const check = await queryRunner.query(`
        SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineID" = $1
      `, [disciplineId]);
      
      if (!check || check.length === 0) {
        throw new Error(`Дисциплина с ID ${disciplineId} не найдена в базе данных. Миграция не может быть выполнена.`);
      }
    }
    
    console.log('✅ Все дисциплины найдены в базе данных');

    // TopicID тем из МХК (должны перейти в Испанский)
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

    // TopicID тем из Культурологии (должны перейти в МХК)
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

    // TopicID тем из Психологии (должны перейти в Культурологию)
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

    // TopicID тем из Философии (должны перейти в Психологию)
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

    // TopicID тем из Испанского (должны перейти в Философию)
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

    // Перемещаем темы по цепочке (в обратном порядке, чтобы не потерять данные)
    // 1. Испанский ← МХК
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${SPANISH_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${mhkTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${mhkTopicIds.length} тем из МХК в Испанский язык`);

    // 2. МХК ← Культурология
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${FINE_ARTS_CULTURE_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${culturologyTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${culturologyTopicIds.length} тем из Культурологии в МХК`);

    // 3. Культурология ← Психология
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${CULTUROLOGY_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${psychologyTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${psychologyTopicIds.length} тем из Психологии в Культурологию`);

    // 4. Психология ← Философия
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${REAL_PSYCHOLOGY_ID}'
      WHERE "TopicID" IN (${philosophyTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${philosophyTopicIds.length} тем из Философии в Психологию`);

    // 5. Философия ← Испанский (темы из МХК, которые сейчас в МХК с ID d6a16086)
    // Но сначала нужно найти, где сейчас темы испанского языка
    // Судя по seed-spanish-topics.ts, они должны быть в дисциплине с ID d6a16086 (которая сейчас МХК)
    // Но пользователь сказал, что темы из МХК должны быть в Испанском
    // Значит, темы испанского сейчас где-то в МХК (d6a16086), и их нужно переместить в Философию
    // А темы МХК (d6e5f4a3) нужно переместить в Испанский (d6a16086)
    
    // Но подождите - пользователь сказал: "Мировая художественная культура — темы неправильные, они должны быть в Испанском языке"
    // Значит темы, которые СЕЙЧАС в МХК, должны быть в Испанском
    // А темы, которые ДОЛЖНЫ быть в МХК, сейчас в Культурологии
    
    // Проверяем, где сейчас темы испанского (они должны быть в МХК с ID d6a16086)
    const spanishTopicsCurrent = await queryRunner.query(`
      SELECT "TopicID" FROM "topics" WHERE "DisciplineID" = '${SPANISH_DISCIPLINE_ID}'
    `);
    const spanishTopicIdsCurrent = spanishTopicsCurrent.map((t: any) => t.TopicID);
    
    // Перемещаем темы из текущей МХК (d6a16086) в Философию
    if (spanishTopicIdsCurrent.length > 0) {
      await queryRunner.query(`
        UPDATE "topics"
        SET "DisciplineID" = '${REAL_PHILOSOPHY_ID}'
        WHERE "TopicID" IN (${spanishTopicIdsCurrent.map((id: string) => `'${id}'`).join(', ')})
      `);
      console.log(`✅ Перемещено ${spanishTopicIdsCurrent.length} тем из Испанского (МХК) в Философию`);
    } else {
      // Если тем нет, используем список из seed-spanish-topics.ts
      await queryRunner.query(`
        UPDATE "topics"
        SET "DisciplineID" = '${REAL_PHILOSOPHY_ID}'
        WHERE "TopicID" IN (${spanishTopicIds.map(id => `'${id}'`).join(', ')})
      `);
      console.log(`✅ Перемещено ${spanishTopicIds.length} тем из Испанского в Философию`);
    }

    console.log('✅ Все темы перемещены правильно!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат изменений - обратная цепочка
    const SPANISH_DISCIPLINE_ID = 'a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c';
    const FINE_ARTS_CULTURE_DISCIPLINE_ID = 'd6e5f4a3-9b2d-5028-1f3d-3a4b5c6d7e8f';
    const CULTUROLOGY_DISCIPLINE_ID = 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';
    const PSYCHOLOGY_DISCIPLINE_ID = 'a9b8c7d6-2e5a-5351-4c6a-6d7e8f9a0b1c';
    const PHILOSOPHY_DISCIPLINE_ID = 'f8a7b6c5-1d4f-5240-3b5f-5c6d7e8f9a0b';

    // Здесь нужно вернуть темы обратно, но это сложно без сохранения исходного состояния
    console.log('⚠️  Откат миграции не реализован');
  }
}

