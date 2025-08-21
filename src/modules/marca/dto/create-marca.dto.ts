import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMarcaDto {
  @ApiProperty({
    description: 'Denominación de la marca, será transformada a mayúsculas.',
    example: 'NIKE',
  })
  @MinLength(2, {
    message: 'La denominación debe tener al menos 2 caracteres.',
  })
  @IsNotEmpty({ message: 'La denominación es obligatoria.' })
  @IsString({ message: 'La denominación debe ser un texto.' })
  denominacion: string;
}
