import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from './services/companies.service';
import { CompaniesController } from './controllers/companies.controller';
import { BillingService } from './services/billing.service';
import { BillingController } from './controllers/billing.controller';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { Company } from './entities/company.entity';
import { CompanyBilling } from './entities/company-billing.entity';
import { CompanySubscription } from './entities/company-subscription.entity';

/**
 * Módulo de Empresas
 *
 * Gestiona las empresas (tenants) del sistema multi-tenant.
 * Incluye 3 entidades relacionadas:
 * - Company: Identidad core de la empresa
 * - CompanyBilling: Información legal/tributaria (SII Chile)
 * - CompanySubscription: Modelo SaaS y suscripciones
 *
 * Arquitectura:
 * - 1 módulo cohesivo
 * - 3 entidades con responsabilidades separadas
 * - 3 servicios especializados (Core, Billing, Subscription)
 * - 3 controllers especializados
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Company, CompanyBilling, CompanySubscription]),
  ],
  controllers: [CompaniesController, BillingController, SubscriptionController],
  providers: [CompaniesService, BillingService, SubscriptionService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
