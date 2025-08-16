import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Discipline } from '../modules/discipline/discipline.entity';
import { Topic } from '../modules/topic/topic.entity';

const russianTopicsData = [
  {
    TopicID: '2f01d826-2468-4fe6-8d76-1f669c9c9c1d',
    TopicName: 'Орфоэпические нормы и ударение',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2c9fd132-c981-44ac-9176-86ffaaf6ec01',
    TopicName: 'Фонетика и звуко-буквенный разбор',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a7634ca8-ae5e-40a8-b63c-5c229ab1608e',
    TopicName: 'Гласные безударные: проверка и непроверяемые',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '90f0be1d-3111-4aa6-81bd-749e7fd51cd3',
    TopicName: 'Согласные: парные по звонкости/глухости, удвоенные',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ddd13d3c-5c50-4dc2-a6aa-5349b45b816d',
    TopicName: 'Чередующиеся гласные в корнях (гар/гор, клан/клон и др.)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b6f2d122-0bfe-4f31-8e18-2c2fce5cd1f9',
    TopicName: 'Буквы О/Е после шипящих и Ц',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'cbb1a302-92f9-4547-9a93-5abb33a78fd9',
    TopicName: 'Мягкий и твёрдый знак: правила',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e0bb52c8-b610-4a99-b36b-3280d6c7117c',
    TopicName: 'Правописание приставок (з/с, пре-/при-, раз-/роз- и др.)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9a812d0b-e31a-4e29-baf4-9ce0e2e84c03',
    TopicName: 'Правописание суффиксов имён существительных (-ек-/-ик-, -ец-/-иц-)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4973baf9-4e42-430d-9830-c631adf2fad2',
    TopicName: 'Правописание суффиксов прилагательных (-к-/-ск-, -енн-/-ен-)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3c0b9ad0-67e2-4de8-8380-fdf7bb07b2b4',
    TopicName: 'Правописание суффиксов глаголов (тся/ться)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '2acca1d2-2af9-4ec5-9f7b-4201a283b61b',
    TopicName: 'Правописание суффиксов причастий (н/нн)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '74da7a38-5f4c-42ad-8af3-4f9ef79bab8f',
    TopicName: 'Правописание суффиксов наречий и служебных частей',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'c0ac7557-6722-4a7d-8a7d-5ef15ccf558e',
    TopicName: 'Слитное, дефисное и раздельное написание слов',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd2c1d2c6-2d0d-4e86-a1e3-1d3db1a4b4ff',
    TopicName: 'Правописание НЕ и НИ (в разных частях речи)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'cbaf0c0c-6e50-4159-8ab2-284ecbe0c221',
    TopicName: 'Лексикология: прямое и переносное значение',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8d0b4d30-f22e-4876-8f3e-1f05f1ec63a6',
    TopicName: 'Синонимы, антонимы, омонимы, паронимы',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9b463ceb-24b5-4c9b-9b68-719fe6fb87f4',
    TopicName: 'Фразеологизмы и устойчивые выражения',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '88d9bc71-17b1-47f1-b6fe-51a208c12c1b',
    TopicName: 'Морфемика и словообразование: корень, приставка, суффикс',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '205d85f0-88b5-4d54-9545-6bcf2d27f8f1',
    TopicName: 'Образование слов: способы и модели',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1f0c096b-6ec6-49c6-908d-8b3a0d7dfc10',
    TopicName: 'Части речи: обзор и признаки',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '71f0b0ee-efcf-4a71-8cf0-8b52155b8a82',
    TopicName: 'Имя существительное: род, число, падеж',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a60d0103-3a1a-4d6c-96a2-0d1bf5f0ea13',
    TopicName: 'Имя прилагательное: степени сравнения, краткая/полная форма',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f8b3c5aa-4408-4c68-a1c8-16ab3129fe5a',
    TopicName: 'Местоимение: разряды и правописание',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '5f1f3f01-4a86-4dfc-a4f9-8f93699bf0b4',
    TopicName: 'Числительное: разряды и склонение',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3bf76a4a-09e3-4bc8-a2ad-7ed3f7fa10b0',
    TopicName: 'Глагол: вид, время, наклонение, залог',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a9d7f0a2-1c5e-4b3e-9ec6-45b86b33ab61',
    TopicName: 'Причастие и причастный оборот',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a0bb15eb-9aea-4b6e-a8b8-38d7fcd81b4d',
    TopicName: 'Деепричастие и деепричастный оборот',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'edb0a6da-a1c0-43a6-85e2-814f4cc9244e',
    TopicName: 'Наречие и служебные части речи',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f2590e88-6f63-4f66-8a66-eae1ee76a55a',
    TopicName: 'Простое предложение: главные и второстепенные члены',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ccee2922-44dd-4c83-bfb4-e7f6e1f9a250',
    TopicName: 'Однородные члены, обобщающие слова, знаки препинания',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e5ff0d55-9fdb-4f11-a9c1-1b09c77e2315',
    TopicName: 'Обособленные определения и приложения',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '6c6c40dc-764a-4c90-bf1e-fb716542e4e3',
    TopicName: 'Обособленные обстоятельства, уточняющие члены',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '32b2d69e-2f5d-4dd6-bf0f-e4c512afa3ef',
    TopicName: 'Вводные слова и конструкции',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'd3a34fa4-1ca9-417a-8ff7-f391e3003083',
    TopicName: 'Обращения и междометия',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3eac230d-459d-4d7a-af56-8918961a7063',
    TopicName: 'Сложносочинённое предложение (ССП)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '86184988-f697-43d5-8171-ea9df23ebd96',
    TopicName: 'Сложноподчинённое предложение (СПП): виды придаточных',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0af8706b-5635-4c1a-bb48-3f86ac7cb7a2',
    TopicName: 'Бессоюзное сложное предложение (БСП)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a9cba984-f4da-4ed5-8f1b-7c4b91ace3eb',
    TopicName: 'Пунктуация в сложных предложениях (знаки при союзах и союзных словах)',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b4fa4159-2881-4a0f-8983-fde281113bff',
    TopicName: 'Прямая речь, диалог, цитирование',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1d12b581-b35e-49e2-859d-6ce944fc9a43',
    TopicName: 'Знаки препинания при сравнительных оборотах',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '98e34de1-292b-4a3d-bc39-2928ab92d9c6',
    TopicName: 'Тире между подлежащим и сказуемым',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '3ba5e009-6e78-48e9-b5ca-fbfe38a4610e',
    TopicName: 'Двоеточие и тире при пояснительных отношениях',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e9c6b0af-5a2b-444a-a150-3dfbb4feb5c1',
    TopicName: 'Пунктуация при уточняющих, присоединительных конструкциях',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '15bfa867-1c6b-4955-bb2a-db73753d412c',
    TopicName: 'Стили речи: разговорный, научный, публицистический, официально-деловой, художественный',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '619800fc-6970-496e-8640-ad427096efa0',
    TopicName: 'Типы речи: повествование, описание, рассуждение',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '26f15208-a884-4b53-ae30-8290e04cde2d',
    TopicName: 'Композиция текста: тема, идея, микротемы, абзац',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'e22b76a2-0396-4cea-9d31-55df0340e3b8',
    TopicName: 'Средства связи предложений в тексте',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '37a59be6-2fa7-4d3b-9ad8-84ab50e12e94',
    TopicName: 'Речевые нормы: точность, логичность, уместность',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '9135f19f-0348-4a3e-8c36-7dea1a03f5d3',
    TopicName: 'Культура речи и речевой этикет',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a8471489-7a2d-4b19-8676-adb81f7aac9e',
    TopicName: 'Редактирование и исправление речевых ошибок',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '1c7790ed-c7f0-40d6-a235-02f13b4e4c24',
    TopicName: 'Пунктуационный анализ и алгоритмы',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '4866f986-2ca3-43b8-8898-a6c83cb4c18e',
    TopicName: 'Лексические нормы и сочетаемость',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '8caa5df3-3e38-4a70-bd30-1f855606838b',
    TopicName: 'Разбор слова по составу и по частям речи',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f54a9329-6853-4fb0-badb-bc79d976d4d7',
    TopicName: 'Сложные случаи орфографии: Н и НН в разных частях речи',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'a7a8f9e6-88df-4dd9-b703-3c8b9f1b6f43',
    TopicName: 'Орфография корней с И/Ы после Ц и шипящих',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'f36ca64f-22d2-4a5a-a547-5ef5eccd293d',
    TopicName: 'Прописные и строчные буквы, аббревиатуры',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'b1e17524-9843-4ba4-8f1d-1484a0cb3f42',
    TopicName: 'Перенос слов и орфографические правила набора',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: '0e0e60ea-d5cb-4d0c-9a3b-709083bbfef3',
    TopicName: 'Подготовка к сочинению-рассуждению: аргументация',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    TopicID: 'ad9c2565-c368-4400-92be-5cc531301250',
    TopicName: 'Стилистический анализ текста и средства выразительности',
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const disciplineRepository = app.get(getRepositoryToken(Discipline));
    const topicRepository = app.get(getRepositoryToken(Topic));
    
    console.log('🌱 Начинаю заполнение тем по русскому языку...');
    
    // Проверяем, существует ли дисциплина "Русский язык"
    const russianDiscipline = await disciplineRepository.findOne({
      where: { DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d' }
    });
    
    if (!russianDiscipline) {
      console.log('⚠️  Дисциплина "Русский язык" не найдена. Сначала запустите скрипт заполнения дисциплин.');
      return;
    }
    
    console.log(`✅ Найдена дисциплина: ${russianDiscipline.DisciplineName}`);
    
    // Проверяем, есть ли уже темы по русскому языку
    const existingTopics = await topicRepository.find({
      where: { DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d' }
    });
    
    if (existingTopics.length > 0) {
      console.log(`⚠️  В дисциплине "Русский язык" уже есть ${existingTopics.length} тем. Очищаю существующие темы...`);
      await topicRepository.remove(existingTopics);
    }
    
    // Создаем темы
    const createdTopics = await topicRepository.save(russianTopicsData);
    
    console.log(`✅ Успешно создано ${createdTopics.length} тем по русскому языку:`);
    createdTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic.TopicName} (${topic.TopicID})`);
    });
    
    console.log('\n🎉 Заполнение тем по русскому языку завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении тем по русскому языку:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
