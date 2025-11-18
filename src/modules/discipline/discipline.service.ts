import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from './discipline.entity';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
  ) {}

  async findAll(): Promise<Discipline[]> {
    // Используем QueryBuilder для явной загрузки relations
    const disciplines = await this.disciplineRepository
      .createQueryBuilder('discipline')
      .leftJoinAndSelect('discipline.disciplineMetaTags', 'disciplineMetaTag')
      .leftJoinAndSelect('disciplineMetaTag.metaTag', 'metaTag')
      .orderBy('discipline.ID', 'ASC')
      .getMany();
    
    // Логирование для диагностики
    console.log(`[DisciplineService] Found ${disciplines.length} disciplines`);
    const withTags = disciplines.filter(d => d.disciplineMetaTags && d.disciplineMetaTags.length > 0);
    console.log(`[DisciplineService] Disciplines with meta tags: ${withTags.length}`);
    if (withTags.length > 0) {
      console.log(`[DisciplineService] Example discipline with tags:`, {
        name: withTags[0].DisciplineName,
        tagsCount: withTags[0].disciplineMetaTags?.length,
        tags: withTags[0].disciplineMetaTags?.map(t => ({
          code: t.MetaTagCode,
          metaTagName: t.metaTag?.MetaTagName
        }))
      });
    } else {
      // Проверяем, есть ли вообще данные в таблице
      const testDiscipline = disciplines[0];
      if (testDiscipline) {
        console.log(`[DisciplineService] Example discipline (no tags):`, {
          name: testDiscipline.DisciplineName,
          id: testDiscipline.DisciplineID,
          disciplineMetaTags: testDiscipline.disciplineMetaTags
        });
      }
    }
    
    return disciplines;
  }

  async findOne(id: string): Promise<Discipline> {
    const discipline = await this.disciplineRepository.findOne({
      where: { DisciplineID: id },
      relations: ['disciplineMetaTags', 'disciplineMetaTags.metaTag'],
    });
    if (!discipline) {
      throw new NotFoundException(`Discipline with ID ${id} not found`);
    }
    return discipline;
  }

  async create(createDisciplineDto: CreateDisciplineDto): Promise<Discipline> {
    const discipline = this.disciplineRepository.create(createDisciplineDto);
    return this.disciplineRepository.save(discipline);
  }

  async update(
    id: string,
    updateDisciplineDto: UpdateDisciplineDto,
  ): Promise<Discipline> {
    const discipline = await this.findOne(id);
    Object.assign(discipline, updateDisciplineDto);
    return this.disciplineRepository.save(discipline);
  }

  async remove(id: string): Promise<void> {
    const discipline = await this.findOne(id);
    await this.disciplineRepository.remove(discipline);
  }

  async findByMetaTag(metaTagCode: string): Promise<Discipline[]> {
    return this.disciplineRepository
      .createQueryBuilder('discipline')
      .leftJoinAndSelect('discipline.disciplineMetaTags', 'disciplineMetaTag')
      .leftJoinAndSelect('disciplineMetaTag.metaTag', 'metaTag')
      .where('metaTag.MetaTagCode = :metaTagCode', { metaTagCode })
      .getMany();
  }
}
