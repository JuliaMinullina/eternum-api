import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisciplineMetaTag } from '../../entities/discipline-meta-tag.entity';

@Injectable()
export class DisciplineMetaTagService {
  constructor(
    @InjectRepository(DisciplineMetaTag)
    private disciplineMetaTagRepository: Repository<DisciplineMetaTag>,
  ) {}

  async findByDisciplineId(disciplineId: string): Promise<DisciplineMetaTag[]> {
    return this.disciplineMetaTagRepository.find({
      where: { DisciplineID: disciplineId },
      relations: ['metaTag'],
    });
  }

  async findByMetaTagCode(metaTagCode: string): Promise<DisciplineMetaTag[]> {
    return this.disciplineMetaTagRepository.find({
      where: { MetaTagCode: metaTagCode },
      relations: ['discipline'],
    });
  }

  async create(disciplineId: string, metaTagCode: string): Promise<DisciplineMetaTag> {
    const disciplineMetaTag = this.disciplineMetaTagRepository.create({
      DisciplineID: disciplineId,
      MetaTagCode: metaTagCode,
    });
    return this.disciplineMetaTagRepository.save(disciplineMetaTag);
  }

  async delete(disciplineId: string, metaTagCode: string): Promise<void> {
    await this.disciplineMetaTagRepository.delete({
      DisciplineID: disciplineId,
      MetaTagCode: metaTagCode,
    });
  }

  async deleteByDisciplineId(disciplineId: string): Promise<void> {
    await this.disciplineMetaTagRepository.delete({ DisciplineID: disciplineId });
  }
}
