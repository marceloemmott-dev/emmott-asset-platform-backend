import {
  Controller,
  Get,
  Patch,
  Body,
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
import { BillingService } from '../services/billing.service';
import { UpdateBillingDto } from '../dto/update-company.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/entities/usuario.entity';

@ApiTags('Companies: Billing')
@ApiBearerAuth('JWT-auth')
@Controller('companies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get(':id/billing')
  @ApiOperation({
    summary: 'Obtener información de facturación',
    description:
      'Obtiene la información legal y tributaria (RUT, dirección fiscal, representante legal, etc).',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
  })
  @ApiResponse({
    status: 200,
    description: 'Información de facturación',
  })
  @ApiResponse({
    status: 404,
    description: 'Información no encontrada',
  })
  async getBilling(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.billingService.getBilling(id);
  }

  @Patch(':id/billing')
  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN)
  @ApiOperation({
    summary: 'Actualizar información de facturación',
    description:
      'Actualiza datos legales/tributarios. El RUT no puede ser modificado.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la empresa',
  })
  @ApiBody({ type: UpdateBillingDto })
  @ApiResponse({
    status: 200,
    description: 'Información actualizada',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
  })
  async updateBilling(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBillingDto: UpdateBillingDto,
  ): Promise<any> {
    return this.billingService.updateBilling(id, updateBillingDto);
  }
}
