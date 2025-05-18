import { PartialType } from '@nestjs/mapped-types';
import { CreateReportIncidentDto } from './create-report-incident.dto';

export class UpdateReportIncidentDto extends PartialType(CreateReportIncidentDto) {}
