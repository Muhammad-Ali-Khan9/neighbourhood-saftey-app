import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Entity()
export class ReportIncident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  type: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'double precision' })
  longitude: number;

  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'timestamp' })
  datetime: Date;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ type: 'text' })
  status: string;

  @ManyToOne(() => User, (user) => user.incidentsReported)
  user: User;

  @OneToMany(() => Notification, (notification) => notification.incident)
  notifications: Notification[];
}
