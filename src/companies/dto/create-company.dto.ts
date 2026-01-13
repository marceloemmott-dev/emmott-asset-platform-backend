import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CompanyType,
  ChileanRegion,
  IndustryType,
  CompanySize,
  SubscriptionPlan,
  BillingFrequency,
} from '../enums/company.enums';

/**
 * DTO para información de facturación al crear empresa
 */
export class CreateBillingDto {
  @ApiProperty({
    description: 'RUT de la empresa (Rol Único Tributario)',
    example: '76.123.456-7',
    pattern: '^\\d{1,2}\\.\\d{3}\\.\\d{3}-[\\dKk]$',
  })
  @IsNotEmpty({ message: 'El RUT es obligatorio' })
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dKk]$/, {
    message: 'Formato de RUT inválido. Ejemplo: 76.123.456-7',
  })
  rut: string;

  @ApiProperty({
    description: 'Tipo de sociedad',
    enum: CompanyType,
    example: CompanyType.SPA,
  })
  @IsEnum(CompanyType, { message: 'Tipo de sociedad inválido' })
  companyType: CompanyType;

  @ApiProperty({
    description: 'Giro comercial (actividad económica)',
    example: 'Desarrollo de software y aplicaciones',
  })
  @IsNotEmpty({ message: 'El giro comercial es obligatorio' })
  @IsString()
  @MaxLength(500)
  businessActivity: string;

  @ApiPropertyOptional({
    description: 'Sector económico',
    enum: IndustryType,
    example: IndustryType.TECHNOLOGY,
  })
  @IsOptional()
  @IsEnum(IndustryType)
  industry?: IndustryType;

  @ApiPropertyOptional({
    description: 'Tamaño de la empresa',
    enum: CompanySize,
    example: CompanySize.SMALL,
  })
  @IsOptional()
  @IsEnum(CompanySize)
  companySize?: CompanySize;

  @ApiPropertyOptional({
    description: 'Número de empleados',
    example: 25,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  employeeCount?: number;

  @ApiPropertyOptional({
    description: 'Fecha de inicio de actividades',
    example: '2020-01-15',
  })
  @IsOptional()
  @IsDateString()
  businessStartDate?: string;

  @ApiProperty({
    description: 'Dirección fiscal',
    example: 'Av. Providencia 123, Oficina 456',
  })
  @IsNotEmpty({ message: 'La dirección fiscal es obligatoria' })
  @IsString()
  @MaxLength(500)
  fiscalAddress: string;

  @ApiProperty({
    description: 'Comuna',
    example: 'Providencia',
  })
  @IsNotEmpty({ message: 'La comuna es obligatoria' })
  @IsString()
  @MaxLength(100)
  commune: string;

  @ApiProperty({
    description: 'Región de Chile',
    enum: ChileanRegion,
    example: ChileanRegion.METROPOLITANA,
  })
  @IsEnum(ChileanRegion, { message: 'Región inválida' })
  region: ChileanRegion;

  @ApiPropertyOptional({
    description: 'Código postal',
    example: '7500000',
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  postalCode?: string;

  // Representante Legal
  @ApiProperty({
    description: 'Nombre del representante legal',
    example: 'Juan Carlos Pérez González',
  })
  @IsNotEmpty({ message: 'El nombre del representante legal es obligatorio' })
  @IsString()
  @MaxLength(200)
  legalRepName: string;

  @ApiProperty({
    description: 'RUT del representante legal',
    example: '12.345.678-9',
  })
  @IsNotEmpty({ message: 'El RUT del representante legal es obligatorio' })
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dKk]$/, {
    message: 'Formato de RUT inválido para representante legal',
  })
  legalRepRut: string;

  @ApiProperty({
    description: 'Cargo del representante legal',
    example: 'Gerente General',
  })
  @IsNotEmpty({ message: 'El cargo del representante legal es obligatorio' })
  @IsString()
  @MaxLength(100)
  legalRepPosition: string;

  @ApiPropertyOptional({
    description: 'Email del representante legal',
    example: 'jperez@techsol.cl',
  })
  @IsOptional()
  @IsEmail()
  legalRepEmail?: string;

  @ApiPropertyOptional({
    description: 'Teléfono del representante legal',
    example: '+56987654321',
  })
  @IsOptional()
  @IsString()
  legalRepPhone?: string;
}

/**
 * DTO para información de suscripción al crear empresa
 */
export class CreateSubscriptionDto {
  @ApiPropertyOptional({
    description: 'Plan de suscripción',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.PROFESSIONAL,
    default: SubscriptionPlan.FREE,
  })
  @IsOptional()
  @IsEnum(SubscriptionPlan)
  plan?: SubscriptionPlan;

  @ApiPropertyOptional({
    description: 'Frecuencia de facturación',
    enum: BillingFrequency,
    example: BillingFrequency.MONTHLY,
  })
  @IsOptional()
  @IsEnum(BillingFrequency)
  billingFrequency?: BillingFrequency;

  @ApiPropertyOptional({
    description: 'Duración del trial en días',
    example: 14,
    minimum: 0,
    maximum: 90,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(90)
  trialDays?: number;
}

/**
 * DTO principal para crear una empresa
 */
export class CreateCompanyDto {
  @ApiProperty({
    description: 'Nombre legal de la empresa (Razón Social)',
    example: 'Tecnología y Soluciones SpA',
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'El nombre legal es obligatorio' })
  @IsString()
  @MinLength(3, { message: 'El nombre legal debe tener al menos 3 caracteres' })
  @MaxLength(255)
  legalName: string;

  @ApiProperty({
    description: 'Nombre comercial o de fantasía',
    example: 'TechSol',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'El nombre comercial es obligatorio' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  tradeName: string;

  @ApiPropertyOptional({
    description: 'Slug personalizado (auto-generado si no se proporciona)',
    example: 'techsol-spa',
    pattern: '^[a-z0-9-]+$',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'El slug solo puede contener letras minúsculas, números y guiones',
  })
  @MaxLength(100)
  slug?: string;

  @ApiPropertyOptional({
    description: 'Descripción de la empresa',
    example: 'Empresa líder en desarrollo de software empresarial',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    description: 'Email corporativo principal',
    example: 'contacto@techsol.cl',
  })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  email: string;

  @ApiProperty({
    description: 'Teléfono principal',
    example: '+56912345678',
  })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsString()
  @Matches(/^\+?[0-9]{8,15}$/, {
    message: 'Formato de teléfono inválido',
  })
  phone: string;

  @ApiPropertyOptional({
    description: 'Sitio web',
    example: 'https://www.techsol.cl',
  })
  @IsOptional()
  @IsUrl({}, { message: 'URL inválida' })
  website?: string;

  @ApiProperty({
    description: 'Información de facturación y legal',
    type: CreateBillingDto,
  })
  @Type(() => CreateBillingDto)
  billing: CreateBillingDto;

  @ApiPropertyOptional({
    description:
      'Información de suscripción (usa valores por defecto si no se proporciona)',
    type: CreateSubscriptionDto,
  })
  @IsOptional()
  @Type(() => CreateSubscriptionDto)
  subscription?: CreateSubscriptionDto;
}
