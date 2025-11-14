import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from '../modules/topic/topic.entity';

// ID дисциплины "Иностранный язык — Испанский" из базы данных
const SPANISH_DISCIPLINE_ID = 'd6a16086-e9c7-4636-aa76-d5eb7e516242';

const spanishTopicsData = [
  {
    TopicID: 'd3ad514b-1476-4627-a7ff-728524f3877d',
    TopicName: 'Испанский алфавит, буквы и сочетания, reading rules (c/qu, g/gu, ll, ñ, rr и т.д.)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '59d96c47-c9ed-472a-acf8-b8d232c23242',
    TopicName: 'Ударение, диакритические знаки, правила постановки ударения и переносов',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3cbbe5e2-477e-49d9-a773-59b62a810493',
    TopicName: 'Базовая орфография и пунктуация, заглавные/строчные, вопросительные/восклицательные знаки (¿ ? ¡ !)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fcd469b3-bad0-4ade-9684-15e3c9a925dd',
    TopicName: 'Звуки испанского языка, различия с русским (r/rr, b/v, мягкость/твёрдость и т.д.)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8fa5a125-8557-4aa9-982c-13fa9bdf9631',
    TopicName: 'Базовая интонация в утвердительных, вопросительных и восклицательных предложениях',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '55c26c7e-8761-49e1-a190-56afc2bb9efa',
    TopicName: 'Личная информация: имя, возраст, страна, город, национальность, язык, контакты',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6ae0e6ff-50de-4f71-8f13-e12a87541452',
    TopicName: 'Семья и родственники, отношения в семье, семейные роли',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6b1d3ca1-b656-41af-9324-58239a57309a',
    TopicName: 'Друзья и одноклассники, внешность и характер человека',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f9bb9c81-a128-41ba-b824-13e0424f2ed0',
    TopicName: 'Дом и квартира: комнаты, мебель, бытовые предметы, домашние обязанности',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1fa72304-a3d4-48f6-9f37-1ae777ef3f4c',
    TopicName: 'Школа: предметы, расписание, оценки, школьная жизнь и правила',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7a24b75e-0542-43eb-a53a-22c2f580f51d',
    TopicName: 'Распорядок дня: утро, день, вечер, будни и выходные',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd0e67c75-9166-4106-b088-8cfe38534cfe',
    TopicName: 'Хобби, увлечения, спорт, музыка, интернет, соцсети',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '390c2686-7131-4058-9bf8-c40c598ee3a7',
    TopicName: 'Город: улицы, здания, магазины, транспорт, ориентирование',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '1aa17e45-baee-4f36-9026-21158b4f26b9',
    TopicName: 'Путешествия и туризм: страны, города, отели, экскурсии, аэропорт',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'df31efb7-722f-482d-b405-629af3958597',
    TopicName: 'Покупки: одежда, обувь, продукты, цены, размеры, цвета',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '33c34e50-526a-45ac-ab92-f1817bd7c088',
    TopicName: 'Еда и напитки: блюда испанской и латиноамериканской кухни, режим питания, кафе/ресторан',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c509ed64-15f3-4ee1-9038-5f13ae810406',
    TopicName: 'Погода и времена года, климат, любимое время года и занятия',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6b8f4345-786d-401f-b816-d9f55013b1f3',
    TopicName: 'Здоровье и самочувствие: базовые симптомы, поход к врачу, «я заболел/простыл»',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7b82467e-56b6-4744-bee6-b8c293989c8c',
    TopicName: 'Внешность, одежда и стиль, самопрезентация',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9bd8ce29-2ccd-4a7c-8810-b30f1e4c582f',
    TopicName: 'Праздники и традиции Испании и стран Латинской Америки (Navidad, Año Nuevo, Semana Santa, Día de los Muertos и др.)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'd469e757-8427-4d3f-989a-833d260491f3',
    TopicName: 'Жизнь подростков в испаноязычных странах, сравнение с Россией',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '247335fb-c353-431a-901f-70b370ecfc69',
    TopicName: 'Личные местоимения (yo, tú, él/ella, nosotros, vosotros, ellos)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '31ab7913-1151-4abe-887c-d143ea2f556f',
    TopicName: 'Определённый и неопределённый артикли (el, la, los, las, un, una, unos, unas)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fb94c521-2946-4cb6-b406-ed0c9fe8778e',
    TopicName: 'Род и число существительных, образование множественного числа',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8e230ad5-7c4d-45bd-a2b1-06f1ac188152',
    TopicName: 'Притяжательные прилагательные (mi, tu, su, nuestro, vuestro и др.)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '733c4c0d-e203-4990-8208-8f4c298d2834',
    TopicName: 'Указательные местоимения и прилагательные (este, ese, aquel и др.)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '30547cbd-3eb8-4c30-a849-065a44ab9e33',
    TopicName: 'Прилагательные, их род и число, порядок в предложении',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '50f0791f-417b-4c25-ad88-fa56b625ad04',
    TopicName: 'Степени сравнения прилагательных (más… que, menos… que, tan… como; el más / el menos)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'f0de667d-1519-4e2f-91ad-1f8bb0406d8b',
    TopicName: 'Настоящее время (Presente de Indicativo) правильных и основных неправильных глаголов',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'b93f9cc5-271a-4568-b637-f840f2bba24d',
    TopicName: 'Глаголы ser, estar и haber: различия употребления',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5b43004b-5895-4b85-a111-1814d95fbea1',
    TopicName: 'Модальные глаголы poder, querer, tener que, deber и др.',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'e081d452-2509-48bb-b050-acb5e9e89123',
    TopicName: 'Будущее как план и намерение: ir a + infinitivo',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '59f5867c-955d-4271-b860-1c2363d68d86',
    TopicName: 'Простое будущее время (Futuro simple) — базовые формы и употребление',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ea27ac5e-af90-4b8a-b166-19a6588be56e',
    TopicName: 'Прошедшие времена: Pretérito indefinido (завершённое действие в прошлом)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8c6c33a7-53ff-4137-8eac-1cad13f58bdc',
    TopicName: 'Pretérito imperfecto (описание прошлого, привычные действия)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '93c1e336-49d6-4f76-ae89-cb713105c087',
    TopicName: 'Противопоставление indefinido / imperfecto на простых примерах',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6625b289-71c6-4da0-87bd-f7579970ac03',
    TopicName: 'Pretérito perfecto (недавнее прошлое, связь с настоящим)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0d1eeb58-c2c0-46ae-b68b-d008edd2da59',
    TopicName: 'Простые конструкции с герундием (estar + gerundio, действие в процессе)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '176ceb07-ad89-4618-8ea4-0c09b66d034f',
    TopicName: 'Личные местоимения в функции прямого и косвенного дополнения (lo, la, le, los, las и др.)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'ef57fb98-a3e6-43d4-90d4-107f25204a45',
    TopicName: 'Местоимения с предлогами (conmigo, contigo и т.п.)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2d145b6f-33ee-45eb-a937-dc9e03be7bf4',
    TopicName: 'Основные предлоги места и времени (en, a, de, por, para, con и др.)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8366a727-ac35-4ee7-a5cc-21262b5ba01b',
    TopicName: 'Базовое знакомство с Subjuntivo (желания, сомнения, эмоции) — на уровне клише и типичных конструкций',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '07823040-4426-445d-81c7-96c509ad9009',
    TopicName: 'Указание времени и даты: часы, дни недели, месяцы, календарные выражения',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '8f888767-9e8c-4c55-8f39-249a22dd16b1',
    TopicName: 'Простые диалоги-знакомства: представить себя, спросить имя, происхождение, профессию/учёбу',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '483cf3e4-d48a-4adc-896e-bdfea002ec4b',
    TopicName: 'Диалоги в типичных ситуациях: в школе, в магазине, в кафе, в транспорте, в путешествии',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c002204d-e1bd-4120-abe5-379664304218',
    TopicName: 'Выражение просьбы, согласия, несогласия, мнения, предпочтений',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '7f072891-e3b7-4f8b-9222-485002dc0d1c',
    TopicName: 'Краткие устные монологи: рассказ о себе, семье, школе, городе, хобби, планах на каникулы',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a80438c4-e34c-4ed8-ba5f-e39298f10432',
    TopicName: 'Чтение коротких и адаптированных текстов: диалоги, объявления, письма, рассказы, статьи для подростков',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '9ed746b3-277e-412d-bda4-b30aca7bf80a',
    TopicName: 'Поиск основной идеи и нужной информации в тексте (кто? где? когда? почему?)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'efe5b4ac-512e-434d-8b67-05c85f4de735',
    TopicName: 'Описание людей, мест и ситуаций по картинкам и жизненным ситуациям',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '2d8bb270-cd32-4b52-abb7-7a3b5a9063cd',
    TopicName: 'Списывание слов и предложений, орфографический навык письма',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '6758d38f-8705-48af-9934-1d153028ed0b',
    TopicName: 'Короткие записки, открытки, поздравления, чат-сообщения',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '3d4a6ebd-56cc-464a-b3ad-9aa2615f8077',
    TopicName: 'Личное письмо/электронное письмо другу (структура, формулы вежливости)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'fa97622b-e878-4b40-b2e7-a5f28d0548e0',
    TopicName: 'Краткий рассказ о прошедшем событии (поездка, праздник, школьное мероприятие)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'a10e8b13-e40e-4c21-ab32-053c505a08a9',
    TopicName: 'Простые тексты-мнения: что нравится/не нравится, аргументы «за» и «против» в 3–5 фразах',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '0f2950a7-8c91-40c1-90e7-ca22b63995f9',
    TopicName: 'Сравнение культур: испаноязычный мир и Россия (вежливость, дистанция, обращение на «ты/вы», расписание дня, еда, праздники)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '5ab21e67-e852-4265-a4a7-37bc8de496f6',
    TopicName: 'Основы работы с словарём и онлайн-ресурсами: поиск слова, форм, выражений',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: 'c91899ea-958e-4ef7-a2c9-a25382fbe2c9',
    TopicName: 'Основы набора испанского текста на компьютере и телефоне (раскладка, диакритика, спецсимволы)',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
  {
    TopicID: '067bf23e-b30e-454e-adba-fe7d72207aac',
    TopicName: 'Учебные мини-проекты: постер о празднике, «визитка» на испанском, мини-презентация о своём городе/школе/кухне',
    DisciplineID: SPANISH_DISCIPLINE_ID,
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z'),
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const topicRepository = app.get(getRepositoryToken(Topic));

    console.log('📚 Начинаю заполнение тем по испанскому языку...');

    // Проверяем, есть ли уже темы по испанскому языку в базе
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: SPANISH_DISCIPLINE_ID },
    });

    if (existingTopics.length > 0) {
      console.log(
        `⚠️  В базе уже есть ${existingTopics.length} тем по испанскому языку. Удаляю их перед добавлением новых...`,
      );
      await topicRepository.delete({ DisciplineID: SPANISH_DISCIPLINE_ID });
    }

    // Находим максимальный ID среди всех тем
    const allTopics = await topicRepository.find({
      order: { ID: 'DESC' },
      take: 1,
    });
    const maxId = allTopics.length > 0 && allTopics[0].ID ? allTopics[0].ID : 0;
    let nextId = maxId + 1;

    // Присваиваем ID для новых тем
    const topicsWithIds = spanishTopicsData.map((topic) => ({
      ...topic,
      ID: nextId++,
    }));

    console.log(`📝 Добавляю ${topicsWithIds.length} тем по испанскому языку (ID начиная с ${maxId + 1}):`);
    topicsWithIds.forEach((t, index) => {
      console.log(`   ${index + 1}. ${t.TopicName} (ID: ${t.ID})`);
    });

    // Создаем темы по испанскому языку
    const createdTopics = await topicRepository.save(topicsWithIds);

    console.log(`\n✅ Успешно создано ${createdTopics.length} новых тем по испанскому языку:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName}`);
    });

    console.log('\n🎉 Заполнение тем по испанскому языку завершено успешно!');
    console.log(`📈 Всего создано тем: ${createdTopics.length}`);
    console.log(
      `🔗 Привязано к дисциплине: "Иностранный язык — Испанский" (${SPANISH_DISCIPLINE_ID})`,
    );
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по испанскому языку:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

