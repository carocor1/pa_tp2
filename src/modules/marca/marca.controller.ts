import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpCode,
} from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';
import { PaginationMarcaDto } from './dto/pagination-marca.dto';
import { UppercaseDenominationPipe } from './pipes/uppercase-denomination.pipe';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ShowMarcaDto } from './dto/show-marca.dto';
import { ShowPaginationMarcaDto } from './dto/show-pagination-marca.dto';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @ApiOperation({ summary: 'Crear una nueva marca' })
  @ApiBody({
    type: CreateMarcaDto,
    examples: {
      ejemplo: {
        value: { denominacion: 'NIKE' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Marca creada exitosamente.',
    type: Marca,
  })
  @ApiResponse({
    status: 400,
    description:
      'Datos inválidos. Ejemplo: denominación vacía o demasiado corta.',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'La denominación debe tener al menos 2 caracteres.',
          'La denominación es obligatoria.',
        ],
        error: 'Bad Request',
      },
    },
  })
  @HttpCode(201)
  @Post()
  create(
    @Body(UppercaseDenominationPipe) createMarcaDto: CreateMarcaDto,
  ): Promise<ShowMarcaDto> {
    return this.marcaService.create(createMarcaDto);
  }

  @ApiOperation({ summary: 'Listar marcas paginadas' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Cantidad de marcas por página (default: 5)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Número de página (default: 1)',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado paginado de marcas.',
    schema: {
      example: {
        data: [
          {
            id: 1,
            denominacion: 'NIKE',
            createdAt: '2025-08-21T12:00:00.000Z',
            updatedAt: '2025-08-21T12:00:00.000Z',
          },
          {
            id: 2,
            denominacion: 'ADIDAS',
            createdAt: '2025-08-21T12:01:00.000Z',
            updatedAt: '2025-08-21T12:01:00.000Z',
          },
        ],
        total: 2,
        page: 1,
        lastPage: 1,
      },
    },
  })
  @Get()
  findAll(
    @Query() paginationDto: PaginationMarcaDto,
  ): Promise<ShowPaginationMarcaDto> {
    return this.marcaService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Obtener una marca por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID de la marca',
  })
  @ApiResponse({
    status: 200,
    description: 'Marca encontrada.',
    type: Marca,
  })
  @ApiResponse({
    status: 404,
    description: 'Marca no encontrada.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Marca no encontrada',
        error: 'Not Found',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ShowMarcaDto> {
    return this.marcaService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar una marca por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID de la marca',
  })
  @ApiBody({
    type: UpdateMarcaDto,
    examples: {
      ejemplo: {
        value: { denominacion: 'PUMA' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Marca actualizada exitosamente.',
    type: Marca,
  })
  @ApiResponse({
    status: 404,
    description: 'Marca no encontrada.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(UppercaseDenominationPipe) updateMarcaDto: UpdateMarcaDto,
  ): Promise<ShowMarcaDto> {
    return this.marcaService.update(id, updateMarcaDto);
  }

  @ApiOperation({ summary: 'Eliminar (soft delete) una marca por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID de la marca',
  })
  @ApiResponse({
    status: 200,
    description: 'Marca eliminada exitosamente.',
    schema: {
      example: null,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Marca no encontrada.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Marca no encontrada',
        error: 'Not Found',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.marcaService.remove(id);
  }
}
