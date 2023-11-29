import { Controller, Patch, UseGuards, Body, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

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
      req?.user?.admin,
    );

    return updatedUser;
  }
}
