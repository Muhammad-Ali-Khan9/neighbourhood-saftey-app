import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReportIncidentModule } from './report-incident/report-incident.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CommentsModule } from './comments/comments.module';
import { AuthoritiesModule } from './authorities/authorities.module';
import { User } from './users/entities/users.entity';
import { ReportIncident } from './report-incident/entities/report-incident.entity';
import { Comment } from './comments/entities/comment.entity';
import { Notification } from './notifications/entities/notification.entity';
import { Authority } from './authorities/entities/authority.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'incident-app',
      password: 'postgres',
      entities: [User, ReportIncident, Comment, Notification, Authority],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ReportIncidentModule,
    NotificationsModule,
    CommentsModule,
    AuthoritiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
