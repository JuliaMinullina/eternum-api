import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  UserName: string;

  @IsString()
  @MinLength(2)
  UserSurname: string;

  @IsEmail()
  Email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
