import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';
import { IMarcaRepository } from './repositories/marca-repository.interface';
import { PaginationMarcaDto } from './dto/pagination-marca.dto';
import { ShowMarcaDto } from './dto/show-marca.dto';
import { plainToInstance } from 'class-transformer';
import { ShowPaginationMarcaDto } from './dto/show-pagination-marca.dto';

@Injectable()
export class MarcaService {
  constructor(
    @Inject('IMarcaRepository')
    private readonly marcaRepository: IMarcaRepository,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<ShowMarcaDto> {
    return this.toResponseDto(
      await this.marcaRepository.create(createMarcaDto),
    );
  }

  async findAll(
    paginationMarcaDto: PaginationMarcaDto,
  ): Promise<ShowPaginationMarcaDto> {
    const { limit = 5, page = 1 } = paginationMarcaDto;
    const paginated = await this.marcaRepository.findAllPaginated(page, limit);
    const marcas = paginated.marcas.map((marca) => this.toResponseDto(marca));
    return plainToInstance(
      ShowPaginationMarcaDto,
      {
        marcas,
        total: paginated.total,
        page: paginated.page,
        lastPage: paginated.lastPage,
      },
      { excludeExtraneousValues: true },
    );
  }

  async findOne(id: number): Promise<ShowMarcaDto> {
    return this.toResponseDto(await this.marcaRepository.findOne(id));
  }

  //DEUDA TÉCNICA: La excepción se lanza en el repositorio, pero se maneja aquí.
  async update(
    id: number,
    updateMarcaDto: UpdateMarcaDto,
  ): Promise<ShowMarcaDto> {
    return this.toResponseDto(
      await this.marcaRepository.update(id, updateMarcaDto),
    );
  }

  async remove(id: number): Promise<void> {
    await this.marcaRepository.softDelete(id);
  }

  private toResponseDto(marca: Marca): ShowMarcaDto {
    return plainToInstance(ShowMarcaDto, marca, {
      excludeExtraneousValues: true,
    });
  }
}
