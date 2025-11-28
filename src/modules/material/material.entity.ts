import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum MaterialType {
  TEXT = 'text',
  VIDEO = 'video',
  IMAGE = 'image',
  AUDIO = 'audio',
  FILE = 'file',
}

export enum MaterialSourceType {
  ORIGINAL = 'original',
  ADAPTED = 'adapted',
}

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn('uuid')
  MaterialID: string;

  @Column({ unique: true })
  ID: number;

  @Column({ type: 'uuid' })
  LessonID: string;

  @Column({
    type: 'enum',
    enum: MaterialType,
  })
  MaterialType: MaterialType;

  @Column({
    type: 'enum',
    enum: MaterialSourceType,
    default: MaterialSourceType.ORIGINAL,
  })
  SourceType: MaterialSourceType;

  @Column({ type: 'text' })
  Content: string; // Для текста - сам текст, для остальных - URL или путь к файлу

  @Column({ type: 'varchar', length: 255, nullable: true })
  FileName: string; // Имя файла (для файлов, изображений, видео, аудио)

  @Column({ type: 'int', nullable: true })
  FileSize: number; // Размер файла в байтах

  @Column({ type: 'varchar', length: 100, nullable: true })
  MimeType: string; // MIME тип файла

  @Column({ type: 'int', nullable: true })
  Order: number; // Порядок материала в уроке

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @ManyToOne('Lesson', 'Materials')
  @JoinColumn({ name: 'LessonID' })
  lesson: any;
}

