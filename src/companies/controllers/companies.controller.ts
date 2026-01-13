import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/entities/usuario.entity';

/**
 * Controller para gestión de empresas (Core)
 */
@ApiTags('Companies')
@ApiBearerAuth('JWT-auth')
@Controller('companies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // ==================== COMPANY CORE ====================

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Crear nueva empresa',
    description:
      'Crea una nueva empresa con su información de facturación y suscripción. Solo accesible para SUPER_ADMIN.',
  })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({
    status: 201,
    description: 'Empresa creada exitosamente',
  })
  @ApiResponse({
    status: 409,
    description:
      'Conflicto - Empresa ya existe (nombre, email o RUT duplicado)',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - Rol insuficiente',
  })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<any> {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Listar todas las empresas',
    description:
      'Obtiene lista paginada de todas las empresas activas. Solo SUPER_ADMIN.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Elementos por página (default: 10, max: 100)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas obtenida exitosamente',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            legalName: 'Tecnología y Soluciones SpA',
            tradeName: 'TechSol',
            slug: 'techsol',
            email: 'contacto@techsol.cl',
            isActive: true,
          },
        ],
        total: 1,
      },
    },
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ data: any[]; total: number }> {
    return this.companiesService.findAll(+page, Math.min(+limit, 100));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener empresa por ID',
    description:
      'Obtiene los detalles completos de una empresa incluyendo billing y subscription.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Empresa encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.companiesService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({
    summary: 'Buscar empresa por slug',
    description: 'Busca una empresa por su slug único (URL-friendly).',
  })
  @ApiParam({
    name: 'slug',
    description: 'Slug único de la empresa',
    example: 'techsol-spa',
  })
  @ApiResponse({
    status: 200,
    description: 'Empresa encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
  })
  async findBySlug(@Param('slug') slug: string): Promise<any> {
    return this.companiesService.findBySlug(slug);
  }

  @Get('rut/:rut')
  @ApiOperation({
    summary: 'Buscar empresa por RUT',
    description: 'Busca una empresa por su RUT (Rol Único Tributario chileno).',
  })
  @ApiParam({
    name: 'rut',
    description: 'RUT de la empresa',
    example: '76.123.456-7',
  })
  @ApiResponse({
    status: 200,
    description: 'Empresa encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
  })
  async findByRut(@Param('rut') rut: string): Promise<any> {
    return this.companiesService.findByRut(rut);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN)
  @ApiOperation({
    summary: 'Actualizar empresa',
    description: 'Actualiza la información core de la empresa.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
  })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({
    status: 200,
    description: 'Empresa actualizada',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflicto - Email o slug ya en uso',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<any> {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar empresa (soft delete)',
    description:
      'Marca la empresa como eliminada sin borrarla de la base de datos.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
  })
  @ApiResponse({
    status: 204,
    description: 'Empresa eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.companiesService.remove(id);
  }
}
