import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('by-email/:email')
  @ApiOperation({ summary: 'Find user by email' })
  @ApiParam({ name: 'email', example: 'admin@company.com' })
  async findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
