# Интеграция с фронтендом - Refresh Token система (ИСПРАВЛЕНО)

## Обзор

Реализована система аутентификации с refresh token, которая позволяет пользователям оставаться залогиненными в течение 72 часов с автоматическим обновлением access token каждые 24 часа. **ИСПРАВЛЕНО**: Cookies теперь правильно устанавливаются и сохраняются при обновлении страницы.

## Архитектура

- **Access Token**: JWT токен со сроком действия 24 часа
- **Refresh Token**: Уникальный токен со сроком действия 72 часа, хранится в базе данных
- **Cookies**: Токены автоматически устанавливаются в httpOnly cookies для безопасности
- **View History**: Автоматическое отслеживание активности пользователя

## API Endpoints

### 1. Логин
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**Ответ:**
```json
{
  "user": {
    "UserID": "uuid",
    "UserName": "Имя",
    "UserSurname": "Фамилия", 
    "Email": "user@example.com",
    "Role": "user"
  },
  "expires_in": 86400
}
```

**Cookies (устанавливаются автоматически):**
- `access_token`: JWT токен (24 часа)
- `refresh_token`: Refresh токен (72 часа)

### 2. Обновление токена
```
POST http://localhost:3000/auth/refresh
Content-Type: application/json

{
  "refresh_token": "refresh_token_string"
}
```

**Ответ:**
```json
{
  "user": {
    "UserID": "uuid",
    "UserName": "Имя",
    "UserSurname": "Фамилия",
    "Email": "user@example.com", 
    "Role": "user"
  },
  "expires_in": 86400
}
```

### 3. Логаут
```
POST http://localhost:3000/auth/logout
Content-Type: application/json

{
  "refresh_token": "refresh_token_string"
}
```

**Ответ:**
```json
{
  "message": "Successfully logged out"
}
```

### 4. Проверка токена
```
GET http://localhost:3000/auth/verify
Authorization: Bearer <access_token>
```

**Ответ:**
```json
{
  "valid": true,
  "user": {
    "UserID": "uuid",
    "UserName": "Имя",
    "UserSurname": "Фамилия",
    "Email": "user@example.com",
    "Role": "user"
  }
}
```

## View History API (НЕДАВНЯЯ АКТИВНОСТЬ)

### 1. Записать просмотр темы
```
POST http://localhost:3000/view-history/topic/:topicId
Content-Type: application/json

{
  "disciplineId": "discipline_uuid"
}
```

### 2. Записать просмотр дисциплины
```
POST http://localhost:3000/view-history/discipline/:disciplineId
```

### 3. Записать просмотр урока
```
POST http://localhost:3000/view-history/lesson/:lessonId
Content-Type: application/json

{
  "disciplineId": "discipline_uuid",
  "topicId": "topic_uuid"
}
```

### 4. Получить недавнюю активность
```
GET http://localhost:3000/view-history/recent?limit=10
```

**Ответ:**
```json
[
  {
    "ViewHistoryID": "uuid",
    "ViewType": "topic",
    "ViewedAt": "2024-01-15T10:30:00Z",
    "discipline": {
      "DisciplineID": "uuid",
      "DisciplineName": "Математика"
    },
    "topic": {
      "TopicID": "uuid", 
      "TopicName": "Алгебра"
    }
  }
]
```

## Интеграция на фронтенде

### 1. Настройка axios/fetch

```javascript
// Настройка axios с автоматическим обновлением токенов
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // ОБЯЗАТЕЛЬНО для cookies
});

// Интерцептор для автоматического обновления токенов
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Получаем refresh token из cookies (автоматически)
        const response = await axios.post('http://localhost:3000/auth/refresh', {}, { 
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
```

### 2. Обработка логина

```javascript
const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    // Сохраняем информацию о пользователе
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### 3. Обработка логаута

```javascript
const logout = async () => {
  try {
    await api.post('/auth/logout', {});
    
    // Очищаем локальное хранилище
    localStorage.removeItem('user');
    
    // Перенаправляем на страницу логина
    window.location.href = '/login';
  } catch (error) {
    console.error('Ошибка при логауте:', error);
  }
};
```

### 4. Проверка аутентификации

```javascript
const checkAuth = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data.valid;
  } catch (error) {
    return false;
  }
};
```

### 5. Отслеживание активности (НЕДАВНЯЯ АКТИВНОСТЬ)

```javascript
// При переходе на страницу темы
const recordTopicView = async (topicId, disciplineId) => {
  try {
    await api.post(`/view-history/topic/${topicId}`, {
      disciplineId: disciplineId
    });
  } catch (error) {
    console.error('Ошибка при записи просмотра темы:', error);
  }
};

// При переходе на страницу дисциплины
const recordDisciplineView = async (disciplineId) => {
  try {
    await api.post(`/view-history/discipline/${disciplineId}`);
  } catch (error) {
    console.error('Ошибка при записи просмотра дисциплины:', error);
  }
};

// Получение недавней активности
const getRecentActivity = async (limit = 10) => {
  try {
    const response = await api.get(`/view-history/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении активности:', error);
    return [];
  }
};
```

## Пример использования на фронтенде

### React компонент для отслеживания активности

```jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TopicPage = () => {
  const { topicId, disciplineId } = useParams();

  useEffect(() => {
    // Записываем просмотр при загрузке страницы
    if (topicId && disciplineId) {
      recordTopicView(topicId, disciplineId);
    }
  }, [topicId, disciplineId]);

  return (
    <div>
      {/* Содержимое страницы темы */}
    </div>
  );
};
```

### Компонент недавней активности

```jsx
import { useState, useEffect } from 'react';

const RecentActivity = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const data = await getRecentActivity(5);
        setActivity(data);
      } catch (error) {
        console.error('Ошибка загрузки активности:', error);
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="recent-activity">
      <h3>Недавняя активность</h3>
      {activity.length === 0 ? (
        <p>Нет недавней активности</p>
      ) : (
        <ul>
          {activity.map((item) => (
            <li key={item.ViewHistoryID}>
              <span>{item.ViewType === 'topic' ? 'Тема' : 'Дисциплина'}: </span>
              <span>{item.topic?.TopicName || item.discipline?.DisciplineName}</span>
              <span className="time">
                {new Date(item.ViewedAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Автоматическое обновление токенов

Система автоматически обновляет access token при истечении срока действия:

1. При получении 401 ошибки, фронтенд автоматически отправляет refresh token
2. Сервер проверяет refresh token и выдает новый access token
3. Новый access token автоматически устанавливается в cookies
4. Оригинальный запрос повторяется с новым токеном

## Безопасность

- Токены хранятся в httpOnly cookies для защиты от XSS атак
- Refresh token имеет ограниченный срок действия (72 часа)
- При логауте refresh token отзывается в базе данных
- Автоматическая очистка истекших токенов

## Очистка токенов

Для очистки истекших токенов запустите:
```bash
npm run cleanup:tokens
```

## Обработка ошибок

- **401 Unauthorized**: Токен истек или недействителен
- **403 Forbidden**: Недостаточно прав
- **Session expired**: Refresh token истек, требуется повторный логин

## Ключевые исправления

1. **Cookies теперь правильно устанавливаются** при логине/регистрации
2. **Токены сохраняются при обновлении страницы** благодаря httpOnly cookies
3. **Автоматическое отслеживание активности** при переходе на страницы
4. **Middleware для чтения токенов из cookies** и установки в headers
5. **Улучшенная обработка view history** с обновлением времени просмотра

## Рекомендации

1. Настройте автоматический запуск скрипта очистки токенов через cron
2. Используйте HTTPS в продакшене
3. Настройте rate limiting для auth endpoints
4. Логируйте попытки неавторизованного доступа
5. Добавьте отслеживание активности на все важные страницы
