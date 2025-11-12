import { IsString, IsOptional, IsArray, ValidateNested, IsUUID, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class TrackItemDto {
  @IsUUID()
  disciplineId: string;

  @IsUUID()
  @IsOptional()
  topicId?: string | null;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}

export class CreateTrackDto {
  @IsUUID()
  chatId: string;

  @IsString()
  @IsOptional()
  question?: string | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackItemDto)
  trackItems: TrackItemDto[];
}

