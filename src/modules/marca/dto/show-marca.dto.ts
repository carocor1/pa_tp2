import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class ShowMarcaDto {
  @Expose()
  @IsInt()
  id: number;

  @Expose()
  @IsString()
  denominacion: string;
}
