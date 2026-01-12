import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/usuario.entity';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User information',
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'COMPANY_ADMIN',
    },
  })
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}
