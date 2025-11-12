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
import { TrackItem } from './track-item.entity';

@Entity('recommended_tracks')
export class RecommendedTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  chatId: string;

  @OneToOne('Chat', 'recommendedTrack', {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'chatId' })
  chat: any;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne('User', 'recommendedTracks', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'UserID' })
  user: any;

  @Column({ type: 'text', nullable: true })
  question: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TrackItem, (trackItem) => trackItem.track, {
    cascade: true,
  })
  trackItems: TrackItem[];
}

