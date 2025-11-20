import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Миграция для добавления уроков ко всем темам дисциплины "Иностранный язык — Испанский"
 * 
 * Для каждой темы создается детальный план уроков, покрывающий весь материал темы.
 */

export class AddLessonsToSpanish1765400000000
  implements MigrationInterface
{
  name = 'AddLessonsToSpanish1765400000000';

  /**
   * Экранирует строку для SQL
   */
  private escapeString(str: string): string {
    return `'${str.replace(/'/g, "''")}'`;
  }

  /**
   * Получает план уроков для темы испанского языка на основе её названия
   */
  private getLessonPlanForTopic(topicName: string): {
    count: number;
    names: string[];
  } {
    const lowerTopicName = topicName.toLowerCase();
    const shortName = topicName.length > 50 ? topicName.substring(0, 47) + '...' : topicName;

    // Алфавит и фонетика (базовые темы - 4-5 уроков)
    if (lowerTopicName.includes('алфавит') || lowerTopicName.includes('буквы') || lowerTopicName.includes('reading rules')) {
      return {
        count: 5,
        names: [
          'Испанский алфавит: буквы и звуки',
          'Особые сочетания: c/qu, g/gu',
          'Особые буквы: ll, ñ, rr',
          'Правила чтения',
          'Практика произношения',
        ],
      };
    }

    if (lowerTopicName.includes('ударение') || lowerTopicName.includes('диакритические') || lowerTopicName.includes('переносов')) {
      return {
        count: 5,
        names: [
          'Правила постановки ударения',
          'Диакритические знаки',
          'Перенос слов',
          'Практика применения правил',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('орфография') || lowerTopicName.includes('пунктуация') || lowerTopicName.includes('заглавные') || lowerTopicName.includes('вопросительные')) {
      return {
        count: 5,
        names: [
          'Базовая орфография',
          'Пунктуация в испанском',
          'Заглавные и строчные буквы',
          'Вопросительные и восклицательные знаки',
          'Практика письма',
        ],
      };
    }

    if (lowerTopicName.includes('звуки') || lowerTopicName.includes('различия с русским')) {
      return {
        count: 5,
        names: [
          'Звуки испанского языка',
          'Различия с русским: r/rr',
          'Различия с русским: b/v',
          'Мягкость и твёрдость',
          'Практика произношения',
        ],
      };
    }

    if (lowerTopicName.includes('интонация')) {
      return {
        count: 4,
        names: [
          'Интонация в утвердительных предложениях',
          'Интонация в вопросительных предложениях',
          'Интонация в восклицательных предложениях',
          'Практика интонации',
        ],
      };
    }

    // Лексические темы (4-6 уроков)
    if (lowerTopicName.includes('личная информация') || lowerTopicName.includes('имя') || lowerTopicName.includes('возраст') || lowerTopicName.includes('национальность')) {
      return {
        count: 5,
        names: [
          'Представление себя: имя и возраст',
          'Страна и город',
          'Национальность и язык',
          'Контактная информация',
          'Диалоги знакомства',
        ],
      };
    }

    if (lowerTopicName.includes('семья') || lowerTopicName.includes('родственники')) {
      return {
        count: 5,
        names: [
          'Члены семьи',
          'Родственники',
          'Отношения в семье',
          'Семейные роли',
          'Рассказ о семье',
        ],
      };
    }

    if (lowerTopicName.includes('друзья') || lowerTopicName.includes('внешность') || lowerTopicName.includes('характер')) {
      return {
        count: 5,
        names: [
          'Друзья и одноклассники',
          'Описание внешности',
          'Описание характера',
          'Сравнение людей',
          'Диалоги о друзьях',
        ],
      };
    }

    if (lowerTopicName.includes('дом') || lowerTopicName.includes('квартира') || lowerTopicName.includes('комнаты') || lowerTopicName.includes('мебель')) {
      return {
        count: 5,
        names: [
          'Дом и квартира',
          'Комнаты в доме',
          'Мебель и бытовые предметы',
          'Домашние обязанности',
          'Описание дома',
        ],
      };
    }

    if (lowerTopicName.includes('школа') || lowerTopicName.includes('предметы') || lowerTopicName.includes('расписание') || lowerTopicName.includes('оценки')) {
      return {
        count: 5,
        names: [
          'Школьные предметы',
          'Расписание уроков',
          'Оценки и успеваемость',
          'Школьная жизнь и правила',
          'Диалоги о школе',
        ],
      };
    }

    if (lowerTopicName.includes('распорядок дня') || lowerTopicName.includes('утро') || lowerTopicName.includes('день') || lowerTopicName.includes('вечер')) {
      return {
        count: 5,
        names: [
          'Распорядок дня: утро',
          'Распорядок дня: день и вечер',
          'Будни и выходные',
          'Временные выражения',
          'Рассказ о распорядке дня',
        ],
      };
    }

    if (lowerTopicName.includes('хобби') || lowerTopicName.includes('увлечения') || lowerTopicName.includes('спорт') || lowerTopicName.includes('музыка')) {
      return {
        count: 5,
        names: [
          'Хобби и увлечения',
          'Спорт',
          'Музыка',
          'Интернет и соцсети',
          'Рассказ о хобби',
        ],
      };
    }

    if (lowerTopicName.includes('город') || lowerTopicName.includes('улицы') || lowerTopicName.includes('магазины') || lowerTopicName.includes('транспорт')) {
      return {
        count: 5,
        names: [
          'Город: улицы и здания',
          'Магазины и торговые центры',
          'Транспорт',
          'Ориентирование в городе',
          'Диалоги в городе',
        ],
      };
    }

    if (lowerTopicName.includes('путешествия') || lowerTopicName.includes('туризм') || lowerTopicName.includes('отели') || lowerTopicName.includes('аэропорт')) {
      return {
        count: 5,
        names: [
          'Путешествия: страны и города',
          'Отели и размещение',
          'Экскурсии',
          'Аэропорт и транспорт',
          'Диалоги в путешествии',
        ],
      };
    }

    if (lowerTopicName.includes('покупки') || lowerTopicName.includes('одежда') || lowerTopicName.includes('обувь') || lowerTopicName.includes('продукты') || lowerTopicName.includes('цены')) {
      return {
        count: 5,
        names: [
          'Покупки: одежда и обувь',
          'Покупки: продукты',
          'Цены и размеры',
          'Цвета',
          'Диалоги в магазине',
        ],
      };
    }

    if (lowerTopicName.includes('еда') || lowerTopicName.includes('напитки') || lowerTopicName.includes('кухня') || lowerTopicName.includes('кафе') || lowerTopicName.includes('ресторан')) {
      return {
        count: 5,
        names: [
          'Еда и напитки',
          'Испанская кухня',
          'Латиноамериканская кухня',
          'Режим питания',
          'Диалоги в кафе и ресторане',
        ],
      };
    }

    if (lowerTopicName.includes('погода') || lowerTopicName.includes('времена года') || lowerTopicName.includes('климат')) {
      return {
        count: 4,
        names: [
          'Погода и времена года',
          'Климат',
          'Любимое время года',
          'Занятия по временам года',
        ],
      };
    }

    if (lowerTopicName.includes('здоровье') || lowerTopicName.includes('самочувствие') || lowerTopicName.includes('врач')) {
      return {
        count: 5,
        names: [
          'Здоровье и самочувствие',
          'Базовые симптомы',
          'Поход к врачу',
          'Выражение болезни',
          'Диалоги у врача',
        ],
      };
    }

    if (lowerTopicName.includes('внешность') || lowerTopicName.includes('одежда') || lowerTopicName.includes('стиль') || lowerTopicName.includes('самопрезентация')) {
      return {
        count: 5,
        names: [
          'Описание внешности',
          'Одежда и стиль',
          'Самопрезентация',
          'Мода и предпочтения',
          'Практика описания',
        ],
      };
    }

    if (lowerTopicName.includes('праздники') || lowerTopicName.includes('традиции') || lowerTopicName.includes('navidad') || lowerTopicName.includes('año nuevo')) {
      return {
        count: 6,
        names: [
          'Праздники Испании',
          'Праздники Латинской Америки',
          'Navidad и Año Nuevo',
          'Semana Santa и Día de los Muertos',
          'Традиции и обычаи',
          'Рассказ о праздниках',
        ],
      };
    }

    if (lowerTopicName.includes('жизнь подростков') || lowerTopicName.includes('сравнение')) {
      return {
        count: 5,
        names: [
          'Жизнь подростков в Испании',
          'Жизнь подростков в Латинской Америке',
          'Сравнение с Россией',
          'Культурные различия',
          'Обсуждение различий',
        ],
      };
    }

    // Грамматические темы (5-7 уроков)
    if (lowerTopicName.includes('личные местоимения') || lowerTopicName.includes('yo, tú, él')) {
      return {
        count: 6,
        names: [
          'Личные местоимения: yo, tú, él/ella',
          'Личные местоимения: nosotros, vosotros, ellos',
          'Употребление местоимений',
          'Порядок местоимений',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('артикли') || lowerTopicName.includes('el, la, los, las') || lowerTopicName.includes('un, una')) {
      return {
        count: 6,
        names: [
          'Определённый артикль: el, la, los, las',
          'Неопределённый артикль: un, una, unos, unas',
          'Употребление артиклей',
          'Отсутствие артикля',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('род и число') || lowerTopicName.includes('существительных') || lowerTopicName.includes('множественное число')) {
      return {
        count: 6,
        names: [
          'Род существительных',
          'Число существительных',
          'Образование множественного числа',
          'Исключения',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('притяжательные') || lowerTopicName.includes('mi, tu, su')) {
      return {
        count: 5,
        names: [
          'Притяжательные прилагательные: mi, tu, su',
          'Притяжательные прилагательные: nuestro, vuestro',
          'Употребление притяжательных',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('указательные') || lowerTopicName.includes('este, ese, aquel')) {
      return {
        count: 5,
        names: [
          'Указательные местоимения и прилагательные',
          'Este, ese, aquel',
          'Употребление указательных',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('прилагательные') && (lowerTopicName.includes('род') || lowerTopicName.includes('число') || lowerTopicName.includes('порядок'))) {
      return {
        count: 6,
        names: [
          'Прилагательные: род и число',
          'Согласование прилагательных',
          'Порядок прилагательных в предложении',
          'Особые случаи',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('степени сравнения') || lowerTopicName.includes('más') || lowerTopicName.includes('menos') || lowerTopicName.includes('tan')) {
      return {
        count: 6,
        names: [
          'Сравнительная степень: más... que, menos... que',
          'Равная степень: tan... como',
          'Превосходная степень: el más, el menos',
          'Неправильные формы',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    // Времена глаголов (6-7 уроков)
    if (lowerTopicName.includes('настоящее время') || lowerTopicName.includes('presente') || lowerTopicName.includes('indicativo')) {
      return {
        count: 7,
        names: [
          'Presente de Indicativo: правильные глаголы',
          'Presente de Indicativo: неправильные глаголы',
          'Глаголы с изменением корня',
          'Глаголы с особыми окончаниями',
          'Употребление настоящего времени',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('ser, estar') || lowerTopicName.includes('haber') || lowerTopicName.includes('различия употребления')) {
      return {
        count: 7,
        names: [
          'Глагол ser: употребление',
          'Глагол estar: употребление',
          'Глагол haber: употребление',
          'Различия ser и estar',
          'Различия ser/estar и haber',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('модальные глаголы') || lowerTopicName.includes('poder') || lowerTopicName.includes('querer') || lowerTopicName.includes('tener que') || lowerTopicName.includes('deber')) {
      return {
        count: 6,
        names: [
          'Модальные глаголы: poder, querer',
          'Модальные глаголы: tener que, deber',
          'Другие модальные глаголы',
          'Употребление модальных глаголов',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('будущее') && lowerTopicName.includes('ir a')) {
      return {
        count: 5,
        names: [
          'Конструкция ir a + infinitivo',
          'Будущее как план и намерение',
          'Употребление конструкции',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('futuro simple') || lowerTopicName.includes('простое будущее')) {
      return {
        count: 6,
        names: [
          'Futuro simple: образование',
          'Futuro simple: неправильные формы',
          'Употребление будущего времени',
          'Различия с ir a + infinitivo',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('pretérito indefinido') || lowerTopicName.includes('завершённое действие')) {
      return {
        count: 7,
        names: [
          'Pretérito indefinido: образование',
          'Правильные глаголы',
          'Неправильные глаголы',
          'Употребление indefinido',
          'Типичные ошибки',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('pretérito imperfecto') || lowerTopicName.includes('описание прошлого')) {
      return {
        count: 7,
        names: [
          'Pretérito imperfecto: образование',
          'Правильные глаголы',
          'Неправильные глаголы',
          'Употребление imperfecto',
          'Описание прошлого',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('противопоставление') || lowerTopicName.includes('indefinido / imperfecto')) {
      return {
        count: 6,
        names: [
          'Различия indefinido и imperfecto',
          'Когда использовать indefinido',
          'Когда использовать imperfecto',
          'Примеры противопоставления',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('pretérito perfecto') || lowerTopicName.includes('недавнее прошлое')) {
      return {
        count: 6,
        names: [
          'Pretérito perfecto: образование',
          'Употребление perfecto',
          'Недавнее прошлое',
          'Связь с настоящим',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('герундием') || lowerTopicName.includes('estar + gerundio')) {
      return {
        count: 5,
        names: [
          'Герундий: образование',
          'Конструкция estar + gerundio',
          'Действие в процессе',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('личные местоимения') && (lowerTopicName.includes('прямое') || lowerTopicName.includes('косвенное') || lowerTopicName.includes('lo, la, le'))) {
      return {
        count: 6,
        names: [
          'Прямое дополнение: lo, la, los, las',
          'Косвенное дополнение: le, les',
          'Употребление местоимений',
          'Порядок местоимений',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('местоимения с предлогами') || lowerTopicName.includes('conmigo') || lowerTopicName.includes('contigo')) {
      return {
        count: 5,
        names: [
          'Местоимения с предлогами: conmigo, contigo',
          'Другие местоимения с предлогами',
          'Употребление',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('предлоги') || lowerTopicName.includes('en, a, de') || lowerTopicName.includes('por, para')) {
      return {
        count: 6,
        names: [
          'Предлоги места: en, a, de',
          'Предлоги времени',
          'Предлоги por и para',
          'Другие предлоги: con',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('subjuntivo') || lowerTopicName.includes('желания') || lowerTopicName.includes('сомнения')) {
      return {
        count: 6,
        names: [
          'Введение в Subjuntivo',
          'Желания и эмоции',
          'Сомнения',
          'Типичные конструкции',
          'Практические упражнения',
          'Итоговое закрепление',
        ],
      };
    }

    // Коммуникативные навыки (4-6 уроков)
    if (lowerTopicName.includes('время и дата') || lowerTopicName.includes('часы') || lowerTopicName.includes('дни недели') || lowerTopicName.includes('месяцы')) {
      return {
        count: 5,
        names: [
          'Часы и время',
          'Дни недели',
          'Месяцы и даты',
          'Календарные выражения',
          'Практика выражения времени',
        ],
      };
    }

    if (lowerTopicName.includes('диалоги-знакомства') || lowerTopicName.includes('представить себя')) {
      return {
        count: 5,
        names: [
          'Представление себя',
          'Вопросы о имени и происхождении',
          'Вопросы о профессии и учёбе',
          'Типичные диалоги знакомства',
          'Практика диалогов',
        ],
      };
    }

    if (lowerTopicName.includes('диалоги в типичных ситуациях') || lowerTopicName.includes('в школе') || lowerTopicName.includes('в магазине') || lowerTopicName.includes('в кафе')) {
      return {
        count: 6,
        names: [
          'Диалоги в школе',
          'Диалоги в магазине',
          'Диалоги в кафе',
          'Диалоги в транспорте',
          'Диалоги в путешествии',
          'Практика диалогов',
        ],
      };
    }

    if (lowerTopicName.includes('выражение просьбы') || lowerTopicName.includes('согласия') || lowerTopicName.includes('несогласия') || lowerTopicName.includes('мнения')) {
      return {
        count: 5,
        names: [
          'Выражение просьбы',
          'Выражение согласия и несогласия',
          'Выражение мнения',
          'Выражение предпочтений',
          'Практика общения',
        ],
      };
    }

    if (lowerTopicName.includes('устные монологи') || lowerTopicName.includes('рассказ о себе')) {
      return {
        count: 6,
        names: [
          'Рассказ о себе',
          'Рассказ о семье',
          'Рассказ о школе',
          'Рассказ о городе',
          'Рассказ о хобби и планах',
          'Практика монологов',
        ],
      };
    }

    // Чтение и письмо (5-6 уроков)
    if (lowerTopicName.includes('чтение') || lowerTopicName.includes('текстов') || lowerTopicName.includes('диалоги') || lowerTopicName.includes('объявления')) {
      return {
        count: 6,
        names: [
          'Чтение диалогов',
          'Чтение объявлений',
          'Чтение писем',
          'Чтение рассказов',
          'Чтение статей',
          'Практика чтения',
        ],
      };
    }

    if (lowerTopicName.includes('поиск') || lowerTopicName.includes('основной идеи') || lowerTopicName.includes('нужной информации')) {
      return {
        count: 5,
        names: [
          'Поиск основной идеи текста',
          'Поиск информации: кто? где?',
          'Поиск информации: когда? почему?',
          'Работа с текстом',
          'Практика поиска информации',
        ],
      };
    }

    if (lowerTopicName.includes('описание') && (lowerTopicName.includes('людей') || lowerTopicName.includes('мест') || lowerTopicName.includes('ситуаций'))) {
      return {
        count: 5,
        names: [
          'Описание людей',
          'Описание мест',
          'Описание ситуаций',
          'Описание по картинкам',
          'Практика описания',
        ],
      };
    }

    if (lowerTopicName.includes('списывание') || lowerTopicName.includes('орфографический навык')) {
      return {
        count: 4,
        names: [
          'Списывание слов',
          'Списывание предложений',
          'Орфографический навык',
          'Практика письма',
        ],
      };
    }

    if (lowerTopicName.includes('записки') || lowerTopicName.includes('открытки') || lowerTopicName.includes('поздравления') || lowerTopicName.includes('чат-сообщения')) {
      return {
        count: 5,
        names: [
          'Короткие записки',
          'Открытки и поздравления',
          'Чат-сообщения',
          'Практика написания',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('личное письмо') || lowerTopicName.includes('электронное письмо')) {
      return {
        count: 6,
        names: [
          'Структура личного письма',
          'Формулы вежливости',
          'Написание письма другу',
          'Электронное письмо',
          'Практика написания',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('рассказ о прошедшем') || lowerTopicName.includes('поездка') || lowerTopicName.includes('праздник')) {
      return {
        count: 5,
        names: [
          'Рассказ о поездке',
          'Рассказ о празднике',
          'Рассказ о школьном мероприятии',
          'Практика написания',
          'Итоговое закрепление',
        ],
      };
    }

    if (lowerTopicName.includes('тексты-мнения') || lowerTopicName.includes('нравится') || lowerTopicName.includes('аргументы')) {
      return {
        count: 5,
        names: [
          'Выражение мнения',
          'Что нравится и не нравится',
          'Аргументы "за" и "против"',
          'Написание текста-мнения',
          'Практика написания',
        ],
      };
    }

    // Культурные темы (5-6 уроков)
    if (lowerTopicName.includes('сравнение культур') || lowerTopicName.includes('испаноязычный мир') || lowerTopicName.includes('россия')) {
      return {
        count: 6,
        names: [
          'Вежливость и дистанция',
          'Обращение на "ты/вы"',
          'Расписание дня',
          'Еда и кухня',
          'Праздники',
          'Сравнение культур',
        ],
      };
    }

    // Учебные навыки (4-5 уроков)
    if (lowerTopicName.includes('словарём') || lowerTopicName.includes('онлайн-ресурсами')) {
      return {
        count: 4,
        names: [
          'Работа со словарём',
          'Поиск слова и форм',
          'Онлайн-ресурсы',
          'Практика работы',
        ],
      };
    }

    if (lowerTopicName.includes('набор испанского текста') || lowerTopicName.includes('раскладка') || lowerTopicName.includes('диакритика')) {
      return {
        count: 4,
        names: [
          'Раскладка клавиатуры',
          'Диакритические знаки',
          'Спецсимволы',
          'Практика набора',
        ],
      };
    }

    if (lowerTopicName.includes('учебные мини-проекты') || lowerTopicName.includes('постер') || lowerTopicName.includes('презентация')) {
      return {
        count: 5,
        names: [
          'Постер о празднике',
          'Визитка на испанском',
          'Мини-презентация о городе',
          'Мини-презентация о школе и кухне',
          'Защита проектов',
        ],
      };
    }

    // Базовый план для остальных тем
    return {
      count: 5,
      names: [
        `Введение в тему: ${shortName}`,
        'Основная лексика и грамматика',
        'Практика и упражнения',
        'Применение в речи',
        'Итоговое закрепление',
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
    console.log('🇪🇸 Начинаю добавление уроков для дисциплины "Иностранный язык — Испанский"...');

    // Проверяем существование таблицы lessons
    const tableExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'lessons'
    `);

    if (!(Array.isArray(tableExists) && tableExists.length > 0)) {
      throw new Error('Table lessons does not exist');
    }

    // Проверяем существование колонок
    const isVerifiedExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons' 
      AND column_name = 'IsVerified'
    `);

    if (!(Array.isArray(isVerifiedExists) && isVerifiedExists.length > 0)) {
      throw new Error('Column IsVerified does not exist. Please run migration 1763600000000-AddFieldsToLessons first.');
    }

    // ID дисциплины "Иностранный язык — Испанский" (правильный ID из базы данных)
    const SPANISH_DISCIPLINE_ID = 'a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c';

    // Получаем максимальный ID уроков
    const maxIdResult = await queryRunner.query(`
      SELECT COALESCE(MAX("ID"), 0) as max_id FROM "lessons"
    `);
    const maxLessonId = parseInt(maxIdResult[0]?.max_id || '0', 10);
    let nextLessonId = maxLessonId + 1;

    // Получаем все темы для дисциплины "Иностранный язык — Испанский"
    const topicsResult = await queryRunner.query(`
      SELECT "TopicID", "TopicName", "DisciplineID"
      FROM "topics"
      WHERE "DisciplineID" = '${SPANISH_DISCIPLINE_ID}'
      ORDER BY "ID"
    `);

    if (!Array.isArray(topicsResult) || topicsResult.length === 0) {
      console.log('⚠️  Темы для дисциплины "Иностранный язык — Испанский" не найдены');
      return;
    }

    console.log(`📝 Найдено ${topicsResult.length} тем для обработки`);

    // Проверяем, есть ли уже уроки для этих тем
    const topicIds = topicsResult.map(t => t.TopicID);
    if (topicIds.length === 0) {
      console.log('⚠️  Темы не найдены');
      return;
    }
    
    const topicIdsStr = topicIds.map(id => `'${id}'`).join(', ');
    const existingLessons = await queryRunner.query(`
      SELECT COUNT(*) as count FROM "lessons"
      WHERE "TopicID" IN (${topicIdsStr})
    `);

    const existingCount = parseInt(existingLessons[0]?.count || '0', 10);
    if (existingCount > 0) {
      console.log(`⚠️  Для некоторых тем уже существуют ${existingCount} уроков. Пропускаем создание дубликатов (используется ON CONFLICT DO NOTHING).`);
    }

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
        allLessons.push({
          LessonID: this.generateDeterministicUUID(topic.TopicID, lessonId),
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

    console.log(`🇪🇸 Создано ${allLessons.length} уроков для ${topicsResult.length} тем`);

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

    console.log('✅ Уроки успешно добавлены!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('🔄 Откатываю добавление уроков...');

    // ID дисциплины "Иностранный язык — Испанский" (правильный ID из базы данных)
    const SPANISH_DISCIPLINE_ID = 'a3b2c1d0-6e9a-4795-8c0a-0d1e2f3a4b5c';

    // Удаляем уроки для тем дисциплины "Иностранный язык — Испанский"
    await queryRunner.query(`
      DELETE FROM "lessons"
      WHERE "TopicID" IN (
        SELECT "TopicID" FROM "topics"
        WHERE "DisciplineID" = '${SPANISH_DISCIPLINE_ID}'
      )
    `);

    console.log('✅ Откат завершен');
  }
}

