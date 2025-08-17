#!/usr/bin/env node

const { Client } = require('pg');

console.log('🗑️ Сброс базы данных...\n');

async function resetDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'nestjs_db',
  });

  try {
    await client.connect();
    console.log('✅ Подключение к базе данных установлено');

    // Удаляем все таблицы
    await client.query('DROP SCHEMA public CASCADE');
    console.log('✅ Схема public удалена');

    // Создаем новую схему
    await client.query('CREATE SCHEMA public');
    console.log('✅ Новая схема public создана');

    // Предоставляем права
    await client.query('GRANT ALL ON SCHEMA public TO postgres');
    await client.query('GRANT ALL ON SCHEMA public TO public');
    console.log('✅ Права предоставлены');

    console.log('\n✅ База данных успешно сброшена!');
    console.log('\n📋 Следующие шаги:');
    console.log('1. Запустите миграции: npm run migration:run');
    console.log('2. Запустите сиды: npm run seed:disciplines');

  } catch (error) {
    console.error('❌ Ошибка сброса базы данных:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

resetDatabase();
