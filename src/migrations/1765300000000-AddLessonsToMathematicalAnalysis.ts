import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Миграция для добавления уроков ко всем темам дисциплины "Математический анализ"
 * 
 * Для каждой темы создается детальный план уроков, покрывающий весь материал темы.
 */

export class AddLessonsToMathematicalAnalysis1765300000000
  implements MigrationInterface
{
  name = 'AddLessonsToMathematicalAnalysis1765300000000';

  /**
   * Экранирует строку для SQL
   */
  private escapeString(str: string): string {
    return `'${str.replace(/'/g, "''")}'`;
  }

  /**
   * Получает план уроков для темы математического анализа на основе её названия
   */
  private getLessonPlanForTopic(topicName: string): {
    count: number;
    names: string[];
  } {
    const lowerTopicName = topicName.toLowerCase();
    const shortName = topicName.length > 50 ? topicName.substring(0, 47) + '...' : topicName;

    // Базовые темы (множества, функции)
    if (lowerTopicName.includes('множества') || lowerTopicName.includes('натуральных') || lowerTopicName.includes('целых') || lowerTopicName.includes('рациональных') || lowerTopicName.includes('вещественных') || lowerTopicName.includes('комплексных')) {
      return {
        count: 6,
        names: [
          'Множества чисел: натуральные, целые, рациональные',
          'Вещественные числа и их свойства',
          'Комплексные числа: основные понятия',
          'Операции над числами',
          'Сравнение и упорядочение',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('бесконечность') || lowerTopicName.includes('супремум') || lowerTopicName.includes('инфимум')) {
      return {
        count: 6,
        names: [
          'Потенциальная и актуальная бесконечность',
          'Понятие супремума',
          'Понятие инфимума',
          'Свойства супремума и инфимума',
          'Примеры и задачи',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('понятие функции') || lowerTopicName.includes('область определения') || lowerTopicName.includes('график функции')) {
      return {
        count: 6,
        names: [
          'Понятие функции',
          'Область определения функции',
          'Область значений функции',
          'График функции',
          'Способы задания функции',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('композиция') || lowerTopicName.includes('обратная функция')) {
      return {
        count: 6,
        names: [
          'Композиция функций',
          'Свойства композиции',
          'Обратная функция: определение',
          'Условия существования обратной функции',
          'График обратной функции',
          'Примеры и задачи',
        ],
      };
    }

    // Последовательности и пределы
    if (lowerTopicName.includes('последовательности') || lowerTopicName.includes('предел последовательности')) {
      return {
        count: 7,
        names: [
          'Числовые последовательности',
          'Предел последовательности: определение',
          'Единственность предела',
          'Основные свойства пределов',
          'Вычисление пределов',
          'Примеры и задачи',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('бесконечно малые') || lowerTopicName.includes('бесконечно большие') || lowerTopicName.includes('0/0') || lowerTopicName.includes('∞/∞')) {
      return {
        count: 7,
        names: [
          'Бесконечно малые последовательности',
          'Бесконечно большие последовательности',
          'Неопределенности типа 0/0',
          'Неопределенности типа ∞/∞',
          'Сравнение бесконечно малых',
          'Эквивалентные последовательности',
          'Примеры и задачи',
        ],
      };
    }

    if (lowerTopicName.includes('критерий коши') || lowerTopicName.includes('сходимость последовательностей')) {
      return {
        count: 6,
        names: [
          'Критерий Коши: формулировка',
          'Доказательство критерия Коши',
          'Применение критерия Коши',
          'Примеры сходящихся последовательностей',
          'Примеры расходящихся последовательностей',
          'Итоговое закрепление',
        ],
      };
    }

    // Пределы функций
    if (lowerTopicName.includes('предел функции') || lowerTopicName.includes('коши') || lowerTopicName.includes('гейне')) {
      return {
        count: 7,
        names: [
          'Предел функции: определение по Коши',
          'Предел функции: определение по Гейне',
          'Эквивалентность определений',
          'Односторонние пределы',
          'Бесконечные пределы',
          'Примеры вычисления пределов',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('арифметические свойства') || lowerTopicName.includes('теоремы о пределах')) {
      return {
        count: 6,
        names: [
          'Арифметические свойства пределов',
          'Теорема о пределе суммы',
          'Теорема о пределе произведения',
          'Теорема о пределе частного',
          'Предел сложной функции',
          'Примеры и задачи',
        ],
      };
    }

    // Непрерывность
    if (lowerTopicName.includes('непрерывность') && !lowerTopicName.includes('равномерная')) {
      return {
        count: 6,
        names: [
          'Непрерывность функции в точке',
          'Непрерывность на отрезке',
          'Непрерывность на интервале',
          'Точки разрыва',
          'Классификация разрывов',
          'Примеры и задачи',
        ],
      };
    }

    if (lowerTopicName.includes('разрыв') || lowerTopicName.includes('первого рода') || lowerTopicName.includes('второго рода')) {
      return {
        count: 6,
        names: [
          'Точки разрыва: определение',
          'Разрывы первого рода',
          'Разрывы второго рода',
          'Устранимые разрывы',
          'Классификация разрывов',
          'Примеры и задачи',
        ],
      };
    }

    if (lowerTopicName.includes('больцано') || lowerTopicName.includes('вейерштрасс') || lowerTopicName.includes('кантор')) {
      return {
        count: 6,
        names: [
          'Теорема Больцано-Коши',
          'Теорема Вейерштрасса',
          'Теорема Кантора',
          'Применение теорем',
          'Примеры и задачи',
          'Итоговое закрепление',
        ],
      };
    }

    // Производные
    if (lowerTopicName.includes('производная') && !lowerTopicName.includes('высших порядков') && !lowerTopicName.includes('обратной')) {
      return {
        count: 7,
        names: [
          'Определение производной',
          'Геометрический смысл производной',
          'Физический смысл производной',
          'Производная как предел',
          'Таблица производных',
          'Примеры вычисления',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('таблица производных') || lowerTopicName.includes('элементарных функций')) {
      return {
        count: 6,
        names: [
          'Производные элементарных функций',
          'Производная степенной функции',
          'Производная показательной функции',
          'Производная логарифмической функции',
          'Производные тригонометрических функций',
          'Производные обратных тригонометрических функций',
        ],
      };
    }

    if (lowerTopicName.includes('правила дифференцирования') || lowerTopicName.includes('сумма') || lowerTopicName.includes('произведение') || lowerTopicName.includes('частное') || lowerTopicName.includes('сложная функция')) {
      return {
        count: 7,
        names: [
          'Производная суммы и разности',
          'Производная произведения',
          'Производная частного',
          'Производная сложной функции',
          'Цепное правило',
          'Примеры и задачи',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('высших порядков')) {
      return {
        count: 6,
        names: [
          'Производные высших порядков',
          'Вторая производная',
          'Третья и n-я производные',
          'Интерпретация производных высших порядков',
          'Примеры вычисления',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('дифференциал') && !lowerTopicName.includes('нескольких переменных')) {
      return {
        count: 6,
        names: [
          'Понятие дифференциала',
          'Связь дифференциала и производной',
          'Дифференцируемость и непрерывность',
          'Геометрический смысл дифференциала',
          'Применение дифференциала',
          'Примеры и задачи',
        ],
      };
    }

    if (lowerTopicName.includes('производная обратной') || lowerTopicName.includes('неявно заданной')) {
      return {
        count: 6,
        names: [
          'Производная обратной функции',
          'Теорема о производной обратной функции',
          'Производная неявной функции',
          'Дифференцирование неявных функций',
          'Примеры и задачи',
          'Итоговое закрепление',
        ],
      };
    }

    // Теоремы о производных
    if (lowerTopicName.includes('ролля') || lowerTopicName.includes('лагранжа') || lowerTopicName.includes('коши')) {
      return {
        count: 7,
        names: [
          'Теорема Ролля',
          'Теорема Лагранжа',
          'Теорема Коши',
          'Доказательства теорем',
          'Применение теорем',
          'Примеры и задачи',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('возрастание') || lowerTopicName.includes('убывание') || lowerTopicName.includes('знак производной')) {
      return {
        count: 6,
        names: [
          'Возрастание и убывание функции',
          'Связь со знаком производной',
          'Критические точки',
          'Монотонность функции',
          'Примеры исследования',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('выпуклость') || lowerTopicName.includes('вогнутость') || lowerTopicName.includes('перегиба')) {
      return {
        count: 6,
        names: [
          'Выпуклость и вогнутость',
          'Точки перегиба',
          'Критерии выпуклости',
          'Вторая производная и выпуклость',
          'Примеры исследования',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('экстремумы') || lowerTopicName.includes('локальные') || lowerTopicName.includes('глобальные')) {
      return {
        count: 7,
        names: [
          'Локальные экстремумы',
          'Глобальные экстремумы',
          'Необходимые условия экстремума',
          'Критические точки',
          'Достаточные условия',
          'Примеры нахождения экстремумов',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('наибольшее') || lowerTopicName.includes('наименьшее') || lowerTopicName.includes('на отрезке')) {
      return {
        count: 6,
        names: [
          'Наибольшее и наименьшее значение',
          'Методы нахождения',
          'Критические точки на отрезке',
          'Граничные точки',
          'Примеры решения задач',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('асимптоты')) {
      return {
        count: 7,
        names: [
          'Понятие асимптоты',
          'Вертикальные асимптоты',
          'Горизонтальные асимптоты',
          'Наклонные асимптоты',
          'Методы нахождения асимптот',
          'Примеры построения графиков',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('исследование функции') || lowerTopicName.includes('построение графика')) {
      return {
        count: 8,
        names: [
          'Схема исследования функции',
          'Область определения и значения',
          'Четность и нечетность',
          'Периодичность',
          'Асимптоты и точки разрыва',
          'Монотонность и экстремумы',
          'Выпуклость и точки перегиба',
          'Построение графика',
        ],
      };
    }

    // Ряды Тейлора
    if (lowerTopicName.includes('тейлора') || lowerTopicName.includes('маклорена')) {
      return {
        count: 7,
        names: [
          'Формула Тейлора',
          'Остаточный член',
          'Формула Маклорена',
          'Разложения элементарных функций',
          'Применение формул',
          'Оценка погрешности',
          'Примеры и задачи',
        ],
      };
    }

    if (lowerTopicName.includes('степенные ряды') || lowerTopicName.includes('радиус сходимости') || lowerTopicName.includes('интервал сходимости')) {
      return {
        count: 7,
        names: [
          'Степенные ряды: определение',
          'Радиус сходимости',
          'Интервал сходимости',
          'Формулы Коши и Даламбера',
          'Стандартные разложения',
          'Применение степенных рядов',
          'Примеры и задачи',
        ],
      };
    }

    if (lowerTopicName.includes('приближение') || lowerTopicName.includes('полиномами') || lowerTopicName.includes('погрешность')) {
      return {
        count: 6,
        names: [
          'Приближение функций полиномами',
          'Полиномы Тейлора',
          'Оценка погрешности',
          'Остаточный член',
          'Примеры приближений',
          'Итоговое закрепление',
        ],
      };
    }

    // Интегралы
    if (lowerTopicName.includes('первообразная') || lowerTopicName.includes('неопределённый интеграл')) {
      return {
        count: 6,
        names: [
          'Первообразная функции',
          'Неопределенный интеграл',
          'Связь с производной',
          'Основные свойства',
          'Таблица интегралов',
          'Примеры вычисления',
        ],
      };
    }

    if (lowerTopicName.includes('таблица неопределённых') || lowerTopicName.includes('интегралов элементарных')) {
      return {
        count: 6,
        names: [
          'Таблица интегралов',
          'Интегралы от степенных функций',
          'Интегралы от показательных функций',
          'Интегралы от тригонометрических функций',
          'Интегралы от обратных тригонометрических',
          'Примеры применения',
        ],
      };
    }

    if (lowerTopicName.includes('интегрирование подстановкой') || lowerTopicName.includes('замена переменной')) {
      return {
        count: 7,
        names: [
          'Метод подстановки',
          'Замена переменной',
          'Линейная замена',
          'Тригонометрическая замена',
          'Примеры применения',
          'Сложные случаи',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('интегрирование по частям')) {
      return {
        count: 7,
        names: [
          'Формула интегрирования по частям',
          'Выбор u и dv',
          'Повторное интегрирование по частям',
          'Интегралы от произведений',
          'Примеры вычисления',
          'Сложные случаи',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('рациональные интегралы') || lowerTopicName.includes('иррациональные интегралы') || lowerTopicName.includes('тригонометрические интегралы')) {
      return {
        count: 6,
        names: [
          'Простейшие рациональные интегралы',
          'Простейшие иррациональные интегралы',
          'Простейшие тригонометрические интегралы',
          'Методы вычисления',
          'Примеры и задачи',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('римана') || lowerTopicName.includes('определённый интеграл') || lowerTopicName.includes('интегрируемость')) {
      return {
        count: 7,
        names: [
          'Интеграл Римана',
          'Определение определенного интеграла',
          'Интегрируемость функции',
          'Критерии интегрируемости',
          'Свойства определенного интеграла',
          'Примеры вычисления',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('основная теорема анализа') || lowerTopicName.includes('ньютона-лейбница')) {
      return {
        count: 6,
        names: [
          'Основная теорема анализа',
          'Формула Ньютона-Лейбница',
          'Связь определенного и неопределенного интеграла',
          'Применение теоремы',
          'Примеры вычисления',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('подстановка в определённом') || lowerTopicName.includes('интегрирование по частям для определённого')) {
      return {
        count: 6,
        names: [
          'Подстановка в определенном интеграле',
          'Интегрирование по частям',
          'Изменение пределов интегрирования',
          'Примеры вычисления',
          'Сложные случаи',
          'Итоговое закрепление',
        ],
      };
    }

    // Приложения интегралов
    if (lowerTopicName.includes('площадь') || lowerTopicName.includes('длина дуги') || lowerTopicName.includes('объём') || lowerTopicName.includes('поверхность вращения')) {
      return {
        count: 7,
        names: [
          'Площадь плоской фигуры',
          'Длина дуги кривой',
          'Площадь поверхности вращения',
          'Объем тела вращения',
          'Метод дисков и колец',
          'Метод цилиндрических слоев',
          'Примеры вычисления',
        ],
      };
    }

    if (lowerTopicName.includes('среднее значение')) {
      return {
        count: 5,
        names: [
          'Среднее значение функции',
          'Теорема о среднем',
          'Применение теоремы',
          'Примеры вычисления',
          'Итоговое закрепление',
        ],
      };
    }

    // Несобственные интегралы
    if (lowerTopicName.includes('несобственные интегралы')) {
      return {
        count: 7,
        names: [
          'Несобственные интегралы: определение',
          'Несобственные интегралы первого рода',
          'Несобственные интегралы второго рода',
          'Признаки сходимости',
          'Сравнение с эталонными',
          'Приложения',
          'Примеры вычисления',
        ],
      };
    }

    // Числовые ряды
    if (lowerTopicName.includes('числовой ряд') || lowerTopicName.includes('сходимость') || lowerTopicName.includes('расходимость')) {
      return {
        count: 6,
        names: [
          'Числовые ряды: определение',
          'Частичные суммы',
          'Сходимость и расходимость',
          'Необходимый признак сходимости',
          'Примеры исследования',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('признак сравнения') || lowerTopicName.includes('даламбера') || lowerTopicName.includes('коши для рядов') || lowerTopicName.includes('интегральный признак')) {
      return {
        count: 7,
        names: [
          'Признак сравнения',
          'Признак Даламбера',
          'Признак Коши',
          'Интегральный признак',
          'Применение признаков',
          'Примеры исследования',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('знакопеременные') || lowerTopicName.includes('лейбница') || lowerTopicName.includes('абсолютная сходимость')) {
      return {
        count: 6,
        names: [
          'Знакопеременные ряды',
          'Признак Лейбница',
          'Абсолютная сходимость',
          'Условная сходимость',
          'Примеры исследования',
          'Итоговое закрепление',
        ],
      };
    }

    // Функциональные ряды
    if (lowerTopicName.includes('равномерная сходимость') || lowerTopicName.includes('функциональных рядов')) {
      return {
        count: 7,
        names: [
          'Функциональные ряды',
          'Равномерная сходимость',
          'Критерий Коши',
          'Поточечная сходимость',
          'Перестановка предела и интеграла',
          'Перестановка предела и производной',
          'Примеры и задачи',
        ],
      };
    }

    // Функции нескольких переменных
    if (lowerTopicName.includes('нескольких переменных') || lowerTopicName.includes('область определения') && lowerTopicName.includes('множество значений')) {
      return {
        count: 6,
        names: [
          'Функции нескольких переменных',
          'Область определения',
          'Множество значений',
          'Уровневые линии и поверхности',
          'Графики функций',
          'Примеры и задачи',
        ],
      };
    }

    if (lowerTopicName.includes('предел функции нескольких') || lowerTopicName.includes('непрерывность функции нескольких')) {
      return {
        count: 6,
        names: [
          'Предел функции нескольких переменных',
          'Определение предела',
          'Непрерывность',
          'Свойства непрерывных функций',
          'Примеры вычисления',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('частные производные') || lowerTopicName.includes('дифференцируемость') && lowerTopicName.includes('нескольких переменных')) {
      return {
        count: 7,
        names: [
          'Частные производные',
          'Дифференцируемость',
          'Градиент функции',
          'Дифференциал первого порядка',
          'Направление наибольшего роста',
          'Примеры вычисления',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('экстремумы') && lowerTopicName.includes('нескольких переменных') || lowerTopicName.includes('гессе') || lowerTopicName.includes('лагранжа') && lowerTopicName.includes('множителей')) {
      return {
        count: 7,
        names: [
          'Экстремумы функций нескольких переменных',
          'Необходимые условия',
          'Матрица Гессе',
          'Достаточные условия',
          'Условный экстремум',
          'Метод множителей Лагранжа',
          'Примеры решения задач',
        ],
      };
    }

    // Кратные интегралы
    if (lowerTopicName.includes('двойной интеграл') || lowerTopicName.includes('тройной интеграл')) {
      return {
        count: 7,
        names: [
          'Двойной интеграл: определение',
          'Тройной интеграл: определение',
          'Геометрический смысл',
          'Вычисление как повторных',
          'Переход к полярным координатам',
          'Переход к цилиндрическим координатам',
          'Примеры вычисления',
        ],
      };
    }

    if (lowerTopicName.includes('криволинейный интеграл') || lowerTopicName.includes('поверхностный интеграл')) {
      return {
        count: 6,
        names: [
          'Криволинейный интеграл первого рода',
          'Поверхностный интеграл',
          'Вычисление криволинейных интегралов',
          'Применение интегралов',
          'Примеры вычисления',
          'Итоговое закрепление',
        ],
      };
    }

    // Векторные поля
    if (lowerTopicName.includes('векторные поля') || lowerTopicName.includes('ротор') || lowerTopicName.includes('дивергенция')) {
      return {
        count: 6,
        names: [
          'Векторные поля: определение',
          'Ротор векторного поля',
          'Дивергенция векторного поля',
          'Свойства ротора и дивергенции',
          'Примеры вычисления',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('грина') || lowerTopicName.includes('гаусса') || lowerTopicName.includes('стокса')) {
      return {
        count: 6,
        names: [
          'Теорема Грина',
          'Теорема Гаусса-Остроградского',
          'Теорема Стокса',
          'Формулировки теорем',
          'Применение теорем',
          'Примеры решения задач',
        ],
      };
    }

    // Дифференциальные уравнения
    if (lowerTopicName.includes('дифференциальное уравнение') || lowerTopicName.includes('общее решение') || lowerTopicName.includes('частное решение')) {
      return {
        count: 6,
        names: [
          'Понятие дифференциального уравнения',
          'Общее и частное решение',
          'Начальные условия',
          'Классификация уравнений',
          'Примеры решения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('разделяющимися переменными') || lowerTopicName.includes('линейное') && lowerTopicName.includes('первого порядка')) {
      return {
        count: 6,
        names: [
          'Уравнения с разделяющимися переменными',
          'Линейные уравнения первого порядка',
          'Методы решения',
          'Примеры решения',
          'Применение в задачах',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('экспоненциальный рост') || lowerTopicName.includes('экспоненциальное затухание') || lowerTopicName.includes('релаксации')) {
      return {
        count: 6,
        names: [
          'Модели экспоненциального роста',
          'Модели экспоненциального затухания',
          'Модели релаксации',
          'Применение в физике',
          'Примеры решения задач',
          'Итоговое закрепление',
        ],
      };
    }

    // Метрические пространства
    if (lowerTopicName.includes('метрическое пространство') || lowerTopicName.includes('полнота') || lowerTopicName.includes('открытые') || lowerTopicName.includes('замкнутые')) {
      return {
        count: 7,
        names: [
          'Метрическое пространство: определение',
          'Открытые и замкнутые множества',
          'Окрестности и шары',
          'Сходимость в метрическом пространстве',
          'Полнота пространства',
          'Примеры полных пространств',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('непрерывность отображений') || lowerTopicName.includes('ε–δ') || lowerTopicName.includes('открытых множеств')) {
      return {
        count: 6,
        names: [
          'Непрерывность отображений',
          'Определение через ε-δ',
          'Определение через открытые множества',
          'Свойства непрерывных отображений',
          'Примеры и задачи',
          'Итоговое закрепление',
        ],
      };
    }

    // Базовый план для остальных тем
    return {
      count: 6,
      names: [
        `Введение в тему: ${shortName}`,
        'Основные понятия и определения',
        'Теоремы и свойства',
        'Методы решения',
        'Примеры и задачи',
        'Итоговое закрепление материала',
      ],
    };
  }

  /**
   * Генерирует детерминированный UUID на основе TopicID и ID урока
   */
  private generateDeterministicUUID(topicId: string, lessonId: number): string {
    const seed = `${topicId}-${lessonId}`;
    let hash1 = 0, hash2 = 0, hash3 = 0, hash4 = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash1 = ((hash1 << 5) - hash1) + char;
      hash2 = ((hash2 << 7) - hash2) + char + i;
      hash3 = ((hash3 << 3) - hash3) + char * 3;
      hash4 = ((hash4 << 11) - hash4) + char * 7;
    }
    const h1 = Math.abs(hash1).toString(16).padStart(8, '0').substring(0, 8);
    const h2 = Math.abs(hash2).toString(16).padStart(4, '0').substring(0, 4);
    const h3 = Math.abs(hash3).toString(16).padStart(3, '0').substring(0, 3);
    const h4 = (Math.abs(hash1 + hash2) % 4);
    const variant = ['8', '9', 'a', 'b'][h4];
    const h5 = Math.abs(hash3 + hash4).toString(16).padStart(3, '0').substring(0, 3);
    const h6 = Math.abs(hash1 * hash2).toString(16).padStart(12, '0').substring(0, 12);
    return `${h1}-${h2}-4${h3}-${variant}${h5}-${h6}`;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      // ID дисциплины "Математический анализ"
      const MATHEMATICAL_ANALYSIS_DISCIPLINE_ID = 'b0c9d8e7-3f6b-5462-5d7b-7e8f9a0b1c2d';

      // Проверяем существование таблицы lessons
      const tableExists = await queryRunner.query(`
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'lessons'
      `);

      if (!(Array.isArray(tableExists) && tableExists.length > 0)) {
        throw new Error('Table lessons does not exist');
      }

      // Получаем все темы для дисциплины "Математический анализ"
      const topicsResult = await queryRunner.query(`
        SELECT "TopicID", "TopicName", "DisciplineID"
        FROM "topics"
        WHERE "DisciplineID" = '${MATHEMATICAL_ANALYSIS_DISCIPLINE_ID}'
        ORDER BY "ID"
      `);

      if (!Array.isArray(topicsResult) || topicsResult.length === 0) {
        // Если тем нет, просто выходим - это не ошибка
        return;
      }

      // Получаем максимальный ID уроков
      const maxIdResult = await queryRunner.query(`
        SELECT COALESCE(MAX("ID"), 0) as max_id FROM "lessons"
      `);
      const maxLessonId = parseInt(maxIdResult[0]?.max_id || '0', 10);
      let nextLessonId = maxLessonId + 1;

      // Получаем существующие уроки для этих тем, чтобы не создавать дубликаты
      const topicIds = topicsResult.map(t => t.TopicID);
      if (topicIds.length === 0) {
        return;
      }
      
      const topicIdsStr = topicIds.map(id => `'${id}'`).join(', ');
      const existingLessonsResult = await queryRunner.query(`
        SELECT "LessonID", "TopicID" FROM "lessons"
        WHERE "TopicID" IN (${topicIdsStr})
      `);

      const existingLessonIds = new Set(
        existingLessonsResult.map((l: any) => l.LessonID)
      );

      // Генерируем уроки для каждой темы
      const allLessons: Array<{
        LessonID: string;
        ID: number;
        LessonName: string;
        TopicID: string;
        IsVerified: boolean;
        Order: number;
        Description: string | null;
        CreatedAt: Date;
        UpdatedAt: Date;
      }> = [];

      for (const topic of topicsResult) {
        const lessonPlan = this.getLessonPlanForTopic(topic.TopicName);
        
        for (let i = 0; i < lessonPlan.count; i++) {
          const lessonId = nextLessonId++;
          const lessonUUID = this.generateDeterministicUUID(topic.TopicID, lessonId);
          
          // Пропускаем уроки, которые уже существуют
          if (existingLessonIds.has(lessonUUID)) {
            continue;
          }

          allLessons.push({
            LessonID: lessonUUID,
            ID: lessonId,
            LessonName: lessonPlan.names[i],
            TopicID: topic.TopicID,
            IsVerified: false,
            Order: i + 1,
            Description: `Урок по теме "${topic.TopicName}"`,
            CreatedAt: new Date('2025-08-16T12:00:00Z'),
            UpdatedAt: new Date('2025-08-16T12:00:00Z'),
          });
        }
      }

      if (allLessons.length === 0) {
        // Все уроки уже существуют
        return;
      }

      // Вставляем уроки батчами по 50 для эффективности
      const batchSize = 50;
      for (let i = 0; i < allLessons.length; i += batchSize) {
        const batch = allLessons.slice(i, i + batchSize);
        
        const values = batch
          .map((lesson) => {
            return `(
              '${lesson.LessonID}',
              ${lesson.ID},
              ${this.escapeString(lesson.LessonName)},
              '${lesson.TopicID}'::uuid,
              ${lesson.IsVerified},
              ${lesson.Order !== null ? lesson.Order : 'NULL'},
              ${lesson.Description ? this.escapeString(lesson.Description) : 'NULL'},
              '${lesson.CreatedAt.toISOString()}'::timestamp,
              '${lesson.UpdatedAt.toISOString()}'::timestamp
            )`;
          })
          .join(',');

        await queryRunner.query(`
          INSERT INTO "lessons" (
            "LessonID", "ID", "LessonName", "TopicID", 
            "IsVerified", "Order", "Description", 
            "CreatedAt", "UpdatedAt"
          )
          VALUES ${values}
          ON CONFLICT ("LessonID") DO NOTHING
        `);
      }
    } catch (error) {
      console.error('Error in AddLessonsToMathematicalAnalysis migration:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      // ID дисциплины "Математический анализ"
      const MATHEMATICAL_ANALYSIS_DISCIPLINE_ID = 'b0c9d8e7-3f6b-5462-5d7b-7e8f9a0b1c2d';

      // Удаляем уроки для тем дисциплины "Математический анализ"
      await queryRunner.query(`
        DELETE FROM "lessons"
        WHERE "TopicID" IN (
          SELECT "TopicID" FROM "topics"
          WHERE "DisciplineID" = '${MATHEMATICAL_ANALYSIS_DISCIPLINE_ID}'
        )
      `);
    } catch (error) {
      console.error('Error in AddLessonsToMathematicalAnalysis down migration:', error);
      throw error;
    }
  }
}

