import { UpdateResult } from 'typeorm';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';
import { Marca } from '../entities/marca.entity';

export interface IMarcaRepository {
  create(createMarcaDto: CreateMarcaDto): Promise<Marca>;
  findAllPaginated(
    page: number,
    limit: number,
  ): Promise<{
    marcas: Marca[];
    total: number;
    page: number;
    lastPage: number;
  }>;
  findOne(id: number): Promise<Marca | null>;
  findByDenominacion(denominacion: string): Promise<Marca | null>;
  update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<UpdateResult>;
  softDelete(id: number): Promise<void>;
}
