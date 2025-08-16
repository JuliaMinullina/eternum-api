import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

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
}
