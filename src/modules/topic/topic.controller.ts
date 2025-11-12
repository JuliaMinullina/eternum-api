import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './topic.entity';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async findAll(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicService.findOne(id);
  }

  @Get('discipline/:disciplineId')
  async findByDiscipline(
    @Param('disciplineId') disciplineId: string,
  ): Promise<Topic[]> {
    return this.topicService.findByDiscipline(disciplineId);
  }

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicService.create(createTopicDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ): Promise<Topic> {
    return this.topicService.update(id, updateTopicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.topicService.remove(id);
  }
}
