import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User } from '../user/user.entity';
import { MetaTagModule } from '../meta-tag/meta-tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    MetaTagModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}

