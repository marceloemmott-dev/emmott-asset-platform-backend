import { UserRole } from '../entities/usuario.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
