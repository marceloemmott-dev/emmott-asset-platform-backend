import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyBilling } from '../entities/company-billing.entity';
import { CompanySubscription } from '../entities/company-subscription.entity';
import { SubscriptionStatus, SubscriptionPlan } from '../enums/company.enums';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

/**
 * Servicio central para gestión de empresas (Core)
 */
@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(CompanyBilling)
    private readonly billingRepo: Repository<CompanyBilling>,
    @InjectRepository(CompanySubscription)
    private readonly subscriptionRepo: Repository<CompanySubscription>,
    private readonly dataSource: DataSource,
  ) {}

  // ==================== COMPANY CRUD ====================

  /**
   * Crear una nueva empresa con billing y subscription
   * Transacción atómica para mantener consistencia
   */
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { billing, subscription, ...companyData } = createCompanyDto;

    // Verificar duplicados
    await this.checkDuplicates(
      companyData.legalName,
      companyData.email,
      billing.rut,
    );

    // Generar slug si no se proporciona
    const slug = companyData.slug || this.generateSlug(companyData.tradeName);

    // Verificar slug único
    const existingSlug = await this.companyRepo.findOne({ where: { slug } });
    if (existingSlug) {
      throw new ConflictException(`El slug "${slug}" ya está en uso`);
    }

    // Transacción atómica
    try {
      console.log('Iniciando transacción CREATE COMPANY...');
      return await this.dataSource.transaction(async (manager) => {
        // 1. Crear y guardar Billing (sin companyId)
        console.log('Creando Billing...');
        const billingEntity = manager.create(CompanyBilling, {
          ...billing,
          rutDigits: this.extractRutDigits(billing.rut),
          rutVerifier: this.extractRutVerifier(billing.rut),
        });
        await manager.save(billingEntity);
        console.log('Billing creado:', billingEntity.id);

        // 2. Crear y guardar Subscription (sin companyId)
        console.log('Creando Subscription...');
        const trialDays = subscription?.trialDays ?? 14;
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + trialDays);

        const subscriptionEntity = manager.create(CompanySubscription, {
          plan: subscription?.plan ?? SubscriptionPlan.FREE,
          status: SubscriptionStatus.TRIAL,
          billingFrequency: subscription?.billingFrequency,
          trialEndDate,
          startDate: new Date(),
        });
        await manager.save(subscriptionEntity);
        console.log('Subscription creada:', subscriptionEntity.id);

        // 3. Crear Company con referencias a Billing y Subscription
        console.log('Creando Company...');
        const company = manager.create(Company, {
          ...companyData,
          slug,
          billing: billingEntity,
          subscription: subscriptionEntity,
        });
        await manager.save(company);
        console.log('Company creada:', company.id);

        return company;
      });
    } catch (error) {
      console.error('ERROR EN CREATE COMPANY TRANSACTION:', error);
      throw error;
    }
  }

  /**
   * Obtener todas las empresas (con paginación)
   */
  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ data: Company[]; total: number }> {
    const [data, total] = await this.companyRepo.findAndCount({
      where: { deletedAt: undefined },
      relations: ['billing', 'subscription'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  /**
   * Obtener empresa por ID con todas sus relaciones
   */
  async findOne(id: string): Promise<Company> {
    const company = await this.companyRepo.findOne({
      where: { id, deletedAt: undefined },
      relations: ['billing', 'subscription', 'createdBy'],
    });

    if (!company) {
      throw new NotFoundException(`Empresa con ID ${id} no encontrada`);
    }

    return company;
  }

  /**
   * Buscar empresa por slug
   */
  async findBySlug(slug: string): Promise<Company> {
    const company = await this.companyRepo.findOne({
      where: { slug, deletedAt: undefined },
      relations: ['billing', 'subscription'],
    });

    if (!company) {
      throw new NotFoundException(`Empresa con slug "${slug}" no encontrada`);
    }

    return company;
  }

  /**
   * Buscar empresa por RUT
   */
  async findByRut(rut: string): Promise<Company> {
    const company = await this.companyRepo.findOne({
      where: {
        billing: { rut },
      },
      relations: ['billing', 'subscription'],
    });

    if (!company) {
      throw new NotFoundException(`Empresa con RUT ${rut} no encontrada`);
    }

    return company;
  }

  /**
   * Actualizar información core de la empresa
   */
  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.findOne(id);

    // Verificar email único si se cambia
    if (updateCompanyDto.email && updateCompanyDto.email !== company.email) {
      const existing = await this.companyRepo.findOne({
        where: { email: updateCompanyDto.email },
      });
      if (existing) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    // Verificar slug único si se cambia
    if (updateCompanyDto.slug && updateCompanyDto.slug !== company.slug) {
      const existing = await this.companyRepo.findOne({
        where: { slug: updateCompanyDto.slug },
      });
      if (existing) {
        throw new ConflictException('El slug ya está en uso');
      }
    }

    Object.assign(company, updateCompanyDto);
    return await this.companyRepo.save(company);
  }

  /**
   * Soft delete de empresa
   */
  async remove(id: string): Promise<void> {
    const company = await this.findOne(id);
    company.deletedAt = new Date();
    company.isActive = false;
    await this.companyRepo.save(company);
  }

  /**
   * Hard delete (solo para admins)
   */
  async hardDelete(id: string): Promise<void> {
    const company = await this.findOne(id);
    await this.companyRepo.remove(company);
  }

  // ==================== HELPERS ====================

  private async checkDuplicates(
    legalName: string,
    email: string,
    rut: string,
  ): Promise<void> {
    const existingByName = await this.companyRepo.findOne({
      where: { legalName },
    });
    if (existingByName) {
      throw new ConflictException(
        'Ya existe una empresa con este nombre legal',
      );
    }

    const existingByEmail = await this.companyRepo.findOne({
      where: { email },
    });
    if (existingByEmail) {
      throw new ConflictException('Ya existe una empresa con este email');
    }

    const existingByRut = await this.billingRepo.findOne({
      where: { rut },
    });
    if (existingByRut) {
      throw new ConflictException('Ya existe una empresa con este RUT');
    }
  }

  private generateSlug(tradeName: string): string {
    return tradeName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private extractRutDigits(rut: string): string {
    return rut.replace(/[.-]/g, '').slice(0, -1);
  }

  private extractRutVerifier(rut: string): string {
    return rut.slice(-1).toUpperCase();
  }
}
