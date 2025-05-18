import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportIncident } from 'src/report-incident/entities/report-incident.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Authority } from 'src/authorities/entities/authority.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column({ type: 'text', default: 'user' })
  role: string;

  @OneToMany(() => ReportIncident, (reportIncident) => reportIncident.user)
  incidentsReported: ReportIncident[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToOne(() => Authority, (authority) => authority.user)
  authority: Authority;
}