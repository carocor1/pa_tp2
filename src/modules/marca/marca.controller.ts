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
  @ApiBody({ type: CreateMarcaDto })
  @ApiResponse({
    status: 201,
    type: ShowMarcaDto,
    description: 'Marca creada.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @HttpCode(201)
  @Post()
  create(
    @Body(UppercaseDenominationPipe) createMarcaDto: CreateMarcaDto,
  ): Promise<ShowMarcaDto> {
    return this.marcaService.create(createMarcaDto);
  }

  @ApiOperation({ summary: 'Listar marcas paginadas' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    type: ShowPaginationMarcaDto,
    description: 'Listado paginado.',
  })
  @Get()
  findAll(
    @Query() paginationDto: PaginationMarcaDto,
  ): Promise<ShowPaginationMarcaDto> {
    return this.marcaService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Obtener una marca por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: ShowMarcaDto,
    description: 'Marca encontrada.',
  })
  @ApiResponse({ status: 404, description: 'Marca no encontrada.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ShowMarcaDto> {
    return this.marcaService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar una marca por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateMarcaDto })
  @ApiResponse({
    status: 200,
    type: ShowMarcaDto,
    description: 'Marca actualizada.',
  })
  @ApiResponse({ status: 404, description: 'Marca no encontrada.' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(UppercaseDenominationPipe) updateMarcaDto: UpdateMarcaDto,
  ): Promise<ShowMarcaDto> {
    return this.marcaService.update(id, updateMarcaDto);
  }

  @ApiOperation({ summary: 'Eliminar una marca por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Marca eliminada.' })
  @ApiResponse({ status: 404, description: 'Marca no encontrada.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.marcaService.remove(id);
  }
}
