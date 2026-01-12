import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/usuario.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'StrongPassword123!',
    minLength: 6,
  })
  password: string;

  @ApiProperty({
    description: 'The role of the user in the platform',
    enum: UserRole,
    example: UserRole.COMPANY_ADMIN,
    required: false,
    default: UserRole.COMPANY_ADMIN,
  })
  role?: UserRole;
}
