import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import {
  SubscriptionStatus,
  SubscriptionPlan,
  BillingFrequency,
} from '../enums/company.enums';

/**
 * Entidad CompanySubscription
 *
 * Gestiona toda la información relacionada con el modelo SaaS,
 * incluyendo planes, facturación, límites de uso y características.
 *
 * Separada de Company para:
 * - Evolucionar modelo de negocio sin afectar core
 * - Facilitar integración con sistemas de pago (Stripe, etc)
 * - Manejar trials, upgrades, downgrades
 * - Historial de cambios de plan
 */
@Entity('company_subscriptions')
@Index(['status'])
@Index(['plan'])
export class CompanySubscription {
  @ApiProperty({
    description: 'ID único de la suscripción',
    example: '750e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // companyId y relación company eliminados para evitar dependencia circular.
  // La relación ahora es unidireccional desde Company (que posee la FK).

  // ==================== PLAN Y ESTADO ====================

  @ApiProperty({
    description: 'Plan de suscripción actual',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.PROFESSIONAL,
  })
  @Column({
    type: 'enum',
    enum: SubscriptionPlan,
    default: SubscriptionPlan.FREE,
  })
  plan: SubscriptionPlan;

  @ApiProperty({
    description: 'Estado de la suscripción',
    enum: SubscriptionStatus,
    example: SubscriptionStatus.ACTIVE,
  })
  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.TRIAL,
  })
  status: SubscriptionStatus;

  @ApiProperty({
    description: 'Frecuencia de facturación',
    enum: BillingFrequency,
    example: BillingFrequency.MONTHLY,
    required: false,
  })
  @Column({
    type: 'enum',
    enum: BillingFrequency,
    nullable: true,
  })
  billingFrequency?: BillingFrequency;

  // ==================== FECHAS ====================

  @ApiProperty({
    description: 'Fecha de inicio de la suscripción',
    example: '2024-01-15T10:30:00Z',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de fin de trial (si aplica)',
    example: '2024-02-15T10:30:00Z',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  trialEndDate?: Date;

  @ApiProperty({
    description: 'Fecha de próximo pago/renovación',
    example: '2024-02-15T10:30:00Z',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  currentPeriodEnd?: Date;

  @ApiProperty({
    description: 'Fecha de cancelación (si fue cancelada)',
    example: '2024-06-30T15:45:00Z',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  cancelledAt?: Date;

  @ApiProperty({
    description: 'Fecha de fin definitivo de la suscripción',
    example: '2024-12-31T23:59:59Z',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  // ==================== LÍMITES Y CUOTAS ====================

  @ApiProperty({
    description: 'Número máximo de usuarios permitidos',
    example: 50,
    minimum: 1,
    required: false,
  })
  @Column({ type: 'int', nullable: true })
  maxUsers?: number;

  @ApiProperty({
    description: 'Número máximo de activos permitidos',
    example: 1000,
    minimum: 1,
    required: false,
  })
  @Column({ type: 'int', nullable: true })
  maxAssets?: number;

  @ApiProperty({
    description: 'Espacio de almacenamiento en GB',
    example: 100,
    minimum: 1,
    required: false,
  })
  @Column({ type: 'int', nullable: true })
  storageGb?: number;

  @ApiProperty({
    description: 'Número de empresas subsidiarias permitidas',
    example: 5,
    minimum: 0,
    required: false,
  })
  @Column({ type: 'int', nullable: true, default: 0 })
  maxSubsidiaries?: number;

  // ==================== CARACTERÍSTICAS ====================

  @ApiProperty({
    description: 'API access habilitado',
    default: false,
  })
  @Column({ default: false })
  hasApiAccess: boolean;

  @ApiProperty({
    description: 'Soporte prioritario habilitado',
    default: false,
  })
  @Column({ default: false })
  hasPrioritySupport: boolean;

  @ApiProperty({
    description: 'Reportes avanzados habilitados',
    default: false,
  })
  @Column({ default: false })
  hasAdvancedReports: boolean;

  @ApiProperty({
    description: 'Auditoría completa habilitada',
    default: false,
  })
  @Column({ default: false })
  hasAuditLogs: boolean;

  @ApiProperty({
    description: 'White-label/personalización habilitada',
    default: false,
  })
  @Column({ default: false })
  hasWhiteLabel: boolean;

  // ==================== FACTURACIÓN ====================

  // Excluido de API responses
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @Exclude()
  monthlyPrice?: number;

  // Excluido de API responses
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @Exclude()
  annualPrice?: number;

  @ApiProperty({
    description: 'Descuento aplicado (porcentaje)',
    example: 15,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  discountPercentage?: number;

  // Excluido de API responses
  @Column({ nullable: true })
  @Exclude()
  externalSubscriptionId?: string;

  // Excluido de API responses
  @Column({ nullable: true })
  @Exclude()
  externalCustomerId?: string;

  // ==================== METADATA ====================

  @ApiProperty({
    description: 'Características personalizadas o configuraciones adicionales',
    example: {
      customModules: ['inventory', 'hr'],
      apiRequestsPerMonth: 10000,
      ssoEnabled: true,
    },
    required: false,
  })
  @Column({ type: 'jsonb', nullable: true })
  features?: Record<string, any>;

  // Excluido de API responses
  @Column({ type: 'text', nullable: true })
  @Exclude()
  notes?: string;

  // ==================== RENOVACIÓN AUTOMÁTICA ====================

  @ApiProperty({
    description: 'Indica si la renovación automática está activa',
    default: true,
  })
  @Column({ default: true })
  autoRenew: boolean;

  @ApiProperty({
    description: 'Indica si está programado un downgrade al finalizar período',
    required: false,
  })
  @Column({ type: 'enum', enum: SubscriptionPlan, nullable: true })
  scheduledDowngradeTo?: SubscriptionPlan;

  // ==================== TIMESTAMPS ====================

  @ApiProperty({
    description: 'Fecha de creación del registro',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización de plan',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  lastPlanChangeAt?: Date;
}
