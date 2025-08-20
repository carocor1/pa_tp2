import { IsDate, IsString, MinLength } from 'class-validator';

export class CreateMarcaDto {
  @MinLength(2)
  @IsString()
  denominacion: string;
}
