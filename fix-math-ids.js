const fs = require('fs');

// Читаем файл
let content = fs.readFileSync('/Users/yu.minullina/Desktop/Eternum/Backend/src/scripts/seed-mathematics-topics.ts', 'utf8');

// Заменяем ID от 8 до 37 на диапазон 107-136
for (let i = 8; i <= 37; i++) {
    const newId = i + 99; // 8 + 99 = 107, ..., 37 + 99 = 136
    content = content.replace(`    ID: ${i},`, `    ID: ${newId},`);
}

// Записываем обратно
fs.writeFileSync('/Users/yu.minullina/Desktop/Eternum/Backend/src/scripts/seed-mathematics-topics.ts', content);

console.log('ID обновлены: 100-136');
