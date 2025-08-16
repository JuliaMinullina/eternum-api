import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async findAll(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  async findOne(id: string): Promise<Topic> {
    const topic = await this.topicRepository.findOne({
      where: { TopicID: id },
    });
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }

  async findByDiscipline(disciplineId: string): Promise<Topic[]> {
    return this.topicRepository.find({
      where: { DisciplineID: disciplineId },
    });
  }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const topic = this.topicRepository.create(createTopicDto);
    return this.topicRepository.save(topic);
  }

  async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const topic = await this.findOne(id);
    Object.assign(topic, updateTopicDto);
    return this.topicRepository.save(topic);
  }

  async remove(id: string): Promise<void> {
    const topic = await this.findOne(id);
    await this.topicRepository.remove(topic);
  }
}
