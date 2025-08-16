import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaTag } from './meta-tag.entity';
import { MetaTagService } from './meta-tag.service';
import { MetaTagController } from './meta-tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MetaTag])],
  providers: [MetaTagService],
  controllers: [MetaTagController],
  exports: [MetaTagService],
})
export class MetaTagModule {}
