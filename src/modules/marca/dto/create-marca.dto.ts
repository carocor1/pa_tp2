import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMarcaDto {
  @MinLength(2, {
    message: 'La denominación debe tener al menos 2 caracteres.',
  })
  @IsNotEmpty({ message: 'La denominación es obligatoria.' })
  @IsString({ message: 'La denominación debe ser un texto.' })
  denominacion: string;
}
