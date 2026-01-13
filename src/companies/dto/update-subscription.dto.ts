import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import {
  SubscriptionPlan,
  SubscriptionStatus,
  BillingFrequency,
} from '../enums/company.enums';

/**
 * DTO para actualizar suscripción de una empresa
 */
export class UpdateSubscriptionDto {
  @ApiPropertyOptional({
    description: 'Nuevo plan de suscripción',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.PROFESSIONAL,
  })
  @IsOptional()
  @IsEnum(SubscriptionPlan)
  plan?: SubscriptionPlan;

  @ApiPropertyOptional({
    description: 'Estado de la suscripción',
    enum: SubscriptionStatus,
    example: SubscriptionStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @ApiPropertyOptional({
    description: 'Frecuencia de facturación',
    enum: BillingFrequency,
    example: BillingFrequency.ANNUAL,
  })
  @IsOptional()
  @IsEnum(BillingFrequency)
  billingFrequency?: BillingFrequency;

  @ApiPropertyOptional({
    description: 'Renovación automática',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;

  @ApiPropertyOptional({
    description: 'Límite de usuarios',
    example: 100,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxUsers?: number;

  @ApiPropertyOptional({
    description: 'Límite de activos',
    example: 5000,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxAssets?: number;

  @ApiPropertyOptional({
    description: 'Almacenamiento en GB',
    example: 200,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  storageGb?: number;

  @ApiPropertyOptional({
    description: 'Acceso a API',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  hasApiAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Soporte prioritario',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  hasPrioritySupport?: boolean;

  @ApiPropertyOptional({
    description: 'Reportes avanzados',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  hasAdvancedReports?: boolean;

  @ApiPropertyOptional({
    description: 'Descuento aplicado (%)',
    example: 15,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  discountPercentage?: number;
}

/**
 * DTO para upgrade de plan
 */
export class UpgradePlanDto {
  @ApiProperty({
    description: 'Nuevo plan al que se quiere actualizar',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.ENTERPRISE,
  })
  @IsEnum(SubscriptionPlan)
  newPlan: SubscriptionPlan;

  @ApiPropertyOptional({
    description: 'Frecuencia de facturación',
    enum: BillingFrequency,
    example: BillingFrequency.ANNUAL,
  })
  @IsOptional()
  @IsEnum(BillingFrequency)
  billingFrequency?: BillingFrequency;
}

/**
 * DTO para extender trial
 */
export class ExtendTrialDto {
  @ApiProperty({
    description: 'Días adicionales de trial',
    example: 7,
    minimum: 1,
    maximum: 30,
  })
  @IsInt()
  @Min(1)
  @Max(30)
  additionalDays: number;
}
