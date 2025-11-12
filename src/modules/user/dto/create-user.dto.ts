import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
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

  @IsOptional()
  @IsEnum(UserRole)
  Role?: UserRole;

  @IsOptional()
  @IsString()
  isActive?: boolean;
}
