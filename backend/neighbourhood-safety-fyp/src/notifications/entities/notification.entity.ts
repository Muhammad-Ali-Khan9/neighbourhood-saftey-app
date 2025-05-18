import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportIncident } from 'src/report-incident/entities/report-incident.entity';
import { User } from 'src/users/entities/users.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @ManyToOne(
    () => ReportIncident,
    (reportIncident) => reportIncident.notifications,
  )
  incident: ReportIncident;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
