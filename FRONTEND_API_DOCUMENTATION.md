# 📚 API Документация для Фронтенда

## 🌱 Мета-теги (Meta Tags)

### Получить все мета-теги
```http
GET /meta-tags
```

**Ответ:**
```json
{
  "success": true,
  "message": "Meta tags retrieved successfully",
  "data": [
    {
      "MetaTagCode": "MATH_STATS",
      "MetaTagName": "Математика и статистика",
      "CreatedAt": "2025-08-16T19:20:51.000Z",
      "UpdatedAt": "2025-08-16T19:20:51.000Z"
    },
    {
      "MetaTagCode": "CS_AI",
      "MetaTagName": "Компьютерные науки и ИИ",
      "CreatedAt": "2025-08-16T19:20:51.000Z",
      "UpdatedAt": "2025-08-16T19:20:51.000Z"
    }
  ],
  "timestamp": "2025-08-16T19:25:00.000Z"
}
```

### Получить конкретный мета-тег
```http
GET /meta-tags/:code
```

**Пример:**
```http
GET /meta-tags/NATURAL_SCIENCES
```

## 📖 Дисциплины (Disciplines)

### Получить все дисциплины
```http
GET /disciplines
```

### Получить все дисциплины с мета-тегами
```http
GET /disciplines/with-meta-tags
```

**Ответ:**
```json
{
  "success": true,
  "message": "Disciplines with meta tags retrieved successfully",
  "data": [
    {
      "DisciplineID": "uuid-here",
      "DisciplineName": "Биология",
      "CreatedAt": "2025-08-16T19:20:51.000Z",
      "UpdatedAt": "2025-08-16T19:20:51.000Z",
      "disciplineMetaTags": [
        {
          "DisciplineID": "uuid-here",
          "MetaTagCode": "NATURAL_SCIENCES",
          "CreatedAt": "2025-08-16T19:20:51.000Z",
          "metaTag": {
            "MetaTagCode": "NATURAL_SCIENCES",
            "MetaTagName": "Естественные науки"
          }
        }
      ]
    }
  ],
  "timestamp": "2025-08-16T19:25:00.000Z"
}
```

### Получить дисциплины по мета-тегу
```http
GET /disciplines/by-meta-tag/:metaTagCode
```

**Пример:**
```http
GET /disciplines/by-meta-tag/NATURAL_SCIENCES
```

### Получить конкретную дисциплину
```http
GET /disciplines/:id
```

## 🏷️ Доступные мета-теги

| Код | Название |
|-----|----------|
| `MATH_STATS` | Математика и статистика |
| `CS_AI` | Компьютерные науки и ИИ |
| `ENGINEERING_TECH` | Инженерия и технологии |
| `NATURAL_SCIENCES` | Естественные науки |
| `EARTH_SPACE_ENV` | Науки о Земле и космосе |
| `SOCIAL_SCIENCES` | Социальные науки |
| `HUMANITIES` | Гуманитарные науки |
| `LANGUAGES` | Языки |
| `LITERATURE` | Литература |
| `ARTS` | Искусство |
| `HEALTH_SAFETY_PE` | Здоровье, физкультура и безопасность |

## 🎯 Примеры использования на фронтенде

### JavaScript/TypeScript

```javascript
// Получить все мета-теги
const getMetaTags = async () => {
  const response = await fetch('/meta-tags');
  const data = await response.json();
  return data.data;
};

// Получить дисциплины по мета-тегу
const getDisciplinesByMetaTag = async (metaTagCode) => {
  const response = await fetch(`/disciplines/by-meta-tag/${metaTagCode}`);
  const data = await response.json();
  return data.data;
};

// Получить все дисциплины с мета-тегами
const getDisciplinesWithMetaTags = async () => {
  const response = await fetch('/disciplines/with-meta-tags');
  const data = await response.json();
  return data.data;
};
```

### React Hook

```javascript
import { useState, useEffect } from 'react';

const useMetaTags = () => {
  const [metaTags, setMetaTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetaTags = async () => {
      try {
        const response = await fetch('/meta-tags');
        const data = await response.json();
        setMetaTags(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetaTags();
  }, []);

  return { metaTags, loading, error };
};
```

### Vue.js Composition API

```javascript
import { ref, onMounted } from 'vue';

export function useMetaTags() {
  const metaTags = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchMetaTags = async () => {
    try {
      const response = await fetch('/meta-tags');
      const data = await response.json();
      metaTags.value = data.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchMetaTags);

  return { metaTags, loading, error };
}
```

## 🎨 UI Компоненты

### Фильтр по мета-тегам
```javascript
const MetaTagFilter = ({ onFilterChange }) => {
  const { metaTags, loading } = useMetaTags();

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="meta-tag-filter">
      <h3>Фильтр по категориям</h3>
      <div className="filter-buttons">
        {metaTags.map(tag => (
          <button
            key={tag.MetaTagCode}
            onClick={() => onFilterChange(tag.MetaTagCode)}
            className="filter-button"
          >
            {tag.MetaTagName}
          </button>
        ))}
      </div>
    </div>
  );
};
```

### Список дисциплин с мета-тегами
```javascript
const DisciplineList = ({ metaTagFilter }) => {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisciplines = async () => {
      setLoading(true);
      try {
        const url = metaTagFilter 
          ? `/disciplines/by-meta-tag/${metaTagFilter}`
          : '/disciplines/with-meta-tags';
        const response = await fetch(url);
        const data = await response.json();
        setDisciplines(data.data);
      } catch (error) {
        console.error('Error fetching disciplines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplines();
  }, [metaTagFilter]);

  if (loading) return <div>Загрузка дисциплин...</div>;

  return (
    <div className="discipline-list">
      {disciplines.map(discipline => (
        <div key={discipline.DisciplineID} className="discipline-card">
          <h3>{discipline.DisciplineName}</h3>
          <div className="meta-tags">
            {discipline.disciplineMetaTags?.map(dmt => (
              <span key={dmt.MetaTagCode} className="meta-tag">
                {dmt.metaTag.MetaTagName}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
```

## 🔧 Обработка ошибок

Все API endpoints возвращают стандартную структуру ответа:

```json
{
  "success": true/false,
  "message": "Описание результата",
  "data": {...},
  "timestamp": "2025-08-16T19:25:00.000Z"
}
```

В случае ошибки:
```json
{
  "success": false,
  "message": "Описание ошибки",
  "timestamp": "2025-08-16T19:25:00.000Z"
}
```

## 🚀 Готовые компоненты

В файле `test-meta-tags.html` есть готовый пример интерфейса для тестирования API мета-тегов. Вы можете использовать его как основу для разработки фронтенда.
