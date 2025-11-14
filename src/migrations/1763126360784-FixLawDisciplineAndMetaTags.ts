import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixLawDisciplineAndMetaTags1763126360784
  implements MigrationInterface
{
  name = 'FixLawDisciplineAndMetaTags1763126360784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const LAW_DISCIPLINE_ID = 'c2e1a0f9-5d8f-4684-9f7c-9f8a0b1c2d3e';

    // 1. Убеждаемся, что дисциплина "Право" существует
    await queryRunner.query(`
      INSERT INTO "disciplines" ("DisciplineID", "ID", "DisciplineName", "CreatedAt", "UpdatedAt")
      VALUES ('${LAW_DISCIPLINE_ID}'::uuid, 22, 'Право', '2025-08-16 12:00:00'::timestamp, '2025-08-16 12:00:00'::timestamp)
      ON CONFLICT ("DisciplineID") DO NOTHING
    `);

    // 2. Исправляем метатеги для "Право" - удаляем дубликаты и оставляем только SOCIAL_SCIENCES
    await queryRunner.query(`
      DELETE FROM "discipline_meta_tags"
      WHERE "DisciplineID" = '${LAW_DISCIPLINE_ID}'::uuid
    `);

    await queryRunner.query(`
      INSERT INTO "discipline_meta_tags" ("DisciplineID", "MetaTagCode", "CreatedAt")
      VALUES ('${LAW_DISCIPLINE_ID}'::uuid, 'SOCIAL_SCIENCES', NOW())
      ON CONFLICT DO NOTHING
    `);

    // 3. Добавляем все темы для "Право"
    // Временно отключаем проверку foreign key для импорта
    await queryRunner.query(`SET session_replication_role = 'replica'`);

    const lawTopics = [
      { TopicID: '0f1a2b3c-4d5e-678f-9012-3456789abc01', ID: 1000, TopicName: 'Право как система: нормы, источники, отрасли, правосознание' },
      { TopicID: '1a2b3c4d-5e6f-4701-8123-456789abc012', ID: 1001, TopicName: 'Конституционное право РФ: основы строя, права и свободы, гражданство' },
      { TopicID: '2b3c4d5e-6f70-4812-9234-56789abc0123', ID: 1002, TopicName: 'Федеративное устройство и органы государственной власти РФ' },
      { TopicID: '3c4d5e6f-7081-4923-a345-6789abc01234', ID: 1003, TopicName: 'Судебная система: суды, прокуратура, адвокатура, нотариат. Правосудие' },
      { TopicID: '4d5e6f70-8192-4a34-b456-789abc012345', ID: 1004, TopicName: 'Гражданское право: субъекты, объекты, сделки, сроки, давность' },
      { TopicID: '5e6f7081-92a3-4b45-c567-89abc0123456', ID: 1005, TopicName: 'Вещное право: собственность и иные вещные права. Защита собственности' },
      { TopicID: '6f708192-a3b4-4c56-d678-9abc01234567', ID: 1006, TopicName: 'Обязательственное право: договор, виды договоров, ответственность за нарушение' },
      { TopicID: '708192a3-b4c5-4d67-e789-abc012345678', ID: 1007, TopicName: 'Наследственное право: завещание, наследование по закону, оформление прав' },
      { TopicID: '8192a3b4-c5d6-4e78-f89a-bc0123456789', ID: 1008, TopicName: 'Семейное право: брак, права и обязанности членов семьи, алименты, опека' },
      { TopicID: '92a3b4c5-d6e7-4f89-9a0b-c0123456789a', ID: 1009, TopicName: 'Трудовое право: трудовой договор, рабочее время, охрана труда, споры' },
      { TopicID: 'a3b4c5d6-e7f8-409a-a1bc-d123456789ab', ID: 1010, TopicName: 'Административное право и административные правонарушения. Производство по делам' },
      { TopicID: 'b4c5d6e7-f809-41ab-b2cd-e23456789abc', ID: 1011, TopicName: 'Уголовное право: преступление, состав, наказания, ответственность несовершеннолетних' },
      { TopicID: 'c5d6e7f8-091a-42bc-c3de-f3456789abcd', ID: 1012, TopicName: 'Уголовный процесс: стадии, участники, права и гарантии защиты' },
      { TopicID: 'd6e7f809-1a2b-43cd-d4ef-056789abcde0', ID: 1013, TopicName: 'Гражданское судопроизводство и арбитраж: иск, доказательства, решения, исполнение' },
      { TopicID: 'e7f8091a-2b3c-44de-e5f0-16789abcdef1', ID: 1014, TopicName: 'Финансовое право: бюджет, налоги, сборы, страховые взносы (базовый обзор)' },
      { TopicID: 'f8091a2b-3c4d-45ef-f601-2789abcdef12', ID: 1015, TopicName: 'Банковское право и валютное регулирование (вводный обзор)' },
      { TopicID: '091a2b3c-4d5e-4601-0712-389abcdef123', ID: 1016, TopicName: 'Предпринимательское и корпоративное право: формы юрлиц, регистрация, банкротство (обзор)' },
      { TopicID: '1a2b3c4d-5e6f-4712-1823-49abcdef1234', ID: 1017, TopicName: 'Интеллектуальная собственность: авторское право, патенты, товарные знаки (базовый)' },
      { TopicID: '2b3c4d5e-6f70-4823-2934-5abcdef12345', ID: 1018, TopicName: 'Информационное право и защита персональных данных. Цифровые права в сети' },
      { TopicID: '3c4d5e6f-7081-4934-3a45-6bcdef123456', ID: 1019, TopicName: 'Международное публичное право: источники, договоры, международные организации' },
      { TopicID: '4d5e6f70-8192-4a45-4b56-7cdef1234567', ID: 1020, TopicName: 'Международное частное право: коллизионные нормы и трансграничные сделки (обзор)' },
      { TopicID: '5e6f7081-92a3-4b56-5c67-8def12345678', ID: 1021, TopicName: 'Права человека и их защита: институты, процедуры, омбудсмен, ЕКПЧ (обзор)' },
      { TopicID: '6f708192-a3b4-4c67-6d78-9ef123456789', ID: 1022, TopicName: 'Правонарушение и юридическая ответственность: виды и основания' },
      { TopicID: '708192a3-b4c5-4d78-7e89-a0f12345678a', ID: 1023, TopicName: 'Правовая культура, этика и безопасность в цифровой среде (школьный курс)' },
      { TopicID: '8192a3b4-c5d6-4e89-8f9a-b1f23456789b', ID: 1024, TopicName: 'Правовой проект: разбор кейса, поиск норм, алгоритм действий и оформление' },
    ];

    // Формируем VALUES для INSERT
    const values = lawTopics
      .map(topic => {
        const escapedName = topic.TopicName.replace(/'/g, "''");
        return `('${topic.TopicID}'::uuid, ${topic.ID}, '${escapedName}', '${LAW_DISCIPLINE_ID}'::uuid, '2025-08-16 12:00:00'::timestamp, '2025-08-16 12:00:00'::timestamp)`;
      })
      .join(',\n');

    await queryRunner.query(`
      INSERT INTO "topics" ("TopicID", "ID", "TopicName", "DisciplineID", "CreatedAt", "UpdatedAt")
      VALUES
      ${values}
      ON CONFLICT ("TopicID") DO NOTHING
    `);

    // Включаем обратно проверку foreign key
    await queryRunner.query(`SET session_replication_role = 'origin'`);

    // Обновляем последовательность для ID
    await queryRunner.query(`
      SELECT setval('"topics_ID_seq"', COALESCE((SELECT MAX("ID") FROM "topics"), 1), true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const LAW_DISCIPLINE_ID = 'c2e1a0f9-5d8f-4684-9f7c-9f8a0b1c2d3e';

    // Удаляем темы для "Право"
    await queryRunner.query(`
      DELETE FROM "topics"
      WHERE "DisciplineID" = '${LAW_DISCIPLINE_ID}'::uuid
    `);

    // Удаляем метатеги для "Право"
    await queryRunner.query(`
      DELETE FROM "discipline_meta_tags"
      WHERE "DisciplineID" = '${LAW_DISCIPLINE_ID}'::uuid
    `);
  }
}

