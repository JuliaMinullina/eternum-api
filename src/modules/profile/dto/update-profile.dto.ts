import { IsEmail, IsString, IsOptional, MinLength, Matches, IsEnum, IsArray } from 'class-validator';
import { AgeRange } from '../enums/age-range.enum';
import { LearningFeature } from '../enums/learning-feature.enum';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  Email?: string;

  @IsOptional()
  @IsString()
  currentPassword?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Пароль должен содержать не менее 8 символов' })
  @Matches(/[A-ZА-Я]/, { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
  @Matches(/[a-zа-я]/, { message: 'Пароль должен содержать хотя бы одну строчную букву' })
  @Matches(/\d/, { message: 'Пароль должен содержать хотя бы одну цифру' })
  @Matches(/[^A-Za-zА-Яа-я0-9]/, { message: 'Пароль должен содержать хотя бы один специальный символ' })
  newPassword?: string;

  @IsOptional()
  @IsEnum(AgeRange)
  ageRange?: AgeRange;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(LearningFeature, { each: true })
  learningFeatures?: LearningFeature[];
}

