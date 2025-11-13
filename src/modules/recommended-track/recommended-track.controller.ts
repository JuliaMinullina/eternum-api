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
    // TransformInterceptor автоматически обернет ответ
    return await this.trackService.create(dto, req.user.UserID);
  }

  @Get('chat/:chatId')
  async findByChatId(
    @Param('chatId', new ParseUUIDPipe()) chatId: string,
  ) {
    // TransformInterceptor автоматически обернет ответ
    return await this.trackService.findByChatId(chatId);
  }

  @Get('user/me')
  async findByUserId(@Request() req) {
    // TransformInterceptor автоматически обернет ответ
    return await this.trackService.findByUserId(req.user.UserID);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    // TransformInterceptor автоматически обернет ответ
    return await this.trackService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTrackDto,
    @Request() req,
  ) {
    // TransformInterceptor автоматически обернет ответ
    return await this.trackService.update(id, dto, req.user.UserID);
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req,
  ) {
    await this.trackService.delete(id, req.user.UserID);
    // TransformInterceptor автоматически обернет ответ
    return { message: 'Трек успешно удален' };
  }
}

