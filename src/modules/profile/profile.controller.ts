import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MetaTagService } from '../meta-tag/meta-tag.service';

@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly metaTagService: MetaTagService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@Request() req): Promise<Profile> {
    return this.profileService.findByUserId(req.user.UserID);
  }

  @UseGuards(JwtAuthGuard)
  @Get('interests/list')
  async getInterestsList() {
    // Получаем все метатеги дисциплин (включая расширенные)
    const metaTags = await this.metaTagService.findAll();

    return metaTags.map(tag => ({
      code: tag.MetaTagCode,
      name: tag.MetaTagName,
    }));
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateMyProfile(
    @Request() req,
    @Body() updateDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profileService.updateProfile(req.user.UserID, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string): Promise<Profile> {
    const profile = await this.profileService.findOne(id);
    
    // Проверяем, что пользователь запрашивает свой профиль
    if (profile.UserID !== req.user.UserID) {
      throw new ForbiddenException('Access denied');
    }
    
    return profile;
  }
}

