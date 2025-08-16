import { IsString, MinLength } from 'class-validator';

export class CreateDisciplineDto {
  @IsString()
  @MinLength(2)
  DisciplineName: string;
}
