import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { SubscriptionService } from '../services/subscription.service';
import {
  UpdateSubscriptionDto,
  UpgradePlanDto,
  ExtendTrialDto,
} from '../dto/update-subscription.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/entities/usuario.entity';

@ApiTags('Companies: Subscription')
@ApiBearerAuth('JWT-auth')
@Controller('companies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':id/subscription')
  @ApiOperation({
    summary: 'Obtener información de suscripción',
    description:
      'Obtiene el estado actual del plan, límites y características de la suscripción.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
  })
  @ApiResponse({
    status: 200,
    description: 'Información de suscripción',
  })
  @ApiResponse({
    status: 404,
    description: 'Suscripción no encontrada',
  })
  async getSubscription(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.subscriptionService.getSubscription(id);
  }

  @Patch(':id/subscription')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Actualizar suscripción',
    description:
      'Actualiza parámetros de la suscripción (límites, features). Solo SUPER_ADMIN.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
  })
  @ApiBody({ type: UpdateSubscriptionDto })
  @ApiResponse({
    status: 200,
    description: 'Suscripción actualizada',
  })
  async updateSubscription(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<any> {
    return this.subscriptionService.updateSubscription(
      id,
      updateSubscriptionDto,
    );
  }

  @Post(':id/subscription/upgrade')
  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN)
  @ApiOperation({
    summary: 'Upgrade de plan',
    description:
      'Realiza un upgrade del plan de suscripción a uno superior. Los límites se actualizan automáticamente.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
  })
  @ApiBody({ type: UpgradePlanDto })
  @ApiResponse({
    status: 200,
    description: 'Plan actualizado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Solo es posible hacer upgrade a un plan superior',
  })
  async upgradePlan(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() upgradePlanDto: UpgradePlanDto,
  ): Promise<any> {
    return this.subscriptionService.upgradePlan(id, upgradePlanDto);
  }

  @Post(':id/subscription/extend-trial')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Extender período de prueba',
    description:
      'Extiende el período de trial de una empresa. Solo funciona si el trial está activo.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
  })
  @ApiBody({ type: ExtendTrialDto })
  @ApiResponse({
    status: 200,
    description: 'Trial extendido',
  })
  @ApiResponse({
    status: 400,
    description: 'Solo es posible extender trials activos',
  })
  async extendTrial(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() extendTrialDto: ExtendTrialDto,
  ): Promise<any> {
    return this.subscriptionService.extendTrial(id, extendTrialDto);
  }

  @Post(':id/subscription/cancel')
  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN)
  @ApiOperation({
    summary: 'Cancelar suscripción',
    description:
      'Cancela la suscripción de la empresa. La empresa mantiene acceso hasta el fin del período pagado.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
  })
  @ApiResponse({
    status: 200,
    description: 'Suscripción cancelada',
  })
  async cancelSubscription(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.subscriptionService.cancelSubscription(id);
  }
}
