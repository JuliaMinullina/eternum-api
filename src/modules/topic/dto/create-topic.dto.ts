import { IsString, IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  TopicName: string;

  @IsUUID()
  @IsNotEmpty()
  DisciplineID: string;
}
