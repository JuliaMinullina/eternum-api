import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum ViewType {
  DISCIPLINE = 'discipline',
  TOPIC = 'topic',
  LESSON = 'lesson',
}

@Entity('view_history')
export class ViewHistory {
  @PrimaryGeneratedColumn('uuid')
  ViewHistoryID: string;

  @Column({ unique: true })
  ID: number;

  @Column({ type: 'uuid' })
  UserID: string;

  @Column({
    type: 'enum',
    enum: ViewType,
  })
  ViewType: ViewType;

  @Column({ type: 'uuid', nullable: true })
  DisciplineID: string;

  @Column({ type: 'uuid', nullable: true })
  TopicID: string;

  @Column({ type: 'uuid', nullable: true })
  LessonID: string;

  @CreateDateColumn()
  ViewedAt: Date;

  @ManyToOne('User', 'viewHistory')
  @JoinColumn({ name: 'UserID' })
  user: any;

  @ManyToOne('Discipline')
  @JoinColumn({ name: 'DisciplineID' })
  discipline: any;

  @ManyToOne('Topic')
  @JoinColumn({ name: 'TopicID' })
  topic: any;

  @ManyToOne('Lesson')
  @JoinColumn({ name: 'LessonID' })
  lesson: any;
}
