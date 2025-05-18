// notifications/notifications.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ReportIncident } from 'src/report-incident/entities/report-incident.entity';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    // Create the notification while associating it with an incident and user via their IDs
    const notification = this.notificationsRepository.create({
      message: createNotificationDto.message,
      isRead: createNotificationDto.isRead ?? false,
      incident: { id: createNotificationDto.incidentId } as ReportIncident,
      user: { id: createNotificationDto.userId } as User,
    });
    return this.notificationsRepository.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationsRepository.find({
      relations: ['incident', 'user'],
    });
  }

  async findByUser(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { user: { id: userId } },
      relations: ['incident', 'user'],
    });
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    notification.isRead = true;
    return this.notificationsRepository.save(notification);
  }
}
