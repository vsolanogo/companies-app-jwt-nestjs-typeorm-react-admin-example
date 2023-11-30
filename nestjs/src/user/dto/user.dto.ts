import { Expose } from 'class-transformer';
import { Role } from '../../models/models';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  roles: Role[];

  password: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  lastName: string;

  @Expose()
  firstName: string;

  @Expose()
  nickName: string;

  @Expose()
  description: string;

  @Expose()
  position: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
