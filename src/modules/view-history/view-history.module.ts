import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewHistory } from './view-history.entity';
import { ViewHistoryService } from './view-history.service';
import { ViewHistoryController } from './view-history.controller';
import { Topic } from '../topic/topic.entity';
import { Discipline } from '../discipline/discipline.entity';
import { DisciplineMetaTag } from '../../entities/discipline-meta-tag.entity';
import { MetaTag } from '../meta-tag/meta-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ViewHistory,
      Topic,
      Discipline,
      DisciplineMetaTag,
      MetaTag,
    ]),
  ],
  controllers: [ViewHistoryController],
  providers: [ViewHistoryService],
  exports: [ViewHistoryService],
})
export class ViewHistoryModule {}
