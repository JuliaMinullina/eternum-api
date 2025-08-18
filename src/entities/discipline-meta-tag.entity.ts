import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Discipline } from '../modules/discipline/discipline.entity';
import { MetaTag } from '../modules/meta-tag/meta-tag.entity';

@Entity('discipline_meta_tags')
export class DisciplineMetaTag {
  @PrimaryColumn({ type: 'uuid' })
  DisciplineID: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  MetaTagCode: string;

  @Column({ unique: true })
  ID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @ManyToOne(() => Discipline, discipline => discipline.disciplineMetaTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'DisciplineID' })
  discipline: Discipline;

  @ManyToOne(() => MetaTag, metaTag => metaTag.disciplineMetaTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'MetaTagCode' })
  metaTag: MetaTag;
}
