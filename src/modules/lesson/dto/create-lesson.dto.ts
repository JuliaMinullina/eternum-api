import { IsString, IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  LessonName: string;

  @IsUUID()
  @IsNotEmpty()
  TopicID: string;
}
