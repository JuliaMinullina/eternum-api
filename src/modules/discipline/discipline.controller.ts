import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
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
  async findAllWithMetaTags(): Promise<{
    success: boolean;
    message: string;
    data: any[];
    timestamp: string;
  }> {
    const disciplines = await this.disciplineService.findAll();
    
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
    
    return {
      success: true,
      message: 'Disciplines with meta tags retrieved successfully',
      data: serializedDisciplines,
      timestamp: new Date().toISOString(),
    };
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
