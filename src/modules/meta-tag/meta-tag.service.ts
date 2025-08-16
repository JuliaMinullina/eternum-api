import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaTag } from './meta-tag.entity';

@Injectable()
export class MetaTagService {
  constructor(
    @InjectRepository(MetaTag)
    private metaTagRepository: Repository<MetaTag>,
  ) {}

  async findAll(): Promise<MetaTag[]> {
    return this.metaTagRepository.find();
  }

  async findByCode(code: string): Promise<MetaTag | null> {
    return this.metaTagRepository.findOne({ where: { MetaTagCode: code } });
  }

  async create(metaTag: Partial<MetaTag>): Promise<MetaTag> {
    const newMetaTag = this.metaTagRepository.create(metaTag);
    return this.metaTagRepository.save(newMetaTag);
  }

  async update(code: string, metaTag: Partial<MetaTag>): Promise<MetaTag | null> {
    await this.metaTagRepository.update(code, metaTag);
    return this.findByCode(code);
  }

  async delete(code: string): Promise<void> {
    await this.metaTagRepository.delete(code);
  }
}
