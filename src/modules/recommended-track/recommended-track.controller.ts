import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RecommendedTrackService } from './recommended-track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('recommended-tracks')
@UseGuards(JwtAuthGuard)
export class RecommendedTrackController {
  constructor(
    private readonly trackService: RecommendedTrackService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateTrackDto,
    @Request() req,
  ) {
    const track = await this.trackService.create(dto, req.user.UserID);

    return {
      success: true,
      message: 'Трек успешно создан',
      data: track,
    };
  }

  @Get('chat/:chatId')
  async findByChatId(
    @Param('chatId', new ParseUUIDPipe()) chatId: string,
  ) {
    const track = await this.trackService.findByChatId(chatId);

    return {
      success: true,
      message: 'Трек получен',
      data: track,
    };
  }

  @Get('user/me')
  async findByUserId(@Request() req) {
    const tracks = await this.trackService.findByUserId(req.user.UserID);

    return {
      success: true,
      message: 'Треки пользователя получены',
      data: tracks,
    };
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.findOne(id);

    return {
      success: true,
      message: 'Трек получен',
      data: track,
    };
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTrackDto,
    @Request() req,
  ) {
    const track = await this.trackService.update(id, dto, req.user.UserID);

    return {
      success: true,
      message: 'Трек успешно обновлен',
      data: track,
    };
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req,
  ) {
    await this.trackService.delete(id, req.user.UserID);

    return {
      success: true,
      message: 'Трек успешно удален',
    };
  }
}

