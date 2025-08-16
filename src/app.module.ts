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
import { CorsMiddleware } from './common/middleware/cors.middleware';
import { User } from './modules/user/user.entity';
import { Discipline } from './modules/discipline/discipline.entity';
import { Topic } from './modules/topic/topic.entity';
import { Lesson } from './modules/lesson/lesson.entity';
import { ViewHistory } from './modules/view-history/view-history.entity';

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
      entities: [User, Discipline, Topic, Lesson, ViewHistory],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    DisciplineModule,
    TopicModule,
    LessonModule,
    ViewHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
