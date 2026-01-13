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
  CompanyType,
  ChileanRegion,
  IndustryType,
  CompanySize,
} from '../enums/company.enums';

/**
 * Entidad CompanyBilling
 *
 * Contiene toda la información legal, tributaria y de facturación
 * requerida para operar en Chile según el Servicio de Impuestos
 * Internos (SII).
 *
 * Esta entidad está separada de Company para:
 * - Permitir actualizaciones independientes por cambios legales
 * - Facilitar integración con API del SII
 * - Mantener datos sensibles aislados
 * - Evitar impacto en queries de Company core
 */
@Entity('company_billing')
@Index(['rut'], { unique: true })
export class CompanyBilling {
  @ApiProperty({
    description: 'ID único del registro de facturación',
    example: '650e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // companyId y relación company eliminados para evitar dependencia circular.
  // La relación ahora es unidireccional desde Company (que posee la FK).

  // ==================== INFORMACIÓN TRIBUTARIA (SII) ====================

  @ApiProperty({
    description: 'RUT de la empresa (Rol Único Tributario)',
    example: '76.123.456-7',
    pattern: '^\\d{1,2}\\.\\d{3}\\.\\d{3}-[\\dKk]$',
    uniqueItems: true,
  })
  @Column({ unique: true, length: 12 })
  rut: string;

  // Excluido de API responses
  @Column({ length: 8 })
  @Exclude()
  rutDigits: string;

  // Excluido de API responses
  @Column({ length: 1 })
  @Exclude()
  rutVerifier: string;

  @ApiProperty({
    description: 'Tipo de sociedad según legislación chilena',
    enum: CompanyType,
    example: CompanyType.SPA,
  })
  @Column({
    type: 'enum',
    enum: CompanyType,
    default: CompanyType.SPA,
  })
  companyType: CompanyType;

  @ApiProperty({
    description: 'Giro comercial (actividad económica principal)',
    example: 'Desarrollo de software y aplicaciones',
  })
  @Column({ type: 'text' })
  businessActivity: string;

  @ApiProperty({
    description: 'Sector económico / industria',
    enum: IndustryType,
    example: IndustryType.TECHNOLOGY,
  })
  @Column({
    type: 'enum',
    enum: IndustryType,
    default: IndustryType.OTHER,
  })
  industry: IndustryType;

  @ApiProperty({
    description: 'Tamaño de la empresa según clasificación SII',
    enum: CompanySize,
    example: CompanySize.SMALL,
  })
  @Column({
    type: 'enum',
    enum: CompanySize,
    default: CompanySize.MICRO,
  })
  companySize: CompanySize;

  @ApiProperty({
    description: 'Número aproximado de empleados',
    example: 25,
    minimum: 1,
  })
  @Column({ type: 'int', default: 1 })
  employeeCount: number;

  @ApiProperty({
    description: 'Fecha de inicio de actividades (inscripción en SII)',
    example: '2020-01-15',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  businessStartDate?: Date;

  // ==================== DIRECCIÓN FISCAL ====================

  @ApiProperty({
    description: 'Dirección fiscal registrada en SII',
    example: 'Av. Providencia 123, Oficina 456',
  })
  @Column({ type: 'text' })
  fiscalAddress: string;

  @ApiProperty({
    description: 'Comuna de la dirección fiscal',
    example: 'Providencia',
  })
  @Column()
  commune: string;

  @ApiProperty({
    description: 'Región según división administrativa de Chile',
    enum: ChileanRegion,
    example: ChileanRegion.METROPOLITANA,
  })
  @Column({
    type: 'enum',
    enum: ChileanRegion,
  })
  region: ChileanRegion;

  @ApiProperty({
    description: 'Código postal',
    example: '7500000',
    required: false,
  })
  @Column({ nullable: true })
  postalCode?: string;

  // ==================== REPRESENTANTE LEGAL ====================

  @ApiProperty({
    description: 'Nombre completo del representante legal',
    example: 'Juan Carlos Pérez González',
  })
  @Column()
  legalRepName: string;

  @ApiProperty({
    description: 'RUT del representante legal',
    example: '12.345.678-9',
    pattern: '^\\d{1,2}\\.\\d{3}\\.\\d{3}-[\\dKk]$',
  })
  @Column({ length: 12 })
  legalRepRut: string;

  @ApiProperty({
    description: 'Cargo del representante legal',
    example: 'Gerente General',
  })
  @Column()
  legalRepPosition: string;

  @ApiProperty({
    description: 'Email del representante legal',
    example: 'jperez@techsol.cl',
    required: false,
  })
  @Column({ nullable: true })
  legalRepEmail?: string;

  @ApiProperty({
    description: 'Teléfono del representante legal',
    example: '+56987654321',
    required: false,
  })
  @Column({ nullable: true })
  legalRepPhone?: string;

  @ApiProperty({
    description: 'Fecha de nombramiento del representante legal',
    example: '2020-01-10',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  legalRepAppointmentDate?: Date;

  // ==================== CONFIGURACIÓN REGIONAL ====================

  @ApiProperty({
    description: 'Zona horaria',
    example: 'America/Santiago',
    default: 'America/Santiago',
  })
  @Column({ default: 'America/Santiago' })
  timezone: string;

  @ApiProperty({
    description: 'Moneda principal (código ISO 4217)',
    example: 'CLP',
    default: 'CLP',
    maxLength: 3,
  })
  @Column({ default: 'CLP', length: 3 })
  currency: string;

  @ApiProperty({
    description: 'Idioma (ISO 639-1/ISO 3166-1)',
    example: 'es-CL',
    default: 'es-CL',
  })
  @Column({ default: 'es-CL', length: 5 })
  language: string;

  @ApiProperty({
    description: 'Mes de cierre de año fiscal (1-12)',
    example: 12,
    minimum: 1,
    maximum: 12,
    default: 12,
  })
  @Column({ type: 'int', default: 12 })
  fiscalYearEndMonth: number;

  // ==================== METADATA ====================

  // Excluido de API responses
  @Column({ type: 'jsonb', nullable: true })
  @Exclude()
  metadata?: Record<string, any>;

  // Excluido de API responses
  @Column({ type: 'text', nullable: true })
  @Exclude()
  internalNotes?: string;

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
}
