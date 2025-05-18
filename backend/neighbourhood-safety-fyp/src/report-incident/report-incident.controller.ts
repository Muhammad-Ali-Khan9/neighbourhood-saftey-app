import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportIncidentService } from './report-incident.service';
import { CreateReportIncidentDto } from './dto/create-report-incident.dto';
import { UpdateReportIncidentDto } from './dto/update-report-incident.dto';

@Controller('report-incident')
export class ReportIncidentController {
  constructor(private readonly reportIncidentService: ReportIncidentService) {}

  @Post()
  create(@Body() dto: CreateReportIncidentDto) {
    return this.reportIncidentService.create(dto);
  }

  @Get()
  findAll() {
    return this.reportIncidentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportIncidentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReportIncidentDto: UpdateReportIncidentDto,
  ) {
    return this.reportIncidentService.update(+id, updateReportIncidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportIncidentService.remove(+id);
  }
}