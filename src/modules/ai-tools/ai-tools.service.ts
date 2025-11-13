import { Injectable, Logger } from '@nestjs/common';
import { Discipline } from '../discipline/discipline.entity';
import { Topic } from '../topic/topic.entity';

export interface TrackItemSuggestion {
  disciplineId: string;
  topicId?: string | null;
  order?: number;
}

export interface DisciplineSelection {
  disciplineId: string;
  order?: number;
}

export interface TopicSelection {
  topicId: string;
  disciplineId: string;
  order?: number;
}

@Injectable()
export class AIToolsService {
  private readonly logger = new Logger(AIToolsService.name);

  /**
   * Формирует системный промпт для выбора релевантных дисциплин на основе истории чата
   */
  buildDisciplineSelectionPrompt(disciplines: Discipline[]): string {
    const disciplinesList = disciplines
      .map(
        (d, idx) =>
          `${idx + 1}. ${d.DisciplineName} (ID: ${d.DisciplineID})`,
      )
      .join('\n');

    return `Ты помощник для образовательной платформы Этернум. Твоя задача - проанализировать историю диалога пользователя с ИИ-ассистентом и определить, какие дисциплины из доступного списка наиболее релевантны для изучения вопросов пользователя.

Доступные дисциплины:
${disciplinesList}

Инструкции:
1. Проанализируй историю диалога и определи основные темы и вопросы, которые интересуют пользователя
2. Выбери только те дисциплины, которые действительно релевантны вопросам пользователя
3. Расположи результаты в порядке приоритета: сначала самые релевантные дисциплины
4. Не выбирай дисциплины, которые не имеют отношения к вопросам пользователя

Верни ответ ТОЛЬКО в формате JSON массива объектов, где каждый объект содержит:
- "disciplineId": ПОЛНЫЙ UUID дисциплины из поля "ID:" (обязательно, скопируй UUID полностью)
- "order": порядковый номер (начиная с 0)

Пример ответа:
[
  {"disciplineId": "6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d", "order": 0},
  {"disciplineId": "9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f", "order": 1}
]

КРИТИЧЕСКИ ВАЖНО:
- НЕ используй номер из списка (например, "8" или "1")
- ОБЯЗАТЕЛЬНО используй ПОЛНЫЙ UUID из поля "ID:" (формат: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
- Скопируй UUID точно так, как он указан в списке выше
- Выбери только релевантные дисциплины (обычно 2-5 дисциплин)
- Убедись, что все UUID соответствуют предоставленным ID`;
  }

  /**
   * Формирует системный промпт для выбора релевантных тем по выбранным дисциплинам
   */
  buildTopicSelectionPrompt(
    selectedDisciplines: Discipline[],
    topics: Topic[],
  ): string {
    // Сначала показываем список выбранных дисциплин
    const selectedDisciplinesList = selectedDisciplines
      .map((d, idx) => `${idx + 1}. ${d.DisciplineName} (ID: ${d.DisciplineID})`)
      .join('\n');

    // Группируем темы по выбранным дисциплинам
    const topicsByDiscipline = topics.reduce((acc, topic) => {
      if (selectedDisciplines.some((d) => d.DisciplineID === topic.DisciplineID)) {
        if (!acc[topic.DisciplineID]) {
          acc[topic.DisciplineID] = [];
        }
        acc[topic.DisciplineID].push(topic);
      }
      return acc;
    }, {} as Record<string, Topic[]>);

    const topicsList = Object.entries(topicsByDiscipline)
      .map(([disciplineId, disciplineTopics]) => {
        const discipline = selectedDisciplines.find(
          (d) => d.DisciplineID === disciplineId,
        );
        return `Дисциплина: ${discipline?.DisciplineName} (ID: ${disciplineId})\n` +
          disciplineTopics
            .map(
              (t, idx) =>
                `  ${idx + 1}. ${t.TopicName} (ID: ${t.TopicID})`,
            )
            .join('\n');
      })
      .join('\n\n');

    // Проверяем, есть ли дисциплины без тем
    const disciplinesWithoutTopics = selectedDisciplines.filter(
      (d) => !topicsByDiscipline[d.DisciplineID] || topicsByDiscipline[d.DisciplineID].length === 0,
    );

    let disciplinesWithoutTopicsWarning = '';
    if (disciplinesWithoutTopics.length > 0) {
      disciplinesWithoutTopicsWarning = `\n\nВАЖНО: Для следующих дисциплин нет доступных тем в базе данных:\n${disciplinesWithoutTopics.map((d) => `- ${d.DisciplineName} (ID: ${d.DisciplineID})`).join('\n')}\nДля этих дисциплин не нужно возвращать темы.`;
    }

    return `Ты помощник для образовательной платформы Этернум. Твоя задача - проанализировать историю диалога пользователя с ИИ-ассистентом и определить, какие темы из выбранных дисциплин наиболее релевантны для изучения вопросов пользователя.

ВЫБРАННЫЕ ДИСЦИПЛИНЫ (на основе предыдущего анализа):
${selectedDisciplinesList}

ДОСТУПНЫЕ ТЕМЫ ПО ВЫБРАННЫМ ДИСЦИПЛИНАМ:
${topicsList || 'Нет доступных тем для выбранных дисциплин.'}${disciplinesWithoutTopicsWarning}

Инструкции:
1. Проанализируй историю диалога и определи конкретные темы, которые нужно изучить
2. Для каждой выбранной дисциплины ОБЯЗАТЕЛЬНО выбери хотя бы 2-5 релевантных тем
3. Если темы релевантны вопросу пользователя, обязательно включи их в ответ
4. Расположи результаты в порядке приоритета: сначала самые релевантные темы
5. НЕ возвращай пустой массив - всегда выбирай хотя бы несколько тем, если они есть в списке

       Верни ответ ТОЛЬКО в формате JSON массива объектов, где каждый объект содержит:
       - "topicId": ПОЛНЫЙ UUID темы из поля "ID:" (обязательно, скопируй UUID полностью)
       - "disciplineId": ПОЛНЫЙ UUID дисциплины из поля "ID:" (обязательно, скопируй UUID полностью)
       - "order": порядковый номер (начиная с 0)

       Пример ответа:
       [
         {"topicId": "55667788-9abc-421d-d344-bbccddeeff00", "disciplineId": "a8c7e6d5-1b4d-4e0f-9a3c-5d4e6f7a8b9c", "order": 0},
         {"topicId": "a1b2c3d4-e5f6-4a7b-8c9d-01a2b3c4d5e6", "disciplineId": "a8c7e6d5-1b4d-4e0f-9a3c-5d4e6f7a8b9c", "order": 1}
       ]

       КРИТИЧЕСКИ ВАЖНО:
       - НЕ используй номер из списка (например, "1" или "5")
       - ОБЯЗАТЕЛЬНО используй ПОЛНЫЙ UUID из поля "ID:" (формат: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
       - Скопируй UUID точно так, как он указан в списке выше
       - Выбери хотя бы 2-5 релевантных тем, если они есть
       - Если темы релевантны, обязательно включи их в ответ
       - Убедись, что topicId соответствует disciplineId
       - Убедись, что все UUID соответствуют предоставленным ID
       - ВАЖНО: disciplineId в ответе ДОЛЖЕН точно совпадать с ID дисциплины из списка выше
       - НЕ придумывай disciplineId - используй ТОЛЬКО те, что указаны в списке выше`;

  }

  /**
   * Формирует системный промпт для выбора релевантных дисциплин и тем
   */
  buildTrackRecommendationPrompt(
    disciplines: Discipline[],
    topics: Topic[],
  ): string {
    // Формируем список дисциплин с их названиями
    const disciplinesList = disciplines
      .map(
        (d, idx) =>
          `${idx + 1}. ${d.DisciplineName} (ID: ${d.DisciplineID})`,
      )
      .join('\n');

    // Группируем темы по дисциплинам
    const topicsByDiscipline = topics.reduce((acc, topic) => {
      if (!acc[topic.DisciplineID]) {
        acc[topic.DisciplineID] = [];
      }
      acc[topic.DisciplineID].push(topic);
      return acc;
    }, {} as Record<string, Topic[]>);

    // Формируем структурированный список тем по дисциплинам
    const topicsList = Object.entries(topicsByDiscipline)
      .map(([disciplineId, disciplineTopics]) => {
        const discipline = disciplines.find(
          (d) => d.DisciplineID === disciplineId,
        );
        return `Дисциплина: ${discipline?.DisciplineName} (ID: ${disciplineId})\n` +
          disciplineTopics
            .map(
              (t, idx) =>
                `  ${idx + 1}. ${t.TopicName} (ID: ${t.TopicID})`,
            )
            .join('\n');
      })
      .join('\n\n');

    return `Ты помощник для образовательной платформы Этернум. Твоя задача - проанализировать вопрос пользователя и определить, какие дисциплины и темы из доступного списка наиболее релевантны для изучения этого вопроса.

Доступные дисциплины:
${disciplinesList}

Доступные темы (сгруппированы по дисциплинам):
${topicsList}

Инструкции:
1. Сначала определи, какие ДИСЦИПЛИНЫ релевантны вопросу пользователя
2. Для каждой релевантной дисциплины определи, какие ТЕМЫ из этой дисциплины наиболее подходят для изучения вопроса
3. Если дисциплина релевантна, но конкретные темы не подходят, укажи только дисциплину (topicId: null)
4. Расположи результаты в порядке приоритета: сначала самые релевантные дисциплины и темы

Верни ответ ТОЛЬКО в формате JSON массива объектов, где каждый объект содержит:
- "disciplineId": UUID дисциплины (обязательно)
- "topicId": UUID темы (опционально, может быть null, если тема не релевантна)
- "order": порядковый номер (начиная с 0)

Пример ответа:
[
  {"disciplineId": "uuid-дисциплины-1", "topicId": "uuid-темы-1", "order": 0},
  {"disciplineId": "uuid-дисциплины-1", "topicId": "uuid-темы-2", "order": 1},
  {"disciplineId": "uuid-дисциплины-2", "topicId": null, "order": 2}
]

Важно:
- Выбери только те дисциплины и темы, которые действительно релевантны вопросу
- Не добавляй дисциплины или темы, которые не имеют отношения к вопросу
- Если тема не релевантна, но дисциплина релевантна, укажи только disciplineId с topicId: null
- Убедись, что все UUID соответствуют предоставленным ID`;
  }

  /**
   * Формирует пользовательский промпт с вопросом
   */
  buildUserPrompt(question: string): string {
    return `Вопрос пользователя: "${question}"

Проанализируй вопрос и определи релевантные дисциплины и темы для изучения этого вопроса. Верни ответ в формате JSON массива объектов с полями disciplineId, topicId (может быть null) и order.`;
  }

  /**
   * Парсит ответ с выбранными дисциплинами
   */
  parseDisciplinesResponse(
    response: string,
    disciplines: Discipline[],
  ): DisciplineSelection[] {
    try {
      // Убираем markdown блоки (```json и ```)
      let cleanedResponse = response
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();

      // Убираем комментарии из JSON (// комментарий) - более агрессивная очистка
      // Удаляем комментарии как в конце строки, так и в середине
      cleanedResponse = cleanedResponse
        .replace(/\/\/[^\n]*/g, '') // Удаляем комментарии // до конца строки
        .replace(/\/\*[\s\S]*?\*\//g, '') // Удаляем многострочные комментарии /* */
        .trim();

      // Убираем лишние пробелы и переносы строк внутри JSON
      cleanedResponse = cleanedResponse.replace(/\s+/g, ' ');

      // Ищем JSON массив - пытаемся найти самый большой массив
      const jsonMatch = cleanedResponse.match(/\[[\s\S]*?\]/);
      if (!jsonMatch) {
        this.logger.warn(
          'GigaChat response does not contain valid JSON array',
        );
        this.logger.warn(`Response was: ${response.substring(0, 500)}`);
        this.logger.warn(`Cleaned response was: ${cleanedResponse.substring(0, 500)}`);
        return [];
      }

      let jsonString = jsonMatch[0];
      
      // Дополнительная очистка: убираем комментарии внутри JSON строк
      jsonString = jsonString.replace(/,\s*\/\/[^\n]*/g, ','); // Комментарии после запятых
      jsonString = jsonString.replace(/{\s*\/\/[^\n]*/g, '{'); // Комментарии после открывающих скобок

      const parsedItems = JSON.parse(jsonString) as Array<{
        disciplineId: string;
        order?: number;
      }>;

      const validItems: DisciplineSelection[] = [];

      for (const item of parsedItems) {
        // Нормализуем ID (убираем пробелы и переносы строк)
        let normalizedId = item.disciplineId?.trim();
        
        if (!normalizedId) {
          this.logger.warn(
            `Empty disciplineId in item: ${JSON.stringify(item)}, skipping`,
          );
          continue;
        }

        // Если ID не является UUID (слишком короткий или не содержит дефисы), 
        // пытаемся найти дисциплину по номеру в списке
        if (!normalizedId.includes('-') || normalizedId.length < 30) {
          const index = parseInt(normalizedId, 10) - 1; // Номер в списке начинается с 1
          if (!isNaN(index) && index >= 0 && index < disciplines.length) {
            normalizedId = disciplines[index].DisciplineID;
            this.logger.log(
              `Converted discipline number ${item.disciplineId} to UUID ${normalizedId}`,
            );
          } else {
            this.logger.warn(
              `Discipline ID "${normalizedId}" is not a valid UUID and cannot be converted from index, skipping`,
            );
            continue;
          }
        }

        const disciplineExists = disciplines.some(
          (d) => d.DisciplineID === normalizedId,
        );

        if (!disciplineExists) {
          this.logger.warn(
            `Discipline ${normalizedId} not found, skipping`,
          );
          this.logger.warn(
            `Available discipline IDs: ${disciplines.map((d) => d.DisciplineID).join(', ')}`,
          );
          this.logger.warn(
            `Available discipline names: ${disciplines.map((d) => `${d.DisciplineName} (${d.DisciplineID})`).join(', ')}`,
          );
          continue;
        }

        validItems.push({
          disciplineId: normalizedId,
          order: item.order ?? validItems.length,
        });
      }

      return validItems;
    } catch (error) {
      this.logger.error(
        `Error parsing disciplines response: ${error?.message}`,
        error?.stack,
      );
      return [];
    }
  }

  /**
   * Парсит ответ с выбранными темами
   */
  parseTopicsResponse(
    response: string,
    disciplines: Discipline[],
    topics: Topic[],
  ): TopicSelection[] {
    try {
      // Убираем markdown блоки (```json и ```)
      let cleanedResponse = response
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();

      // Убираем комментарии из JSON (// комментарий) - более агрессивная очистка
      // Удаляем комментарии как в конце строки, так и в середине
      cleanedResponse = cleanedResponse
        .replace(/\/\/[^\n]*/g, '') // Удаляем комментарии // до конца строки
        .replace(/\/\*[\s\S]*?\*\//g, '') // Удаляем многострочные комментарии /* */
        .trim();

      // Убираем лишние пробелы и переносы строк внутри JSON
      cleanedResponse = cleanedResponse.replace(/\s+/g, ' ');

      // Ищем JSON массив - пытаемся найти самый большой массив
      const jsonMatch = cleanedResponse.match(/\[[\s\S]*?\]/);
      if (!jsonMatch) {
        this.logger.warn(
          'GigaChat response does not contain valid JSON array',
        );
        this.logger.warn(`Response was: ${response.substring(0, 500)}`);
        this.logger.warn(`Cleaned response was: ${cleanedResponse.substring(0, 500)}`);
        return [];
      }

      let jsonString = jsonMatch[0];
      
      // Дополнительная очистка: убираем комментарии внутри JSON строк
      jsonString = jsonString.replace(/,\s*\/\/[^\n]*/g, ','); // Комментарии после запятых
      jsonString = jsonString.replace(/{\s*\/\/[^\n]*/g, '{'); // Комментарии после открывающих скобок

      const parsedItems = JSON.parse(jsonString) as Array<{
        topicId: string;
        disciplineId: string;
        order?: number;
      }>;

      this.logger.log(
        `Parsed ${parsedItems.length} topic items from GigaChat response`,
      );
      this.logger.log(
        `First 3 parsed items: ${JSON.stringify(parsedItems.slice(0, 3))}`,
      );

      const validItems: TopicSelection[] = [];

      for (const item of parsedItems) {
        // Нормализуем ID (убираем пробелы и переносы строк)
        let normalizedTopicId = item.topicId?.trim();
        let normalizedDisciplineId = item.disciplineId?.trim();
        
        if (!normalizedTopicId || !normalizedDisciplineId) {
          this.logger.warn(
            `Empty topicId or disciplineId in item: ${JSON.stringify(item)}, skipping`,
          );
          continue;
        }

        // Проверяем дисциплину
        const disciplineExists = disciplines.some(
          (d) => d.DisciplineID === normalizedDisciplineId,
        );

        if (!disciplineExists) {
          this.logger.warn(
            `Discipline ${normalizedDisciplineId} not found, skipping`,
          );
          continue;
        }

        // Проверяем тему
        const topic = topics.find((t) => t.TopicID === normalizedTopicId);
        if (!topic) {
          this.logger.warn(`Topic ${normalizedTopicId} not found, skipping`);
          this.logger.warn(
            `Available topic IDs for discipline ${normalizedDisciplineId}: ${topics.filter((t) => t.DisciplineID === normalizedDisciplineId).map((t) => t.TopicID).slice(0, 10).join(', ')}...`,
          );
          continue;
        }

        // Проверяем принадлежность темы к дисциплине
        if (topic.DisciplineID !== normalizedDisciplineId) {
          this.logger.warn(
            `Topic ${normalizedTopicId} does not belong to discipline ${normalizedDisciplineId}, skipping`,
          );
          continue;
        }

        validItems.push({
          topicId: normalizedTopicId,
          disciplineId: normalizedDisciplineId,
          order: item.order ?? validItems.length,
        });
        this.logger.debug(
          `Valid topic added: ${normalizedTopicId} for discipline ${normalizedDisciplineId}`,
        );
      }

      this.logger.log(
        `Parsed ${validItems.length} valid topics out of ${parsedItems.length} total items`,
      );
      if (validItems.length === 0 && parsedItems.length > 0) {
        this.logger.warn(
          `No valid topics found despite ${parsedItems.length} parsed items. This might indicate ID mismatch issues.`,
        );
      }

      return validItems;
    } catch (error) {
      this.logger.error(
        `Error parsing topics response: ${error?.message}`,
        error?.stack,
      );
      return [];
    }
  }

  /**
   * Формирует сообщения для промпта из истории чата
   */
  buildChatHistoryMessages(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    maxMessages: number = 5,
  ): Array<{ role: 'user' | 'assistant'; content: string }> {
    // Берем последние maxMessages сообщений
    const recentMessages = messages.slice(-maxMessages);
    return recentMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
  }

  /**
   * Парсит ответ от GigaChat и валидирует его
   */
  parseTrackRecommendationResponse(
    response: string,
    disciplines: Discipline[],
    topics: Topic[],
  ): TrackItemSuggestion[] {
    try {
      // Извлекаем JSON из ответа
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        this.logger.warn(
          'GigaChat response does not contain valid JSON array',
        );
        return [];
      }

      const parsedItems = JSON.parse(jsonMatch[0]) as Array<{
        disciplineId: string;
        topicId?: string | null;
        order?: number;
      }>;

      // Валидируем и фильтруем результаты
      const validItems: TrackItemSuggestion[] = [];

      for (const item of parsedItems) {
        // Проверяем, что дисциплина существует
        const disciplineExists = disciplines.some(
          (d) => d.DisciplineID === item.disciplineId,
        );

        if (!disciplineExists) {
          this.logger.warn(
            `Discipline ${item.disciplineId} not found, skipping`,
          );
          continue;
        }

        // Если указана тема, проверяем её существование и принадлежность к дисциплине
        if (item.topicId) {
          const topic = topics.find((t) => t.TopicID === item.topicId);
          if (!topic) {
            this.logger.warn(`Topic ${item.topicId} not found, skipping`);
            continue;
          }
          if (topic.DisciplineID !== item.disciplineId) {
            this.logger.warn(
              `Topic ${item.topicId} does not belong to discipline ${item.disciplineId}, skipping`,
            );
            continue;
          }
        }

        validItems.push({
          disciplineId: item.disciplineId,
          topicId: item.topicId || null,
          order: item.order ?? validItems.length,
        });
      }

      return validItems;
    } catch (error) {
      this.logger.error(
        `Error parsing track recommendation response: ${error?.message}`,
        error?.stack,
      );
      return [];
    }
  }
}

