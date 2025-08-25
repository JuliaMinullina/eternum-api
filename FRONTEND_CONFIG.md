# Конфигурация фронтенда для интеграции с бэкендом

## Проблема
Фронтенд отправляет запросы на неправильный URL:
- ❌ `http://localhost:5173/api/api/auth/login`
- ✅ `http://localhost:3000/auth/login`

## Решение

### 1. Настройка axios на фронтенде

```javascript
// api.js или axios-config.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ПРАВИЛЬНЫЙ URL
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
        // Обновляем токен
        await axios.post('http://localhost:3000/auth/refresh', {}, { 
          withCredentials: true 
        });
        
        // Повторяем оригинальный запрос
        return api(originalRequest);
      } catch (refreshError) {
        // Если refresh token истек, перенаправляем на логин
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

### 2. Функции для работы с API

```javascript
// auth.js
import api from './api';

export const authAPI = {
  // Логин
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Регистрация
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Проверка токена
  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  // Логаут
  logout: async () => {
    const response = await api.post('/auth/logout', {});
    return response.data;
  },

  // Обновление токена
  refresh: async () => {
    const response = await api.post('/auth/refresh', {});
    return response.data;
  },
};

// viewHistory.js
export const viewHistoryAPI = {
  // Записать просмотр темы
  recordTopicView: async (topicId, disciplineId) => {
    const response = await api.post(`/view-history/topic/${topicId}`, {
      disciplineId: disciplineId
    });
    return response.data;
  },

  // Записать просмотр дисциплины
  recordDisciplineView: async (disciplineId) => {
    const response = await api.post(`/view-history/discipline/${disciplineId}`);
    return response.data;
  },

  // Получить недавнюю активность
  getRecentActivity: async (limit = 10) => {
    const response = await api.get(`/view-history/recent?limit=${limit}`);
    return response.data;
  },
};
```

### 3. React компонент для логина

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

### 4. Компонент для отслеживания активности

```jsx
// TopicPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { viewHistoryAPI } from './viewHistory';

const TopicPage = () => {
  const { topicId, disciplineId } = useParams();

  useEffect(() => {
    // Записываем просмотр при загрузке страницы
    if (topicId && disciplineId) {
      viewHistoryAPI.recordTopicView(topicId, disciplineId)
        .then(() => console.log('✅ Topic view recorded'))
        .catch(error => console.error('❌ Error recording topic view:', error));
    }
  }, [topicId, disciplineId]);

  return (
    <div>
      {/* Содержимое страницы темы */}
    </div>
  );
};

export default TopicPage;
```

### 5. Проверка аутентификации

```jsx
// AuthGuard.jsx
import React, { useEffect, useState } from 'react';
import { authAPI } from './auth';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await authAPI.verify();
        setIsAuthenticated(result.valid);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return children;
};

export default AuthGuard;
```

## Ключевые моменты

1. **baseURL должен быть `http://localhost:3000`** - не 5173
2. **withCredentials: true** - обязательно для cookies
3. **Правильные endpoints:**
   - `/auth/login` - логин
   - `/auth/register` - регистрация
   - `/auth/verify` - проверка токена
   - `/auth/logout` - логаут
   - `/view-history/topic/:id` - запись просмотра темы

## Проверка

После внесения изменений на фронтенде:

1. Откройте DevTools (F12)
2. Перейдите на вкладку Network
3. Попробуйте войти
4. Убедитесь, что запрос отправляется на `http://localhost:3000/auth/login`
5. Проверьте, что в ответе есть токены
