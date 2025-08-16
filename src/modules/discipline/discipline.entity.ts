import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { DisciplineMetaTag } from '../../entities/discipline-meta-tag.entity';

@Entity('disciplines')
export class Discipline {
  @PrimaryGeneratedColumn('uuid')
  DisciplineID: string;

  @Column({ length: 255 })
  DisciplineName: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @OneToMany('Topic', 'discipline')
  Topics: any[];

  @OneToMany(() => DisciplineMetaTag, disciplineMetaTag => disciplineMetaTag.discipline)
  disciplineMetaTags: DisciplineMetaTag[];
}
