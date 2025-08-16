const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testTopicsAPI() {
  try {
    console.log('🧪 Тестирование API тем...\n');

    // 1. Получаем все темы
    console.log('1. Получение всех тем:');
    const response = await axios.get(`${BASE_URL}/topics`);
    console.log(`   Статус: ${response.status}`);
    console.log(`   Количество тем: ${response.data.length}`);
    console.log('   Первые 3 темы:');
    response.data.slice(0, 3).forEach(topic => {
      console.log(`     - ${topic.TopicName} (${topic.TopicID})`);
    });
    console.log('');

    // 2. Получаем темы по дисциплине "Русский язык"
    console.log('2. Получение тем по дисциплине "Русский язык":');
    const russianTopicsResponse = await axios.get(`${BASE_URL}/topics/discipline/6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d`);
    console.log(`   Статус: ${russianTopicsResponse.status}`);
    console.log(`   Количество тем по русскому языку: ${russianTopicsResponse.data.length}`);
    console.log('   Первые 5 тем по русскому языку:');
    russianTopicsResponse.data.slice(0, 5).forEach((topic, index) => {
      console.log(`     ${index + 1}. ${topic.TopicName}`);
    });
    console.log('');

    // 3. Получаем конкретную тему
    if (response.data.length > 0) {
      const firstTopic = response.data[0];
      console.log('3. Получение конкретной темы:');
      const singleResponse = await axios.get(`${BASE_URL}/topics/${firstTopic.TopicID}`);
      console.log(`   Статус: ${singleResponse.status}`);
      console.log(`   Тема: ${singleResponse.data.TopicName}`);
      console.log(`   ID: ${singleResponse.data.TopicID}`);
      console.log(`   Дисциплина ID: ${singleResponse.data.DisciplineID}`);
      console.log('');

      // 4. Создаем новую тему
      console.log('4. Создание новой темы:');
      const newTopic = {
        TopicName: 'Тестовая тема',
        DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d'
      };
      const createResponse = await axios.post(`${BASE_URL}/topics`, newTopic);
      console.log(`   Статус: ${createResponse.status}`);
      console.log(`   Создана тема: ${createResponse.data.TopicName}`);
      console.log(`   ID: ${createResponse.data.TopicID}`);
      console.log('');

      // 5. Обновляем тему
      console.log('5. Обновление темы:');
      const updateData = {
        TopicName: 'Обновленная тестовая тема'
      };
      const updateResponse = await axios.put(`${BASE_URL}/topics/${createResponse.data.TopicID}`, updateData);
      console.log(`   Статус: ${updateResponse.status}`);
      console.log(`   Обновлена тема: ${updateResponse.data.TopicName}`);
      console.log('');

      // 6. Удаляем тестовую тему
      console.log('6. Удаление тестовой темы:');
      const deleteResponse = await axios.delete(`${BASE_URL}/topics/${createResponse.data.TopicID}`);
      console.log(`   Статус: ${deleteResponse.status}`);
      console.log('   Тема удалена');
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
testTopicsAPI();
