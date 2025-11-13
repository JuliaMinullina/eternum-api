import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import axios, { AxiosInstance } from 'axios';
import { randomUUID } from 'crypto';
import https from 'node:https';
import { SendMessageDto } from './dto/send-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './chat.entity';
import { Message, MessageRole } from './message.entity';
import { User } from '../user/user.entity';

interface GigaChatTokenResponse {
  access_token: string;
  expires_at?: string;
  expires_in?: number;
  token_type?: string;
}

interface GigaChatChoice {
  index: number;
  finish_reason: string;
  message: {
    role: 'assistant' | 'user' | 'system';
    content: string;
  };
}

interface GigaChatCompletionsResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: GigaChatChoice[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  conversation_id?: string;
}

export interface ChatCompletionResult {
  reply: string;
  conversationId?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  raw: GigaChatCompletionsResponse;
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly axiosInstance: AxiosInstance;
  private readonly oauthUrl: string;
  private readonly chatUrl: string;
  private readonly scope: string;
  private readonly model: string;
  private readonly tokenRefreshBufferMs: number;
  private accessToken: string | null = null;
  private tokenExpiresAt = 0;
  private tokenType = 'Bearer';

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.oauthUrl =
      this.configService.get<string>('GIGACHAT_OAUTH_URL') ||
      'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
    this.chatUrl =
      this.configService.get<string>('GIGACHAT_CHAT_URL') ||
      'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';
    this.scope =
      this.configService.get<string>('GIGACHAT_SCOPE') || 'GIGACHAT_API_PERS';
    this.model =
      this.configService.get<string>('GIGACHAT_MODEL') || 'GigaChat:latest';
    this.tokenRefreshBufferMs = Number(
      this.configService.get<string>('GIGACHAT_TOKEN_REFRESH_BUFFER_MS') ||
        60_000,
    );

    const allowSelfSigned =
      (this.configService.get<string>('GIGACHAT_ALLOW_SELF_SIGNED') || 'false')
        .toLowerCase()
        .trim() === 'true';

    this.axiosInstance = axios.create({
      timeout:
        Number(this.configService.get<string>('GIGACHAT_TIMEOUT_MS')) || 15_000,
      headers: {
        Accept: 'application/json',
      },
      httpsAgent: allowSelfSigned
        ? new https.Agent({
            rejectUnauthorized: false,
          })
        : undefined,
    });
  }

  async createChat(dto: CreateChatDto): Promise<Chat> {
    const user = await this.getUserOrThrow(dto.userId);

    const chat = this.chatRepository.create({
      user,
      title: this.deriveTitle(dto.title),
    });

    const savedChat = await this.chatRepository.save(chat);
    savedChat.user = user;
    savedChat.userId = user.UserID;

    return savedChat;
  }

  async sendMessage(
    dto: SendMessageDto,
  ): Promise<ChatCompletionResult & { chatId: string }> {
    const { chat, isNew } = await this.resolveChat(dto);
    const accessToken = await this.ensureAccessToken();
    const completionMessages = await this.buildCompletionMessages(
      dto,
      chat,
      isNew,
    );

    const conversationIdToUse =
      dto.conversationId ?? chat.externalConversationId ?? undefined;

    try {
      const response =
        await this.axiosInstance.post<GigaChatCompletionsResponse>(
          this.chatUrl,
          {
            model: this.model,
            messages: completionMessages,
            stream: false,
            ...(conversationIdToUse
              ? { conversation_id: conversationIdToUse }
              : {}),
          },
          {
            headers: {
              Authorization: `${this.tokenType} ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        );

      const choice = response.data.choices?.[0];
      const reply = choice?.message?.content ?? '';

      const result: ChatCompletionResult = {
        reply,
        conversationId: response.data.conversation_id,
        usage: response.data.usage
          ? {
              promptTokens: response.data.usage.prompt_tokens,
              completionTokens: response.data.usage.completion_tokens,
              totalTokens: response.data.usage.total_tokens,
            }
          : undefined,
        raw: response.data,
      };

      await this.persistConversation(chat, dto, result, isNew);

      return {
        ...result,
        chatId: chat.id,
      };
    } catch (error) {
      this.logger.error(
        `Failed to send message to GigaChat: ${
          error?.response?.status ?? error?.message
        }`,
      );
      throw new InternalServerErrorException(
        'Ошибка при обращении к GigaЧату. Попробуйте ещё раз позже.',
      );
    }
  }

  async getChatById(chatId: string): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['user'],
      withDeleted: false, // Не загружаем удаленные чаты
    });

    if (!chat) {
      throw new NotFoundException(`Чат с id ${chatId} не найден`);
    }

    return chat;
  }

  async deleteChat(chatId: string, userId: string): Promise<void> {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['user'],
    });

    if (!chat) {
      throw new NotFoundException(`Чат с id ${chatId} не найден`);
    }

    this.assertChatBelongsToUser(chat, userId);

    // Soft delete - помечаем чат как удаленный
    await this.chatRepository.softDelete(chatId);
  }

  async getMessagesByChatId(chatId: string): Promise<Message[]> {
    const exists = await this.chatRepository.exist({ where: { id: chatId } });

    if (!exists) {
      throw new NotFoundException(`Чат с id ${chatId} не найден`);
    }

    return this.messageRepository.find({
      where: { chat: { id: chatId } },
      order: { createdAt: 'ASC' },
    });
  }

  async getUserChats(userId: string): Promise<Chat[]> {
    await this.getUserOrThrow(userId);

    // Загружаем все чаты пользователя через QueryBuilder с явным указанием связи
    // Исключаем удаленные чаты (soft delete)
    const chats = await this.chatRepository
      .createQueryBuilder('chat')
      .innerJoin('chat.user', 'user')
      .where('user.UserID = :userId', { userId })
      .andWhere('chat.deletedAt IS NULL')
      .orderBy('chat.lastMessageAt', 'DESC', 'NULLS LAST')
      .addOrderBy('chat.createdAt', 'DESC')
      .getMany();

    // Загружаем последние сообщения для каждого чата
    const chatIds = chats.map((chat) => chat.id);
    if (chatIds.length > 0) {
      // Используем QueryBuilder для загрузки последних сообщений через связь chat
      // Загружаем связь chat для доступа к chatId
      const allMessages = await this.messageRepository
        .createQueryBuilder('message')
        .innerJoinAndSelect('message.chat', 'chat')
        .where('chat.id IN (:...chatIds)', { chatIds })
        .orderBy('message.createdAt', 'DESC')
        .getMany();

      // Группируем сообщения по chatId, сохраняя только последнее для каждого чата
      const messagesByChatId = new Map<string, Message>();
      allMessages.forEach((msg) => {
        // Используем chatId из загруженной связи
        const msgChatId = msg.chat?.id;
        if (msgChatId && !messagesByChatId.has(msgChatId)) {
          messagesByChatId.set(msgChatId, msg);
        }
      });

      // Добавляем последнее сообщение к каждому чату
      chats.forEach((chat) => {
        const lastMessage = messagesByChatId.get(chat.id);
        if (lastMessage) {
          chat.messages = [lastMessage];
        }
      });
    }

    return chats;
  }

  private assertChatBelongsToUser(chat: Chat, userId?: string): void {
    if (!userId) {
      return;
    }

    // Проверяем принадлежность через загруженную связь user или через userId
    const chatUserId = chat.user?.UserID || chat.userId;
    if (chatUserId !== userId) {
      throw new NotFoundException(`Чат с id ${chat.id} не найден`);
    }
  }

  private async getUserOrThrow(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { UserID: userId },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с id ${userId} не найден`);
    }

    return user;
  }

  private deriveTitle(source?: string | null): string | null {
    if (!source) {
      return null;
    }

    const trimmed = source.trim();

    if (!trimmed) {
      return null;
    }

    return trimmed.length > 255 ? `${trimmed.slice(0, 252)}...` : trimmed;
  }

  private async resolveChat(
    dto: SendMessageDto,
  ): Promise<{ chat: Chat; isNew: boolean }> {
    if (dto.chatId) {
      // Загружаем чат с явной загрузкой связи user для проверки принадлежности
      // Не загружаем удаленные чаты (soft delete)
      const chat = await this.chatRepository.findOne({
        where: { id: dto.chatId },
        relations: ['user'],
        withDeleted: false,
      });

      if (!chat) {
        throw new NotFoundException(`Чат с id ${dto.chatId} не найден`);
      }

      this.assertChatBelongsToUser(chat, dto.userId);

      return { chat, isNew: false };
    }

    if (dto.conversationId) {
      const existingByConversation = await this.chatRepository.findOne({
        where: { externalConversationId: dto.conversationId },
        relations: ['user'],
        withDeleted: false, // Не загружаем удаленные чаты
      });

      if (existingByConversation) {
        this.assertChatBelongsToUser(existingByConversation, dto.userId);

        return { chat: existingByConversation, isNew: false };
      }
    }

    if (!dto.userId) {
      throw new BadRequestException(
        'Не указан идентификатор пользователя для создания нового чата',
      );
    }

    const user = await this.getUserOrThrow(dto.userId);

    const chat = this.chatRepository.create({
      user,
      title: this.deriveTitle(dto.systemPrompt),
    });

    const savedChat = await this.chatRepository.save(chat);
    savedChat.user = user;
    savedChat.userId = user.UserID;

    return { chat: savedChat, isNew: true };
  }

  private async buildCompletionMessages(
    dto: SendMessageDto,
    chat: Chat,
    isNewChat: boolean,
  ): Promise<
    Array<{
      role: 'system' | 'user' | 'assistant';
      content: string;
    }>
  > {
    if (dto.history?.length) {
      return [...dto.history, { role: 'user', content: dto.message }];
    }

    const existingMessages = await this.messageRepository.find({
      where: { chat: { id: chat.id } },
      order: { createdAt: 'ASC' },
    });

    const history = existingMessages.map((message) => ({
      role: message.role as 'system' | 'user' | 'assistant',
      content: message.content,
    }));

    if (isNewChat && dto.systemPrompt) {
      history.unshift({
        role: 'system',
        content: dto.systemPrompt,
      });
    }

    return [...history, { role: 'user', content: dto.message }];
  }

  private async persistConversation(
    chat: Chat,
    dto: SendMessageDto,
    result: ChatCompletionResult,
    isNewChat: boolean,
  ): Promise<void> {
    const now = new Date();

    await this.chatRepository.manager.transaction(async (manager) => {
      const chatRepo = manager.getRepository(Chat);
      const messageRepo = manager.getRepository(Message);

      const updates: Partial<Chat> = {
        lastMessageAt: now,
      };

      if (
        result.conversationId &&
        result.conversationId !== chat.externalConversationId
      ) {
        updates.externalConversationId = result.conversationId;
      }

      if (isNewChat && !chat.title) {
        const candidateTitle =
          this.deriveTitle(dto.message) ?? this.deriveTitle(dto.systemPrompt);
        if (candidateTitle) {
          updates.title = candidateTitle;
        }
      }

      if (Object.keys(updates).length > 0) {
        await chatRepo.update(chat.id, updates);
        Object.assign(chat, updates);
      }

      const messagesToPersist: Message[] = [];

      if (isNewChat && dto.systemPrompt) {
        messagesToPersist.push(
          messageRepo.create({
            chat,
            role: MessageRole.SYSTEM,
            content: dto.systemPrompt,
          }),
        );
      }

      messagesToPersist.push(
        messageRepo.create({
          chat,
          role: MessageRole.USER,
          content: dto.message,
        }),
      );

      if (result.reply) {
        messagesToPersist.push(
          messageRepo.create({
            chat,
            role: MessageRole.ASSISTANT,
            content: result.reply,
          }),
        );
      }

      if (messagesToPersist.length > 0) {
        await messageRepo.save(messagesToPersist);
      }
    });
  }

  async sendCustomMessage(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    timeout?: number,
  ): Promise<string> {
    const accessToken = await this.ensureAccessToken();

    try {
      const customTimeout = timeout || 60000; // 60 секунд по умолчанию для формирования трека
      const response =
        await this.axiosInstance.post<GigaChatCompletionsResponse>(
          this.chatUrl,
          {
            model: this.model,
            messages,
            stream: false,
          },
          {
            headers: {
              Authorization: `${this.tokenType} ${accessToken}`,
              'Content-Type': 'application/json',
            },
            timeout: customTimeout,
          },
        );

      const choice = response.data.choices?.[0];
      return choice?.message?.content ?? '';
    } catch (error) {
      this.logger.error(
        `Failed to send custom message to GigaChat: ${
          error?.response?.status ?? error?.message
        }`,
      );
      throw new InternalServerErrorException(
        'Ошибка при обращении к GigaЧату. Попробуйте ещё раз позже.',
      );
    }
  }

  private async ensureAccessToken(): Promise<string> {
    const now = Date.now();

    if (this.accessToken && now < this.tokenExpiresAt) {
      return this.accessToken;
    }

    await this.refreshAccessToken();

    if (!this.accessToken) {
      throw new InternalServerErrorException(
        'Не удалось получить токен доступа для GigaЧата.',
      );
    }

    return this.accessToken;
  }

  private async refreshAccessToken(): Promise<void> {
    try {
      const authHeader = this.buildAuthorizationHeader();
      const authorizationHeader = authHeader
        .toLowerCase()
        .startsWith('basic ')
        ? authHeader
        : `Basic ${authHeader}`;
      
      const rqUID = randomUUID();
      this.logger.log(
        `Attempting to refresh GigaChat access token. OAuth URL: ${this.oauthUrl}, Scope: ${this.scope}, RqUID: ${rqUID}`,
      );

      const response = await this.axiosInstance.post<GigaChatTokenResponse>(
        this.oauthUrl,
        `scope=${encodeURIComponent(this.scope)}&grant_type=client_credentials`,
        {
          headers: {
            Authorization: authorizationHeader,
            'Content-Type': 'application/x-www-form-urlencoded',
            RqUID: rqUID,
          },
        },
      );

      const { access_token, expires_at, expires_in, token_type } =
        response.data;

      if (!access_token) {
        this.logger.error(
          'GigaChat response does not contain access_token. Response data:',
          JSON.stringify(response.data),
        );
        throw new InternalServerErrorException(
          'GigaЧат не вернул access_token.',
        );
      }

      this.accessToken = access_token;
      this.tokenType = token_type ?? 'Bearer';

      const expiresAtMs = expires_at
        ? new Date(expires_at).getTime()
        : expires_in
          ? Date.now() + expires_in * 1000
          : Date.now() + 25 * 60 * 1000;

      this.tokenExpiresAt = expiresAtMs - this.tokenRefreshBufferMs;
      
      this.logger.log(
        `GigaChat access token refreshed successfully. Expires at: ${new Date(expiresAtMs).toISOString()}`,
      );
    } catch (error: any) {
      const errorDetails = {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        code: error?.code,
        message: error?.message,
        url: error?.config?.url,
      };

      this.logger.error(
        `Failed to refresh GigaChat access token. Details: ${JSON.stringify(errorDetails)}`,
        error?.stack,
      );

      this.accessToken = null;
      this.tokenExpiresAt = 0;

      // Более информативное сообщение об ошибке
      let errorMessage = 'Не удалось обновить токен доступа GigaЧата.';
      if (error?.response?.status === 401) {
        errorMessage += ' Проверьте правильность GIGACHAT_CLIENT_ID и GIGACHAT_CLIENT_SECRET.';
      } else if (error?.response?.status === 403) {
        errorMessage += ' Доступ запрещен. Проверьте права доступа к GigaChat API.';
      } else if (error?.code === 'ECONNREFUSED' || error?.code === 'ETIMEDOUT') {
        errorMessage += ' Не удалось подключиться к серверу GigaChat. Проверьте сетевые настройки.';
      } else if (error?.response?.data) {
        errorMessage += ` Ответ сервера: ${JSON.stringify(error.response.data)}`;
      }

      throw new InternalServerErrorException(errorMessage);
    }
  }

  private buildAuthorizationHeader(): string {
    const explicitKey =
      this.configService.get<string>('GIGACHAT_AUTH_KEY')?.trim();

    if (explicitKey) {
      this.logger.debug('Using explicit GIGACHAT_AUTH_KEY');
      return explicitKey;
    }

    const clientId = this.configService.get<string>('GIGACHAT_CLIENT_ID')?.trim();
    const clientSecret =
      this.configService.get<string>('GIGACHAT_CLIENT_SECRET')?.trim();

    if (!clientId || !clientSecret) {
      const missingFields: string[] = [];
      if (!clientId) missingFields.push('GIGACHAT_CLIENT_ID');
      if (!clientSecret) missingFields.push('GIGACHAT_CLIENT_SECRET');
      
      this.logger.error(
        `GigaChat credentials not configured. Missing: ${missingFields.join(', ')}. ` +
        `Either set GIGACHAT_AUTH_KEY or provide both GIGACHAT_CLIENT_ID and GIGACHAT_CLIENT_SECRET.`,
      );
      throw new InternalServerErrorException(
        `Данные доступа к GigaЧату не настроены. Отсутствуют: ${missingFields.join(', ')}. ` +
        `Установите GIGACHAT_AUTH_KEY или пару GIGACHAT_CLIENT_ID/GIGACHAT_CLIENT_SECRET.`,
      );
    }

    const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    this.logger.debug('Built authorization header from CLIENT_ID/CLIENT_SECRET');
    return base64Auth;
  }
}
