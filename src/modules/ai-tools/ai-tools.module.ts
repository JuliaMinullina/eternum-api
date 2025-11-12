import { Module } from '@nestjs/common';
import { AIToolsService } from './ai-tools.service';

@Module({
  providers: [AIToolsService],
  exports: [AIToolsService],
})
export class AIToolsModule {}

