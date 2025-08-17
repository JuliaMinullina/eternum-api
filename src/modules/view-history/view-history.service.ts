import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewHistory, ViewType } from './view-history.entity';
import { CreateViewHistoryDto } from './dto/create-view-history.dto';

@Injectable()
export class ViewHistoryService {
  constructor(
    @InjectRepository(ViewHistory)
    private viewHistoryRepository: Repository<ViewHistory>,
  ) {}

  async create(createViewHistoryDto: CreateViewHistoryDto, userId: string): Promise<ViewHistory> {
    // Проверяем, есть ли уже запись для этого пользователя и контента
    const existingView = await this.viewHistoryRepository.findOne({
      where: {
        UserID: userId,
        ViewType: createViewHistoryDto.ViewType,
        DisciplineID: createViewHistoryDto.DisciplineID,
        TopicID: createViewHistoryDto.TopicID,
        LessonID: createViewHistoryDto.LessonID,
      },
    });

    if (existingView) {
      // Обновляем время просмотра существующей записи
      existingView.ViewedAt = new Date();
      return this.viewHistoryRepository.save(existingView);
    }

    // Создаем новую запись
    const viewHistory = this.viewHistoryRepository.create({
      ...createViewHistoryDto,
      UserID: userId,
    });
    return this.viewHistoryRepository.save(viewHistory);
  }

  async findByUser(userId: string): Promise<ViewHistory[]> {
    return this.viewHistoryRepository.find({
      where: { UserID: userId },
      order: { ViewedAt: 'DESC' },
    });
  }

  async findByUserAndType(userId: string, viewType: ViewType): Promise<ViewHistory[]> {
    return this.viewHistoryRepository.find({
      where: { UserID: userId, ViewType: viewType },
      order: { ViewedAt: 'DESC' },
    });
  }

  async findRecentByUser(userId: string, limit: number = 10): Promise<ViewHistory[]> {
    return this.viewHistoryRepository.find({
      where: { UserID: userId },
      order: { ViewedAt: 'DESC' },
      take: limit,
      relations: ['discipline', 'topic', 'lesson'],
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const viewHistory = await this.viewHistoryRepository.findOne({
      where: { ViewHistoryID: id },
    });
    if (!viewHistory) {
      throw new NotFoundException(`ViewHistory with ID ${id} not found`);
    }
    if (viewHistory.UserID !== userId) {
      throw new NotFoundException('You can only delete your own view history');
    }
    await this.viewHistoryRepository.remove(viewHistory);
  }

  async clearUserHistory(userId: string): Promise<void> {
    await this.viewHistoryRepository.delete({ UserID: userId });
  }
}
