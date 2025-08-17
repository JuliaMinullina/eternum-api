#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔧 Исправление проблем с деплоем...\n');

// Проверяем и исправляем package.json
console.log('📦 Проверка package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Проверяем версию Node.js в engines
  if (!packageJson.engines) {
    packageJson.engines = {};
  }
  
  if (!packageJson.engines.node || !packageJson.engines.node.includes('20')) {
    packageJson.engines.node = '>=20.0.0';
    console.log('  ✅ Обновлена версия Node.js в engines');
  }
  
  // Проверяем наличие необходимых скриптов
  const requiredScripts = {
    'build': 'nest build',
    'start:prod': 'node dist/main'
  };
  
  Object.entries(requiredScripts).forEach(([script, command]) => {
    if (!packageJson.scripts[script]) {
      packageJson.scripts[script] = command;
      console.log(`  ✅ Добавлен скрипт "${script}"`);
    }
  });
  
  // Сохраняем изменения
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log('  ✅ package.json обновлен');
  
} catch (error) {
  console.log('  ❌ Ошибка обновления package.json:', error.message);
}

// Проверяем наличие всех необходимых файлов
console.log('\n📁 Проверка файлов конфигурации...');
const requiredFiles = [
  'Dockerfile',
  'Dockerfile.prod',
  'captain-definition',
  '.dockerignore'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file} существует`);
  } else {
    console.log(`  ❌ ${file} отсутствует`);
  }
});

// Проверяем .dockerignore
console.log('\n🔍 Проверка .dockerignore...');
const dockerignoreContent = fs.readFileSync('.dockerignore', 'utf8');
const requiredIgnores = ['node_modules', 'dist', '.git', '.env'];

requiredIgnores.forEach(ignore => {
  if (dockerignoreContent.includes(ignore)) {
    console.log(`  ✅ ${ignore} в .dockerignore`);
  } else {
    console.log(`  ❌ ${ignore} отсутствует в .dockerignore`);
  }
});

// Проверяем переменные окружения
console.log('\n🔧 Проверка переменных окружения...');
if (fs.existsSync('env.example')) {
  const envContent = fs.readFileSync('env.example', 'utf8');
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
    if (envContent.includes(envVar)) {
      console.log(`  ✅ ${envVar} в env.example`);
    } else {
      console.log(`  ❌ ${envVar} отсутствует в env.example`);
    }
  });
} else {
  console.log('  ❌ env.example отсутствует');
}

console.log('\n✅ Проверка завершена!');
console.log('\n📋 Рекомендации:');
console.log('1. Убедитесь, что в CapRover установлены все переменные окружения');
console.log('2. Проверьте, что база данных доступна и настроена');
console.log('3. Убедитесь, что порт 3000 открыт в CapRover');
console.log('4. Проверьте логи приложения в CapRover Dashboard');
