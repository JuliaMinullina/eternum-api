import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Not, IsNull } from 'typeorm';
import { ViewHistory, ViewType } from './view-history.entity';
import { CreateViewHistoryDto } from './dto/create-view-history.dto';
import { Topic } from '../topic/topic.entity';
import { Discipline } from '../discipline/discipline.entity';
import { DisciplineMetaTag } from '../../entities/discipline-meta-tag.entity';
import { MetaTag } from '../meta-tag/meta-tag.entity';
import { TrackItem } from '../recommended-track/track-item.entity';
import { RecommendedTrack } from '../recommended-track/recommended-track.entity';

@Injectable()
export class ViewHistoryService {
  constructor(
    @InjectRepository(ViewHistory)
    private viewHistoryRepository: Repository<ViewHistory>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
    @InjectRepository(DisciplineMetaTag)
    private disciplineMetaTagRepository: Repository<DisciplineMetaTag>,
    @InjectRepository(MetaTag)
    private metaTagRepository: Repository<MetaTag>,
    @InjectRepository(TrackItem)
    private trackItemRepository: Repository<TrackItem>,
    @InjectRepository(RecommendedTrack)
    private recommendedTrackRepository: Repository<RecommendedTrack>,
  ) {}

  async create(
    createViewHistoryDto: CreateViewHistoryDto,
    userId: string,
  ): Promise<ViewHistory> {
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

  async findByUserAndType(
    userId: string,
    viewType: ViewType,
  ): Promise<ViewHistory[]> {
    return this.viewHistoryRepository.find({
      where: { UserID: userId, ViewType: viewType },
      order: { ViewedAt: 'DESC' },
    });
  }

  async findRecentByUser(
    userId: string,
    limit: number = 10,
  ): Promise<ViewHistory[]> {
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

  // Сохранение артефакта при старте изучения темы
  async recordTopicStart(userId: string, topicId: string): Promise<void> {
    const topic = await this.topicRepository.findOne({
      where: { TopicID: topicId },
    });
    if (!topic) throw new NotFoundException('Topic not found');

    // 1) Уникальная тема
    const existingTopicView = await this.viewHistoryRepository.findOne({
      where: {
        UserID: userId,
        ViewType: ViewType.TOPIC,
        TopicID: topic.TopicID,
      },
    });
    if (!existingTopicView) {
      await this.viewHistoryRepository.save(
        this.viewHistoryRepository.create({
          UserID: userId,
          ViewType: ViewType.TOPIC,
          TopicID: topic.TopicID,
          DisciplineID: topic.DisciplineID,
        }),
      );
    }

    // 2) Уникальная дисциплина
    const existingDisciplineView = await this.viewHistoryRepository.findOne({
      where: {
        UserID: userId,
        ViewType: ViewType.DISCIPLINE,
        DisciplineID: topic.DisciplineID,
      },
    });
    if (!existingDisciplineView) {
      await this.viewHistoryRepository.save(
        this.viewHistoryRepository.create({
          UserID: userId,
          ViewType: ViewType.DISCIPLINE,
          DisciplineID: topic.DisciplineID,
        }),
      );
    }

    // 3) Уникальные метатеги дисциплины
    const disciplineMetaTags = await this.disciplineMetaTagRepository.find({
      where: { DisciplineID: topic.DisciplineID },
    });
    if (disciplineMetaTags.length > 0) {
      // Сохраняем по одному следу на метатег, используя ViewType.DISCIPLINE и поле DisciplineID
      // Для выборки уникальных метатегов по пользователю будем использовать joins к discipline_meta_tags
      // Здесь только гарантируем, что дисциплина записана (уже сделано выше)
    }
  }

  // Уникальные списки по пользователю
  async getUniqueVisitedTopics(userId: string): Promise<Topic[]> {
    const views = await this.viewHistoryRepository.find({
      where: { UserID: userId, ViewType: ViewType.TOPIC },
    });
    const topicIds = [
      ...new Set(views.map((v) => v.TopicID).filter(Boolean)),
    ] as string[];
    if (topicIds.length === 0) return [];
    return this.topicRepository.find({ where: { TopicID: In(topicIds) } });
  }

  async getUniqueVisitedDisciplines(userId: string): Promise<Discipline[]> {
    try {
      const views = await this.viewHistoryRepository.find({
        where: { UserID: userId, ViewType: ViewType.DISCIPLINE },
      });
      const disciplineIds = [
        ...new Set(views.map((v) => v.DisciplineID).filter(Boolean)),
      ] as string[];
      if (disciplineIds.length === 0) return [];
      return await this.disciplineRepository.find({
        where: { DisciplineID: In(disciplineIds) },
        relations: ['disciplineMetaTags', 'disciplineMetaTags.metaTag'],
      });
    } catch (error: any) {
      console.error('Error in getUniqueVisitedDisciplines:', error);
      // Если это ошибка базы данных, возвращаем пустой массив
      if (error?.message?.includes('could not write init file') || 
          error?.message?.includes('connection') ||
          error?.code === 'ECONNREFUSED' ||
          error?.code === 'ENOTFOUND') {
        console.warn('Database error in getUniqueVisitedDisciplines, returning empty array');
        return [];
      }
      throw error;
    }
  }

  async getUniqueVisitedMetaTags(userId: string): Promise<MetaTag[]> {
    // Берем уникальные дисциплины пользователя, затем маппим на метатеги
    const disciplines = await this.getUniqueVisitedDisciplines(userId);
    if (disciplines.length === 0) return [];
    const disciplineIds = disciplines.map((d) => d.DisciplineID);
    const disciplineMetaTags = await this.disciplineMetaTagRepository.find({
      where: { DisciplineID: In(disciplineIds) },
    });
    const metaTagCodes = [
      ...new Set(disciplineMetaTags.map((dmt) => dmt.MetaTagCode)),
    ];
    if (metaTagCodes.length === 0) return [];
    return this.metaTagRepository.find({
      where: { MetaTagCode: In(metaTagCodes) },
    });
  }

  /**
   * Получить топ-5 рекомендуемых дисциплин для пользователя
   * На основе частоты посещений страниц дисциплин и частоты появления в рекомендуемых треках
   */
  async getTopRecommendedDisciplines(
    userId: string,
    limit: number = 5,
  ): Promise<Discipline[]> {
    // 1. Подсчитываем частоту посещений дисциплин
    // Учитываем все типы посещений (discipline, topic, lesson), которые связаны с дисциплиной
    const allViews = await this.viewHistoryRepository.find({
      where: {
        UserID: userId,
        DisciplineID: Not(IsNull()),
      },
    });

    const viewCounts = new Map<string, number>();
    allViews.forEach((view) => {
      if (view.DisciplineID) {
        viewCounts.set(
          view.DisciplineID,
          (viewCounts.get(view.DisciplineID) || 0) + 1,
        );
      }
    });

    // 2. Подсчитываем частоту появления дисциплин в рекомендуемых треках пользователя
    const userTracks = await this.recommendedTrackRepository.find({
      where: { userId },
      relations: ['trackItems'],
    });

    const trackCounts = new Map<string, number>();
    userTracks.forEach((track) => {
      if (track.trackItems) {
        track.trackItems.forEach((item) => {
          if (item.disciplineId) {
            trackCounts.set(
              item.disciplineId,
              (trackCounts.get(item.disciplineId) || 0) + 1,
            );
          }
        });
      }
    });

    // 3. Объединяем показатели: посещения (вес 1) + треки (вес 1)
    const disciplineScores = new Map<string, number>();
    
    // Добавляем баллы за посещения
    viewCounts.forEach((count, disciplineId) => {
      disciplineScores.set(disciplineId, count);
    });

    // Добавляем баллы за треки
    trackCounts.forEach((count, disciplineId) => {
      const currentScore = disciplineScores.get(disciplineId) || 0;
      disciplineScores.set(disciplineId, currentScore + count);
    });

    // 4. Сортируем по убыванию баллов и берем топ-N
    const sortedDisciplineIds = Array.from(disciplineScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([disciplineId]) => disciplineId);

    if (sortedDisciplineIds.length === 0) {
      return [];
    }

    // 5. Получаем полные данные о дисциплинах
    const disciplines = await this.disciplineRepository.find({
      where: { DisciplineID: In(sortedDisciplineIds) },
      relations: ['disciplineMetaTags', 'disciplineMetaTags.metaTag'],
    });

    // Сохраняем порядок из sortedDisciplineIds
    const disciplineMap = new Map(
      disciplines.map((d) => [d.DisciplineID, d]),
    );
    return sortedDisciplineIds
      .map((id) => disciplineMap.get(id))
      .filter((d): d is Discipline => d !== undefined);
  }
}
