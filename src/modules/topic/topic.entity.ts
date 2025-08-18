import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  TopicID: string;

  @Column({ unique: true })
  ID: number;

  @Column({ length: 255 })
  TopicName: string;

  @Column({ type: 'uuid' })
  DisciplineID: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @ManyToOne('Discipline', 'Topics')
  @JoinColumn({ name: 'DisciplineID' })
  discipline: any;

  @OneToMany('Lesson', 'topic')
  Lessons: any[];
}
