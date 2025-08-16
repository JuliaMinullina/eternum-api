import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ViewType } from '../view-history.entity';

export class CreateViewHistoryDto {
  @IsEnum(ViewType)
  ViewType: ViewType;

  @IsOptional()
  @IsUUID()
  DisciplineID?: string;

  @IsOptional()
  @IsUUID()
  TopicID?: string;

  @IsOptional()
  @IsUUID()
  LessonID?: string;
}
