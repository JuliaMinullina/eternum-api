import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  LessonID: string;

  @Column({ unique: true })
  ID: number;

  @Column({ length: 255 })
  LessonName: string;

  @Column({ type: 'uuid' })
  TopicID: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @ManyToOne('Topic', 'Lessons')
  @JoinColumn({ name: 'TopicID' })
  topic: any;
}
