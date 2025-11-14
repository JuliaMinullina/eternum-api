#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Список всех сидеров тем
const topicSeedFiles = [
  'seed-literature-topics.ts',
  'seed-world-history-topics.ts',
  'seed-english-topics.ts',
  'seed-german-topics.ts',
  'seed-french-topics.ts',
  'seed-technology-topics.ts',
  'seed-fine-arts-topics.ts',
  'seed-music-topics.ts',
  'seed-physical-education-topics.ts',
  'seed-life-safety-topics.ts',
  'seed-ecology-topics.ts',
  'seed-astronomy-topics.ts',
  'seed-chinese-topics.ts',
  'seed-arabic-topics.ts',
  'seed-fine-arts-culture-topics.ts',
  'seed-culturology-topics.ts',
  'seed-philosophy-topics.ts',
  'seed-general-psychology-topics.ts',
  'seed-mathematical-analysis-topics.ts',
  'seed-spanish-topics.ts',
  'seed-russian-history-topics.ts',
];

console.log('📝 Генерация SQL для всех тем...\n');

let allTopicsSQL = '';
let topicIdCounter = 1;

// Читаем каждый файл сидера и извлекаем данные
for (const seedFile of topicSeedFiles) {
  const filePath = path.join(__dirname, '../src/scripts', seedFile);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Файл не найден: ${seedFile}`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Извлекаем DisciplineID
  const disciplineIdMatch = content.match(/const\s+\w+_DISCIPLINE_ID\s*=\s*['"]([^'"]+)['"]/);
  if (!disciplineIdMatch) {
    console.log(`⚠️  Не найден DisciplineID в ${seedFile}`);
    continue;
  }
  const disciplineId = disciplineIdMatch[1];

  // Извлекаем массив тем
  const topicsMatch = content.match(/const\s+\w+TopicsData\s*=\s*\[([\s\S]*?)\];/);
  if (!topicsMatch) {
    console.log(`⚠️  Не найден массив тем в ${seedFile}`);
    continue;
  }

  // Парсим темы (упрощенный парсер)
  const topicsText = topicsMatch[1];
  const topicMatches = topicsText.matchAll(/TopicID:\s*['"]([^'"]+)['"],\s*TopicName:\s*['"]([^'"]+)['"]/g);
  
  for (const match of topicMatches) {
    const topicId = match[1];
    const topicName = match[2].replace(/'/g, "''"); // Экранируем одинарные кавычки для SQL
    
    allTopicsSQL += `        ('${topicId}'::uuid, ${topicIdCounter++}, '${topicName}', '${disciplineId}'::uuid, '2025-08-16 12:00:00'::timestamp, '2025-08-16 12:00:00'::timestamp),\n`;
  }
  
  console.log(`✅ Обработан: ${seedFile}`);
}

// Удаляем последнюю запятую
allTopicsSQL = allTopicsSQL.trim().slice(0, -1);

const sql = `
    -- Вставляем все темы
    INSERT INTO "topics" ("TopicID", "ID", "TopicName", "DisciplineID", "CreatedAt", "UpdatedAt")
    VALUES
${allTopicsSQL}
    ON CONFLICT ("TopicID") DO NOTHING;

    -- Обновляем последовательность для ID
    SELECT setval('"topics_ID_seq"', COALESCE((SELECT MAX("ID") FROM "topics"), 1), true);
`;

console.log(`\n📊 Всего тем: ${topicIdCounter - 1}`);
console.log('\n✅ SQL сгенерирован!');

// Сохраняем в файл
const outputPath = path.join(__dirname, '../src/migrations/topics-insert.sql');
fs.writeFileSync(outputPath, sql);
console.log(`\n💾 SQL сохранен в: ${outputPath}`);

