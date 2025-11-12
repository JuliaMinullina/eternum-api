import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendedTrack } from './recommended-track.entity';
import { TrackItem } from './track-item.entity';
import { RecommendedTrackService } from './recommended-track.service';
import { RecommendedTrackController } from './recommended-track.controller';
import { Chat } from '../chat/chat.entity';
import { Message } from '../chat/message.entity';
import { User } from '../user/user.entity';
import { Discipline } from '../discipline/discipline.entity';
import { Topic } from '../topic/topic.entity';
import { ChatModule } from '../chat/chat.module';
import { AIToolsModule } from '../ai-tools/ai-tools.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecommendedTrack,
      TrackItem,
      Chat,
      Message,
      User,
      Discipline,
      Topic,
    ]),
    ChatModule,
    AIToolsModule,
  ],
  controllers: [RecommendedTrackController],
  providers: [RecommendedTrackService],
  exports: [RecommendedTrackService],
})
export class RecommendedTrackModule {}

