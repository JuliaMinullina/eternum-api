import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChatPage(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(this.buildChatPageHtml());
  }

  @Get(':chatId/messages')
  async getChatMessages(@Param('chatId', new ParseUUIDPipe()) chatId: string) {
    const messages = await this.chatService.getMessagesByChatId(chatId);

    return {
      success: true,
      message: 'Сообщения чата получены',
      data: messages,
    };
  }

  @Get(':chatId')
  async getChatById(@Param('chatId', new ParseUUIDPipe()) chatId: string) {
    const chat = await this.chatService.getChatById(chatId);

    return {
      success: true,
      message: 'Чат получен',
      data: chat,
    };
  }

  @Post()
  async createChat(@Body() dto: CreateChatDto) {
    const chat = await this.chatService.createChat(dto);

    return {
      success: true,
      message: 'Чат создан',
      data: chat,
    };
  }

  @Post(':chatId/messages')
  async sendMessageToChat(
    @Param('chatId', new ParseUUIDPipe()) chatId: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.processSendMessage({
      ...dto,
      chatId,
    });
  }

  @Post('message')
  async sendMessage(@Body() dto: SendMessageDto) {
    return this.processSendMessage(dto);
  }

  private async processSendMessage(dto: SendMessageDto) {
    const result = await this.chatService.sendMessage(dto);

    return {
      success: true,
      message: 'Ответ от GigaЧата получен',
      data: result,
    };
  }

  private buildChatPageHtml(): string {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Чат с GigaЧатом</title>
  <style>
    :root {
      color-scheme: light dark;
      --background: #0f172a;
      --surface: #1e293b;
      --surface-alt: #27364f;
      --accent: #38bdf8;
      --accent-hover: #0ea5e9;
      --text-primary: #f8fafc;
      --text-secondary: #cbd5f5;
      --border: rgba(148, 163, 184, 0.2);
      --user-message: #172554;
      --assistant-message: #1e293b;
      --error: #f87171;
    }
    * {
      box-sizing: border-box;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    body {
      margin: 0;
      min-height: 100vh;
      background: radial-gradient(circle at top, rgba(56, 189, 248, 0.2), transparent 55%),
                  radial-gradient(circle at bottom, rgba(56, 189, 248, 0.15), transparent 60%),
                  var(--background);
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .chat-wrapper {
      width: min(960px, 100%);
      height: min(720px, 90vh);
      background: rgba(15, 23, 42, 0.78);
      border: 1px solid var(--border);
      border-radius: 24px;
      backdrop-filter: blur(18px);
      box-shadow:
        0 25px 50px -12px rgba(15, 23, 42, 0.75),
        0 0 0 1px rgba(148, 163, 184, 0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    header {
      padding: 1.5rem 2rem 1.1rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.3));
    }
    header .title {
      font-size: 1.35rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      letter-spacing: 0.02em;
    }
    header .status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      color: var(--text-secondary);
    }
    header .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: var(--accent);
      position: relative;
    }
    header .status-dot::after {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: inherit;
      background: rgba(56, 189, 248, 0.35);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(0.8); opacity: 0.8; }
      50% { transform: scale(1.1); opacity: 0.2; }
      100% { transform: scale(0.8); opacity: 0.8; }
    }
    main {
      flex: 1;
      overflow-y: auto;
      padding: 1.8rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .message {
      display: flex;
      gap: 1rem;
      padding: 1.1rem 1.4rem;
      border-radius: 18px;
      background: var(--assistant-message);
      border: 1px solid rgba(148, 163, 184, 0.12);
      position: relative;
      transition: transform 0.2s ease, border 0.2s ease;
      box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.8);
    }
    .message.user {
      background: var(--user-message);
      margin-left: auto;
      border-bottom-right-radius: 6px;
    }
    .message.assistant {
      margin-right: auto;
      border-bottom-left-radius: 6px;
    }
    .message:hover {
      transform: translateY(-1px);
      border-color: rgba(56, 189, 248, 0.3);
    }
    .message .role {
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .message .content {
      white-space: pre-wrap;
      line-height: 1.65;
      color: var(--text-secondary);
      font-size: 1rem;
    }
    .typing-indicator {
      display: inline-flex;
      gap: 0.35rem;
      align-items: center;
    }
    .typing-indicator span {
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
      animation: blink 1.4s infinite ease-in-out;
    }
    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes blink {
      0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
      40% { opacity: 1; transform: translateY(-2px); }
    }
    footer {
      padding: 1.5rem 2rem 1.8rem;
      border-top: 1px solid var(--border);
      background: linear-gradient(180deg, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.75));
    }
    form {
      display: flex;
      gap: 0.75rem;
      align-items: flex-end;
    }
    textarea {
      flex: 1;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 18px;
      padding: 1rem 1.25rem;
      font-size: 1rem;
      color: var(--text-primary);
      resize: none;
      min-height: 56px;
      max-height: 180px;
      transition: border 0.2s ease, background 0.2s ease;
      outline: none;
    }
    textarea:focus {
      border-color: rgba(56, 189, 248, 0.6);
      background: rgba(30, 41, 59, 0.9);
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.15);
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      background: linear-gradient(135deg, var(--accent), var(--accent-hover));
      color: #0f172a;
      font-weight: 600;
      border: none;
      border-radius: 16px;
      padding: 0.9rem 1.4rem;
      cursor: pointer;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
      min-width: 120px;
      box-shadow: 0 12px 25px -10px rgba(56, 189, 248, 0.6);
    }
    button:hover {
      transform: translateY(-1px) scale(1.01);
      box-shadow: 0 14px 35px -12px rgba(56, 189, 248, 0.65);
    }
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    .error {
      color: var(--error);
      margin: 0.5rem 0 0;
      font-size: 0.9rem;
    }
    .helper {
      margin-top: 0.75rem;
      font-size: 0.85rem;
      color: rgba(203, 213, 225, 0.65);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .helper span {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .helper code {
      background: rgba(15, 23, 42, 0.7);
      padding: 0.15rem 0.45rem;
      border-radius: 8px;
      font-size: 0.8rem;
      border: 1px solid rgba(148, 163, 184, 0.25);
    }
    @media (max-width: 768px) {
      body { padding: 1rem; }
      .chat-wrapper { height: calc(100vh - 2rem); border-radius: 18px; }
      header, main, footer { padding: 1.25rem; }
    }
  </style>
</head>
<body>
  <div class="chat-wrapper">
    <header>
      <div class="title">
        <span>🪄</span>
        <span>GigaЧат ассистент</span>
      </div>
      <div class="status">
        <span class="status-dot"></span>
        <span id="status-text">Готов к работе</span>
      </div>
    </header>
    <main id="chat-log">
      <div class="message assistant">
        <div class="content">
          <div class="role">GigaЧат</div>
          <p>Привет! Я готов помочь. Задайте вопрос или опишите задачу, и я постараюсь ответить максимально полезно.</p>
        </div>
      </div>
    </main>
    <footer>
      <form id="chat-form">
        <textarea
          id="prompt"
          placeholder="Напишите сообщение и нажмите Enter или кнопку «Отправить»…"
          autocomplete="off"
        ></textarea>
        <button type="submit">
          <span>Отправить</span>
          <span aria-hidden="true">⮕</span>
        </button>
      </form>
      <div class="helper">
        <span>Совет: описывайте контекст как можно подробнее.</span>
        <span><code>Shift + Enter</code> — новая строка</span>
      </div>
      <p class="error" id="error" hidden></p>
    </footer>
  </div>
  <script>
    (() => {
      const chatLog = document.getElementById('chat-log');
      const form = document.getElementById('chat-form');
      const prompt = document.getElementById('prompt');
      const errorEl = document.getElementById('error');
      const statusText = document.getElementById('status-text');
      let isSending = false;
      let conversationId = null;

      const createMessageBubble = (role, content, isTyping = false) => {
        const bubble = document.createElement('div');
        bubble.className = \`message \${role}\`;
        bubble.innerHTML = \`
          <div class="content">
            <div class="role">\${role === 'user' ? 'Вы' : 'GigaЧат'}</div>
            \${isTyping
              ? '<div class="typing-indicator"><span></span><span></span><span></span></div>'
              : '<p>' + content + '</p>'}
          </div>
        \`;
        return bubble;
      };

      const scrollToBottom = () => {
        requestAnimationFrame(() => {
          chatLog.scrollTop = chatLog.scrollHeight;
        });
      };

      const setLoading = (value) => {
        isSending = value;
        form.querySelector('button').disabled = value;
        statusText.textContent = value ? 'ГигаЧат печатает…' : 'Готов к работе';
      };

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (isSending) return;

        const message = prompt.value.trim();
        if (!message) return;

        errorEl.hidden = true;
        prompt.value = '';

        const userBubble = createMessageBubble('user', message);
        chatLog.appendChild(userBubble);

        const typingBubble = createMessageBubble('assistant', '', true);
        chatLog.appendChild(typingBubble);
        scrollToBottom();

        setLoading(true);

        try {
          const response = await fetch('/chat/message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              message,
              conversationId,
            }),
          });

          if (!response.ok) {
            throw new Error('Ошибка сети');
          }

          const payload = await response.json();
          const assistantReply = payload?.data?.reply || 'Не удалось получить ответ.';
          conversationId = payload?.data?.conversationId ?? conversationId;

          typingBubble.innerHTML = \`
            <div class="content">
              <div class="role">GigaЧат</div>
              <p>\${assistantReply}</p>
            </div>
          \`;
        } catch (error) {
          typingBubble.remove();
          const errorBubble = createMessageBubble('assistant', 'Произошла ошибка при обращении к GigaЧату. Попробуйте снова.');
          chatLog.appendChild(errorBubble);
          errorEl.textContent = error.message || 'Не удалось отправить сообщение.';
          errorEl.hidden = false;
        } finally {
          setLoading(false);
          scrollToBottom();
        }
      });

      prompt.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          form.requestSubmit();
        }
      });
    })();
  </script>
</body>
</html>`;
  }
}
