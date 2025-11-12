import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  BeforeInsert,
} from 'typeorm';
import { Chat } from './chat.entity';

export enum MessageRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MessageRole })
  role: MessageRole;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, {
    onDelete: 'CASCADE',
  })
  @Index()
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @RelationId((message: Message) => message.chat)
  chatId: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    // Устанавливаем время по Москве (UTC+3)
    // Получаем текущее UTC время
    const now = new Date();
    const utcTimestamp = now.getTime();
    
    // Москва UTC+3, добавляем 3 часа к UTC времени
    // Это создаст дату, которая при интерпретации как UTC будет показывать московское время
    const moscowOffsetMs = 3 * 60 * 60 * 1000;
    this.createdAt = new Date(utcTimestamp + moscowOffsetMs);
  }
}
