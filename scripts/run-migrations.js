#!/usr/bin/env node

/**
 * Скрипт для запуска миграций в production
 * Используется как альтернатива TypeORM CLI, если он не работает
 */

const { DataSource } = require('typeorm');
const path = require('path');

// Загружаем production конфиг
// В production скрипт находится в /app/scripts/, конфиг в /app/dist/config/
const configPath = path.join(__dirname, '../dist/config/typeorm.config.prod.js');
console.log(`📁 Loading config from: ${configPath}`);

let dataSource;
try {
  dataSource = require(configPath);
} catch (error) {
  console.error(`❌ Failed to load config from ${configPath}:`, error.message);
  process.exit(1);
}

async function runMigrations() {
  try {
    console.log('🔄 Initializing database connection...');
    console.log(`   Config: ${configPath}`);
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   Database: ${process.env.DB_NAME || 'nestjs_db'}`);

    // Инициализируем подключение
    await dataSource.initialize();
    console.log('✅ Database connection established');

    // Запускаем миграции
    console.log('🔄 Running migrations...');
    const migrations = await dataSource.runMigrations();
    
    if (migrations.length === 0) {
      console.log('✅ No pending migrations');
    } else {
      console.log(`✅ Applied ${migrations.length} migration(s):`);
      migrations.forEach((migration) => {
        console.log(`   - ${migration.name}`);
      });
    }

    // Закрываем подключение
    await dataSource.destroy();
    console.log('✅ Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    console.error('   Stack:', error.stack);
    
    // Пытаемся закрыть подключение, если оно было открыто
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    
    process.exit(1);
  }
}

// Запускаем миграции
runMigrations();

