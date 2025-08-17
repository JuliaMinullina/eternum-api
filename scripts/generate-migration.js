#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Генерация миграции...\n');

// Проверяем, есть ли изменения в сущностях
const entitiesPath = path.join(__dirname, '../src/modules');
const migrationsPath = path.join(__dirname, '../src/migrations');

// Получаем список всех entity файлов
const getEntityFiles = (dir) => {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getEntityFiles(fullPath));
    } else if (item.name.endsWith('.entity.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
};

const entityFiles = getEntityFiles(entitiesPath);
console.log(`📁 Найдено ${entityFiles.length} entity файлов:`);
entityFiles.forEach(file => {
  console.log(`  - ${path.relative(process.cwd(), file)}`);
});

// Генерируем имя миграции на основе текущего времени
const timestamp = Date.now();
const migrationName = `Migration${timestamp}`;

console.log(`\n🔄 Генерация миграции: ${migrationName}`);

try {
  // Генерируем миграцию
  execSync(`npm run migration:generate src/migrations/${migrationName}`, {
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log(`\n✅ Миграция ${migrationName} успешно создана!`);
  console.log('\n📋 Следующие шаги:');
  console.log('1. Проверьте сгенерированную миграцию в src/migrations/');
  console.log('2. При необходимости отредактируйте SQL запросы');
  console.log('3. Протестируйте миграцию локально: npm run migration:run');
  console.log('4. Закоммитьте миграцию в git');
  console.log('5. При деплое миграция запустится автоматически');
  
} catch (error) {
  console.error('\n❌ Ошибка генерации миграции:', error.message);
  console.log('\n💡 Возможные причины:');
  console.log('- База данных недоступна');
  console.log('- Неправильные параметры подключения к БД');
  console.log('- Отсутствуют изменения в схемах');
  
  process.exit(1);
}
