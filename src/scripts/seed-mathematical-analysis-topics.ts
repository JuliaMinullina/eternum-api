import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Математический анализ" из базы данных
const MATHEMATICAL_ANALYSIS_DISCIPLINE_ID = 'b0c9d8e7-3f6b-5462-5d7b-7e8f9a0b1c2d';

const mathematicalAnalysisTopicsData = [
  {
    TopicID: '4a4096ac-bac1-4051-97ab-76aae884eb05',
    TopicName: 'Множества натуральных, целых, рациональных, вещественных и комплексных чисел (ℕ, ℤ, ℚ, ℝ, ℂ)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8bc32f70-6caf-4cb2-b1a0-f3db54aeb17b',
    TopicName: 'Потенциальная и актуальная бесконечность. Супремум и инфимум множества',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a5de4f28-e5eb-49cb-99b4-fa50d03711c5',
    TopicName: 'Понятие функции, область определения и область значений, график функции',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c97d8d7b-f49b-4396-825c-d6efe1e32318',
    TopicName: 'Композиция функций и обратная функция',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7c5b5733-7afc-43d1-8962-005abfad4ade',
    TopicName: 'Числовые последовательности и предел последовательности',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c709a4cf-1cfd-45af-91e5-29273d5e0ea6',
    TopicName: 'Единственность предела и основные свойства пределов последовательностей',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '73bf5007-f9db-45c8-bc0b-9fbffd48cb0a',
    TopicName: 'Пределы типа 0/0, ∞/∞. Бесконечно малые и бесконечно большие последовательности',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6278a283-676a-4554-82c7-2710a53f9f28',
    TopicName: 'Критерий Коши сходимости последовательностей',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bb3e4e1b-a28b-44ae-95e7-4cffa8ff3773',
    TopicName: 'Предел функции в точке (определения по Коши и по Гейне)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '22d48dd0-96ba-4e09-94bc-948b228742be',
    TopicName: 'Односторонние пределы и бесконечные пределы функции',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8bbeb5f4-30bb-4a62-9215-b718fc2a5c75',
    TopicName: 'Арифметические свойства пределов. Теоремы о пределах функций',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7e2cc13a-3558-42ad-8334-d9ea53a31834',
    TopicName: 'Непрерывность функции в точке',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f92fd83c-ac0e-45c1-bfc4-791b5f305c86',
    TopicName: 'Непрерывность функции на отрезке и интервале',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '80455f3d-2654-4a87-ad81-7b7826579505',
    TopicName: 'Точки разрыва первого и второго рода. Классификация разрывов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c842a336-1c22-4f6e-888c-695e333ef554',
    TopicName: 'Теорема Больцано–Коши о нуле непрерывной функции',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9d7e7d16-c3a6-4e58-b3ca-761db3a55941',
    TopicName: 'Теорема Вейерштрасса о достижении предела на отрезке',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7e1e6a4c-ed2e-4f92-a7b7-3711709ac3e3',
    TopicName: 'Теорема Кантора об равномерной непрерывности на отрезке',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5a932fca-f7bb-4fbc-a05e-c1c0ba5c1a49',
    TopicName: 'Определение производной. Геометрический и физический смысл производной',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7137363a-ea9e-4ae6-96d1-98181f63bbe4',
    TopicName: 'Таблица производных элементарных функций',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '98bc4863-4361-4476-ba3e-2ddc15f1b030',
    TopicName: 'Правила дифференцирования: сумма, произведение, частное, сложная функция',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0eba3307-8191-44f4-ad90-ba980a7d42fe',
    TopicName: 'Производные высших порядков и их интерпретация',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0a05cabe-f150-41b0-9bc3-5508e3e56e4d',
    TopicName: 'Дифференциал функции. Связь дифференцируемости и непрерывности',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3c89d8ad-3e2d-4745-93c0-df04a343bbe2',
    TopicName: 'Производная обратной функции',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '181c0460-87d6-474b-a788-cee07cba3879',
    TopicName: 'Производная неявно заданной функции',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c6c8ad33-c318-4807-9385-dfe888932721',
    TopicName: 'Теоремы Ролля, Лагранжа и Коши',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ce79d7ec-ef60-41c3-9247-4f9a59394437',
    TopicName: 'Возрастание и убывание функции. Связь со знаком производной',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '09ecad32-d95d-4325-9849-b510c94f2921',
    TopicName: 'Выпуклость и вогнутость графика функции. Точки перегиба',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a10b6749-e7d8-4327-834e-4bc980c30a03',
    TopicName: 'Локальные и глобальные экстремумы функции одной переменной. Необходимые условия',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd058e5f2-74c3-4b40-a347-b688cbc1c022',
    TopicName: 'Достаточные условия экстремума (вторая производная и др.)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8a93eb31-147b-4a35-b0c0-d5aa5044f8a0',
    TopicName: 'Наибольшее и наименьшее значения функции на отрезке',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9593007f-eac1-42b0-bae7-04914a0e7fb1',
    TopicName: 'Асимптоты графика функции: вертикальные, горизонтальные, наклонные',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'beeeb8e2-d76a-491a-90e0-cc2358d88de3',
    TopicName: 'Исследование функции по производным и построение её графика',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5c61dfe1-8e0c-4e3f-822d-2be52f50374f',
    TopicName: 'Формула Тейлора с остаточным членом',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dec9fdc7-eed5-4570-bd69-d2781c651870',
    TopicName: 'Формула Маклорена с остаточным членом',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4b2a3377-cd59-4e5a-a95c-3c6247116261',
    TopicName: 'Степенные ряды: определение, радиус и интервал сходимости',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd03dd504-3600-4de9-8077-7a83993b5916',
    TopicName: 'Стандартные разложения элементарных функций в ряды',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ad2995b8-a448-4527-a1d1-64f0357ceb18',
    TopicName: 'Приближение функций полиномами Тейлора',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '86599194-f3c1-43b9-b0e3-2525067bb881',
    TopicName: 'Оценка погрешности при приближении функцией многочлена',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e838db52-d2d7-4c54-9d30-ea8b61ff8bb6',
    TopicName: 'Первообразная и неопределённый интеграл',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0a550cb6-2a5a-4317-afc6-f4f3ea8ccb3d',
    TopicName: 'Основные свойства неопределённого интеграла',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f76165f5-9549-42f3-8362-1b30ad5a75a8',
    TopicName: 'Таблица неопределённых интегралов элементарных функций',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '684ef4a1-1363-4b80-8977-3106e489b63b',
    TopicName: 'Интегрирование подстановкой',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3e896082-56e4-4cf0-bf4c-dca01ee91ffe',
    TopicName: 'Интегрирование по частям',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dea2c993-c70e-40a3-9ec7-1e8d835a3dcb',
    TopicName: 'Простейшие рациональные интегралы',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '87507da1-6927-422a-94e1-0093d60f134f',
    TopicName: 'Простейшие иррациональные интегралы',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ef482ab6-4a87-4731-90e5-5e2be1fd47c3',
    TopicName: 'Простейшие тригонометрические интегралы',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e9018b81-1565-4955-b3e6-f5e7ff0a9c44',
    TopicName: 'Интеграл Римана и интегрируемость функции на отрезке',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'eb5f0d7c-6023-41eb-8b61-cfc26f497029',
    TopicName: 'Основные свойства определённого интеграла',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6b5883ba-2a0d-4871-a8e1-f458be6a7638',
    TopicName: 'Основная теорема анализа (связь определённого интеграла и производной)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '632826c9-be0d-4604-9b89-cb052ce6e7c4',
    TopicName: 'Непосредственное вычисление определённых интегралов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '902e6f23-9f61-47eb-a606-13d67159014d',
    TopicName: 'Подстановка в определённом интеграле',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fb4216ab-7bc9-4137-8d29-cf3c83d3c151',
    TopicName: 'Интегрирование по частям для определённого интеграла',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a1910839-f527-44f9-8205-e2bd85e9240f',
    TopicName: 'Площадь плоской фигуры под графиком функции',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a23ae0f1-4413-4eb6-b620-b8e50d7f9a3a',
    TopicName: 'Длина дуги плоской кривой',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9a4648dd-b432-416e-8fcb-c238175dbd88',
    TopicName: 'Площадь поверхности вращения (базовый уровень)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'caebdf89-0062-4963-b47e-bdd238577473',
    TopicName: 'Объём тела вращения методом дисков и колец',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '677c48f1-1767-4687-a8f2-70012304d28e',
    TopicName: 'Объём тела вращения методом цилиндрических слоёв',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '23c087d2-7d78-4894-b719-99be82d8b8eb',
    TopicName: 'Среднее значение функции на отрезке',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ea2d04d6-587b-438f-8b9e-316bb9abcfa5',
    TopicName: 'Несобственные интегралы первого рода',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'eaa24873-3af1-42c7-9212-cfe138e4b7b7',
    TopicName: 'Несобственные интегралы второго рода',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'cbba052a-bc77-4ee2-9194-6b69bc97d858',
    TopicName: 'Признаки сходимости несобственных интегралов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '25c39364-dc2f-481b-b9c8-2914f6fb5549',
    TopicName: 'Сравнение несобственных интегралов с эталонными',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '241c74b3-0892-442a-a357-8ff9eb7b67db',
    TopicName: 'Простейшие физические и геометрические приложения несобственных интегралов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f0141db0-a591-4902-bbba-13811fc881c2',
    TopicName: 'Определение числового ряда и частичных сумм. Сходимость и расходимость ряда',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '208181ab-b169-4264-a65c-2a1aab77c930',
    TopicName: 'Необходимый признак сходимости числовых рядов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '25742514-7d57-4f8f-95b3-2fa59b5c9443',
    TopicName: 'Признак сравнения для знакопостоянных рядов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9ac569c3-c755-4659-90e2-59d665b5ee08',
    TopicName: 'Признак Даламбера и признак Коши для рядов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f1b82ef4-f8f8-45e3-b503-c29d15a06eb5',
    TopicName: 'Интегральный признак сходимости рядов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3596a5ab-edea-4d23-90f9-070ff945a193',
    TopicName: 'Знакопостоянные и знакопеременные ряды',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '725f31ef-7748-4f92-a185-637fee2e3605',
    TopicName: 'Признак Лейбница для знакопеременных рядов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0b6b5d41-43f5-4d70-bd34-d2b4be597f74',
    TopicName: 'Абсолютная и условная сходимость рядов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0386750d-18c5-476a-bd20-f09337286784',
    TopicName: 'Равномерная сходимость функциональных рядов',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0d1e352f-752f-4cb1-87d3-1b711af4ec7f',
    TopicName: 'Критерий Коши равномерной сходимости',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '00b7b810-dded-4b1c-abb3-6f0f8b54f367',
    TopicName: 'Поточечная и равномерная сходимость: сравнение и примеры',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a1a2fe87-244f-4ade-a810-1c7497d43a7b',
    TopicName: 'Перестановка предела и интеграла при равномерной сходимости',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '948645b7-f4b0-4627-917b-e484115f1d5e',
    TopicName: 'Перестановка предела и производной при равномерной сходимости',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '67f5b3fd-3701-418a-9120-63383725213f',
    TopicName: 'Степенные ряды: определение и базовые свойства',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7130b8b7-ce76-4781-8913-4bc917f33d97',
    TopicName: 'Радиус сходимости степенного ряда (формулы Коши и Даламбера)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '92237169-9114-434f-8fbb-b3232434fee2',
    TopicName: 'Ряд Тейлора как частный случай степенного ряда',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7464f3c5-f233-4a92-ba56-7307aa4eb212',
    TopicName: 'Метрическое пространство: определение и примеры',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '05d34267-2714-4c32-98b8-139bea8bb652',
    TopicName: 'Открытые и замкнутые шары, окрестности в метрическом пространстве',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'bd592eb5-0a70-433b-922c-3562351d3e3d',
    TopicName: 'Сходимость последовательностей в метрическом пространстве',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '20d7ae77-c43f-4655-8f6d-bdf8f32a3b3a',
    TopicName: 'Полнота и полные метрические пространства',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '00284aeb-13d4-4dc7-8fc6-595fe4dd78ae',
    TopicName: 'Пример полного метрического пространства: ℝⁿ',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '011c0e2b-8c56-43c9-994b-556b2942ba1b',
    TopicName: 'Непрерывность отображений в терминах ε–δ',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a4d334cb-3a26-430f-b004-f612f2262165',
    TopicName: 'Непрерывность в терминах открытых множеств',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8fbadce7-d0fc-4dd6-bbf0-1fa824e79a5b',
    TopicName: 'Функции нескольких переменных: область определения и множество значений',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '95ee4221-43c0-48e6-bb56-49fbd449bc9a',
    TopicName: 'Уровневые линии и поверхностии функций нескольких переменных',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd554e281-8555-4c88-bab3-d4d63e5f7af6',
    TopicName: 'Предел функции нескольких переменных',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '03872b76-e79a-4d93-bd80-33934831b5fb',
    TopicName: 'Непрерывность функции нескольких переменных',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0c5dca26-25fb-4685-8ef5-46be1623c21a',
    TopicName: 'Частные производные первого порядка',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'eddb6cca-83dc-4c1d-8c0e-51e81e1140cd',
    TopicName: 'Дифференцируемость функции нескольких переменных в точке',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'aaafcf97-ef04-4404-ad9d-5ce153b30767',
    TopicName: 'Градиент и направление наибольшего роста функции',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b54da5a1-fb22-45e9-91e5-6e7a3cb43b9b',
    TopicName: 'Дифференциал первого порядка функции нескольких переменных',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'dc0f557d-ab46-40da-b798-226c4b00955c',
    TopicName: 'Необходимые условия экстремума функции нескольких переменных (градиент = 0)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5371b9bd-82b7-4ced-9b4e-202683e275d3',
    TopicName: 'Матрица Гессе и квадратичная форма второго дифференциала',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c3cb3837-1bc2-4bc2-8efb-f68359356024',
    TopicName: 'Достаточные условия локального экстремума по знаку квадратичной формы',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f0c8f5a6-0409-4ea0-b781-bc9d03d2a30c',
    TopicName: 'Условный экстремум функции нескольких переменных',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4f5f7e69-781d-4045-802c-9f1a2802d74d',
    TopicName: 'Метод множителей Лагранжа (базовый курс)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e537cc5a-87c0-4b42-92dd-190c85d05dc6',
    TopicName: 'Двойной интеграл: определение и геометрический смысл',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2a9f8a60-c137-4ff2-9b69-bad2cea95121',
    TopicName: 'Тройной интеграл: определение и геометрический смысл',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9b03a4b1-cc30-4fc0-8fb5-af6d8c6f30e3',
    TopicName: 'Вычисление двойных и тройных интегралов как повторных',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0c152510-91ef-4cbc-ab02-53420d6ea16b',
    TopicName: 'Переход к полярным координатам в двойном интеграле',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e3afb513-5479-43f9-a26a-9da5d7fb73bd',
    TopicName: 'Переход к цилиндрическим координатам в тройном интеграле (на базовом уровне)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8deee439-ad9d-4464-a72f-a2cab68309f8',
    TopicName: 'Криволинейный интеграл первого рода (по дуге)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '4977297c-7346-46a5-9481-ea7b5aaa0087',
    TopicName: 'Базовые представления о поверхностном интеграле',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '76f09ba8-5651-41bf-a800-54ce2c8eb0a9',
    TopicName: 'Векторные поля: определение и примеры',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '850467c5-7ca3-4c00-b930-2f3c02d0fcc2',
    TopicName: 'Ротор и дивергенция векторного поля (введение)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '349f5fa7-9d9c-496c-b6bc-ae4d7ec28be8',
    TopicName: 'Теорема Грина (формулировка, без детальных доказательств)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '390d6d9a-f380-47fd-aa28-ca315735e371',
    TopicName: 'Теорема Гаусса–Остроградского (формулировка, без детальных доказательств)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'db89925a-f73f-49eb-9bb6-06436e3a6d86',
    TopicName: 'Теорема Стокса (формулировка, без детальных доказательств)',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f42b6642-5a0d-4a85-b97e-0466f6f9a7b9',
    TopicName: 'Понятие дифференциального уравнения',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8b9f985b-dc1f-4683-b153-5aabeea9db9c',
    TopicName: 'Решение дифференциального уравнения: общее и частное решение',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '53fc471e-8bb5-4009-bf6c-1925f20afce6',
    TopicName: 'Дифференциальные уравнения с разделяющимися переменными',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'abb7289e-b93c-47f1-b18b-14e674902d14',
    TopicName: 'Линейное дифференциальное уравнение первого порядка',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '099d87d2-35e5-40f2-9dcb-d5deeab3655e',
    TopicName: 'Простейшие модели экспоненциального роста',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f6a7c733-5fa7-4975-bc29-3641e6a358aa',
    TopicName: 'Простейшие модели экспоненциального затухания и релаксации',
    DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по математическому анализу...');

    // Проверяем, есть ли уже темы по математическому анализу в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по математическому анализу. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: MATHEMATICAL_ANALYSIS_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = mathematicalAnalysisTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по математическому анализу (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по математическому анализу
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по математическому анализу:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по математическому анализу завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Математический анализ" (${MATHEMATICAL_ANALYSIS_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по математическому анализу:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

