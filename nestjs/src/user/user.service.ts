import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserWithoutPassword } from './user.entity';
import { SignupDto } from '../auth/dto/signup.dto';
import { validate } from 'class-validator';

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

    const pwd = await bcrypt.hash(signupDto.password, 10);
    newUser.password = pwd;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
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
}
