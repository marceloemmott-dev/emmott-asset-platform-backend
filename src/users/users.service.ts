import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/usuario.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // 1. Verificar si el usuario ya existe
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 2. Hashear la contraseña
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // 3. Crear el usuario con la contraseña hasheada
    const user = this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword, // ¡Contraseña segura!
      role: createUserDto.role ?? UserRole.COMPANY_ADMIN,
    });

    return this.usersRepository.save(user);
  }
}
