// comments/dto/create-comment.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  // IDs for the related entities
  @IsNotEmpty()
  @IsNumber()
  incidentId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}