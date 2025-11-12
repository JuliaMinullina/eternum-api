import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_daily_logins')
@Unique(['UserID', 'LoginDate']) // Один вход в день на пользователя
@Index(['UserID', 'LoginDate']) // Индекс для быстрого поиска
export class UserDailyLogin {
  @PrimaryGeneratedColumn('uuid')
  UserDailyLoginID: string;

  @Column({ unique: true })
  ID: number;

  @Column({ type: 'uuid' })
  UserID: string;

  @Column({ type: 'date' })
  LoginDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: User;
}

