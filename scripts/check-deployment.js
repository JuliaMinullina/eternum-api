#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Проверка готовности к деплою...\n');

// Проверяем наличие необходимых файлов
const requiredFiles = [
  'Dockerfile',
  'captain-definition',
  'docker-compose.prod.yml',
  '.github/workflows/deploy.yml',
  'env.example',
  'DEPLOYMENT.md'
];

let allFilesExist = true;

console.log('📁 Проверка файлов конфигурации:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Проверяем package.json
console.log('\n📦 Проверка package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Проверяем наличие необходимых скриптов
  const requiredScripts = ['build', 'start:prod'];
  requiredScripts.forEach(script => {
    const hasScript = packageJson.scripts && packageJson.scripts[script];
    console.log(`  ${hasScript ? '✅' : '❌'} Скрипт "${script}"`);
    if (!hasScript) allFilesExist = false;
  });
  
  // Проверяем зависимости
  const requiredDeps = ['@nestjs/core', '@nestjs/platform-express', 'pg'];
  requiredDeps.forEach(dep => {
    const hasDep = packageJson.dependencies && packageJson.dependencies[dep];
    console.log(`  ${hasDep ? '✅' : '❌'} Зависимость "${dep}"`);
    if (!hasDep) allFilesExist = false;
  });
  
} catch (error) {
  console.log('  ❌ Ошибка чтения package.json');
  allFilesExist = false;
}

// Проверяем переменные окружения
console.log('\n🔧 Проверка переменных окружения:');
const envExample = fs.readFileSync('env.example', 'utf8');
const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'DB_HOST',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET'
];

requiredEnvVars.forEach(envVar => {
  const hasVar = envExample.includes(envVar);
  console.log(`  ${hasVar ? '✅' : '❌'} ${envVar}`);
  if (!hasVar) allFilesExist = false;
});

// Итоговая проверка
console.log('\n📊 Результат проверки:');
if (allFilesExist) {
  console.log('✅ Приложение готово к деплою!');
  console.log('\n📋 Следующие шаги:');
  console.log('1. Настройте CapRover на сервере');
  console.log('2. Создайте приложение в CapRover Dashboard');
  console.log('3. Добавьте CAPROVER_WEBHOOK_URL в GitHub Secrets');
  console.log('4. Настройте переменные окружения в CapRover');
  console.log('5. Настройте базу данных');
  console.log('6. Сделайте пуш в main/master ветку для автоматического деплоя');
} else {
  console.log('❌ Приложение не готово к деплою. Исправьте указанные проблемы.');
  process.exit(1);
}
