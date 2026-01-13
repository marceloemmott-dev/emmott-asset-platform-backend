import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/usuario.entity';
import { CompanyBilling } from './company-billing.entity';
import { CompanySubscription } from './company-subscription.entity';

/**
 * Entidad principal de Company
 *
 * Representa la identidad core de una empresa en el sistema.
 * Contiene solo información esencial e inmutable que define
 * a la empresa como tenant del sistema multi-tenant.
 *
 * Relacionada con:
 * - CompanyBilling (1:1) - Información legal y tributaria
 * - CompanySubscription (1:1) - Modelo SaaS y facturación
 * - User (1:N) - Usuarios que pertenecen a esta empresa
 */
@Entity('companies')
@Index(['slug'], { unique: true })
@Index(['isActive'])
export class Company {
  @ApiProperty({
    description: 'ID único de la empresa (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre legal de la empresa (Razón Social)',
    example: 'Tecnología y Soluciones SpA',
    maxLength: 255,
  })
  @Column({ unique: true })
  legalName: string;

  @ApiProperty({
    description: 'Nombre comercial o de fantasía',
    example: 'TechSol',
    maxLength: 255,
  })
  @Column()
  tradeName: string;

  @ApiProperty({
    description:
      'Slug único para URLs amigables (auto-generado desde tradeName)',
    example: 'techsol-spa',
    uniqueItems: true,
  })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({
    description: 'Descripción breve de la empresa',
    example: 'Empresa líder en desarrollo de software empresarial',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Email corporativo principal',
    example: 'contacto@techsol.cl',
    format: 'email',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Teléfono principal con código de país',
    example: '+56912345678',
  })
  @Column()
  phone: string;

  @ApiProperty({
    description: 'Sitio web corporativo',
    example: 'https://www.techsol.cl',
    required: false,
  })
  @Column({ nullable: true })
  website?: string;

  @ApiProperty({
    description: 'ID del logo/imagen de la empresa (FK a Media entity)',
    required: false,
  })
  @Column({ nullable: true })
  logoId?: string;

  @ApiProperty({
    description: 'Indica si la empresa está activa en el sistema',
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Indica si la empresa ha sido verificada',
    default: false,
  })
  @Column({ default: false })
  isVerified: boolean;

  @ApiProperty({
    description: 'Fecha de verificación de la empresa',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  verifiedAt?: Date;

  // ==================== RELACIONES ====================

  // Relación con billing
  @ApiHideProperty()
  @OneToOne(() => CompanyBilling, {
    cascade: true,
    eager: false,
  })
  @JoinColumn()
  billing?: CompanyBilling;

  // Relación con subscription
  @ApiHideProperty()
  @OneToOne(() => CompanySubscription, {
    cascade: true,
    eager: false,
  })
  @JoinColumn()
  subscription?: CompanySubscription;

  @ApiProperty({
    description: 'ID del usuario que creó la empresa',
    required: false,
  })
  @Column({ nullable: true })
  createdById?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: User;

  @ApiProperty({
    description: 'ID del último usuario que modificó la empresa',
    required: false,
  })
  @Column({ nullable: true })
  lastModifiedById?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'lastModifiedById' })
  lastModifiedBy?: User;

  // ==================== TIMESTAMPS ====================

  @ApiProperty({
    description: 'Fecha de creación del registro',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del registro',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Fecha de eliminación lógica (soft delete)',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
