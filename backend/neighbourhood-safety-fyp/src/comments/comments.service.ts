// comments/comments.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ReportIncident } from 'src/report-incident/entities/report-incident.entity';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  // Create a new comment
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const comment = this.commentsRepository.create({
        message: createCommentDto.message,
        isRead: createCommentDto.isRead ?? false,
        // Associate comment with incident and user by using their IDs
        incident: { id: createCommentDto.incidentId } as ReportIncident,
        user: { id: createCommentDto.userId } as User,
      });
      return await this.commentsRepository.save(comment);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create comment');
    }
  }

  async findByIncident(incidentId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { incident: { id: incidentId } },
    });
  }  

  // Fetch all comments with related incident and user data
  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({
      relations: ['incident', 'user'],
    });
  }

  // Get a single comment by id
  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['incident', 'user'],
    });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }

  // Update an existing comment
  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    Object.assign(comment, updateCommentDto);
    return await this.commentsRepository.save(comment);
  }

  // Delete a comment by id
  async remove(id: number): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }
}