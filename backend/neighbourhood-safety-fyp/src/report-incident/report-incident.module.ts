import { Module } from '@nestjs/common';
import { ReportIncidentService } from './report-incident.service';
import { ReportIncidentController } from './report-incident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportIncident } from './entities/report-incident.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReportIncident])],
  controllers: [ReportIncidentController],
  providers: [ReportIncidentService],
})
export class ReportIncidentModule {}
