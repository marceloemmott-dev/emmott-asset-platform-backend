import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyBilling } from '../entities/company-billing.entity';
import { UpdateBillingDto } from '../dto/update-company.dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(CompanyBilling)
    private readonly billingRepo: Repository<CompanyBilling>,
  ) {}

  /**
   * Obtener información de facturación de una empresa
   */
  async getBilling(companyId: string): Promise<CompanyBilling> {
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: ['billing'],
    });

    if (!company || !company.billing) {
      throw new NotFoundException('Información de facturación no encontrada');
    }

    return company.billing;
  }

  /**
   * Actualizar información de facturación
   */
  async updateBilling(
    companyId: string,
    updateBillingDto: UpdateBillingDto,
  ): Promise<CompanyBilling> {
    const billing = await this.getBilling(companyId);

    Object.assign(billing, updateBillingDto);
    return await this.billingRepo.save(billing);
  }

  /**
   * Helpers para RUT (pueden ser útiles aquí o movidos a un utilitario compartido)
   */
  extractRutDigits(rut: string): string {
    return rut.replace(/[.-]/g, '').slice(0, -1);
  }

  extractRutVerifier(rut: string): string {
    return rut.slice(-1).toUpperCase();
  }
}
