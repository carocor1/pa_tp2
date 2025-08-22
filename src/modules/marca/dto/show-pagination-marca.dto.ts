import { Expose, Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { ShowMarcaDto } from './show-marca.dto';

export class ShowPaginationMarcaDto {
  @Expose()
  @Type(() => ShowMarcaDto)
  marcas: ShowMarcaDto[];

  @Expose()
  @IsInt()
  total: number;

  @Expose()
  page: number;

  @Expose()
  lastPage: number;
}
