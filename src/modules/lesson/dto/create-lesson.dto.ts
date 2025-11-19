import {
  IsString,
  IsNotEmpty,
  IsUUID,
  MinLength,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  LessonName: string;

  @IsUUID()
  @IsNotEmpty()
  TopicID: string;

  @IsBoolean()
  @IsOptional()
  IsVerified?: boolean;

  @IsInt()
  @Min(0)
  @IsOptional()
  Order?: number;

  @IsString()
  @IsOptional()
  Description?: string;
}
