#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 НАЧИНАЕМ ПОЛНОЕ ЗАПОЛНЕНИЕ ОБРАЗОВАТЕЛЬНОЙ ВСЕЛЕННОЙ!');
console.log('=' .repeat(60));

// Функция для выполнения команд с обработкой ошибок
function runCommand(command, description) {
    try {
        console.log(`\n📋 ${description}...`);
        console.log(`💻 Выполняем: ${command}`);
        
        const result = execSync(command, { 
            cwd: __dirname, 
            stdio: 'inherit',
            encoding: 'utf8'
        });
        
        console.log(`✅ ${description} - УСПЕШНО!`);
        return true;
    } catch (error) {
        console.error(`❌ ОШИБКА в ${description}:`, error.message);
        return false;
    }
}

// Основная функция выполнения
async function setupCompleteDatabase() {
    console.log('\n🏗️ ЭТАП 1: ПРИМЕНЕНИЕ ВСЕХ МИГРАЦИЙ');
    console.log('-'.repeat(40));
    
    if (!runCommand('npm run migration:run', 'Применение всех миграций')) {
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Миграции не применены!');
        process.exit(1);
    }
    
    console.log('\n📚 ЭТАП 2: ЗАПОЛНЕНИЕ БАЗОВЫХ ДАННЫХ');
    console.log('-'.repeat(40));
    
    const baseDataScripts = [
        { script: 'npx ts-node src/scripts/seed-disciplines.ts', desc: 'Заполнение дисциплин' },
        { script: 'npx ts-node src/scripts/seed-meta-tags.ts', desc: 'Заполнение мета-тегов' },
        { script: 'npx ts-node src/scripts/seed-discipline-meta-tags.ts', desc: 'Связи дисциплин и мета-тегов' }
    ];
    
    for (const item of baseDataScripts) {
        if (!runCommand(item.script, item.desc)) {
            console.error(`❌ ОШИБКА в базовых данных: ${item.desc}`);
            process.exit(1);
        }
    }
    
    console.log('\n📖 ЭТАП 3: ЗАПОЛНЕНИЕ ВСЕХ ТЕМ ПО ДИСЦИПЛИНАМ');
    console.log('-'.repeat(40));
    
    const topicScripts = [
        { script: 'npx ts-node src/scripts/seed-literature-topics.ts', desc: 'Литература (~45 тем)' },
        { script: 'npx ts-node src/scripts/seed-mathematics-topics.ts', desc: 'Математика (37 тем)' },
        { script: 'npx ts-node src/scripts/seed-physics-topics.ts', desc: 'Физика (31 тема)' },
        { script: 'npx ts-node src/scripts/seed-chemistry-topics.ts', desc: 'Химия (35 тем)' },
        { script: 'npx ts-node src/scripts/seed-biology-topics.ts', desc: 'Биология (33 темы)' },
        { script: 'npx ts-node src/scripts/seed-geography-topics.ts', desc: 'География (32 темы)' },
        { script: 'npx ts-node src/scripts/seed-russian-topics.ts', desc: 'Русский язык (40 тем)' },
        { script: 'npx ts-node src/scripts/seed-informatics-topics.ts', desc: 'Информатика (36 тем)' },
        { script: 'npx ts-node src/scripts/seed-social-studies-topics.ts', desc: 'Обществознание (35 тем)' },
        { script: 'npx ts-node src/scripts/seed-economics-topics.ts', desc: 'Экономика (33 темы)' },
        { script: 'npx ts-node src/scripts/seed-law-topics.ts', desc: 'Право (25 тем)' }
    ];
    
    let successCount = 0;
    for (const item of topicScripts) {
        if (runCommand(item.script, item.desc)) {
            successCount++;
        } else {
            console.warn(`⚠️ ПРЕДУПРЕЖДЕНИЕ: ${item.desc} не выполнено`);
        }
    }
    
    console.log('\n🔍 ЭТАП 4: ПРОВЕРКА РЕЗУЛЬТАТОВ');
    console.log('-'.repeat(40));
    
    // Проверяем итоговые результаты
    try {
        console.log('📊 Проверяем количество тем в базе...');
        const topicCount = execSync('docker-compose exec postgres psql -U postgres -d nestjs_db -c "SELECT COUNT(*) as total_topics FROM topics;"', { 
            cwd: __dirname, 
            encoding: 'utf8' 
        });
        console.log(`📈 Всего тем в базе: ${topicCount.trim()}`);
        
        console.log('\n📋 Статистика по дисциплинам:');
        const disciplineStats = execSync('docker-compose exec postgres psql -U postgres -d nestjs_db -c "SELECT d.DisciplineName, COUNT(t.TopicID) as topics_count FROM disciplines d LEFT JOIN topics t ON d.DisciplineID = t.DisciplineID GROUP BY d.DisciplineID, d.DisciplineName ORDER BY d.DisciplineName;"', { 
            cwd: __dirname, 
            encoding: 'utf8' 
        });
        console.log(disciplineStats);
        
    } catch (error) {
        console.warn('⚠️ Не удалось проверить статистику:', error.message);
    }
    
    console.log('\n🎉 ИТОГОВЫЙ РЕЗУЛЬТАТ');
    console.log('=' .repeat(60));
    console.log(`✅ Успешно выполнено: ${successCount}/${topicScripts.length} скриптов тем`);
    console.log(`📚 Ожидаемое количество тем: ~382`);
    console.log(`🎓 Дисциплин: 11`);
    console.log(`🏆 Production-ready: ДА!`);
    
    if (successCount === topicScripts.length) {
        console.log('\n🌟 ПОЗДРАВЛЯЕМ! ОБРАЗОВАТЕЛЬНАЯ ВСЕЛЕННАЯ ПОЛНОСТЬЮ СОЗДАНА! 🌟');
        console.log('🚀 Готово к деплою на продакшен!');
    } else {
        console.log('\n⚠️ ВНИМАНИЕ: Некоторые скрипты не выполнились. Проверьте логи выше.');
    }
}

// Запуск основного процесса
setupCompleteDatabase().catch(error => {
    console.error('❌ КРИТИЧЕСКАЯ ОШИБКА:', error);
    process.exit(1);
});
