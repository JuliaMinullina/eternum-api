import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './lesson.entity';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  async findAll(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Lesson> {
    return this.lessonService.findOne(id);
  }

  @Get('topic/:topicId')
  async findByTopic(@Param('topicId') topicId: string): Promise<Lesson[]> {
    return this.lessonService.findByTopic(topicId);
  }

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonService.create(createLessonDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<Lesson> {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.lessonService.remove(id);
  }
}
