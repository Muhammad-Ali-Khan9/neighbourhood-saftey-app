import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterUserDto {
  email: string;

  firstName: string;

  lastName: string;

  password: string;

  phoneNumber: string;

  role: string;
}