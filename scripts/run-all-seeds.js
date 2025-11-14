#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🌱 Запуск всех сидеров...\n');

const seeds = [
  // 1. Метатеги (должны быть первыми)
  { name: 'Метатеги', script: 'seed:meta-tags' },
  
  // 2. Дисциплины
  { name: 'Дисциплины', script: 'seed:disciplines' },
  
  // 3. Связи дисциплин с метатегами
  { name: 'Связи дисциплин с метатегами', script: 'seed:discipline-meta-tags', file: 'src/scripts/seed-discipline-meta-tags.ts' },
  
  // 4. Темы по дисциплинам (в алфавитном порядке)
  { name: 'Темы: Английский язык', script: 'seed:english-topics', file: 'src/scripts/seed-english-topics.ts' },
  { name: 'Темы: Арабский язык', script: 'seed:arabic-topics', file: 'src/scripts/seed-arabic-topics.ts' },
  { name: 'Темы: Астрономия', script: 'seed:astronomy-topics', file: 'src/scripts/seed-astronomy-topics.ts' },
  { name: 'Темы: Биология', script: 'seed:biology-topics' },
  { name: 'Темы: География', script: 'seed:geography-topics', file: 'src/scripts/seed-geography-topics.ts' },
  { name: 'Темы: Изобразительное искусство', script: 'seed:fine-arts-topics', file: 'src/scripts/seed-fine-arts-topics.ts' },
  { name: 'Темы: Информатика', script: 'seed:informatics-topics', file: 'src/scripts/seed-informatics-topics.ts' },
  { name: 'Темы: Испанский язык', script: 'seed:spanish-topics', file: 'src/scripts/seed-spanish-topics.ts' },
  { name: 'Темы: История России', script: 'seed:russian-history-topics', file: 'src/scripts/seed-russian-history-topics.ts' },
  { name: 'Темы: Китайский язык', script: 'seed:chinese-topics', file: 'src/scripts/seed-chinese-topics.ts' },
  { name: 'Темы: Культурология', script: 'seed:culturology-topics', file: 'src/scripts/seed-culturology-topics.ts' },
  { name: 'Темы: Литература', script: 'seed:literature-topics' },
  { name: 'Темы: Математика', script: 'seed:mathematics-topics' },
  { name: 'Темы: Математический анализ', script: 'seed:mathematical-analysis-topics', file: 'src/scripts/seed-mathematical-analysis-topics.ts' },
  { name: 'Темы: Мировая история', script: 'seed:world-history-topics', file: 'src/scripts/seed-world-history-topics.ts' },
  { name: 'Темы: Мировая художественная культура', script: 'seed:fine-arts-culture-topics', file: 'src/scripts/seed-fine-arts-culture-topics.ts' },
  { name: 'Темы: Музыка', script: 'seed:music-topics', file: 'src/scripts/seed-music-topics.ts' },
  { name: 'Темы: Немецкий язык', script: 'seed:german-topics', file: 'src/scripts/seed-german-topics.ts' },
  { name: 'Темы: Общая психология', script: 'seed:general-psychology-topics', file: 'src/scripts/seed-general-psychology-topics.ts' },
  { name: 'Темы: ОБЖ', script: 'seed:life-safety-topics', file: 'src/scripts/seed-life-safety-topics.ts' },
  { name: 'Темы: Обществознание', script: 'seed:social-studies-topics', file: 'src/scripts/seed-social-studies-topics.ts' },
  { name: 'Темы: Право', script: 'seed:law-topics', file: 'src/scripts/seed-law-topics.ts' },
  { name: 'Темы: Русский язык', script: 'seed:russian-topics' },
  { name: 'Темы: Физика', script: 'seed:physics-topics' },
  { name: 'Темы: Физическая культура', script: 'seed:physical-education-topics', file: 'src/scripts/seed-physical-education-topics.ts' },
  { name: 'Темы: Философия', script: 'seed:philosophy-topics', file: 'src/scripts/seed-philosophy-topics.ts' },
  { name: 'Темы: Французский язык', script: 'seed:french-topics', file: 'src/scripts/seed-french-topics.ts' },
  { name: 'Темы: Химия', script: 'seed:chemistry-topics' },
  { name: 'Темы: Экология', script: 'seed:ecology-topics', file: 'src/scripts/seed-ecology-topics.ts' },
  { name: 'Темы: Экономика', script: 'seed:economics-topics', file: 'src/scripts/seed-economics-topics.ts' },
  { name: 'Темы: Технология', script: 'seed:technology-topics', file: 'src/scripts/seed-technology-topics.ts' },
];

let successCount = 0;
let failCount = 0;
const failed = [];

for (const seed of seeds) {
  try {
    console.log(`\n📦 Запуск: ${seed.name}...`);
    
    if (seed.file) {
      // Если есть файл, запускаем напрямую через nest start
      const command = `nest start --entryFile ${seed.file}`;
      execSync(command, { 
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'development' }
      });
    } else {
      // Если есть npm script, используем его
      execSync(`npm run ${seed.script}`, { 
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'development' }
      });
    }
    
    successCount++;
    console.log(`✅ ${seed.name} - успешно`);
  } catch (error) {
    failCount++;
    failed.push(seed.name);
    console.error(`❌ ${seed.name} - ошибка:`, error.message);
    // Продолжаем выполнение даже при ошибке
  }
}

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Итоги:`);
console.log(`✅ Успешно: ${successCount}`);
console.log(`❌ Ошибок: ${failCount}`);

if (failed.length > 0) {
  console.log(`\n❌ Не удалось запустить:`);
  failed.forEach(name => console.log(`   - ${name}`));
}

console.log('\n🎉 Запуск всех сидеров завершен!\n');

