const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testDisciplinesAPI() {
  try {
    console.log('🧪 Тестирование API дисциплин...\n');

    // 1. Получаем все дисциплины
    console.log('1. Получение всех дисциплин:');
    const response = await axios.get(`${BASE_URL}/disciplines`);
    console.log(`   Статус: ${response.status}`);
    console.log(`   Количество дисциплин: ${response.data.length}`);
    console.log('   Первые 3 дисциплины:');
    response.data.slice(0, 3).forEach(discipline => {
      console.log(`     - ${discipline.DisciplineName} (${discipline.DisciplineID})`);
    });
    console.log('');

    // 2. Получаем конкретную дисциплину
    if (response.data.length > 0) {
      const firstDiscipline = response.data[0];
      console.log('2. Получение конкретной дисциплины:');
      const singleResponse = await axios.get(`${BASE_URL}/disciplines/${firstDiscipline.DisciplineID}`);
      console.log(`   Статус: ${singleResponse.status}`);
      console.log(`   Дисциплина: ${singleResponse.data.DisciplineName}`);
      console.log(`   ID: ${singleResponse.data.DisciplineID}`);
      console.log('');

      // 3. Создаем новую дисциплину
      console.log('3. Создание новой дисциплины:');
      const newDiscipline = {
        DisciplineName: 'Тестовая дисциплина'
      };
      const createResponse = await axios.post(`${BASE_URL}/disciplines`, newDiscipline);
      console.log(`   Статус: ${createResponse.status}`);
      console.log(`   Создана дисциплина: ${createResponse.data.DisciplineName}`);
      console.log(`   ID: ${createResponse.data.DisciplineID}`);
      console.log('');

      // 4. Обновляем дисциплину
      console.log('4. Обновление дисциплины:');
      const updateData = {
        DisciplineName: 'Обновленная тестовая дисциплина'
      };
      const updateResponse = await axios.put(`${BASE_URL}/disciplines/${createResponse.data.DisciplineID}`, updateData);
      console.log(`   Статус: ${updateResponse.status}`);
      console.log(`   Обновлена дисциплина: ${updateResponse.data.DisciplineName}`);
      console.log('');

      // 5. Удаляем тестовую дисциплину
      console.log('5. Удаление тестовой дисциплины:');
      const deleteResponse = await axios.delete(`${BASE_URL}/disciplines/${createResponse.data.DisciplineID}`);
      console.log(`   Статус: ${deleteResponse.status}`);
      console.log('   Дисциплина удалена');
      console.log('');
    }

    console.log('✅ Все тесты прошли успешно!');

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
    if (error.response) {
      console.error('   Статус:', error.response.status);
      console.error('   Данные:', error.response.data);
    }
  }
}

// Запускаем тесты
testDisciplinesAPI();
