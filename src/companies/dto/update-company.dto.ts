import { ApiPropertyOptional, PartialType, OmitType } from '@nestjs/swagger';
import { CreateCompanyDto, CreateBillingDto } from './create-company.dto';

/**
 * DTO para actualizar empresa (Company core)
 * Todos los campos son opcionales
 */
export class UpdateCompanyDto extends PartialType(
  OmitType(CreateCompanyDto, ['billing', 'subscription'] as const),
) {}

/**
 * DTO para actualizar información de facturación
 * Todos los campos son opcionales excepto los que no pueden cambiar
 */
export class UpdateBillingDto extends PartialType(
  OmitType(CreateBillingDto, ['rut'] as const),
) {}
