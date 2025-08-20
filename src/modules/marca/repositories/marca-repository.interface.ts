import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';
import { Marca } from '../entities/marca.entity';

export interface IMarcaRepository {
  create(createMarcaDto: CreateMarcaDto): Promise<Marca>;
  findAll(): Promise<Marca[]>;
  findOne(id: number): Promise<Marca | null>;
  update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<Marca | null>;
  softDelete(id: number): Promise<void>;
}
