import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Crear el usuario (UsersService ya valida duplicados y hashea la contraseña)
    const user = await this.usersService.createUser(registerDto);

    // Generar token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // 1. Buscar usuario por email
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Generar token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;

    // Buscar usuario por email
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return {
        message: 'If the email exists, a password reset link has been sent',
      };
    }

    // Generar token aleatorio
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Calcular expiración (1 hora)
    const resetTokenExpires = new Date();
    resetTokenExpires.setHours(resetTokenExpires.getHours() + 1);

    // Guardar token en la base de datos
    await this.usersService.updateResetToken(
      user.id,
      resetToken,
      resetTokenExpires,
    );

    // Enviar email con el token
    try {
      await this.mailService.sendResetPasswordEmail(
        email,
        user.name,
        resetToken,
      );
    } catch (error) {
      console.error('Error sending email:', error);
      // No lanzamos error para no revelar que el email existe
    }

    return {
      message: 'If the email exists, a password reset link has been sent',
    };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const { token, newPassword } = resetPasswordDto;

    // Buscar usuario por token
    const user = await this.usersService.findByResetToken(token);

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Verificar si el token ha expirado
    if (user.resetTokenExpires < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hashear nueva contraseña
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar contraseña y limpiar token
    await this.usersService.updatePassword(user.id, hashedPassword);

    // Enviar email de confirmación
    try {
      await this.mailService.sendPasswordChangedEmail(user.email, user.name);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      // No lanzamos error, la contraseña ya fue cambiada exitosamente
    }

    return {
      message: 'Password has been reset successfully',
    };
  }
}
