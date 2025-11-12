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
    return this.disciplineRepository.find({
      relations: ['disciplineMetaTags', 'disciplineMetaTags.metaTag'],
    });
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
