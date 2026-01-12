import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/usuario.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
