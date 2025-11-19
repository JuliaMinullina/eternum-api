import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { LessonID: id },
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async findByTopic(topicId: string): Promise<Lesson[]> {
    const lessons = await this.lessonRepository.find({
      where: { TopicID: topicId },
    });
    
    // Сортируем: сначала по Order (NULL в конец), затем по CreatedAt
    return lessons.sort((a, b) => {
      if (a.Order !== null && b.Order !== null) {
        return a.Order - b.Order;
      }
      if (a.Order !== null) return -1;
      if (b.Order !== null) return 1;
      return a.CreatedAt.getTime() - b.CreatedAt.getTime();
    });
  }

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = this.lessonRepository.create(createLessonDto);
    return this.lessonRepository.save(lesson);
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);
    Object.assign(lesson, updateLessonDto);
    return this.lessonRepository.save(lesson);
  }

  async remove(id: string): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }
}
