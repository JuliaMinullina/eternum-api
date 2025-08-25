# Решение проблемы авторизации

## Проблема
Фронтенд отправляет запросы на неправильный URL, что приводит к ошибке 404:
- ❌ `http://localhost:5173/api/api/auth/login` (неправильно)
- ✅ `http://localhost:3000/auth/login` (правильно)

## Статус бэкенда
✅ **Бэкенд работает корректно!**

### Тестирование API:
```bash
# Регистрация пользователя
curl http://localhost:3000/auth/register -X POST -H "Content-Type: application/json" \
  -d '{"UserName":"Test","UserSurname":"User","Email":"test@example.com","password":"password123"}'

# Логин пользователя  
curl http://localhost:3000/auth/login -X POST -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Результат:** Оба запроса возвращают токены успешно.

## Решение для фронтенда

### 1. Исправьте конфигурацию axios

**Было (неправильно):**
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5173/api', // ❌ Неправильный URL
  // ...
});
```

**Стало (правильно):**
```javascript
const api = axios.create({
  baseURL: 'http://localhost:3000', // ✅ Правильный URL
  withCredentials: true, // ОБЯЗАТЕЛЬНО для cookies
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 2. Правильные endpoints

```javascript
// Логин
POST http://localhost:3000/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}

// Регистрация
POST http://localhost:3000/auth/register
{
  "UserName": "Test",
  "UserSurname": "User", 
  "Email": "test@example.com",
  "password": "password123"
}

// Проверка токена
GET http://localhost:3000/auth/verify

// Логаут
POST http://localhost:3000/auth/logout

// Обновление токена
POST http://localhost:3000/auth/refresh
{
  "refresh_token": "your_refresh_token"
}
```

### 3. Полная конфигурация для фронтенда

```javascript
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ✅ ПРАВИЛЬНЫЙ URL
  withCredentials: true, // ОБЯЗАТЕЛЬНО для cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для автоматического обновления токенов
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await axios.post('http://localhost:3000/auth/refresh', {}, { 
          withCredentials: true 
        });
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

```javascript
// auth.js
import api from './api';

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout', {});
    return response.data;
  },
};
```

### 4. React компонент для логина

```jsx
// Login.jsx
import React, { useState } from 'react';
import { authAPI } from './auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authAPI.login(email, password);
      console.log('🔐 Login successful:', result);
      
      // Сохраняем информацию о пользователе
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Перенаправляем на главную страницу
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Login error:', error);
      setError(error.response?.data?.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Вход в аккаунт</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

## Проверка решения

1. **Откройте DevTools (F12)**
2. **Перейдите на вкладку Network**
3. **Попробуйте войти с данными:**
   - Email: `test@example.com`
   - Password: `password123`
4. **Убедитесь, что:**
   - Запрос отправляется на `http://localhost:3000/auth/login` ✅
   - В ответе есть `access_token` и `refresh_token` ✅
   - Нет ошибки 404 ✅

## Дополнительные возможности

### Отслеживание активности
```javascript
// При переходе на страницу темы
await api.post(`/view-history/topic/${topicId}`, {
  disciplineId: disciplineId
});

// Получение недавней активности
const activity = await api.get('/view-history/recent?limit=10');
```

### Автоматическое обновление токенов
Система автоматически обновляет access token при истечении срока действия (24 часа) с помощью refresh token (72 часа).

## Ключевые моменты

1. **URL должен быть `http://localhost:3000`** - не 5173
2. **withCredentials: true** - обязательно для cookies
3. **Правильная структура данных для регистрации**
4. **Токены сохраняются в cookies автоматически**
5. **Автоматическое обновление токенов при истечении**

После внесения этих изменений на фронтенде авторизация должна работать корректно!
