# API Documentation

## Базовый URL
```
http://localhost:3000/api
```

## CORS настроен для:
- `http://localhost:5174` (Vite dev server)
- `http://localhost:3000` (NestJS server)

---

## 🔐 Авторизация

### 1. **Регистрация**
**POST** `/api/auth/register`

**Тело запроса:**
```json
{
  "UserName": "Иван",
  "UserSurname": "Иванов",
  "Email": "ivan@example.com",
  "password": "password123"
}
```

**Ответ (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "UserID": 1,
      "UserName": "Иван",
      "UserSurname": "Иванов",
      "Email": "ivan@example.com",
      "Role": "user"
    }
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 2. **Вход в систему**
**POST** `/api/auth/login`

**Тело запроса:**
```json
{
  "email": "ivan@example.com",
  "password": "password123"
}
```

**Ответ (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "UserID": 1,
      "UserName": "Иван",
      "UserSurname": "Иванов",
      "Email": "ivan@example.com",
      "Role": "user"
    }
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 3. **Получение профиля**
**GET** `/api/auth/profile`

**Заголовки:**
```
Authorization: Bearer <access_token>
```

**Ответ (200 OK):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "UserID": 1,
      "UserName": "Иван",
      "UserSurname": "Иванов",
      "Email": "ivan@example.com",
      "Role": "user"
    }
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 4. **Проверка токена**
**GET** `/api/auth/verify`

**Заголовки:**
```
Authorization: Bearer <access_token>
```

**Ответ (200 OK):**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "user": {
      "UserID": 1,
      "UserName": "Иван",
      "UserSurname": "Иванов",
      "Email": "ivan@example.com",
      "Role": "user"
    }
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 5. **Обновление токена**
**POST** `/api/auth/refresh`

**Заголовки:**
```
Authorization: Bearer <access_token>
```

**Ответ (200 OK):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 6. **Выход из системы**
**POST** `/api/auth/logout`

**Заголовки:**
```
Authorization: Bearer <access_token>
```

**Ответ (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## 👥 Пользователи

### 1. **Получить всех пользователей**
**GET** `/api/users`

**Заголовки:**
```
Authorization: Bearer <access_token>
```

### 2. **Получить пользователя по ID**
**GET** `/api/users/:id`

**Заголовки:**
```
Authorization: Bearer <access_token>
```

### 3. **Обновить пользователя**
**PUT** `/api/users/:id`

**Заголовки:**
```
Authorization: Bearer <access_token>
```

### 4. **Удалить пользователя**
**DELETE** `/api/users/:id`

**Заголовки:**
```
Authorization: Bearer <access_token>
```

### 5. **Получить профиль текущего пользователя**
**GET** `/api/users/profile/me`

**Заголовки:**
```
Authorization: Bearer <access_token>
```

---

## 🏥 Проверка здоровья

### **Проверка статуса API**
**GET** `/api/health`

**Ответ (200 OK):**
```json
{
  "success": true,
  "message": "API is running",
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "version": "1.0.0"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## ❌ Обработка ошибок

### Стандартный формат ошибки:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"],
  "timestamp": "2024-01-01T12:00:00.000Z",
  "path": "/api/auth/login",
  "method": "POST"
}
```

### Коды ошибок:
- **400** - Bad Request (неверные данные)
- **401** - Unauthorized (неверные учетные данные)
- **403** - Forbidden (нет доступа)
- **404** - Not Found (ресурс не найден)
- **409** - Conflict (конфликт данных)
- **500** - Internal Server Error (ошибка сервера)

---

## 🔧 Для фронтенда

### Настройка axios:
```javascript
import axios from 'axios';

// Базовый URL
axios.defaults.baseURL = 'http://localhost:3000/api';

// Интерцептор для добавления токена
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки ответов
axios.interceptors.response.use(
  response => {
    // Возвращаем только data из успешного ответа
    return response.data;
  },
  error => {
    if (error.response?.status === 401) {
      // Перенаправление на страницу входа
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);
```

### Примеры использования:

```javascript
// Регистрация
const register = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);
    localStorage.setItem('access_token', response.data.access_token);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Вход
const login = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    localStorage.setItem('access_token', response.data.access_token);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Получение профиля
const getProfile = async () => {
  try {
    const response = await axios.get('/auth/profile');
    return response;
  } catch (error) {
    console.error('Profile error:', error);
    throw error;
  }
};

// Выход
const logout = async () => {
  try {
    await axios.post('/auth/logout');
    localStorage.removeItem('access_token');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
```

### Настройка fetch:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};
```
