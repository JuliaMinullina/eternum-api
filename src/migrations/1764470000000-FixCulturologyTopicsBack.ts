import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCulturologyTopicsBack1764470000000
  implements MigrationInterface
{
  name = 'FixCulturologyTopicsBack1764470000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔧 Возвращаю темы Культурологии из МХК в Культурологию...');

    // Получаем ID дисциплин
    const culturologyDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Культурология'
    `);
    const CULTUROLOGY_DISCIPLINE_ID = culturologyDisc[0]?.DisciplineID || 'e7f6a5b4-0c3e-5139-2a4e-4b5c6d7e8f9a';

    const mhkDisc = await queryRunner.query(`
      SELECT "DisciplineID" FROM "disciplines" WHERE "DisciplineName" = 'Мировая художественная культура'
    `);
    const FINE_ARTS_CULTURE_DISCIPLINE_ID = mhkDisc[0]?.DisciplineID || 'd6e5f4a3-9b2d-5028-1f3d-3a4b5c6d7e8f';

    // TopicID тем из Культурологии (сейчас в МХК, должны быть в Культурологии)
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

    // Перемещаем темы Культурологии из МХК в Культурологию
    await queryRunner.query(`
      UPDATE "topics"
      SET "DisciplineID" = '${CULTUROLOGY_DISCIPLINE_ID}'
      WHERE "TopicID" IN (${culturologyTopicIds.map(id => `'${id}'`).join(', ')})
    `);
    console.log(`✅ Перемещено ${culturologyTopicIds.length} тем из МХК в Культурологию`);

    console.log('✅ Все темы перемещены правильно!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('⚠️  Откат миграции не реализован');
  }
}

