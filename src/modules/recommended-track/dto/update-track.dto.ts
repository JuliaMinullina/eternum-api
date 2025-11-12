import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TrackItemDto } from './create-track.dto';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  question?: string | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackItemDto)
  @IsOptional()
  trackItems?: TrackItemDto[];
}

