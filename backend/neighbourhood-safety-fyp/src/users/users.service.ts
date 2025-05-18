import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(dto.password, saltOrRounds);

      const user = this.userRepository.create({
        firstName: dto.firstName,
        email: dto.email,
        lastName: dto.lastName,
        role: dto.role,
        password: hash,
        phoneNumber: dto.phoneNumber,
      });

      await this.userRepository.save(user);

      const { password, ...result } = user;

      return result;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }
  async login(dto: LoginUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.email },
      });

      if (!user) throw new NotFoundException();

      const isMatch = await bcrypt.compare(dto.password, user.password);

      if (!isMatch) throw new UnauthorizedException();

      const { password, ...result } = user;

      const payload = { sub: user.email };

      return result;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // If password is provided, hash it.
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    // Preload the user entity with updated values.
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    
    return await this.userRepository.save(user);
  }
}
