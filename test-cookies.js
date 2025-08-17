const axios = require('axios');

async function testCookies() {
  try {
    console.log('🧪 Testing cookies functionality...');
    
    // Тестируем установку тестовой cookie
    console.log('\n1. Testing test-cookies endpoint...');
    const testResponse = await axios.get('http://localhost:3000/auth/test-cookies', {
      withCredentials: true
    });
    console.log('Test response:', testResponse.data);
    console.log('Test cookies in response:', testResponse.headers['set-cookie']);
    
    // Тестируем логин
    console.log('\n2. Testing login endpoint...');
    const loginResponse = await axios.post('http://localhost:3000/auth/login', {
      email: 'test@example.com',
      password: 'password'
    }, {
      withCredentials: true
    });
    console.log('Login response:', loginResponse.data);
    console.log('Login cookies in response:', loginResponse.headers['set-cookie']);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testCookies();
