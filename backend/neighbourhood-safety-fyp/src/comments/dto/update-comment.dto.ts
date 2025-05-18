// comments/dto/update-comment.dto.ts
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}