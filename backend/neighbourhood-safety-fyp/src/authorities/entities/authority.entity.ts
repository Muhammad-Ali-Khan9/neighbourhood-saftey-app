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
export class Authority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  jurisdictionArea: string;

  @OneToOne(() => User, (user) => user.authority)
  user: User;
}
