import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateChatDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  context?: string;
}
