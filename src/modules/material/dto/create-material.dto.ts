import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { MaterialType, MaterialSourceType } from '../material.entity';

export class CreateMaterialDto {
  @IsUUID()
  @IsNotEmpty()
  LessonID: string;

  @IsEnum(MaterialType)
  @IsNotEmpty()
  MaterialType: MaterialType;

  @IsEnum(MaterialSourceType)
  @IsOptional()
  SourceType?: MaterialSourceType;

  @IsString()
  @IsNotEmpty()
  Content: string; // Текст или URL/путь к файлу

  @IsString()
  @IsOptional()
  FileName?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  FileSize?: number;

  @IsString()
  @IsOptional()
  MimeType?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  Order?: number;
}

