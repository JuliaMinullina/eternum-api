#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 ПРОСТОЕ ЗАПОЛНЕНИЕ БАЗЫ ДАННЫХ');
console.log('=' .repeat(50));

// Функция для безопасного выполнения команд
function safeExec(command, description) {
    try {
        console.log(`\n📋 ${description}`);
        console.log(`💻 ${command}`);
        
        const result = execSync(command, { 
            cwd: __dirname, 
            stdio: 'inherit',
            timeout: 30000 // 30 секунд таймаут
        });
        
        console.log(`✅ ${description} - УСПЕШНО!`);
        return true;
    } catch (error) {
        console.error(`❌ ОШИБКА в ${description}:`);
        console.error(`   ${error.message}`);
        return false;
    }
}

// Основная функция
async function main() {
    console.log('\n🔍 ПРОВЕРКА СИСТЕМЫ');
    
    // Проверяем Docker
    if (!safeExec('docker-compose ps', 'Проверка статуса контейнеров')) {
        console.log('⚠️ Проблемы с Docker. Запускаем контейнеры...');
        safeExec('docker-compose up -d', 'Запуск контейнеров');
    }
    
    console.log('\n🏗️ ПРИМЕНЕНИЕ МИГРАЦИЙ');
    safeExec('npm run migration:run', 'Применение миграций');
    
    console.log('\n📚 ЗАПОЛНЕНИЕ БАЗОВЫХ ДАННЫХ');
    safeExec('npx ts-node src/scripts/seed-disciplines.ts', 'Дисциплины');
    safeExec('npx ts-node src/scripts/seed-meta-tags.ts', 'Мета-теги');
    safeExec('npx ts-node src/scripts/seed-discipline-meta-tags.ts', 'Связи');
    
    console.log('\n📖 ЗАПОЛНЕНИЕ ТЕМ (ПО ОДНОЙ ДИСЦИПЛИНЕ)');
    safeExec('npx ts-node src/scripts/seed-literature-topics.ts', 'Литература');
    
    console.log('\n🎉 ГОТОВО! Проверьте результат.');
}

main().catch(console.error);
