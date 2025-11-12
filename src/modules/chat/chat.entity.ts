import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from '../user/user.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.chats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'UserID' })
  user: User;

  @RelationId((chat: Chat) => chat.user)
  userId: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  title: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true, default: null })
  externalConversationId: string | null;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  lastMessageAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @OneToOne('RecommendedTrack', 'chat')
  recommendedTrack: any;
}
