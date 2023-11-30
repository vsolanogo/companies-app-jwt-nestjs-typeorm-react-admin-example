import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from '../auth/dto/signup.dto';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../models/models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(signupDto: SignupDto): Promise<User> {
    const existingUserEmail = await this.userRepository.findOne({
      where: { email: signupDto.email },
    });

    if (existingUserEmail) {
      throw new BadRequestException('User with given email already exists.');
    }

    const existingUserNickName = await this.userRepository.findOne({
      where: { nickName: signupDto.nickName },
    });

    if (existingUserNickName) {
      throw new BadRequestException('User with given nickname already exists.');
    }

    const newUser = new User();
    newUser.email = signupDto.email;
    newUser.phoneNumber = signupDto.phoneNumber;
    newUser.lastName = signupDto.lastName;
    newUser.firstName = signupDto.firstName;
    newUser.nickName = signupDto.nickName;
    newUser.description = signupDto.description;
    newUser.position = signupDto.position;
    newUser.roles = [Role.User];

    const pwd = await bcrypt.hash(signupDto.password, 10);
    newUser.password = pwd;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    } else {
      return this.userRepository.save(newUser);
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    const { password, ...result } = user;
    return result as User;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userPatcherId: string,
    isAdmin,
  ): Promise<User> {
    const userPatcher = await this.userRepository.findOne({
      where: { id: userPatcherId },
    });

    if (!userPatcher) {
      throw new BadRequestException('User not found');
    }

    if (userPatcher.id !== updateUserDto.id && !isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to modify this entity',
      );
    }

    const modifiedUser = await this.userRepository.findOne({
      where: { id: updateUserDto?.id },
    });

    if (!userPatcher) {
      throw new BadRequestException('User not found');
    }

    modifiedUser.phoneNumber = updateUserDto.phoneNumber;
    modifiedUser.firstName = updateUserDto.firstName;
    modifiedUser.lastName = updateUserDto.lastName;
    modifiedUser.description = updateUserDto.description;
    modifiedUser.position = updateUserDto.position;

    const errors = await validate(modifiedUser);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    } else {
      return this.userRepository.save(modifiedUser);
    }
  }

  async createAdminUser(): Promise<void> {
    const existingAdmin = await this.userRepository.findOne({
      where: { nickName: 'admin' },
    });

    if (existingAdmin) {
      return;
    }

    const adminUser = new User();
    adminUser.email = 'admin@admin.com';
    adminUser.phoneNumber = '+';
    adminUser.lastName = 'admin';
    adminUser.firstName = 'admin';
    adminUser.nickName = 'admin';
    adminUser.description = 'admin';
    adminUser.position = 'admin';
    adminUser.roles = [Role.Admin];

    const pwd = await bcrypt.hash('admin', 10);
    adminUser.password = pwd;

    this.userRepository.save(adminUser);
  }

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
