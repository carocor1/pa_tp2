import { IsDate, IsString, MinLength } from 'class-validator';

export class UpdateMarcaDto {
  @MinLength(2)
  @IsString()
  denominacion?: string;
}
