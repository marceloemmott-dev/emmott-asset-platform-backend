import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanySubscription } from '../entities/company-subscription.entity';
import {
  UpdateSubscriptionDto,
  UpgradePlanDto,
  ExtendTrialDto,
} from '../dto/update-subscription.dto';
import { SubscriptionStatus, SubscriptionPlan } from '../enums/company.enums';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(CompanySubscription)
    private readonly subscriptionRepo: Repository<CompanySubscription>,
  ) {}

  /**
   * Obtener información de suscripción
   */
  async getSubscription(companyId: string): Promise<CompanySubscription> {
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: ['subscription'],
    });

    if (!company || !company.subscription) {
      throw new NotFoundException('Información de suscripción no encontrada');
    }

    return company.subscription;
  }

  /**
   * Actualizar suscripción
   */
  async updateSubscription(
    companyId: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<CompanySubscription> {
    const subscription = await this.getSubscription(companyId);

    Object.assign(subscription, updateSubscriptionDto);
    return await this.subscriptionRepo.save(subscription);
  }

  /**
   * Upgrade de plan
   */
  async upgradePlan(
    companyId: string,
    upgradePlanDto: UpgradePlanDto,
  ): Promise<CompanySubscription> {
    const subscription = await this.getSubscription(companyId);

    const planOrder = {
      [SubscriptionPlan.FREE]: 0,
      [SubscriptionPlan.BASIC]: 1,
      [SubscriptionPlan.PROFESSIONAL]: 2,
      [SubscriptionPlan.ENTERPRISE]: 3,
      [SubscriptionPlan.CUSTOM]: 4,
    };

    if (planOrder[upgradePlanDto.newPlan] <= planOrder[subscription.plan]) {
      throw new BadRequestException(
        'Solo es posible hacer upgrade a un plan superior',
      );
    }

    subscription.plan = upgradePlanDto.newPlan;
    subscription.status = SubscriptionStatus.ACTIVE;
    subscription.lastPlanChangeAt = new Date();

    if (upgradePlanDto.billingFrequency) {
      subscription.billingFrequency = upgradePlanDto.billingFrequency;
    }

    // Configurar límites según el plan
    this.applyPlanLimits(subscription, upgradePlanDto.newPlan);

    return await this.subscriptionRepo.save(subscription);
  }

  /**
   * Extender período de prueba
   */
  async extendTrial(
    companyId: string,
    extendTrialDto: ExtendTrialDto,
  ): Promise<CompanySubscription> {
    const subscription = await this.getSubscription(companyId);

    if (subscription.status !== SubscriptionStatus.TRIAL) {
      throw new BadRequestException('Solo es posible extender trials activos');
    }

    const currentEnd = subscription.trialEndDate || new Date();
    currentEnd.setDate(currentEnd.getDate() + extendTrialDto.additionalDays);
    subscription.trialEndDate = currentEnd;

    return await this.subscriptionRepo.save(subscription);
  }

  /**
   * Cancelar suscripción
   */
  async cancelSubscription(companyId: string): Promise<CompanySubscription> {
    const subscription = await this.getSubscription(companyId);

    subscription.status = SubscriptionStatus.CANCELLED;
    subscription.cancelledAt = new Date();
    subscription.autoRenew = false;

    return await this.subscriptionRepo.save(subscription);
  }

  private applyPlanLimits(
    subscription: CompanySubscription,
    plan: SubscriptionPlan,
  ): void {
    const planConfig = {
      [SubscriptionPlan.FREE]: {
        maxUsers: 3,
        maxAssets: 100,
        storageGb: 1,
        hasApiAccess: false,
        hasPrioritySupport: false,
        hasAdvancedReports: false,
      },
      [SubscriptionPlan.BASIC]: {
        maxUsers: 10,
        maxAssets: 500,
        storageGb: 10,
        hasApiAccess: false,
        hasPrioritySupport: false,
        hasAdvancedReports: false,
      },
      [SubscriptionPlan.PROFESSIONAL]: {
        maxUsers: 50,
        maxAssets: 5000,
        storageGb: 100,
        hasApiAccess: true,
        hasPrioritySupport: true,
        hasAdvancedReports: true,
      },
      [SubscriptionPlan.ENTERPRISE]: {
        maxUsers: undefined,
        maxAssets: undefined,
        storageGb: 1000,
        hasApiAccess: true,
        hasPrioritySupport: true,
        hasAdvancedReports: true,
        hasAuditLogs: true,
        hasWhiteLabel: true,
      },
      [SubscriptionPlan.CUSTOM]: {},
    };

    Object.assign(subscription, planConfig[plan]);
  }
}
