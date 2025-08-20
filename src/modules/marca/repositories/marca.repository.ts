import { Repository } from 'typeorm';
import { IMarcaRepository } from './marca-repository.interface';
import { Marca } from '../entities/marca.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateMarcaDto } from '../dto/update-marca.dto';

// Aplicar lógica de búsqueda de marca para verificar exitencia antes de crear.
export class MarcaRepository implements IMarcaRepository {
  constructor(
    @InjectRepository(Marca) private marcaRepository: Repository<Marca>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const marca = this.marcaRepository.create(createMarcaDto);
    return await this.marcaRepository.save(marca);
  }

  async findAll(): Promise<Marca[]> {
    return await this.marcaRepository.find();
  }

  async findOne(id: number): Promise<Marca | null> {
    const marca = await this.marcaRepository.findOneBy({ id });
    if (!marca) {
      throw new NotFoundException('Marca no encontrada');
    }
    return marca;
  }

  async update(
    id: number,
    updateMarcaDto: UpdateMarcaDto,
  ): Promise<Marca | null> {
    await this.findOne(id);
    await this.marcaRepository.update(id, { ...updateMarcaDto });
    return await this.findOne(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.findOne(id);
    await this.marcaRepository.softDelete(id);
  }
}
