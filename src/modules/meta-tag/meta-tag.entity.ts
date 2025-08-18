import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { DisciplineMetaTag } from '../../entities/discipline-meta-tag.entity';

@Entity('meta_tags')
export class MetaTag {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  MetaTagCode: string;

  @Column({ unique: true })
  ID: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  MetaTagName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;

  @OneToMany(() => DisciplineMetaTag, disciplineMetaTag => disciplineMetaTag.metaTag)
  disciplineMetaTags: DisciplineMetaTag[];
}
