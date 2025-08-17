import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DisciplineModule } from './modules/discipline/discipline.module';
import { TopicModule } from './modules/topic/topic.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { ViewHistoryModule } from './modules/view-history/view-history.module';
import { MetaTagModule } from './modules/meta-tag/meta-tag.module';
import { DisciplineMetaTagModule } from './modules/discipline-meta-tag/discipline-meta-tag.module';
import { User } from './modules/user/user.entity';
import { Discipline } from './modules/discipline/discipline.entity';
import { Topic } from './modules/topic/topic.entity';
import { Lesson } from './modules/lesson/lesson.entity';
import { ViewHistory } from './modules/view-history/view-history.entity';
import { MetaTag } from './modules/meta-tag/meta-tag.entity';
import { DisciplineMetaTag } from './entities/discipline-meta-tag.entity';
import { RefreshToken } from './modules/auth/refresh-token.entity';
import { CookieAuthMiddleware } from './modules/auth/middleware/cookie-auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'eternum_db',
      entities: [User, Discipline, Topic, Lesson, ViewHistory, MetaTag, DisciplineMetaTag, RefreshToken],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    DisciplineModule,
    TopicModule,
    LessonModule,
    ViewHistoryModule,
    MetaTagModule,
    DisciplineMetaTagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieAuthMiddleware).forRoutes(':path*');
  }
}
