import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

@Controller('disciplines')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Get()
  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: any[];
    timestamp: string;
  }> {
    const disciplines = await this.disciplineService.findAll();
    return {
      success: true,
      message: 'Disciplines retrieved successfully',
      data: disciplines,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('with-meta-tags')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllWithMetaTags(): Promise<{
    success: boolean;
    message: string;
    data: any[];
    timestamp: string;
  }> {
    const disciplines = await this.disciplineService.findAll();
    
    // Логирование ДО сериализации
    const exampleWithTags = disciplines.find(d => d.disciplineMetaTags && d.disciplineMetaTags.length > 0);
    if (exampleWithTags) {
      console.log('[Controller] BEFORE serialization - Example discipline:', {
        name: exampleWithTags.DisciplineName,
        tagsCount: exampleWithTags.disciplineMetaTags.length,
        firstTag: exampleWithTags.disciplineMetaTags[0] ? {
          code: exampleWithTags.disciplineMetaTags[0].MetaTagCode,
          metaTagName: exampleWithTags.disciplineMetaTags[0].metaTag?.MetaTagName
        } : null
      });
    }
    
    // Явная сериализация для сохранения вложенных объектов
    const serializedDisciplines = disciplines.map(discipline => ({
      DisciplineID: discipline.DisciplineID,
      ID: discipline.ID,
      DisciplineName: discipline.DisciplineName,
      CreatedAt: discipline.CreatedAt,
      UpdatedAt: discipline.UpdatedAt,
      disciplineMetaTags: (discipline.disciplineMetaTags || []).map(dmt => ({
        DisciplineID: dmt.DisciplineID,
        MetaTagCode: dmt.MetaTagCode,
        ID: dmt.ID,
        CreatedAt: dmt.CreatedAt,
        metaTag: dmt.metaTag ? {
          MetaTagCode: dmt.metaTag.MetaTagCode,
          ID: dmt.metaTag.ID,
          MetaTagName: dmt.metaTag.MetaTagName,
          CreatedAt: dmt.metaTag.CreatedAt,
          UpdatedAt: dmt.metaTag.UpdatedAt,
        } : null,
      })),
    }));
    
    // Логирование ПОСЛЕ сериализации
    const serializedExample = serializedDisciplines.find(d => d.disciplineMetaTags && d.disciplineMetaTags.length > 0);
    if (serializedExample) {
      console.log('[Controller] AFTER serialization - Example discipline:', {
        name: serializedExample.DisciplineName,
        tagsCount: serializedExample.disciplineMetaTags.length,
        firstTag: serializedExample.disciplineMetaTags[0]
      });
    } else {
      console.log('[Controller] WARNING: No disciplines with tags after serialization!');
    }
    
    const response = {
      success: true,
      message: 'Disciplines with meta tags retrieved successfully',
      data: serializedDisciplines,
      timestamp: new Date().toISOString(),
    };
    
    console.log('[Controller] Response data length:', response.data.length);
    console.log('[Controller] Response first discipline:', JSON.stringify(response.data[0]).substring(0, 200));
    
    return response;
  }

  @Get('by-meta-tag/:metaTagCode')
  async findByMetaTag(@Param('metaTagCode') metaTagCode: string): Promise<{
    success: boolean;
    message: string;
    data: any[];
    timestamp: string;
  }> {
    const disciplines = await this.disciplineService.findByMetaTag(metaTagCode);
    return {
      success: true,
      message: `Disciplines with meta tag ${metaTagCode} retrieved successfully`,
      data: disciplines,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{
    success: boolean;
    message: string;
    data: any;
    timestamp: string;
  }> {
    const discipline = await this.disciplineService.findOne(id);
    return {
      success: true,
      message: 'Discipline retrieved successfully',
      data: discipline,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  async create(@Body() createDisciplineDto: CreateDisciplineDto): Promise<{
    success: boolean;
    message: string;
    data: any;
    timestamp: string;
  }> {
    const discipline = await this.disciplineService.create(createDisciplineDto);
    return {
      success: true,
      message: 'Discipline created successfully',
      data: discipline,
      timestamp: new Date().toISOString(),
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDisciplineDto: UpdateDisciplineDto,
  ): Promise<{
    success: boolean;
    message: string;
    data: any;
    timestamp: string;
  }> {
    const discipline = await this.disciplineService.update(
      id,
      updateDisciplineDto,
    );
    return {
      success: true,
      message: 'Discipline updated successfully',
      data: discipline,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string; timestamp: string }> {
    await this.disciplineService.remove(id);
    return {
      success: true,
      message: 'Discipline deleted successfully',
      timestamp: new Date().toISOString(),
    };
  }
}
