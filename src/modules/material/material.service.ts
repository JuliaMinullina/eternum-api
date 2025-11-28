import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material, MaterialSourceType } from './material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  async findAll(): Promise<Material[]> {
    return this.materialRepository.find({
      order: { Order: 'ASC', CreatedAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { MaterialID: id },
    });
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async findByLesson(lessonId: string): Promise<Material[]> {
    const materials = await this.materialRepository.find({
      where: { LessonID: lessonId },
      order: { Order: 'ASC', CreatedAt: 'ASC' },
    });
    return materials;
  }

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    // Если SourceType не указан, устанавливаем ORIGINAL по умолчанию
    const materialData = {
      ...createMaterialDto,
      SourceType: createMaterialDto.SourceType || MaterialSourceType.ORIGINAL,
    };
    const material = this.materialRepository.create(materialData);
    return this.materialRepository.save(material);
  }

  async update(
    id: string,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    const material = await this.findOne(id);
    Object.assign(material, updateMaterialDto);
    return this.materialRepository.save(material);
  }

  async remove(id: string): Promise<void> {
    const material = await this.findOne(id);
    await this.materialRepository.remove(material);
  }
}

