import {
  Controller,
  Patch,
  UseGuards,
  Body,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { Role } from '../models/models';
import { HasRoles } from '../auth/has-roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<User> {
    const updatedUser = await this.userService.updateUser(
      updateUserDto,
      req?.user?.id,
      req?.user?.roles?.includes(Role.Admin),
    );

    return updatedUser;
  }

  @Serialize(UserDto)
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('list')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Serialize(UserDto)
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    const user = await this.userService.findOne(userId);

    return user;
  }
}
