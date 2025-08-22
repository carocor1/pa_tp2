import { Repository, UpdateResult } from 'typeorm';
import { IMarcaRepository } from './marca-repository.interface';
import { Marca } from '../entities/marca.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';

export class MarcaRepository implements IMarcaRepository {
  constructor(
    @InjectRepository(Marca) private marcaRepository: Repository<Marca>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const marca = this.marcaRepository.create(createMarcaDto);
    return await this.marcaRepository.save(marca);
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<{
    marcas: Marca[];
    total: number;
    page: number;
    lastPage: number;
  }> {
    const [marcas, total] = await this.marcaRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      marcas: marcas,
      total,
      page,
      lastPage: Math.ceil(total / limit), //cant de paginas totales
    };
  }
  //Ver qué sería más logico: si la excepción se envíe en el repository o en el service.
  async findOne(id: number): Promise<Marca | null> {
    return await this.marcaRepository.findOneBy({ id });
  }
  //Ver qué sería más logico: si la excepción se envíe en el repository o en el service.
  async findByDenominacion(denominacion: string): Promise<Marca | null> {
    return await this.marcaRepository.findOneBy({ denominacion });
  }

  async update(
    id: number,
    updateMarcaDto: UpdateMarcaDto,
  ): Promise<UpdateResult> {
    return await this.marcaRepository.update(id, { ...updateMarcaDto });
  }

  async softDelete(id: number): Promise<void> {
    await this.marcaRepository.softDelete(id);
  }
}
