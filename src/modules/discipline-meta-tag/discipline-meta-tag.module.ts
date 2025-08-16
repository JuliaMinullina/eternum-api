import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineMetaTag } from '../../entities/discipline-meta-tag.entity';
import { DisciplineMetaTagService } from './discipline-meta-tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([DisciplineMetaTag])],
  providers: [DisciplineMetaTagService],
  exports: [DisciplineMetaTagService],
})
export class DisciplineMetaTagModule {}
