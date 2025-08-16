import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { Discipline } from './discipline.entity';

@Controller('disciplines')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Get()
  async findAll(): Promise<Discipline[]> {
    return this.disciplineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Discipline> {
    return this.disciplineService.findOne(id);
  }

  @Post()
  async create(@Body() createDisciplineDto: CreateDisciplineDto): Promise<Discipline> {
    return this.disciplineService.create(createDisciplineDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDisciplineDto: UpdateDisciplineDto,
  ): Promise<Discipline> {
    return this.disciplineService.update(id, updateDisciplineDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.disciplineService.remove(id);
  }
}
