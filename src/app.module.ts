import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminSeedGuard } from './common/guards/admin-seed.guard';
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
import { Chat } from './modules/chat/chat.entity';
import { Message } from './modules/chat/message.entity';
import { CookieAuthMiddleware } from './modules/auth/middleware/cookie-auth.middleware';
import { ChatModule } from './modules/chat/chat.module';
import { RecommendedTrack } from './modules/recommended-track/recommended-track.entity';
import { TrackItem } from './modules/recommended-track/track-item.entity';
import { RecommendedTrackModule } from './modules/recommended-track/recommended-track.module';
import { UserDailyLogin } from './modules/user/user-daily-login.entity';
import { ProfileModule } from './modules/profile/profile.module';
import { Profile } from './modules/profile/profile.entity';
import { MaterialModule } from './modules/material/material.module';
import { Material } from './modules/material/material.entity';

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
      entities: [
        User,
        Discipline,
        Topic,
        Lesson,
        ViewHistory,
        MetaTag,
        DisciplineMetaTag,
        RefreshToken,
        Chat,
        Message,
        RecommendedTrack,
        TrackItem,
        UserDailyLogin,
        Profile,
        Material,
      ],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: false, // Миграции запускаются вручную через start.sh
      synchronize: false,
      // Настройки для обработки ошибок подключения
      retryAttempts: 0, // Не пытаемся переподключаться при старте
      retryDelay: 0,
      // Не падаем при ошибках подключения, обрабатываем их в запросах
      extra: {
        max: 20,
        connectionTimeoutMillis: 500, // Очень быстрый таймаут - 0.5 секунды
        idleTimeoutMillis: 30000,
      },
      // Продолжаем работу даже при ошибках подключения
      autoLoadEntities: true,
      // Не валидируем подключение при старте
      logging: false, // Отключаем логирование для быстрого старта
    }),
    UserModule,
    AuthModule,
    DisciplineModule,
    TopicModule,
    LessonModule,
    ViewHistoryModule,
    MetaTagModule,
    DisciplineMetaTagModule,
    ChatModule,
    RecommendedTrackModule,
    ProfileModule,
    MaterialModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminSeedGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Cookie-based auth removed; rely on Authorization headers only
  }
}
