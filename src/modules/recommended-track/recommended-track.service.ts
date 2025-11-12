import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RecommendedTrack } from './recommended-track.entity';
import { TrackItem } from './track-item.entity';
import { Chat } from '../chat/chat.entity';
import { User } from '../user/user.entity';
import { Discipline } from '../discipline/discipline.entity';
import { Topic } from '../topic/topic.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ChatService } from '../chat/chat.service';
import { AIToolsService } from '../ai-tools/ai-tools.service';
import { Message, MessageRole } from '../chat/message.entity';

@Injectable()
export class RecommendedTrackService {
  private readonly logger = new Logger(RecommendedTrackService.name);

  constructor(
    @InjectRepository(RecommendedTrack)
    private readonly trackRepository: Repository<RecommendedTrack>,
    @InjectRepository(TrackItem)
    private readonly trackItemRepository: Repository<TrackItem>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Discipline)
    private readonly disciplineRepository: Repository<Discipline>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly chatService: ChatService,
    private readonly aiToolsService: AIToolsService,
  ) {}

  async create(dto: CreateTrackDto, userId: string): Promise<RecommendedTrack> {
    this.logger.log(
      `[CREATE] Starting track creation for chat ${dto.chatId}, user ${userId}`,
    );
    this.logger.log(
      `[CREATE] DTO: chatId=${dto.chatId}, question=${dto.question}, trackItems.length=${dto.trackItems?.length || 0}`,
    );

    // Проверяем, существует ли чат
    const chat = await this.chatRepository.findOne({
      where: { id: dto.chatId },
      relations: ['user'],
    });

    if (!chat) {
      throw new NotFoundException(`Чат с id ${dto.chatId} не найден`);
    }

    // Проверяем, что чат принадлежит пользователю
    if (chat.userId !== userId) {
      throw new NotFoundException(`Чат с id ${dto.chatId} не найден`);
    }

    // Получаем пользователя
    const user = await this.userRepository.findOne({
      where: { UserID: userId },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с id ${userId} не найден`);
    }

    // Проверяем, не существует ли уже трек для этого чата
    const existingTrack = await this.trackRepository.findOne({
      where: { chatId: dto.chatId },
    });

    // Если трек существует, обновляем его
    if (existingTrack) {
      this.logger.log(
        `[UPDATE] Track already exists for chat ${dto.chatId} (trackId: ${existingTrack.id}), updating it`,
      );

      // Если trackItems не предоставлены, формируем трек через ИИ на основе истории чата
      let trackItems = dto.trackItems || [];
      if (trackItems.length === 0) {
        this.logger.log(
          `Starting track items generation for update of chat ${dto.chatId}`,
        );
        try {
          trackItems = await this.generateTrackItemsFromChat(dto.chatId);
          this.logger.log(
            `Generated ${trackItems.length} track items for update of chat ${dto.chatId}`,
          );
        } catch (error: any) {
          this.logger.error(
            `[UPDATE ERROR] Failed to generate track items from chat ${dto.chatId}: ${error?.message}`,
            error?.stack,
          );
          this.logger.error(
            `[UPDATE ERROR] Error details: ${JSON.stringify({
              name: error?.name,
              message: error?.message,
              code: error?.code,
              status: error?.response?.status,
              statusText: error?.response?.statusText,
            })}`,
          );
          // Продолжаем обновление трека с пустыми элементами
          trackItems = [];
        }
      }

      // Обновляем поля трека
      if (dto.question !== undefined) {
        existingTrack.question = dto.question;
      }
      if (dto.description !== undefined) {
        existingTrack.description = dto.description;
      }

      await this.trackRepository.save(existingTrack);

      // Удаляем старые элементы трека и создаем новые
      await this.trackItemRepository.delete({ trackId: existingTrack.id });

      if (trackItems.length > 0) {
        await this.createTrackItems(existingTrack.id, trackItems);
        this.logger.log(
          `Updated track ${existingTrack.id} with ${trackItems.length} track items`,
        );
      } else {
        this.logger.warn(
          `No track items generated for update of track ${existingTrack.id}`,
        );
      }

      // Загружаем обновленный трек с элементами
      const finalTrack = await this.findOne(existingTrack.id);
      this.logger.log(
        `Track ${finalTrack.id} updated with ${finalTrack.trackItems?.length || 0} items`,
      );
      return finalTrack;
    }

    // Если trackItems не предоставлены, формируем трек через ИИ на основе истории чата
    let trackItems = dto.trackItems || [];
    if (trackItems.length === 0) {
      this.logger.log(
        `Starting track items generation for chat ${dto.chatId}`,
      );
      try {
        trackItems = await this.generateTrackItemsFromChat(dto.chatId);
        this.logger.log(
          `Generated ${trackItems.length} track items for chat ${dto.chatId}`,
        );
      } catch (error: any) {
        this.logger.error(
          `[CREATE ERROR] Failed to generate track items from chat ${dto.chatId}: ${error?.message}`,
          error?.stack,
        );
        this.logger.error(
          `[CREATE ERROR] Error details: ${JSON.stringify({
            name: error?.name,
            message: error?.message,
            code: error?.code,
            status: error?.response?.status,
            statusText: error?.response?.statusText,
          })}`,
        );
        // Продолжаем создание трека с пустыми элементами
        trackItems = [];
      }
    }

    // Создаем новый трек
    const track = this.trackRepository.create({
      chatId: chat.id,
      userId: user.UserID,
      chat,
      user,
      question: dto.question || null,
      description: dto.description || null,
    });

    const savedTrack = await this.trackRepository.save(track);

    // Создаем элементы трека
    if (trackItems.length > 0) {
      await this.createTrackItems(savedTrack.id, trackItems);
      this.logger.log(
        `Created ${trackItems.length} track items for track ${savedTrack.id}`,
      );
    } else {
      this.logger.warn(
        `No track items generated for track ${savedTrack.id}`,
      );
    }

    // Загружаем трек с элементами
    const finalTrack = await this.findOne(savedTrack.id);
    this.logger.log(
      `Track ${finalTrack.id} created with ${finalTrack.trackItems?.length || 0} items`,
    );
    return finalTrack;
  }

  async update(
    trackId: string,
    dto: UpdateTrackDto,
    userId: string,
  ): Promise<RecommendedTrack> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['user'],
    });

    if (!track) {
      throw new NotFoundException(`Трек с id ${trackId} не найден`);
    }

    // Проверяем, что трек принадлежит пользователю
    if (track.userId !== userId) {
      throw new NotFoundException(`Трек с id ${trackId} не найден`);
    }

    // Обновляем поля трека
    if (dto.question !== undefined) {
      track.question = dto.question;
    }
    if (dto.description !== undefined) {
      track.description = dto.description;
    }

    await this.trackRepository.save(track);

    // Обновляем элементы трека, если они предоставлены
    if (dto.trackItems !== undefined) {
      // Удаляем старые элементы
      await this.trackItemRepository.delete({ trackId: track.id });

      // Создаем новые элементы
      if (dto.trackItems.length > 0) {
        await this.createTrackItems(track.id, dto.trackItems);
      }
    }

    return this.findOne(trackId);
  }

  async findOne(trackId: string): Promise<RecommendedTrack> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: [
        'chat',
        'user',
        'trackItems',
        'trackItems.discipline',
        'trackItems.discipline.disciplineMetaTags',
        'trackItems.discipline.disciplineMetaTags.metaTag',
        'trackItems.topic',
      ],
    });

    if (!track) {
      throw new NotFoundException(`Трек с id ${trackId} не найден`);
    }

    return track;
  }

  async findByChatId(chatId: string): Promise<RecommendedTrack | null> {
    const track = await this.trackRepository.findOne({
      where: { chatId },
      relations: [
        'chat',
        'user',
        'trackItems',
        'trackItems.discipline',
        'trackItems.discipline.disciplineMetaTags',
        'trackItems.discipline.disciplineMetaTags.metaTag',
        'trackItems.topic',
      ],
      order: {
        trackItems: {
          order: 'ASC',
        },
      },
    });

    if (track) {
      this.logger.debug(
        `Found track ${track.id} for chat ${chatId} with ${track.trackItems?.length || 0} items`,
      );
      
      // Логируем детали элементов трека для отладки
      if (track.trackItems && track.trackItems.length > 0) {
        track.trackItems.forEach((item, idx) => {
          this.logger.debug(
            `Track item ${idx + 1}: disciplineId=${item.disciplineId}, disciplineName=${item.discipline?.DisciplineName || 'NOT LOADED'}, topicId=${item.topicId || 'null'}, topicName=${item.topic?.TopicName || 'null'}, hasDiscipline=${!!item.discipline}, hasTopic=${!!item.topic}`,
          );
        });
      }
    }

    return track;
  }

  async findByUserId(userId: string): Promise<RecommendedTrack[]> {
    return this.trackRepository.find({
      where: { userId },
      relations: [
        'chat',
        'trackItems',
        'trackItems.discipline',
        'trackItems.discipline.disciplineMetaTags',
        'trackItems.discipline.disciplineMetaTags.metaTag',
        'trackItems.topic',
      ],
      order: {
        createdAt: 'DESC',
        trackItems: {
          order: 'ASC',
        },
      },
    });
  }

  async delete(trackId: string, userId: string): Promise<void> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['user'],
    });

    if (!track) {
      throw new NotFoundException(`Трек с id ${trackId} не найден`);
    }

    // Проверяем, что трек принадлежит пользователю
    if (track.userId !== userId) {
      throw new NotFoundException(`Трек с id ${trackId} не найден`);
    }

    await this.trackRepository.remove(track);
  }

  private async createTrackItems(
    trackId: string,
    items: Array<{ disciplineId: string; topicId?: string | null; order?: number }>,
  ): Promise<void> {
    // Получаем все уникальные ID дисциплин и тем
    const disciplineIds = [...new Set(items.map((item) => item.disciplineId))];
    const topicIds = items
      .map((item) => item.topicId)
      .filter((id): id is string => !!id);

    // Проверяем существование дисциплин
    const disciplines = await this.disciplineRepository.find({
      where: { DisciplineID: In(disciplineIds) },
    });

    if (disciplines.length !== disciplineIds.length) {
      const foundIds = disciplines.map((d) => d.DisciplineID);
      const missingIds = disciplineIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Дисциплины с id ${missingIds.join(', ')} не найдены`,
      );
    }

    // Проверяем существование тем, если они указаны
    let topics: Topic[] = [];
    if (topicIds.length > 0) {
      topics = await this.topicRepository.find({
        where: { TopicID: In(topicIds) },
      });

      if (topics.length !== topicIds.length) {
        const foundIds = topics.map((t) => t.TopicID);
        const missingIds = topicIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Темы с id ${missingIds.join(', ')} не найдены`,
        );
      }
    }

    // Создаем элементы трека
    const trackItems = items.map((item, index) => {
      const discipline = disciplines.find(
        (d) => d.DisciplineID === item.disciplineId,
      )!;

      const topic = item.topicId
        ? topics.find((t) => t.TopicID === item.topicId) || null
        : null;

      return this.trackItemRepository.create({
        trackId,
        track: { id: trackId } as RecommendedTrack,
        discipline,
        topic,
        order: item.order ?? index,
      });
    });

    await this.trackItemRepository.save(trackItems);
  }

  private async generateTrackItemsFromChat(
    chatId: string,
  ): Promise<Array<{ disciplineId: string; topicId?: string | null; order?: number }>> {
    // Получаем все дисциплины и темы
    const [disciplines, topics] = await Promise.all([
      this.disciplineRepository.find(),
      this.topicRepository.find(),
    ]);

    this.logger.log(
      `Loaded ${disciplines.length} disciplines and ${topics.length} topics`,
    );
    this.logger.log(
      `Discipline IDs: ${disciplines.map((d) => d.DisciplineID).join(', ')}`,
    );
    
    // Логируем распределение тем по дисциплинам для отладки
    const topicsByDiscipline = topics.reduce((acc, topic) => {
      acc[topic.DisciplineID] = (acc[topic.DisciplineID] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    this.logger.log(
      `Topics distribution by discipline: ${JSON.stringify(topicsByDiscipline)}`,
    );
    
    // Логируем все уникальные DisciplineID из тем
    const uniqueDisciplineIdsInTopics = [...new Set(topics.map((t) => t.DisciplineID))];
    this.logger.log(
      `Unique discipline IDs in topics: ${uniqueDisciplineIdsInTopics.join(', ')}`,
    );

    // Получаем последние 5 сообщений из чата
    this.logger.log(`Fetching messages for chat ${chatId}`);
    const messages = await this.messageRepository.find({
      where: { chat: { id: chatId } },
      order: { createdAt: 'DESC' },
      take: 5,
    });

    this.logger.log(`Found ${messages.length} messages in chat ${chatId}`);

    // Преобразуем сообщения в формат для промпта
    const chatHistory = messages
      .reverse() // Возвращаем в хронологическом порядке
      .map((msg) => ({
        role:
          msg.role === MessageRole.USER
            ? ('user' as const)
            : ('assistant' as const),
        content: msg.content,
      }));

    if (chatHistory.length === 0) {
      this.logger.warn(
        `No messages found in chat ${chatId}, cannot generate track`,
      );
      return [];
    }

    this.logger.log(
      `Chat history prepared: ${chatHistory.length} messages for chat ${chatId}`,
    );

    try {
      // ЭТАП 1: Выбор релевантных дисциплин
      this.logger.log('Step 1: Selecting relevant disciplines');
      const disciplineSystemPrompt =
        this.aiToolsService.buildDisciplineSelectionPrompt(disciplines);

      // Формируем сообщения для первого запроса: системный промпт + история чата
      const disciplineMessages = [
        { role: 'system' as const, content: disciplineSystemPrompt },
        ...chatHistory,
        {
          role: 'user' as const,
          content:
            'Проанализируй историю диалога выше и определи релевантные дисциплины. Верни ответ в формате JSON массива с полями disciplineId и order.',
        },
      ];

      this.logger.log(
        `Sending discipline selection request to GigaChat for chat ${chatId}`,
      );
      const disciplineResponse = await this.chatService.sendCustomMessage(
        disciplineMessages,
        90000, // 90 секунд
      );
      this.logger.log(
        `Received discipline selection response for chat ${chatId}: ${disciplineResponse.substring(0, 200)}...`,
      );

      const selectedDisciplines =
        this.aiToolsService.parseDisciplinesResponse(
          disciplineResponse,
          disciplines,
        );

      if (selectedDisciplines.length === 0) {
        this.logger.warn('No disciplines selected, returning empty track');
        return [];
      }

      this.logger.log(
        `Selected ${selectedDisciplines.length} disciplines: ${selectedDisciplines.map((d) => d.disciplineId).join(', ')}`,
      );

      // Получаем объекты выбранных дисциплин
      const selectedDisciplineObjects = disciplines.filter((d) =>
        selectedDisciplines.some(
          (sd) => sd.disciplineId === d.DisciplineID,
        ),
      );

            // ЭТАП 2: Выбор релевантных тем по выбранным дисциплинам
            this.logger.log('Step 2: Selecting relevant topics');
            this.logger.log(
              `Selected disciplines: ${selectedDisciplineObjects.map((d) => `${d.DisciplineName} (${d.DisciplineID})`).join(', ')}`,
            );
            
            // Проверяем, есть ли темы для выбранных дисциплин
            const availableTopicsForSelectedDisciplines = topics.filter((t) =>
              selectedDisciplineObjects.some((d) => d.DisciplineID === t.DisciplineID),
            );
            this.logger.log(
              `Total topics available for selected disciplines: ${availableTopicsForSelectedDisciplines.length}`,
            );
            
            // Если нет тем для выбранных дисциплин, пропускаем этап выбора тем
            if (availableTopicsForSelectedDisciplines.length === 0) {
              this.logger.warn(
                'No topics available for selected disciplines, skipping topic selection',
              );
              // Возвращаем только дисциплины без тем
              return selectedDisciplines.map((discipline) => ({
                disciplineId: discipline.disciplineId,
                topicId: null,
                order: discipline.order ?? 0,
              }));
            }
            
            const topicSystemPrompt = this.aiToolsService.buildTopicSelectionPrompt(
              selectedDisciplineObjects,
              topics,
            );

            // Формируем сообщения для второго запроса: системный промпт + история чата
            const topicMessages = [
              { role: 'system' as const, content: topicSystemPrompt },
              ...chatHistory,
              {
                role: 'user' as const,
                content:
                  'Проанализируй историю диалога выше и определи релевантные темы из выбранных дисциплин. Верни ответ в формате JSON массива с полями topicId, disciplineId и order.',
              },
            ];

            this.logger.log(
              `Sending topic selection request to GigaChat for chat ${chatId}`,
            );
            this.logger.log(
              `Topic system prompt length: ${topicSystemPrompt.length} characters`,
            );
      const topicResponse = await this.chatService.sendCustomMessage(
        topicMessages,
        90000, // 90 секунд
      );
      this.logger.log(
        `Received topic selection response for chat ${chatId}: ${topicResponse.substring(0, 200)}...`,
      );

            let selectedTopics = this.aiToolsService.parseTopicsResponse(
              topicResponse,
              disciplines,
              topics,
            );
            
            // Исправляем disciplineId в темах, если GigaChat вернул неправильный ID
            // Сопоставляем темы с правильными дисциплинами
            selectedTopics = selectedTopics.map((topic) => {
              // Находим тему в базе данных
              const topicInDb = topics.find((t) => t.TopicID === topic.topicId);
              if (topicInDb) {
                // Используем правильный disciplineId из базы данных
                const correctDisciplineId = topicInDb.DisciplineID;
                if (correctDisciplineId !== topic.disciplineId) {
                  this.logger.warn(
                    `Fixing disciplineId for topic ${topic.topicId}: ${topic.disciplineId} -> ${correctDisciplineId}`,
                  );
                  return {
                    ...topic,
                    disciplineId: correctDisciplineId,
                  };
                }
              }
              return topic;
            }).filter((topic) => {
              // Фильтруем только те темы, которые принадлежат выбранным дисциплинам
              return selectedDisciplineObjects.some(
                (d) => d.DisciplineID === topic.disciplineId,
              );
            });

            this.logger.log(
              `Selected ${selectedTopics.length} topics from ${selectedDisciplines.length} disciplines`,
            );
            this.logger.log(
              `Selected topics details: ${JSON.stringify(selectedTopics.slice(0, 5))}`,
            );

            // Если темы не выбраны, пытаемся выбрать релевантные темы автоматически
            if (selectedTopics.length === 0 && selectedDisciplines.length > 0) {
              this.logger.log(
                'No topics selected by AI, trying to select relevant topics automatically',
              );
              
              // Для каждой выбранной дисциплины выбираем первые 3-5 тем
              selectedDisciplines.forEach((discipline) => {
                const disciplineTopics = topics.filter(
                  (t) => t.DisciplineID === discipline.disciplineId,
                );
                
                this.logger.log(
                  `Discipline ${discipline.disciplineId} has ${disciplineTopics.length} available topics`,
                );
                
                if (disciplineTopics.length > 0) {
                  // Берем первые 3-5 тем из дисциплины
                  const topTopics = disciplineTopics.slice(0, 5);
                  topTopics.forEach((topic, idx) => {
                    selectedTopics.push({
                      topicId: topic.TopicID,
                      disciplineId: discipline.disciplineId,
                      order: selectedTopics.length,
                    });
                  });
                  this.logger.log(
                    `Auto-selected ${topTopics.length} topics for discipline ${discipline.disciplineId}: ${topTopics.map((t) => t.TopicName).join(', ')}`,
                  );
                } else {
                  this.logger.warn(
                    `No topics available for discipline ${discipline.disciplineId}`,
                  );
                }
              });
              
              this.logger.log(
                `After auto-selection: ${selectedTopics.length} topics total`,
              );
            }

            // Формируем финальный список трека
            // Сначала добавляем дисциплины с темами
            const trackItemsMap = new Map<
              string,
              { disciplineId: string; topicId: string | null; order: number }
            >();

            // Добавляем темы
            this.logger.log(`Adding ${selectedTopics.length} topics to track items map`);
            selectedTopics.forEach((topic) => {
              const key = `${topic.disciplineId}-${topic.topicId}`;
              if (!trackItemsMap.has(key)) {
                trackItemsMap.set(key, {
                  disciplineId: topic.disciplineId,
                  topicId: topic.topicId,
                  order: topic.order ?? trackItemsMap.size,
                });
                this.logger.debug(
                  `Added topic ${topic.topicId} for discipline ${topic.disciplineId}`,
                );
              } else {
                this.logger.debug(
                  `Topic ${topic.topicId} already in map, skipping`,
                );
              }
            });

            // Добавляем дисциплины без тем только если нет ни одной темы для этой дисциплины
            let disciplinesWithoutTopics = 0;
            selectedDisciplines.forEach((discipline) => {
              const hasTopics = selectedTopics.some(
                (t) => t.disciplineId === discipline.disciplineId,
              );
              if (!hasTopics) {
                disciplinesWithoutTopics++;
                const key = `${discipline.disciplineId}-null`;
                if (!trackItemsMap.has(key)) {
                  trackItemsMap.set(key, {
                    disciplineId: discipline.disciplineId,
                    topicId: null,
                    order: discipline.order ?? trackItemsMap.size,
                  });
                  this.logger.log(
                    `Added discipline ${discipline.disciplineId} without topics`,
                  );
                }
              }
            });
            this.logger.log(
              `Added ${disciplinesWithoutTopics} disciplines without topics`,
            );

      // Преобразуем Map в массив и сортируем по order
      const finalItems = Array.from(trackItemsMap.values()).sort(
        (a, b) => a.order - b.order,
      );

      const itemsWithTopics = finalItems.filter((item) => item.topicId !== null).length;
      const itemsWithoutTopics = finalItems.filter((item) => item.topicId === null).length;

      this.logger.log(
        `Generated ${finalItems.length} track items (${itemsWithTopics} with topics, ${itemsWithoutTopics} disciplines only)`,
      );
      this.logger.log(
        `Final items: ${JSON.stringify(finalItems.slice(0, 10).map((item) => ({ disciplineId: item.disciplineId, topicId: item.topicId, order: item.order })))}`,
      );

      return finalItems;
    } catch (error: any) {
      this.logger.error(
        `[ERROR] Error generating track items for chat ${chatId}: ${error?.message}`,
        error?.stack,
      );
      this.logger.error(
        `[ERROR] Error details: ${JSON.stringify({
          name: error?.name,
          message: error?.message,
          code: error?.code,
          status: error?.response?.status,
          statusText: error?.response?.statusText,
        })}`,
      );
      throw error;
    }
  }
}

