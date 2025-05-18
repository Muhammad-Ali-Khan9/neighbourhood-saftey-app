import { Body, Controller, Post, Patch, Param } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}


  @Post('/register')
  register(@Body() dto: RegisterUserDto) {
    return this.service.register(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginUserDto) {
    return this.service.login(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.service.updateUser(+id, updateUserDto);
  }
}