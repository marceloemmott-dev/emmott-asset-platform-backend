import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email del usuario que olvidó su contraseña',
    example: 'admin@gmasil.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
