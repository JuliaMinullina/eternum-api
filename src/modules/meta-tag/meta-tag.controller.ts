import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MetaTagService } from './meta-tag.service';
import { MetaTag } from './meta-tag.entity';

@Controller('meta-tags')
export class MetaTagController {
  constructor(private readonly metaTagService: MetaTagService) {}

  @Get()
  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: MetaTag[];
    timestamp: string;
  }> {
    try {
      const metaTags = await this.metaTagService.findAll();
      return {
        success: true,
        message: 'Meta tags retrieved successfully',
        data: metaTags || [],
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error in findAll meta tags:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error retrieving meta tags',
        data: [],
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get(':code')
  async findByCode(@Param('code') code: string): Promise<{
    success: boolean;
    message: string;
    data: MetaTag | null;
    timestamp: string;
  }> {
    const metaTag = await this.metaTagService.findByCode(code);
    return {
      success: true,
      message: 'Meta tag retrieved successfully',
      data: metaTag,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  async create(@Body() metaTag: Partial<MetaTag>): Promise<{
    success: boolean;
    message: string;
    data: MetaTag;
    timestamp: string;
  }> {
    const newMetaTag = await this.metaTagService.create(metaTag);
    return {
      success: true,
      message: 'Meta tag created successfully',
      data: newMetaTag,
      timestamp: new Date().toISOString(),
    };
  }

  @Put(':code')
  async update(
    @Param('code') code: string,
    @Body() metaTag: Partial<MetaTag>,
  ): Promise<{
    success: boolean;
    message: string;
    data: MetaTag | null;
    timestamp: string;
  }> {
    const updatedMetaTag = await this.metaTagService.update(code, metaTag);
    return {
      success: true,
      message: 'Meta tag updated successfully',
      data: updatedMetaTag,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':code')
  async delete(
    @Param('code') code: string,
  ): Promise<{ success: boolean; message: string; timestamp: string }> {
    await this.metaTagService.delete(code);
    return {
      success: true,
      message: 'Meta tag deleted successfully',
      timestamp: new Date().toISOString(),
    };
  }
}
