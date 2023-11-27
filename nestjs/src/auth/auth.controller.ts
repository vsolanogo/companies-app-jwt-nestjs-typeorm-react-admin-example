import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../user/dto/user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Serialize(UserDto)
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() body: SignupDto): Promise<User> {
    const user = this.userService.create(body);
    return user;
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<User> {
    return this.userService.findOne(req?.user?.id);
  }
}
