import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { AgeRange } from './enums/age-range.enum';
import { LearningFeature } from './enums/learning-feature.enum';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  ProfileID: string;

  @Column({ unique: true })
  ID: number;

  @Column({ unique: true })
  UserID: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: User;

  @Column({
    type: 'enum',
    enum: AgeRange,
    nullable: true,
  })
  ageRange?: AgeRange;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  interests?: string[]; // Массив кодов метатегов

  @Column({
    type: 'enum',
    enum: LearningFeature,
    array: true,
    nullable: true,
  })
  learningFeatures?: LearningFeature[]; // Массив особенностей обучения

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

