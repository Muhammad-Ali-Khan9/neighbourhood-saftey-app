// notifications/dto/create-notification.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsNotEmpty()
  @IsNumber()
  incidentId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}