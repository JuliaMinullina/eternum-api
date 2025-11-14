#!/usr/bin/env node

/**
 * Скрипт для запуска миграций в production
 * Используется как альтернатива TypeORM CLI, если он не работает
 */

const { DataSource } = require('typeorm');
const path = require('path');
const fs = require('fs');

console.log('==========================================');
console.log('🔄 MIGRATION SCRIPT STARTED');
console.log('==========================================');
console.log(`Timestamp: ${new Date().toISOString()}`);
console.log(`Working directory: ${process.cwd()}`);
console.log('');

// ============================================
// STEP 1: Environment Check
// ============================================
console.log('📋 STEP 1: Checking environment variables...');
console.log(`   DB_HOST: ${process.env.DB_HOST || 'NOT SET (default: localhost)'}`);
console.log(`   DB_PORT: ${process.env.DB_PORT || 'NOT SET (default: 5432)'}`);
console.log(`   DB_NAME: ${process.env.DB_NAME || 'NOT SET (default: nestjs_db)'}`);
console.log(`   DB_USERNAME: ${process.env.DB_USERNAME || 'NOT SET (default: postgres)'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'NOT SET'}`);
console.log('');

// ============================================
// STEP 2: Config File Check
// ============================================
console.log('📋 STEP 2: Checking config file...');
const configPath = path.join(__dirname, '../dist/config/typeorm.config.prod.js');
console.log(`   Config path: ${configPath}`);

if (!fs.existsSync(configPath)) {
  console.error(`   ❌ ERROR: Config file NOT FOUND at ${configPath}`);
  console.error(`   Current directory: ${process.cwd()}`);
  console.error(`   Script directory: ${__dirname}`);
  process.exit(1);
}

console.log(`   ✅ Config file exists`);
console.log(`   File size: ${fs.statSync(configPath).size} bytes`);
console.log('');

// ============================================
// STEP 3: Load Config
// ============================================
console.log('📋 STEP 3: Loading TypeORM config...');
let dataSource;
try {
  dataSource = require(configPath);
  console.log('   ✅ Config loaded successfully');
  console.log(`   DataSource type: ${dataSource.type || 'unknown'}`);
  console.log(`   Database: ${dataSource.options?.database || 'unknown'}`);
  console.log(`   Host: ${dataSource.options?.host || 'unknown'}`);
  console.log(`   Port: ${dataSource.options?.port || 'unknown'}`);
} catch (error) {
  console.error(`   ❌ ERROR: Failed to load config from ${configPath}`);
  console.error(`   Error message: ${error.message}`);
  console.error(`   Stack: ${error.stack}`);
  process.exit(1);
}
console.log('');

// ============================================
// STEP 4: Check Migrations Directory
// ============================================
console.log('📋 STEP 4: Checking migrations directory...');
const migrationsPath = path.join(__dirname, '../dist/migrations');
console.log(`   Migrations path: ${migrationsPath}`);

if (!fs.existsSync(migrationsPath)) {
  console.error(`   ❌ ERROR: Migrations directory NOT FOUND at ${migrationsPath}`);
  process.exit(1);
}

const migrationFiles = fs.readdirSync(migrationsPath).filter(f => f.endsWith('.js'));
console.log(`   ✅ Migrations directory exists`);
console.log(`   Found ${migrationFiles.length} migration file(s):`);
migrationFiles.slice(0, 10).forEach(file => {
  console.log(`      - ${file}`);
});
if (migrationFiles.length > 10) {
  console.log(`      ... and ${migrationFiles.length - 10} more`);
}
console.log('');

// ============================================
// STEP 5: Initialize Database Connection
// ============================================
console.log('==========================================');
console.log('📋 STEP 5: Initializing database connection...');
console.log('==========================================');
console.log(`Timestamp: ${new Date().toISOString()}`);
console.log(`   Host: ${dataSource.options?.host || process.env.DB_HOST || 'localhost'}`);
console.log(`   Port: ${dataSource.options?.port || process.env.DB_PORT || '5432'}`);
console.log(`   Database: ${dataSource.options?.database || process.env.DB_NAME || 'nestjs_db'}`);
console.log(`   Username: ${dataSource.options?.username || process.env.DB_USERNAME || 'postgres'}`);
console.log('');

async function runMigrations() {
  try {
    console.log('   Attempting to connect...');
    await dataSource.initialize();
    console.log('   ✅ Database connection established');
    console.log(`   Connection status: ${dataSource.isInitialized ? 'INITIALIZED' : 'NOT INITIALIZED'}`);
    console.log('');

    // ============================================
    // STEP 6: Check Pending Migrations
    // ============================================
    console.log('📋 STEP 6: Checking pending migrations...');
    const pendingMigrations = await dataSource.showMigrations();
    console.log(`   Pending migrations: ${pendingMigrations.length}`);
    if (pendingMigrations.length > 0) {
      console.log('   Pending migration files:');
      pendingMigrations.forEach((migration, index) => {
        console.log(`      ${index + 1}. ${migration.name || migration}`);
      });
    }
    console.log('');

    // ============================================
    // STEP 7: Run Migrations
    // ============================================
    console.log('==========================================');
    console.log('📋 STEP 7: Running migrations...');
    console.log('==========================================');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('');

    const migrations = await dataSource.runMigrations();
    
    console.log('');
    if (migrations.length === 0) {
      console.log('   ✅ No pending migrations - database is up to date');
    } else {
      console.log(`   ✅ SUCCESS: Applied ${migrations.length} migration(s):`);
      migrations.forEach((migration, index) => {
        console.log(`      ${index + 1}. ${migration.name}`);
      });
    }
    console.log('');

    // ============================================
    // STEP 8: Close Connection
    // ============================================
    console.log('📋 STEP 8: Closing database connection...');
    await dataSource.destroy();
    console.log('   ✅ Connection closed');
    console.log('');

    console.log('==========================================');
    console.log('✅ MIGRATIONS COMPLETED SUCCESSFULLY');
    console.log('==========================================');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('==========================================');
    console.error('❌ MIGRATION ERROR');
    console.error('==========================================');
    console.error(`Timestamp: ${new Date().toISOString()}`);
    console.error(`Error message: ${error.message}`);
    console.error(`Error name: ${error.name}`);
    if (error.stack) {
      console.error(`Stack trace:`);
      console.error(error.stack);
    }
    
    // Дополнительная диагностика
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    if (error.detail) {
      console.error(`Error detail: ${error.detail}`);
    }
    if (error.hint) {
      console.error(`Error hint: ${error.hint}`);
    }
    
    // Пытаемся закрыть подключение, если оно было открыто
    if (dataSource && dataSource.isInitialized) {
      try {
        console.error('');
        console.error('Attempting to close database connection...');
        await dataSource.destroy();
        console.error('Connection closed');
      } catch (closeError) {
        console.error(`Error closing connection: ${closeError.message}`);
      }
    }
    
    console.error('');
    process.exit(1);
  }
}

// Запускаем миграции
runMigrations();
