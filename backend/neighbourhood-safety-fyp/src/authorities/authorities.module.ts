import { Module } from '@nestjs/common';
import { AuthoritiesService } from './authorities.service';
import { AuthoritiesController } from './authorities.controller';
import { Authority } from './entities/authority.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Authority])],
  controllers: [AuthoritiesController],
  providers: [AuthoritiesService],
})
export class AuthoritiesModule {}
