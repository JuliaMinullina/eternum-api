import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  JoinColumn,
} from 'typeorm';
import { RecommendedTrack } from './recommended-track.entity';
import { Discipline } from '../discipline/discipline.entity';
import { Topic } from '../topic/topic.entity';

@Entity('track_items')
export class TrackItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  trackId: string;

  @ManyToOne(() => RecommendedTrack, (track) => track.trackItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trackId' })
  track: RecommendedTrack;

  @ManyToOne(() => Discipline, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'disciplineId', referencedColumnName: 'DisciplineID' })
  discipline: Discipline;

  @RelationId((item: TrackItem) => item.discipline)
  disciplineId: string;

  @ManyToOne(() => Topic, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'topicId', referencedColumnName: 'TopicID' })
  topic: Topic | null;

  @RelationId((item: TrackItem) => item.topic)
  topicId: string | null;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;
}

