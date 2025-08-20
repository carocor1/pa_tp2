import { Inject, Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';
import { IMarcaRepository } from './repositories/marca-repository.interface';

@Injectable()
export class MarcaService {
  constructor(
    @Inject('IMarcaRepository')
    private readonly marcaRepository: IMarcaRepository,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    return await this.marcaRepository.create(createMarcaDto);
  }

  async findAll(): Promise<Marca[]> {
    return await this.marcaRepository.findAll();
  }

  async findOne(id: number): Promise<Marca | null> {
    return await this.marcaRepository.findOne(id);
  }

  async update(
    id: number,
    updateMarcaDto: UpdateMarcaDto,
  ): Promise<Marca | null> {
    return await this.marcaRepository.update(id, updateMarcaDto);
  }

  async remove(id: number): Promise<void> {
    await this.marcaRepository.softDelete(id);
  }
}
