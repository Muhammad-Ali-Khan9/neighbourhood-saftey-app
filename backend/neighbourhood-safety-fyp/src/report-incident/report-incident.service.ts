import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReportIncidentDto } from './dto/create-report-incident.dto';
import { UpdateReportIncidentDto } from './dto/update-report-incident.dto';
import { Repository } from 'typeorm';
import { ReportIncident } from './entities/report-incident.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

@Injectable()
export class ReportIncidentService {
  constructor(
    @InjectRepository(ReportIncident)
    private reportIncidentRepository: Repository<ReportIncident>,
  ) {}
  
  async create(dto: CreateReportIncidentDto): Promise<ReportIncident> {
    try {
      console.log("Received DTO:", dto);
      let folderName: string | null = null;
      
      if (dto.images && dto.images.length > 0) {
        folderName = `./incidents/${Date.now()}-${Math.random().toString(36).substring(7)}`;
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName, { recursive: true });
        }
  
        const imageUrls = await Promise.all(
          dto.images.map(async (image, index) => {
            const base64Data = image;
            console.log("Image data:", base64Data);
            const fileName = `image-${index + 1}.jpg`;
            const filePath = `${folderName}/${fileName}`;
            
            // Save the image to local folder
            await fs.promises.writeFile(filePath, base64Data, 'base64');
            return filePath;
          })
        );
        dto.imageUrl = imageUrls.join(',');
      }
  
      // Create the incident. We assume that dto.userId exists.
      const incident = this.reportIncidentRepository.create({
        type: dto.type,
        datetime: dto.datetime,
        location: dto.location,
        latitude: dto.latitude,
        longitude: dto.longitude,
        description: dto.description,
        imageUrl: folderName || null, // If no images, set imageUrl to null
        status: 'Pending',
        user: { id: dto.userId }
        // Assuming user association is handled elsewhere or added in another step.
      });
  
      const savedIncident = await this.reportIncidentRepository.save(incident);
      console.log("Incident saved:", savedIncident);
      return savedIncident;
    } catch (err) {
      console.log("Error in create incident:", err);
      throw new InternalServerErrorException(err);
    }
  }

  async findAll() {
    try {
      return await this.reportIncidentRepository.find();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} reportIncident`;
  }

  async update(id: number, updateReportIncidentDto: UpdateReportIncidentDto): Promise<ReportIncident> {
    try {
      // Preload the existing incident with the new data
      const incident = await this.reportIncidentRepository.preload({
        id,
        ...updateReportIncidentDto,
      });
      if (!incident) {
        throw new NotFoundException(`ReportIncident with id ${id} not found`);
      }
      const updatedIncident = await this.reportIncidentRepository.save(incident);
      return updatedIncident;
    } catch (err) {
      console.error("Error updating incident:", err);
      throw new InternalServerErrorException(err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} reportIncident`;
  }
}
