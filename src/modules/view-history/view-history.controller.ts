import { Controller, Get, Post, Body, Delete, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ViewHistoryService } from './view-history.service';
import { CreateViewHistoryDto } from './dto/create-view-history.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ViewHistory, ViewType } from './view-history.entity';

@Controller('view-history')
@UseGuards(JwtAuthGuard)
export class ViewHistoryController {
  constructor(private readonly viewHistoryService: ViewHistoryService) {}

  @Get()
  async findByUser(@Request() req): Promise<ViewHistory[]> {
    return this.viewHistoryService.findByUser(req.user.UserID);
  }

  @Post()
  async create(
    @Request() req,
    @Body() createViewHistoryDto: CreateViewHistoryDto,
  ): Promise<ViewHistory> {
    return this.viewHistoryService.create(createViewHistoryDto, req.user.UserID);
  }

  @Get('recent')
  async getRecentViews(
    @Request() req,
    @Query('limit') limit: number = 10,
  ): Promise<ViewHistory[]> {
    return this.viewHistoryService.findRecentByUser(req.user.UserID, limit);
  }

  @Get('type/:viewType')
  async findByUserAndType(
    @Request() req,
    @Param('viewType') viewType: ViewType,
  ): Promise<ViewHistory[]> {
    return this.viewHistoryService.findByUserAndType(req.user.UserID, viewType);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string): Promise<void> {
    return this.viewHistoryService.remove(id, req.user.UserID);
  }

  @Delete('my/clear')
  async clearUserHistory(@Request() req): Promise<void> {
    return this.viewHistoryService.clearUserHistory(req.user.UserID);
  }
}
