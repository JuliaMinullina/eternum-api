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
    return this.lessonRepository.find({
      where: { TopicID: topicId },
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
