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
  findOne(id: number): Promise<Marca>;
  update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<Marca>;
  softDelete(id: number): Promise<void>;
}
