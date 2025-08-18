import { Controller, Get, Post, Body, Delete, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ViewHistoryService } from './view-history.service';
import { CreateViewHistoryDto } from './dto/create-view-history.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ViewHistory, ViewType } from './view-history.entity';

@Controller('view-history')
export class ViewHistoryController {
  constructor(private readonly viewHistoryService: ViewHistoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findByUser(@Request() req): Promise<ViewHistory[]> {
    return this.viewHistoryService.findByUser(req.user.UserID);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() createViewHistoryDto: CreateViewHistoryDto,
  ): Promise<ViewHistory> {
    return this.viewHistoryService.create(createViewHistoryDto, req.user.UserID);
  }

  @Post('topic/:topicId')
  @UseGuards(JwtAuthGuard)
  async recordTopicView(
    @Request() req,
    @Param('topicId') topicId: string,
    @Body() body: { disciplineId: string },
  ): Promise<ViewHistory> {
    const createViewHistoryDto: CreateViewHistoryDto = {
      ViewType: ViewType.TOPIC,
      DisciplineID: body.disciplineId,
      TopicID: topicId,
      LessonID: undefined,
    };
    return this.viewHistoryService.create(createViewHistoryDto, req.user.UserID);
  }

  @Post('discipline/:disciplineId')
  @UseGuards(JwtAuthGuard)
  async recordDisciplineView(
    @Request() req,
    @Param('disciplineId') disciplineId: string,
  ): Promise<ViewHistory> {
    const createViewHistoryDto: CreateViewHistoryDto = {
      ViewType: ViewType.DISCIPLINE,
      DisciplineID: disciplineId,
      TopicID: undefined,
      LessonID: undefined,
    };
    return this.viewHistoryService.create(createViewHistoryDto, req.user.UserID);
  }

  @Post('lesson/:lessonId')
  @UseGuards(JwtAuthGuard)
  async recordLessonView(
    @Request() req,
    @Param('lessonId') lessonId: string,
    @Body() body: { disciplineId: string; topicId: string },
  ): Promise<ViewHistory> {
    const createViewHistoryDto: CreateViewHistoryDto = {
      ViewType: ViewType.LESSON,
      DisciplineID: body.disciplineId,
      TopicID: body.topicId,
      LessonID: lessonId,
    };
    return this.viewHistoryService.create(createViewHistoryDto, req.user.UserID);
  }

  @Get('recent')
  @UseGuards(JwtAuthGuard)
  async getRecentViews(
    @Request() req,
    @Query('limit') limit: number = 10,
  ): Promise<ViewHistory[]> {
    return this.viewHistoryService.findRecentByUser(req.user.UserID, limit);
  }

  @Get('type/:viewType')
  @UseGuards(JwtAuthGuard)
  async findByUserAndType(
    @Request() req,
    @Param('viewType') viewType: ViewType,
  ): Promise<ViewHistory[]> {
    return this.viewHistoryService.findByUserAndType(req.user.UserID, viewType);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req, @Param('id') id: string): Promise<void> {
    return this.viewHistoryService.remove(id, req.user.UserID);
  }

  @Delete('my/clear')
  @UseGuards(JwtAuthGuard)
  async clearUserHistory(@Request() req): Promise<void> {
    return this.viewHistoryService.clearUserHistory(req.user.UserID);
  }
}
