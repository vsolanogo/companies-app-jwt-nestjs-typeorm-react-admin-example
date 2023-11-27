import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Company } from '../company/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
